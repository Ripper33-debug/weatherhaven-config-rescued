import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    // Simulate model loading
    const timer = setTimeout(() => {
      onModelLoaded();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onModelLoaded]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation animation
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Create TRECC-T shelter geometry based on actual dimensions
  const createTRECCShelter = () => {
    const currentDimensions = configState.isDeployed ? deployedDimensions : stowedDimensions;
    
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

        {/* Deployable sections - only when deployed */}
        {configState.isDeployed && (
          <>
            {/* Left wing extension */}
            <mesh 
              position={[-deployedDimensions.length/2 - 2, deployedDimensions.height/2, 0]} 
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[4, deployedDimensions.height, deployedDimensions.width]} />
              <meshStandardMaterial 
                color={configState.color} 
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
            
            {/* Right wing extension */}
            <mesh 
              position={[deployedDimensions.length/2 + 2, deployedDimensions.height/2, 0]} 
              castShadow 
              receiveShadow
            >
              <boxGeometry args={[4, deployedDimensions.height, deployedDimensions.width]} />
              <meshStandardMaterial 
                color={configState.color} 
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>

            {/* HVAC ducts */}
            <mesh position={[0, deployedDimensions.height/2, deployedDimensions.width/2 + 0.5]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, deployedDimensions.height - 1, 8]} />
              <meshStandardMaterial color="#4a5568" metalness={0.5} roughness={0.5} />
            </mesh>
            
            <mesh position={[0, deployedDimensions.height/2, -deployedDimensions.width/2 - 0.5]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, deployedDimensions.height - 1, 8]} />
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
          <mesh position={[0, stowedDimensions.height/2, stowedDimensions.width/2 - 0.05]}>
            <boxGeometry args={[stowedDimensions.length - 0.5, stowedDimensions.height - 0.5, 0.1]} />
            <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
          </mesh>
        )}
      </group>
    );
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* TRECC-T Model */}
      {createTRECCShelter()}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2}
        target={[0, configState.isDeployed ? 4 : 2.5, 0]}
      />
    </>
  );
};

export default ModelViewer;
