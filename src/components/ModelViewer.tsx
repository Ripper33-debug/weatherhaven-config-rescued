'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows, Sky } from '@react-three/drei';
import {
  Box3, Group, Vector3, PerspectiveCamera, OrthographicCamera,
  MeshStandardMaterial, MeshPhysicalMaterial, Object3D,
  BufferGeometry, Float32BufferAttribute, PointsMaterial, Color
} from 'three';
import * as THREE from 'three';
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
  lightingControls?: {
    lightPosition: [number, number, number];
    lightIntensity: number;
    ambientIntensity: number;
    shadowBias: number;
    shadowMapSize: number;
    shadowRadius?: number;
    sunPosition?: [number, number, number];
    skyTurbidity?: number;
    skyRayleigh?: number;
    skyMieCoefficient?: number;
    skyMieDirectionalG?: number;
  };
  weatherEffects?: {
    type: 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog';
    intensity: number;
    windSpeed: number;
    windDirection?: [number, number, number];
    particleSize?: number;
    particleColor?: string;
  };
}

// Weather Effects Component
const WeatherEffects: React.FC<{
  type: 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog';
  intensity: number;
  windSpeed: number;
  windDirection?: [number, number, number];
  particleSize?: number;
  particleColor?: string;
}> = ({ type, intensity, windSpeed, windDirection = [0, 0, 1], particleSize, particleColor }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    if (type === 'none') return null;
    
    const count = Math.floor(intensity * (type === 'storm' ? 800 : type === 'fog' ? 300 : 500)); // Adjust count by type
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a large area
      positions[i * 3] = (Math.random() - 0.5) * 60; // x
      positions[i * 3 + 1] = Math.random() * (type === 'fog' ? 15 : 35) + (type === 'fog' ? 0 : 5); // y (height)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // z
      
      // Calculate wind influence
      const windX = windDirection[0] * windSpeed;
      const windY = windDirection[1] * windSpeed;
      const windZ = windDirection[2] * windSpeed;
      
      // Velocities based on weather type
      if (type === 'rain') {
        velocities[i * 3] = windX * (Math.random() - 0.5) * 0.1 + (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = -1.2 - Math.random() * 0.5; // y (falling)
        velocities[i * 3 + 2] = windZ * (Math.random() - 0.5) * 0.1 + (Math.random() - 0.5) * 0.02;
        sizes[i] = particleSize || 0.05;
      } else if (type === 'snow') {
        velocities[i * 3] = windX * (Math.random() - 0.5) * 0.05 + (Math.random() - 0.5) * 0.01;
        velocities[i * 3 + 1] = -0.4 - Math.random() * 0.3; // y (falling slowly)
        velocities[i * 3 + 2] = windZ * (Math.random() - 0.5) * 0.05 + (Math.random() - 0.5) * 0.01;
        sizes[i] = particleSize || 0.12;
      } else if (type === 'dust') {
        velocities[i * 3] = windX * (Math.random() - 0.5) * 0.15 + (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08; // y (floating)
        velocities[i * 3 + 2] = windZ * (Math.random() - 0.5) * 0.15 + (Math.random() - 0.5) * 0.02;
        sizes[i] = particleSize || 0.03;
      } else if (type === 'storm') {
        velocities[i * 3] = windX * (Math.random() - 0.5) * 0.2 + (Math.random() - 0.5) * 0.05;
        velocities[i * 3 + 1] = -1.5 - Math.random() * 0.8; // y (heavy rain)
        velocities[i * 3 + 2] = windZ * (Math.random() - 0.5) * 0.2 + (Math.random() - 0.5) * 0.05;
        sizes[i] = particleSize || 0.08;
      } else if (type === 'fog') {
        velocities[i * 3] = windX * (Math.random() - 0.5) * 0.02 + (Math.random() - 0.5) * 0.005;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01; // y (very slow drift)
        velocities[i * 3 + 2] = windZ * (Math.random() - 0.5) * 0.02 + (Math.random() - 0.5) * 0.005;
        sizes[i] = particleSize || 0.15;
      }
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new Float32BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1));
    
    return { geometry, velocities, sizes };
  }, [type, intensity, windSpeed, windDirection, particleSize]);
  
  useFrame(() => {
    if (particlesRef.current && particles) {
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const velocities = particles.velocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocities
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Reset particles that go out of bounds
        if (positions[i + 1] < -2) {
          positions[i + 1] = 35; // Reset to top
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 2] = (Math.random() - 0.5) * 50;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  if (type === 'none' || !particles) return null;
  
  const getParticleMaterial = () => {
    const baseColor = particleColor ? new Color(particleColor) : new Color(0xFFFFFF);
    
    switch (type) {
      case 'rain':
        return new PointsMaterial({
          color: new Color(0x87CEEB),
          size: particleSize || 0.05,
          transparent: true,
          opacity: 0.7,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        });
      case 'snow':
        return new PointsMaterial({
          color: new Color(0xFFFFFF),
          size: particleSize || 0.12,
          transparent: true,
          opacity: 0.9,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        });
      case 'dust':
        return new PointsMaterial({
          color: new Color(0xD2B48C),
          size: particleSize || 0.03,
          transparent: true,
          opacity: 0.5,
          sizeAttenuation: true,
          blending: THREE.MultiplyBlending
        });
      case 'storm':
        return new PointsMaterial({
          color: new Color(0x2C3E50),
          size: particleSize || 0.08,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        });
      case 'fog':
        return new PointsMaterial({
          color: new Color(0xBDC3C7),
          size: particleSize || 0.15,
          transparent: true,
          opacity: 0.3,
          sizeAttenuation: true,
          blending: THREE.NormalBlending
        });
      default:
        return new PointsMaterial({ 
          color: baseColor, 
          size: particleSize || 0.05,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true
        });
    }
  };
  
  return (
    <primitive object={new THREE.Points(particles.geometry, getParticleMaterial())} ref={particlesRef} />
  );
};

const WHEEL_RX = /(wheel|tyre|tire|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard|chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing|nut|bolt|fastener|hardware)/i;
const BODY_RX  = /(body|main|shell|wall|panel|shelter|container|box|unit|roof|side|end|floor|ceiling|exterior|outer|surface|skin|hull|casing|enclosure|housing|frame|structure|module|section|compartment|space|interior|inner|inside|room|area|zone|volume|cabin|pod|capsule|cylinder|tube|pipe|duct|channel|passage|opening|door|window|hatch|access|entry|exit|vent|port|connection|joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset|reinforcement|stiffener|support|brace|girder|beam|column|post|pillar|stud|joist|rafter|truss|arch|dome|vault|canopy|awning|cover|lid|cap|top|bottom|base|foundation|platform|deck|stage|level|tier|layer|sheet|plate|board|panel|slab|block|brick|tile|shingle|cladding|siding|facade|face|front|back|left|right|north|south|east|west|upper|lower|middle|center|central|core|heart|nucleus|kernel|essence|main|primary|principal|chief|head|lead|key|essential|vital|crucial|important|significant|major|main|primary|principal|chief|head|lead|key|essential|vital|crucial|important|significant|major)/i;

function looksLikeWheel(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  const p = (node.parent?.name || '').toLowerCase();
  const pp = (node.parent?.parent?.name || '').toLowerCase();
  
  // Check current node, parent, and grandparent names
  return WHEEL_RX.test(n) || WHEEL_RX.test(p) || WHEEL_RX.test(pp);
}

function looksLikeBody(node: Object3D) {
  const n = (node.name || '').toLowerCase();
  const p = (node.parent?.name || '').toLowerCase();
  
  // Only color if it's clearly a body part AND not a wheel/trailer part
  const isWheelOrTrailer = WHEEL_RX.test(n) || WHEEL_RX.test(p);
  const isBodyPart = BODY_RX.test(n);
  
  return isBodyPart && !isWheelOrTrailer;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  configState, 
  onModelLoaded, 
  shelter,
  isAutoRotating = false,
  environment = 'day',
  showScale = false,
  showParticles = false,
  lightingControls,
  weatherEffects
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

      // Enhanced shadow settings for each mesh
      o.castShadow = true;
      o.receiveShadow = true;
      
      // Optimize shadow casting for better performance and quality
      if (o.geometry) {
        // Ensure geometry is optimized for shadows
        o.geometry.computeBoundingSphere();
        o.geometry.computeBoundingBox();
      }
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

    let coloredCount = 0;
    let skippedCount = 0;

    processedScene.traverse((child: any) => {
      if (!child.isMesh || !child.material) return;
      
      // Debug logging
      if (child.userData.isBody) {
        coloredCount++;
        console.log(`Coloring body part: ${child.name}`);
      } else if (child.userData.isWheel) {
        skippedCount++;
        console.log(`Skipping wheel/trailer part: ${child.name}`);
      } else {
        skippedCount++;
        console.log(`Skipping unknown part: ${child.name}`);
      }
      
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
    
    console.log(`Color application complete: ${coloredCount} body parts colored, ${skippedCount} parts skipped`);
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
      {/* Enhanced Lighting with User Controls */}
      <ambientLight intensity={lightingControls?.ambientIntensity ?? envSettings.ambientIntensity} />
      
      {/* Main directional light with realistic shadows */}
      <directionalLight
        position={lightingControls?.lightPosition ?? [10, 10, 5]}
        intensity={lightingControls?.lightIntensity ?? envSettings.directionalIntensity}
        castShadow
        shadow-mapSize-width={lightingControls?.shadowMapSize ?? 4096}
        shadow-mapSize-height={lightingControls?.shadowMapSize ?? 4096}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={lightingControls?.shadowBias ?? -0.0005}
        shadow-normalBias={0.02}
        shadow-radius={lightingControls?.shadowRadius ?? 2}
        shadow-blurSamples={16}
      />
      
      {/* Secondary fill light with soft shadows */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-normalBias={0.01}
        shadow-radius={1}
      />
      
      {/* Rim light for better definition */}
      <directionalLight
        position={[0, 10, -10]}
        intensity={0.2}
        color="#ffffff"
      />
      
      {/* Contact shadows for realism */}
      <ContactShadows 
        position={[0, -0.095, 0]} 
        opacity={0.6} 
        scale={80} 
        blur={3} 
        far={30}
        resolution={1024}
        frames={1}
      />

      {/* Realistic procedural sky and environment matching selected mode */}
      <Sky 
        sunPosition={lightingControls?.sunPosition ?? [100, 20, 100]} 
        turbidity={lightingControls?.skyTurbidity ?? 6} 
        rayleigh={lightingControls?.skyRayleigh ?? 1.5} 
        mieCoefficient={lightingControls?.skyMieCoefficient ?? 0.005} 
        mieDirectionalG={lightingControls?.skyMieDirectionalG ?? 0.8} 
      />
      <Environment preset={envSettings.environmentPreset} background={false} />

      {/* Enhanced ground plane with realistic shadow reception */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color={envSettings.groundColor} 
          roughness={0.8} 
          metalness={0}
          transparent={true}
          opacity={0.95}
        />
      </mesh>
      
      {/* Additional shadow-casting elements for realism */}
      <group position={[0, 0, 0]}>
        {/* Small ground details that cast shadows */}
        <mesh position={[5, 0.01, 5]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.02, 0.5]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[-3, 0.01, -2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 8]} />
          <meshStandardMaterial color="#4a5568" roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[8, 0.01, -8]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.02, 1]} />
          <meshStandardMaterial color="#2d3748" roughness={0.9} metalness={0} />
        </mesh>
      </group>

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

      {/* Weather Effects */}
      {weatherEffects && (
        <WeatherEffects 
          type={weatherEffects.type}
          intensity={weatherEffects.intensity}
          windSpeed={weatherEffects.windSpeed}
          windDirection={weatherEffects.windDirection}
          particleSize={weatherEffects.particleSize}
          particleColor={weatherEffects.particleColor}
        />
      )}

      {/* Enhanced Controls */}
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
