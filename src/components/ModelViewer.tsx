import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

interface ModelViewerProps {
  configState: ConfiguratorState;
  onModelLoaded: () => void;
  shelter: Shelter;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ configState, onModelLoaded, shelter }) => {
  const groupRef = useRef<Group>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
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
    // Simulate model loading
    const timer = setTimeout(() => {
      onModelLoaded();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onModelLoaded]);

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
  }, [animationProgress, configState.isDeployed]);

  useFrame((state) => {
    if (groupRef.current && !isAnimating) {
      // Gentle rotation when not animating
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Create TRECC-T shelter geometry with smooth animations
  const createTRECCShelter = () => {
    const wingExtension = configState.isDeployed ? 2 * animationProgress : 2 * (1 - animationProgress);
    
    return (
      <group ref={groupRef}>
        {/* Main shelter body */}
        <mesh position={[0, currentDimensions.height/2, 0]} castShadow receiveShadow>
          <boxGeometry args={[currentDimensions.length, currentDimensions.height, currentDimensions.width]} />
          <meshStandardMaterial 
            color={configState.color} 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Roof with solar panels */}
        <mesh position={[0, currentDimensions.height, 0]} castShadow receiveShadow>
          <boxGeometry args={[currentDimensions.length + 0.2, 0.1, currentDimensions.width + 0.2]} />
          <meshStandardMaterial 
            color="#2d3748" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Solar panels on roof */}
        <mesh position={[0, currentDimensions.height + 0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[currentDimensions.length - 1, 0.05, currentDimensions.width - 1]} />
          <meshStandardMaterial 
            color="#1a202c" 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Deployable sections - animated */}
        {configState.isDeployed && (
          <>
            {/* Left wing extension */}
            <mesh 
              position={[-currentDimensions.length/2 - wingExtension, currentDimensions.height/2, 0]} 
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[4, currentDimensions.height, currentDimensions.width]} />
              <meshStandardMaterial 
                color={configState.color} 
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
            
            {/* Right wing extension */}
            <mesh 
              position={[currentDimensions.length/2 + wingExtension, currentDimensions.height/2, 0]} 
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[4, currentDimensions.height, currentDimensions.width]} />
              <meshStandardMaterial 
                color={configState.color} 
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>

            {/* HVAC ducts */}
            <mesh position={[0, currentDimensions.height/2, currentDimensions.width/2 + 0.5]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, currentDimensions.height - 1, 8]} />
              <meshStandardMaterial color="#4a5568" metalness={0.5} roughness={0.5} />
            </mesh>
            
            <mesh position={[0, currentDimensions.height/2, -currentDimensions.width/2 - 0.5]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, currentDimensions.height - 1, 8]} />
              <meshStandardMaterial color="#4a5568" metalness={0.5} roughness={0.5} />
            </mesh>
          </>
        )}

        {/* Interior view elements */}
        {configState.isInsideView && (
          <group>
            {/* Interior walls */}
            <mesh position={[0, currentDimensions.height/2, 0]}>
              <boxGeometry args={[currentDimensions.length - 0.2, currentDimensions.height - 0.2, currentDimensions.width - 0.2]} />
              <meshStandardMaterial 
                color="#f0f0f0" 
                transparent
                opacity={0.1}
              />
            </mesh>
            
            {/* Floor */}
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[currentDimensions.length - 0.2, 0.1, currentDimensions.width - 0.2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* 55" Display */}
            <mesh position={[0, currentDimensions.height/2, currentDimensions.width/2 - 0.1]}>
              <boxGeometry args={[4, 2.5, 0.1]} />
              <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Deployable desks */}
            <mesh position={[-currentDimensions.length/4, 1.5, 0]}>
              <boxGeometry args={[2, 0.1, currentDimensions.width - 1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            
            <mesh position={[currentDimensions.length/4, 1.5, 0]}>
              <boxGeometry args={[2, 0.1, currentDimensions.width - 1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Electrical panel */}
            <mesh position={[currentDimensions.length/2 - 0.5, currentDimensions.height/2, 0]}>
              <boxGeometry args={[0.5, 2, 1]} />
              <meshStandardMaterial color="#2d3748" />
            </mesh>

            {/* Air conditioner */}
            <mesh position={[0, currentDimensions.height/2, -currentDimensions.width/2 + 0.5]}>
              <boxGeometry args={[1, 1, 0.5]} />
              <meshStandardMaterial color="#4a5568" />
            </mesh>
          </group>
        )}

        {/* Cargo door (when stowed) */}
        {!configState.isDeployed && (
          <mesh position={[0, currentDimensions.height/2, currentDimensions.width/2 - 0.05]}>
            <boxGeometry args={[currentDimensions.length - 0.5, currentDimensions.height - 0.5, 0.1]} />
            <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
          </mesh>
        )}
      </group>
    );
  };

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
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
      <Environment preset="sunset" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* TRECC-T Model */}
      {createTRECCShelter()}

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
