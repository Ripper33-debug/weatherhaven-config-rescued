import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows, Sky } from '@react-three/drei';
import {
  Box3, Group, Vector3, PerspectiveCamera, OrthographicCamera,
  MeshStandardMaterial, MeshPhysicalMaterial, Object3D
} from 'three';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

// Preload TRECC models
useGLTF.preload('/models/trecc.glb');
useGLTF.preload('/models/trecc-open.glb');
useGLTF.preload('/models/titanium.glb');

interface ModelViewerProps {
  configState: ConfiguratorState;
  onModelLoaded: () => void;
  shelter: Shelter;
  isAutoRotating?: boolean;
  environment?: 'day' | 'night' | 'desert' | 'arctic' | 'jungle';
  showScale?: boolean;
  showParticles?: boolean;
}

const wheelRegex = /(wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard)/i;
const trailerRegex = /(trailer|chassis)/i;

// “Body” tags to recolor
const bodyRegex = /(body|main|shell|wall|panel|shelter|container|box|unit|roof|side|end|floor|ceiling|exterior|outer|surface|skin|hull|casing|enclosure|housing|frame|structure)/i;

function isWheelish(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  const p = (node.parent?.name || '').toLowerCase();
  return wheelRegex.test(n) || wheelRegex.test(p) || trailerRegex.test(p);
}

function isBody(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  return bodyRegex.test(n);
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  configState,
  onModelLoaded,
  shelter,
  isAutoRotating = false,
  environment = 'day',
  showScale = false,
  showParticles = false
}) => {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [controlsTarget, setControlsTarget] = useState<[number, number, number]>([0, 0.2, 0]);

  // Load correct GLB
  let modelPath = shelter.modelPath || '/models/trecc.glb';
  if (shelter.id === 'trecc') {
    modelPath = configState.isDeployed ? '/models/trecc-open.glb' : '/models/trecc.glb';
  } else if (shelter.id === 'trecc-titanium') {
    modelPath = '/models/titanium.glb';
  }
  const { scene } = useGLTF(modelPath);

  // We’ll render a processed clone, not the raw scene
  const [processedScene, setProcessedScene] = useState<Object3D | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Build rubber material once
  const rubberMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: '#111111',        // black rubber
        roughness: 0.9,
        metalness: 0.0,
        reflectivity: 0.05,
        clearcoat: 0,
      }),
    []
  );

  // Clone + sanitize materials on load. Give wheels dedicated rubber mats.
  useEffect(() => {
    if (!scene) return;

    const cloned = scene.clone(true);

    cloned.traverse((o: any) => {
      if (!o.isMesh) return;

      // Disable vertex colors if present (they can fight body color)
      if (o.material) {
        if (Array.isArray(o.material)) {
          o.material = o.material.map((m: any) => {
            const mm = m.clone();
            if ('vertexColors' in mm) mm.vertexColors = false;
            return mm;
          });
        } else {
          o.material = o.material.clone();
          if ('vertexColors' in o.material) o.material.vertexColors = false;
        }
      }

      // Force wheels/tyres to rubber material (own instance per mesh)
      if (isWheelish(o)) {
        const rubber = rubberMaterial.clone();
        // Make sure any prior base color doesn’t sneak in
        if (Array.isArray(o.material)) {
          o.material = o.material.map(() => rubber.clone());
        } else {
          o.material = rubber;
        }
      }

      o.castShadow = true;
      o.receiveShadow = true;
    });

    setProcessedScene(cloned);
    setModelLoaded(true);
  }, [scene, rubberMaterial]);

  // Notify parent once
  useEffect(() => {
    if (modelLoaded) onModelLoaded();
  }, [modelLoaded, onModelLoaded]);

  // Frame camera/controls to processed scene
  useEffect(() => {
    if (!processedScene) return;

    const box = new Box3().setFromObject(processedScene);
    const center = new Vector3();
    const size = new Vector3();
    box.getCenter(center);
    box.getSize(size);
    const maxSize = Math.max(size.x, size.y, size.z);

    if ((camera as PerspectiveCamera).isPerspectiveCamera) {
      const persp = camera as PerspectiveCamera;
      const fitHeightDistance = maxSize / (2 * Math.tan((persp.fov * Math.PI) / 360));
      const fitWidthDistance = fitHeightDistance / persp.aspect;
      const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance);
      persp.position.set(center.x, center.y + size.y * 0.15, center.z + distance);
      persp.near = Math.max(0.02, maxSize / 300);
      persp.far = Math.max(100, maxSize * 100);
      persp.updateProjectionMatrix();
    } else {
      const ortho = camera as OrthographicCamera;
      const distance = maxSize * 2.5;
      ortho.position.set(center.x, center.y + size.y * 0.1, center.z + distance);
      ortho.near = Math.max(0.02, maxSize / 300);
      ortho.far = Math.max(100, maxSize * 100);
      ortho.updateProjectionMatrix();
    }

    setControlsTarget([center.x, center.y, center.z]);
    if (controlsRef.current) {
      controlsRef.current.target.set(center.x, center.y, center.z);
      controlsRef.current.update(); 
    }
  }, [processedScene, camera]);

  // Recolor BODY ONLY when color changes
  useEffect(() => {
    if (!processedScene) return;

    processedScene.traverse((child: any) => {
      if (!child.isMesh || !child.material) return;

      // Skip wheels/trailer/etc
      if (isWheelish(child)) return;

      // Only body-like meshes
      if (!isBody(child)) return;

      const applyFinish = (mat: any) => {
        // Ensure unique instance (belt & suspenders)
        const cloned = mat.clone();
        cloned.color.set(configState.color);

        if (configState.color === '#2F4F2F') {        // dark green matte
          cloned.metalness = 0.1; cloned.roughness = 0.9;
        } else if (configState.color === '#D2B48C') { // tan satin
          cloned.metalness = 0.3; cloned.roughness = 0.4;
        } else if (configState.color === '#FFFFFF') { // white matte
          cloned.metalness = 0.1; cloned.roughness = 0.8;
        } else {                                      // custom premium
          cloned.metalness = 0.2; cloned.roughness = 0.6;
        }
        cloned.needsUpdate = true;
        return cloned;
      };

      if (Array.isArray(child.material)) {
        child.material = child.material.map((m: any) => {
          if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) return applyFinish(m);
          // upgrade non-PBR to standard material that matches color
          const mm = new MeshStandardMaterial({ color: configState.color, metalness: 0.2, roughness: 0.6 });
          mm.needsUpdate = true;
          return mm;
        });
      } else {
        const m = child.material;
        if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
          child.material = applyFinish(m);
        } else {
          child.material = new MeshStandardMaterial({
            color: configState.color, metalness: 0.2, roughness: 0.6
          });
          child.material.needsUpdate = true;
        }
      }
    });
  }, [configState.color, processedScene]);

  useFrame(() => {
    if (groupRef.current && isAutoRotating) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const getEnvironmentSettings = () => {
    switch (environment) {
      case 'night':
        return { ambientIntensity: 0.3, directionalIntensity: 0.4, environmentPreset: 'night' as const, groundColor: '#1a1a2e', skyColor: '#16213e' };
      case 'desert':
        return { ambientIntensity: 0.5, directionalIntensity: 0.9, environmentPreset: 'sunset' as const, groundColor: '#d4a574', skyColor: '#87ceeb' };
      case 'arctic':
        return { ambientIntensity: 0.5, directionalIntensity: 0.8, environmentPreset: 'dawn' as const, groundColor: '#f0f8ff', skyColor: '#e6f3ff' };
      case 'jungle':
        return { ambientIntensity: 0.5, directionalIntensity: 0.8, environmentPreset: 'forest' as const, groundColor: '#228b22', skyColor: '#98fb98' };
      default:
        return { ambientIntensity: 0.8, directionalIntensity: 1.2, environmentPreset: 'apartment' as const, groundColor: '#2d3748', skyColor: '#87ceeb' };
    }
  };

  const envSettings = getEnvironmentSettings();

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={envSettings.ambientIntensity} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={envSettings.directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      <directionalLight position={[0, 10, -10]} intensity={0.3} />

      <ContactShadows position={[0, -0.095, 0]} opacity={0.5} scale={60} blur={2.2} far={25} />
      <Sky sunPosition={[100, 20, 100]} turbidity={6} rayleigh={1.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <Environment preset={envSettings.environmentPreset} background={false} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={envSettings.groundColor} roughness={0.9} metalness={0} />
      </mesh>

      {/* Model */}
      <group ref={groupRef}>
        {processedScene ? (
          <primitive object={processedScene} />
        ) : (
          // Simple placeholder while loading
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 4, 2]} />
            <meshStandardMaterial color={configState.color} metalness={0.2} roughness={0.6} />
          </mesh>
        )}
        {showScale && (
          <group>
            <mesh position={[5, 1.7, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 1.7, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[8, 1.5, 0]}>
              <boxGeometry args={[2, 1.5, 4]} />
              <meshStandardMaterial color="#2d3748" />
            </mesh>
          </group>
        )}
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={0.5}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        target={controlsTarget}
        dampingFactor={0.05}
        enableDamping
        rotateSpeed={0.5}
        zoomSpeed={1.2}
        panSpeed={0.8}
      />
    </>
  );
};

export default ModelViewer;

 
