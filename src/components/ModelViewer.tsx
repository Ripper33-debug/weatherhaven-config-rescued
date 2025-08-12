import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows, Sky } from '@react-three/drei';
import { Box3, Group, Vector3, PerspectiveCamera, OrthographicCamera, BufferGeometry, Float32BufferAttribute, PointsMaterial, Color } from 'three';
import * as THREE from 'three';
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
  lightingControls?: {
    lightPosition: [number, number, number];
    lightIntensity: number;
    ambientIntensity: number;
    shadowBias: number;
    shadowMapSize: number;
  };
  weatherEffects?: {
    type: 'none' | 'rain' | 'snow' | 'dust';
    intensity: number;
    windSpeed: number;
  };
}

// Weather Effects Component
const WeatherEffects: React.FC<{
  type: 'none' | 'rain' | 'snow' | 'dust';
  intensity: number;
  windSpeed: number;
}> = ({ type, intensity, windSpeed }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    if (type === 'none') return null;
    
    const count = Math.floor(intensity * 500); // Reduced for performance
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a large area
      positions[i * 3] = (Math.random() - 0.5) * 50; // x
      positions[i * 3 + 1] = Math.random() * 30 + 5; // y (height)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
      
      // Velocities based on weather type
      if (type === 'rain') {
        velocities[i * 3] = windSpeed * (Math.random() - 0.5) * 0.05; // x drift
        velocities[i * 3 + 1] = -1 - Math.random(); // y (falling)
        velocities[i * 3 + 2] = windSpeed * (Math.random() - 0.5) * 0.05; // z drift
      } else if (type === 'snow') {
        velocities[i * 3] = windSpeed * (Math.random() - 0.5) * 0.02; // x drift
        velocities[i * 3 + 1] = -0.3 - Math.random() * 0.2; // y (falling slowly)
        velocities[i * 3 + 2] = windSpeed * (Math.random() - 0.5) * 0.02; // z drift
      } else if (type === 'dust') {
        velocities[i * 3] = windSpeed * (Math.random() - 0.5) * 0.1; // x drift
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05; // y (floating)
        velocities[i * 3 + 2] = windSpeed * (Math.random() - 0.5) * 0.1; // z drift
      }
    }
    
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new Float32BufferAttribute(velocities, 3));
    
    return { geometry, velocities };
  }, [type, intensity, windSpeed]);
  
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
    switch (type) {
      case 'rain':
        return new PointsMaterial({
          color: new Color(0x87CEEB),
          size: 0.05,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true
        });
      case 'snow':
        return new PointsMaterial({
          color: new Color(0xFFFFFF),
          size: 0.1,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true
        });
      case 'dust':
        return new PointsMaterial({
          color: new Color(0xD2B48C),
          size: 0.03,
          transparent: true,
          opacity: 0.4,
          sizeAttenuation: true
        });
      default:
        return new PointsMaterial({ color: 0xFFFFFF, size: 0.05 });
    }
  };
  
  return (
    <primitive object={new THREE.Points(particles.geometry, getParticleMaterial())} ref={particlesRef} />
  );
};

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
  const [modelLoaded, setModelLoaded] = useState(false);
  const { camera } = useThree();
  const [controlsTarget, setControlsTarget] = useState<[number, number, number]>([0, 0.2, 0]);
  
  // Load the GLB model based on shelter configuration and deployment state
  let modelPath = shelter.modelPath || '/models/trecc.glb';
  
  // For standard TRECC models, use different models for deployed vs stowed state
  if (shelter.id === 'trecc') {
    modelPath = configState.isDeployed ? '/models/trecc-open.glb' : '/models/trecc.glb';
  }
  // For titanium TRECC, use the titanium model (assuming it handles both states internally)
  else if (shelter.id === 'trecc-titanium') {
    modelPath = '/models/titanium.glb';
  }
  
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    // Model is loaded when GLTF is ready
    if (scene && !modelLoaded) {
      setModelLoaded(true);
      onModelLoaded();
    }
  }, [scene, modelLoaded, onModelLoaded]);

  // Reset model loaded state when model path changes
  useEffect(() => {
    setModelLoaded(false);
  }, [modelPath]);

  // Fix material lighting when model loads
  useEffect(() => {
    if (scene && modelLoaded) {
      // Auto-frame model and center controls target
      const box = new Box3().setFromObject(scene);
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
        // Allow extreme close-ups by reducing near plane conservatively
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
    }
  }, [scene, modelLoaded, camera]);

  // Apply color to model materials when color changes
  useEffect(() => {
    if (scene && modelLoaded) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          // Only apply color to main shelter body, exclude trailer, wheels, and other parts
          const childName = child.name.toLowerCase();
          const parentName = child.parent?.name?.toLowerCase() || '';
          
          // Define what should be colored (ONLY the main shelter container box)
          // Be very specific - only color if it's clearly a shelter part AND not a wheel/trailer part
          const isWheelOrTrailer = childName.includes('wheel') || 
                                   childName.includes('tire') || 
                                   childName.includes('trailer') ||
                                   childName.includes('chassis') ||
                                   childName.includes('axle') ||
                                   childName.includes('hub') ||
                                   childName.includes('rim') ||
                                   childName.includes('spoke') ||
                                   parentName.includes('wheel') ||
                                   parentName.includes('trailer') ||
                                   parentName.includes('chassis');
          
          const isShelterPart = childName.includes('shelter') || 
                               childName.includes('container') ||
                               childName.includes('box') ||
                               childName.includes('body') ||
                               childName.includes('main') ||
                               childName.includes('shell') ||
                               childName.includes('wall') ||
                               childName.includes('panel') ||
                               childName.includes('roof') ||
                               childName.includes('side') ||
                               childName.includes('end') ||
                               childName.includes('floor') ||
                               childName.includes('ceiling') ||
                               childName.includes('exterior') ||
                               childName.includes('outer') ||
                               childName.includes('surface') ||
                               childName.includes('skin') ||
                               childName.includes('hull') ||
                               childName.includes('casing') ||
                               childName.includes('enclosure') ||
                               childName.includes('housing') ||
                               childName.includes('frame') ||
                               childName.includes('structure') ||
                               childName.includes('unit');
          
          const shouldColor = isShelterPart && !isWheelOrTrailer;
          
          // Use the simplified logic - no need for separate shouldNotColor
          // The shouldColor logic above handles everything
          
          // Only color if it should be colored
          if (shouldColor) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat: any) => {
                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                  // Apply color and finish based on selection
                  mat.color.setHex(configState.color.replace('#', '0x'));
                  
                  // Apply finish based on color selection
                  if (configState.color === '#4A5568') { // Military Green - Matte
                    mat.metalness = 0.1;
                    mat.roughness = 0.9;
                  } else if (configState.color === '#D69E2E') { // Desert Tan - Satin
                    mat.metalness = 0.3;
                    mat.roughness = 0.4;
                  } else if (configState.color === '#F7FAFC') { // Arctic White - Matte
                    mat.metalness = 0.1;
                    mat.roughness = 0.8;
                  } else if (configState.color === '#2C5282') { // Navy Blue - Satin
                    mat.metalness = 0.3;
                    mat.roughness = 0.4;
                  } else if (configState.color === '#2D3748') { // Charcoal - Matte
                    mat.metalness = 0.1;
                    mat.roughness = 0.9;
                  } else if (configState.color === '#8B4513') { // Camo Brown - Satin
                    mat.metalness = 0.3;
                    mat.roughness = 0.4;
                  } else { // Custom color - Premium finish
                    mat.metalness = 0.2;
                    mat.roughness = 0.6;
                  }
                  
                  mat.needsUpdate = true;
                }
              });
            } else {
              if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                // Apply color and finish based on selection
                child.material.color.setHex(configState.color.replace('#', '0x'));
                
                // Apply finish based on color selection
                if (configState.color === '#4A5568') { // Military Green - Matte
                  child.material.metalness = 0.1;
                  child.material.roughness = 0.9;
                } else if (configState.color === '#D69E2E') { // Desert Tan - Satin
                  child.material.metalness = 0.3;
                  child.material.roughness = 0.4;
                } else if (configState.color === '#F7FAFC') { // Arctic White - Matte
                  child.material.metalness = 0.1;
                  child.material.roughness = 0.8;
                } else if (configState.color === '#2C5282') { // Navy Blue - Satin
                  child.material.metalness = 0.3;
                  child.material.roughness = 0.4;
                } else if (configState.color === '#2D3748') { // Charcoal - Matte
                  child.material.metalness = 0.1;
                  child.material.roughness = 0.9;
                } else if (configState.color === '#8B4513') { // Camo Brown - Satin
                  child.material.metalness = 0.3;
                  child.material.roughness = 0.4;
                } else { // Custom color - Premium finish
                  child.material.metalness = 0.2;
                  child.material.roughness = 0.6;
                }
                
                child.material.needsUpdate = true;
              }
            }
          }
        }
      });
    }
  }, [configState.color, scene, modelLoaded]);

  // Animation removed since we're using GLB models now

  // Animation code removed since we're using GLB models now
  // useEffect(() => {
  //   if (configState.isDeployed) {
  //     setCurrentDimensions({
  //       length: stowedDimensions.length + (deployedDimensions.length - stowedDimensions.length) * animationProgress,
  //       width: stowedDimensions.width + (deployedDimensions.width - stowedDimensions.width) * animationProgress,
  //       height: stowedDimensions.height + (deployedDimensions.height - stowedDimensions.height) * animationProgress
  //     });
  //   } else {
  //     setCurrentDimensions({
  //       length: deployedDimensions.length + (stowedDimensions.length - deployedDimensions.length) * animationProgress,
  //       width: deployedDimensions.width + (stowedDimensions.width - deployedDimensions.width) * animationProgress,
  //       height: deployedDimensions.height + (stowedDimensions.height - deployedDimensions.height) * animationProgress
  //     });
  //   }
  // }, [animationProgress, configState.isDeployed, deployedDimensions.height, deployedDimensions.length, deployedDimensions.width, stowedDimensions.height, stowedDimensions.length, stowedDimensions.width]);

  useFrame((state) => {
    if (groupRef.current && isAutoRotating) {
      // Auto-rotation only in demo mode
      groupRef.current.rotation.y += 0.01;
    }
    // No auto-rotation in normal mode - user controls only
  });

  // Get environment settings
  const getEnvironmentSettings = () => {
    switch (environment) {
      case 'night':
        return {
          ambientIntensity: 0.3,
          directionalIntensity: 0.4,
          environmentPreset: 'night' as const,
          groundColor: '#1a1a2e',
          skyColor: '#16213e'
        };
      case 'desert':
        return {
          ambientIntensity: 0.5,
          directionalIntensity: 0.9,
          environmentPreset: 'sunset' as const,
          groundColor: '#d4a574',
          skyColor: '#87ceeb'
        };
      case 'arctic':
        return {
          ambientIntensity: 0.5,
          directionalIntensity: 0.8,
          environmentPreset: 'dawn' as const,
          groundColor: '#f0f8ff',
          skyColor: '#e6f3ff'
        };
      case 'jungle':
        return {
          ambientIntensity: 0.5,
          directionalIntensity: 0.8,
          environmentPreset: 'forest' as const,
          groundColor: '#228b22',
          skyColor: '#98fb98'
        };
      default: // day
        return {
          ambientIntensity: 0.8,
          directionalIntensity: 1.2,
          environmentPreset: 'apartment' as const,
          groundColor: '#2d3748',
          skyColor: '#87ceeb'
        };
    }
  };

  const envSettings = getEnvironmentSettings();

    // Render the TRECC GLB model
  const renderTRECCModel = () => {
    if (!scene) {
      // Fallback to placeholder if GLB doesn't load
      return (
        <group ref={groupRef}>
          {configState.isDeployed ? (
            // Deployed placeholder
            <>
              <mesh position={[0, 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[8, 4, 2]} />
                <meshStandardMaterial 
                  color={configState.color} 
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              <mesh position={[0, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[8.2, 0.1, 2.2]} />
                <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Extended sections */}
              <mesh position={[-6, 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 4, 2]} />
                <meshStandardMaterial 
                  color={configState.color} 
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              <mesh position={[6, 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 4, 2]} />
                <meshStandardMaterial 
                  color={configState.color} 
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
            </>
          ) : (
            // Stowed placeholder
            <>
              <mesh position={[0, 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 4, 2]} />
                <meshStandardMaterial 
                  color={configState.color} 
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              <mesh position={[0, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[4.2, 0.1, 2.2]} />
                <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
              </mesh>
            </>
          )}
        </group>
      );
    }

    return (
      <group ref={groupRef}>
        {/* Clone the GLB scene with proper positioning and lighting */}
        <primitive 
          object={scene.clone()} 
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
        />
        

        

        
        {/* Per-model lighting removed to avoid overexposure (we light globally below) */}
        
        {/* Scale indicators */}
        {showScale && (
          <group>
            {/* Human figure for scale */}
            <mesh position={[5, 1.7, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 1.7, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            
            {/* Vehicle for scale */}
            <mesh position={[8, 1.5, 0]}>
              <boxGeometry args={[2, 1.5, 4]} />
              <meshStandardMaterial color="#2d3748" />
            </mesh>
          </group>
        )}
      </group>
    );
  };

  return (
    <>
      {/* Enhanced Lighting with User Controls */}
      <ambientLight intensity={lightingControls?.ambientIntensity ?? envSettings.ambientIntensity} />
      <directionalLight
        position={lightingControls?.lightPosition ?? [10, 10, 5]}
        intensity={lightingControls?.lightIntensity ?? envSettings.directionalIntensity}
        castShadow
        shadow-mapSize-width={lightingControls?.shadowMapSize ?? 2048}
        shadow-mapSize-height={lightingControls?.shadowMapSize ?? 2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={lightingControls?.shadowBias ?? -0.0001}
      />
      {/* Additional fill light */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.5}
        color="#ffffff"
      />
      {/* Rim light for better definition */}
      <directionalLight
        position={[0, 10, -10]}
        intensity={0.3}
        color="#ffffff"
      />
      
      {/* Contact shadows for realism */}
      <ContactShadows position={[0, -0.095, 0]} opacity={0.5} scale={60} blur={2.2} far={25} />

      {/* Realistic procedural sky and environment matching selected mode */}
      <Sky sunPosition={[100, 20, 100]} turbidity={6} rayleigh={1.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <Environment preset={envSettings.environmentPreset} background={false} />

      {/* Ground plane with subtle roughness */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={envSettings.groundColor} roughness={0.9} metalness={0} />
      </mesh>

      {/* TRECC-T Model */}
      {renderTRECCModel()}

      {/* Weather Effects */}
      {weatherEffects && (
        <WeatherEffects 
          type={weatherEffects.type}
          intensity={weatherEffects.intensity}
          windSpeed={weatherEffects.windSpeed}
        />
      )}

      {/* Enhanced Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.5}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        target={controlsTarget}
        dampingFactor={0.05}
        enableDamping={true}
        rotateSpeed={0.5}
        zoomSpeed={1.2}
        panSpeed={0.8}
      />
    </>
  );
};

export default ModelViewer;
