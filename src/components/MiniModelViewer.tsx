'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MiniModelViewerProps {
  modelPath: string;
  color?: string;
}

function MiniModel({ modelPath, color }: { modelPath: string; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [gltf, setGltf] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Auto-rotate the model
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Slow rotation
    }
  });

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Get AWS URL for the model
        const awsUrl = `https://d3kx2t94cz9q1y.cloudfront.net/${modelPath}`;
        console.log('🎨 Loading mini model:', modelPath, 'from:', awsUrl);
        
        // Load the model
        const loader = new THREE.GLTFLoader();
        const gltfData = await loader.loadAsync(awsUrl);
        
        setGltf(gltfData);
        setLoading(false);
        console.log('🎨 Mini model loaded successfully');
      } catch (err) {
        console.error('🎨 Mini model loading error:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadModel();
  }, [modelPath]);

  if (loading) {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
    );
  }

  if (error || !gltf) {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    );
  }

  return (
    <primitive 
      ref={meshRef}
      object={gltf.scene.clone()} 
      scale={[0.8, 0.8, 0.8]}
      position={[0, 0, 0]}
    />
  );
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
