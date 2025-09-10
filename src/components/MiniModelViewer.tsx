'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MiniModelViewerProps {
  modelPath: string;
  color?: string;
}

function MiniModel({ modelPath, color }: { modelPath: string; color?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Get AWS URL for the model
  const awsUrl = `https://d3kx2t94cz9q1y.cloudfront.net/${modelPath}`;
  
  try {
    // Use useGLTF hook to load the model
    const { scene } = useGLTF(awsUrl);

    // Auto-rotate the model
    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5; // Slow rotation
      }
    });

    return (
      <group ref={meshRef} scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]}>
        <primitive object={scene.clone()} />
      </group>
    );
  } catch (error) {
    // Fallback to a simple cube if model loading fails
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
    );
  }
}

function MiniScene({ modelPath, color }: MiniModelViewerProps) {
  return (
    <>
      {/* Camera */}
      <perspectiveCamera makeDefault position={[0, 0, 3]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* Model */}
      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4A90E2" />
        </mesh>
      }>
        <MiniModel modelPath={modelPath} color={color} />
      </Suspense>
    </>
  );
}

export default function MiniModelViewer({ modelPath, color }: MiniModelViewerProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1]}
      >
        <MiniScene modelPath={modelPath} color={color} />
      </Canvas>
    </div>
  );
}
