import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

// Preload the TRECC model
useGLTF.preload('/models/trecc.glb');

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the GLB model
  const { scene, nodes, materials } = useGLTF('/models/trecc.glb');
  
  // TRECC-T dimensions from blueprint (converted from inches to feet)
  const deployedDimensions = {
    length: 14.3, // 171.4 inches
    width: 7.1,   // 85.4 inches  
    height: 7.9   // 94.3 inches
  };
  
  const stowedDimensions = {
    length: 7.0,  // 84.0 inches
    width: 7.1,   // 85.4 inches
    height: 4.8   // 57.0 inches
  };

  // Animation state for smooth transitions
  const [currentDimensions, setCurrentDimensions] = useState(stowedDimensions);

  useEffect(() => {
    // Model is loaded when GLTF is ready
    if (scene && !modelLoaded) {
      setModelLoaded(true);
      onModelLoaded();
    }
  }, [scene, modelLoaded, onModelLoaded]);

  // Smooth animation for deploy/stow transitions
  useEffect(() => {
    setIsAnimating(true);
    setAnimationProgress(0);
    
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedProgress = easeInOutCubic(progress);
      
      setAnimationProgress(easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    animate();
  }, [configState.isDeployed]);

  // Update current dimensions based on animation progress
  useEffect(() => {
    if (configState.isDeployed) {
      setCurrentDimensions({
        length: stowedDimensions.length + (deployedDimensions.length - stowedDimensions.length) * animationProgress,
        width: stowedDimensions.width + (deployedDimensions.width - stowedDimensions.width) * animationProgress,
        height: stowedDimensions.height + (deployedDimensions.height - stowedDimensions.height) * animationProgress
      });
    } else {
      setCurrentDimensions({
        length: deployedDimensions.length + (stowedDimensions.length - deployedDimensions.length) * animationProgress,
        width: deployedDimensions.width + (stowedDimensions.width - deployedDimensions.width) * animationProgress,
        height: deployedDimensions.height + (stowedDimensions.height - deployedDimensions.height) * animationProgress
      });
    }
  }, [animationProgress, configState.isDeployed, deployedDimensions.height, deployedDimensions.length, deployedDimensions.width, stowedDimensions.height, stowedDimensions.length, stowedDimensions.width]);

  useFrame((state) => {
    if (groupRef.current && isAutoRotating && !isAnimating) {
      // Auto-rotation for demo mode
      groupRef.current.rotation.y += 0.01;
    } else if (groupRef.current && !isAnimating) {
      // Gentle rotation when not animating
      groupRef.current.rotation.y += 0.002;
    }
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
      return null;
    }

    return (
      <group ref={groupRef}>
        {/* Clone the GLB scene */}
        <primitive 
          object={scene.clone()} 
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
        />
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
        minDistance={3}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        target={[0, currentDimensions.height/2, 0]}
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
