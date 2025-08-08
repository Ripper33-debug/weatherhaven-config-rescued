import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

// Preload both TRECC models
useGLTF.preload('/models/trecc.glb');
useGLTF.preload('/models/trecc-open.glb');

interface ModelViewerProps {
  configState: ConfiguratorState;
  onModelLoaded: () => void;
  shelter: Shelter;
  isAutoRotating?: boolean;
  environment?: 'day' | 'night' | 'desert' | 'arctic' | 'jungle';
  showScale?: boolean;
  showParticles?: boolean;
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
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the GLB model based on deployment state
  const modelPath = configState.isDeployed ? '/models/trecc-open.glb' : '/models/trecc.glb';
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
          ambientIntensity: 0.2,
          directionalIntensity: 0.3,
          environmentPreset: 'night' as const,
          groundColor: '#1a1a2e',
          skyColor: '#16213e'
        };
      case 'desert':
        return {
          ambientIntensity: 0.8,
          directionalIntensity: 1.5,
          environmentPreset: 'sunset' as const,
          groundColor: '#d4a574',
          skyColor: '#87ceeb'
        };
      case 'arctic':
        return {
          ambientIntensity: 0.6,
          directionalIntensity: 0.8,
          environmentPreset: 'dawn' as const,
          groundColor: '#f0f8ff',
          skyColor: '#e6f3ff'
        };
      case 'jungle':
        return {
          ambientIntensity: 0.4,
          directionalIntensity: 0.6,
          environmentPreset: 'forest' as const,
          groundColor: '#228b22',
          skyColor: '#98fb98'
        };
      default: // day
        return {
          ambientIntensity: 0.6,
          directionalIntensity: 1.2,
          environmentPreset: 'sunset' as const,
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
        
        {/* Color overlay for GLB models */}
        <mesh position={[0, 0, 0]} visible={false}>
          <boxGeometry args={[20, 20, 20]} />
          <meshStandardMaterial 
            color={configState.color}
            transparent
            opacity={0.1}
          />
        </mesh>
        
        {/* Add ambient lighting to prevent black appearance */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
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
      {/* Enhanced Lighting */}
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
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <pointLight position={[10, -10, 10]} intensity={0.3} />

      {/* Environment */}
      <Environment preset={envSettings.environmentPreset} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={envSettings.groundColor} />
      </mesh>

      {/* TRECC-T Model */}
      {renderTRECCModel()}

      {/* Enhanced Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        target={[0, 1, 0]}
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
