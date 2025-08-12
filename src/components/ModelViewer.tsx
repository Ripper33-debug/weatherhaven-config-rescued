'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows, Sky } from '@react-three/drei';
import {
  Box3, Group, Vector3, PerspectiveCamera, OrthographicCamera,
  MeshStandardMaterial, MeshPhysicalMaterial, Object3D
} from 'three';
import type { ConfiguratorState } from './ShelterConfigurator';
import type { Shelter } from '../App';

// Preload models
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

const WHEEL_RX = /(wheel|tyre|tire|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard|chassis)/i;
const BODY_RX  = /(body|main|shell|wall|panel|shelter|container|box|unit|roof|side|end|floor|ceiling|exterior|outer|surface|skin|hull|casing|enclosure|housing|frame|structure)/i;

function looksLikeWheel(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  const p = (node.parent?.name || '').toLowerCase();
  return WHEEL_RX.test(n) || WHEEL_RX.test(p);
}
function looksLikeBody(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  return BODY_RX.test(n);
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  configState, onModelLoaded, shelter,
  isAutoRotating = false, environment = 'day',
  showScale = false,
}) => {
  const groupRef = useRef<Group>(null);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [controlsTarget, setControlsTarget] = useState<[number, number, number]>([0, 0.2, 0]);
  const [processedScene, setProcessedScene] = useState<Object3D | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Choose model
  let modelPath = shelter.modelPath || '/models/trecc.glb';
  if (shelter.id === 'trecc') modelPath = configState.isDeployed ? '/models/trecc-open.glb' : '/models/trecc.glb';
  if (shelter.id === 'trecc-titanium') modelPath = '/models/titanium.glb';
  const { scene } = useGLTF(modelPath);

  // Rubber material (base for wheels)
  const rubberBase = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: '#111111',   // black rubber
        roughness: 0.9,
        metalness: 0.0,
        reflectivity: 0.05,
        clearcoat: 0,
      }),
    []
  );

  // Clone + sanitize materials; tag wheel meshes; assign rubber
  useEffect(() => {
    if (!scene) return;

    const cloned = scene.clone(true);

    cloned.traverse((o: any) => {
      if (!o.isMesh) return;

      // Always break sharing
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

      // Wheels: force rubber material (unique instance per mesh)
      if (looksLikeWheel(o)) {
        o.userData.isWheel = true;
        if (Array.isArray(o.material)) {
          o.material = o.material.map(() => rubberBase.clone());
        } else {
          o.material = rubberBase.clone();
        }
      } else if (looksLikeBody(o)) {
        o.userData.isBody = true;
      }

      o.castShadow = true;
      o.receiveShadow = true;
    });

    setProcessedScene(cloned);
    setModelLoaded(true);
    onModelLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, rubberBase]);

  // Frame camera/controls
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

  // BODY recolor only (wheels are locked)
  useEffect(() => {
    if (!processedScene) return;

    processedScene.traverse((child: any) => {
      if (!child.isMesh || !child.material) return;
      if (!child.userData.isBody) return;       // only the body
      if (child.userData.isWheel) return;       // just in case

      const applyFinish = (mat: any) => {
        const m = mat.clone();                  // break any lingering sharing
        m.color.set(configState.color);

        if (configState.color === '#2F4F2F') {        // Dark Green - Matte
          m.metalness = 0.1; m.roughness = 0.9;
        } else if (configState.color === '#D2B48C') { // Tan - Satin
          m.metalness = 0.3; m.roughness = 0.4;
        } else if (configState.color === '#FFFFFF') { // White - Matte
          m.metalness = 0.1; m.roughness = 0.8;
        } else {                                      // Custom - Premium
          m.metalness = 0.2; m.roughness = 0.6;
        }
        m.needsUpdate = true;
        return m;
      };

      if (Array.isArray(child.material)) {
        child.material = child.material.map((mm: any) =>
          (mm.isMeshStandardMaterial || mm.isMeshPhysicalMaterial)
            ? applyFinish(mm)
            : new MeshStandardMaterial({ color: configState.color, metalness: 0.2, roughness: 0.6 })
        );
      } else {
        const mm = child.material;
        child.material =
          (mm.isMeshStandardMaterial || mm.isMeshPhysicalMaterial)
            ? applyFinish(mm)
            : new MeshStandardMaterial({ color: configState.color, metalness: 0.2, roughness: 0.6 });
        child.material.needsUpdate = true;
      }
    });
  }, [configState.color, processedScene]);

  useFrame(() => {
    if (groupRef.current && isAutoRotating) groupRef.current.rotation.y += 0.01;
  });

  // Env setup
  const envSettings = (() => {
    switch (environment) {
      case 'night':  return { ambientIntensity: 0.3, directionalIntensity: 0.4, environmentPreset: 'night' as const,   groundColor: '#1a1a2e' };
      case 'desert': return { ambientIntensity: 0.5, directionalIntensity: 0.9, environmentPreset: 'sunset' as const,  groundColor: '#d4a574' };
      case 'arctic': return { ambientIntensity: 0.5, directionalIntensity: 0.8, environmentPreset: 'dawn' as const,    groundColor: '#f0f8ff' };
      case 'jungle': return { ambientIntensity: 0.5, directionalIntensity: 0.8, environmentPreset: 'forest' as const,  groundColor: '#228b22' };
      default:       return { ambientIntensity: 0.8, directionalIntensity: 1.2, environmentPreset: 'apartment' as const, groundColor: '#2d3748' };
    }
  })();

  return (
    <>
      <ambientLight intensity={envSettings.ambientIntensity} />
      <directionalLight position={[10, 10, 5]} intensity={envSettings.directionalIntensity} castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-far={50} shadow-camera-left={-10} shadow-camera-right={10}
        shadow-camera-top={10} shadow-camera-bottom={-10}
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

      <group ref={groupRef}>
        {processedScene ? (
          <primitive object={processedScene} />
        ) : (
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
        enablePan enableZoom enableRotate
        minDistance={0.5} maxDistance={100}
        maxPolarAngle={Math.PI / 2} minPolarAngle={0}
        target={controlsTarget}
        dampingFactor={0.05} enableDamping
        rotateSpeed={0.5} zoomSpeed={1.2} panSpeed={0.8}
      />
    </>
  );
};

export default ModelViewer;
