'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
  environment?: string;
  weather?: string;
  lighting?: any;
  background3D?: any;
}

// Simple Loading Component
const LoadingSpinner: React.FC = () => (
  <Html center>
    <div style={{ 
      color: 'white', 
      fontSize: '16px',
      textAlign: 'center'
    }}>
      Loading...
    </div>
  </Html>
);

// Simple Error Component
const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
  <Html center>
    <div style={{ 
      background: 'rgba(255, 0, 0, 0.8)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '200px'
    }}>
      <div>Error: {error}</div>
    </div>
  </Html>
);

// Simple Model Component
const Model: React.FC<{
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
}> = ({ modelPath, color, isDeployed }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<string | null>(null);

  // Load model
  let scene: THREE.Group | null = null;
  try {
    const result = useGLTF(modelPath);
    scene = result.scene;
  } catch (err) {
    setError(`Failed to load model: ${modelPath}`);
  }

  // Apply color if available
  useEffect(() => {
    if (scene && color) {
      const applyColor = (object: THREE.Object3D) => {
        if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.Material;
          
          if (material) {
            try {
              const newMaterial = material.clone();
              if (newMaterial instanceof THREE.MeshStandardMaterial || 
                  newMaterial instanceof THREE.MeshPhongMaterial ||
                  newMaterial instanceof THREE.MeshBasicMaterial) {
                newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
                newMaterial.needsUpdate = true;
              }
              mesh.material = newMaterial;
            } catch (err) {
              console.error('Material error:', err);
            }
          }
        }
        
        object.children.forEach(child => applyColor(child));
      };
      
      applyColor(scene);
    }
  }, [scene, color]);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!scene) {
    return <LoadingSpinner />;
  }

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={[0, 0, 0]}
      scale={isDeployed ? 1 : 0.8}
    />
  );
};

// Main Scene Component
export const ModelViewerScene: React.FC<ModelViewerProps> = ({
  modelPath,
  color = '#8B7355',
  isDeployed = false,
  environment = 'studio',
  weather = 'none',
  lighting = {},
  background3D = {}
}) => {
  return (
    <>
      {/* Basic Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        target={[0, 1, 0]}
      />

      {/* Basic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />

      {/* Simple Environment */}
      <Environment preset="studio" />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Main Model */}
      <Suspense fallback={<LoadingSpinner />}>
        <Model
          modelPath={modelPath}
          color={color}
          isDeployed={isDeployed}
        />
      </Suspense>
    </>
  );
};

// Preload models
useGLTF.preload('/models/trecc.glb');
useGLTF.preload('/models/trecc-open.glb');
