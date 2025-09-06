'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { ModelViewerSceneProps, TreccModelProps, ReadyInfo } from '../types';

/** Full-page viewer wrapper */
export default function ModelViewer() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #4facfe 75%, #00f2fe 100%)' }}>
      <Canvas shadows>
        <Suspense fallback={<Loading />}>
          <Scene color="#3C3B2E" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Scene component for use in ShelterConfigurator */
export function ModelViewerScene({ 
  modelPath, 
  color, 
  isDeployed, 
  environment, 
  weather, 
  lighting, 
  background3D,
  onModelReady,
  onColorApplied
}: ModelViewerSceneProps) {
  console.log('🎨 ModelViewerScene received color:', color);
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 1.5, 0)); // Set target above ground plane
  
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={60} near={0.1} far={200} />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8} 
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false} // Disable panning to prevent going under
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        zoomSpeed={1}
        rotateSpeed={0.9}
        minPolarAngle={0} // 0 degrees from top (can go straight up)
        maxPolarAngle={Math.PI / 2} // 90 degrees from top (horizontal, can't go down)
        minDistance={3}
        maxDistance={15}
        target={cameraTarget.current}
      />

      {/* Lights */}
      <ambientLight intensity={lighting?.ambientIntensity || 0.35} />
      <directionalLight
        position={[lighting?.sunPosition?.x || 6, lighting?.sunPosition?.y || 10, lighting?.sunPosition?.z || 6]}
        intensity={lighting?.directionalIntensity || 1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment reflections */}
      <Environment preset="sunset" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#2a2f3a" roughness={0.9} metalness={0} />
      </mesh>

      {/* Model */}
      <TreccModel
        modelPath={modelPath}
        color={color}
        onReady={({ center, radius }) => {
          onModelReady?.();
        }}
        onColorApplied={onColorApplied}
      />
    </>
  );
}

/* ---------------- UI ---------------- */
function Loading() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing...');
  
  React.useEffect(() => {
    const stages = [
      { text: 'Loading model file...', progress: 20 },
      { text: 'Processing geometry...', progress: 40 },
      { text: 'Loading textures...', progress: 60 },
      { text: 'Applying materials...', progress: 80 },
      { text: 'Finalizing...', progress: 100 }
    ];
    
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setStage(stages[currentStage].text);
        setProgress(stages[currentStage].progress);
        currentStage++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        fontSize: 16, 
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '10px',
        minWidth: '300px'
      }}>
        <div style={{ marginBottom: '10px' }}>{stage}</div>
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
          {progress}%
        </div>
      </div>
    </Html>
  );
}

/* ---------------- Scene ---------------- */
function Scene({ color = '#3C3B2E' }: { color?: string }) {
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 1.5, 0)); // Set target above ground plane

  // Lighting defaults
  const ambientIntensity = 0.35;
  const directionalIntensity = 1.2;
  const sun = { x: 6, y: 10, z: 6 };

  // Update controls target once model tells us where its center is
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(cameraTarget.current);
      controlsRef.current.update();
    }
  }, []);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={60} near={0.1} far={200} />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8} 
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Controls: LEFT = ROTATE, MIDDLE = ZOOM (no panning) */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false} // Disable panning to prevent going under
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        zoomSpeed={1}
        rotateSpeed={0.9}
        minPolarAngle={0} // 0 degrees from top (can go straight up)
        maxPolarAngle={Math.PI / 2} // 90 degrees from top (horizontal, can't go down)
        minDistance={3}
        maxDistance={15}
        target={cameraTarget.current}
      />

      {/* Lights */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[sun.x, sun.y, sun.z]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment reflections */}
      <Environment preset="sunset" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#2a2f3a" roughness={0.9} metalness={0} />
      </mesh>

      {/* Model */}
      <TreccModel
        modelPath="/models/trecc.glb"
        color={color}
        onReady={({ center, radius }) => {
          // Center camera target and frame the model nicely
          cameraTarget.current.copy(center);
          if (controlsRef.current) {
            controlsRef.current.target.copy(center);
            controlsRef.current.update();
          }
        }}
      />
    </>
  );
}

/* ---------------- Model (trecc.glb) ---------------- */

function TreccModel({
  modelPath,
  color,
  onReady,
  onColorApplied,
}: TreccModelProps) {
  const path = modelPath || '/models/trecc.glb';
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Loading model...');
  
  const gltf = useGLTF(path) as any; // Suspense handles loading
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Model loaded:', path, 'gltf:', !!gltf, 'scene:', !!gltf?.scene);
  }
  const scene = useMemo<THREE.Group | null>(() => {
    if (!gltf) return null;
    
    // Cache the loaded model for future use
    cacheModel(path, gltf);
    
    // Simulate progressive loading stages
    setLoadingStage('Processing geometry...');
    setLoadingProgress(50);
    
    setTimeout(() => {
      setLoadingStage('Applying materials...');
      setLoadingProgress(75);
    }, 100);
    
    setTimeout(() => {
      setLoadingStage('Finalizing...');
      setLoadingProgress(100);
    }, 200);
    
    return gltf?.scene?.clone(true) ?? null;
  }, [gltf]);

  // Orientation/Grounding constants
  // If the model is still on its side, swap which axis you fix below (X/Z).
  const ROTATE_FIX = new THREE.Euler(-Math.PI / 2, Math.PI, 0); // rotate -90° around X to lay flat, 180° around Y to face opposite direction

  // Once loaded, fix orientation, center it, then sit it on the ground (y=0).
  useEffect(() => {
    if (!scene) return;

    // 1) Apply rotation fix BEFORE measuring
    scene.rotation.copy(ROTATE_FIX);

    // 2) Center the model at the origin
    let box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center); // move so origin is center

    // 3) Recompute and raise so it sits on y=0
    box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.5;
    scene.position.y += -box.min.y; // push up so bottom touches ground

    // Notify parent about bounds/center (for camera target)
    onReady?.({ center: new THREE.Vector3(0, size.y * 0.5, 0), radius });
  }, [scene, onReady]);

  // Conservative paint (only "body/shell" words; avoids wheels/chassis)
  useEffect(() => {
    console.log('🎨 Color effect triggered - scene:', !!scene, 'color:', color);
    
    if (!scene || !color) {
      console.log('🎨 Color effect skipped - scene:', !!scene, 'color:', color);
      return;
    }
    
    console.log('🎨 Applying color to model:', color);
    console.log('🎨 Scene object:', scene);
    console.log('🎨 Scene children count:', scene.children.length);
    
    // Apply color immediately without timeout to see if that's the issue
    applyBodyColor(scene, color);
    onColorApplied?.();
  }, [scene, color]);

  if (!scene) return null;
  return <primitive object={scene} castShadow receiveShadow />;
}

// Caching system for faster subsequent loads
const CACHE_KEY = 'weatherhaven-models-cache';
const CACHE_VERSION = '1.0';

// Simple cache management
const cacheModel = (url: string, data: any) => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[url] = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Model cached:', url);
    }
  } catch (error) {
    console.warn('⚠️ Failed to cache model:', error);
  }
};

const getCachedModel = (url: string) => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const cached = cache[url];
    if (cached && cached.version === CACHE_VERSION) {
      // Check if cache is less than 24 hours old
      if (Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Loading from cache:', url);
        }
        return cached.data;
      }
    }
  } catch (error) {
    console.warn('⚠️ Failed to read cache:', error);
  }
  return null;
};

// Preload the single model we use with caching
useGLTF.preload('/models/trecc.glb');
useGLTF.preload('/models/interiors/CommandPosting.glb');

/* ---------------- Colour helper ---------------- */
function applyBodyColor(root: THREE.Object3D, hex: string) {
  console.log('🎨 applyBodyColor called with:', hex);
  console.log('🎨 Root object:', root);
  console.log('🎨 Root type:', root.type);
  
  const paint = new THREE.Color(hex);
  let meshCount = 0;
  let coloredCount = 0;
  
  // SIMPLIFIED: Color ALL meshes for debugging
  root.traverse((o: any) => {
    if (!o.isMesh) return;
    meshCount++;
    
    console.log(`🎨 Mesh ${meshCount}: "${o.name}" (${o.material?.name || 'no material'})`);
    
    coloredCount++;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach((m: any, i: number) => {
      if (!m) return;
      
      console.log(`🎨 Coloring material ${i} for mesh "${o.name}":`, m.type, 'color:', m.color?.getHexString());
      
      // Create new material to ensure color change
      const newMat = new THREE.MeshStandardMaterial({
        color: paint,
        metalness: 0.25,
        roughness: 0.6,
        envMapIntensity: 0.3,
        transparent: m.transparent,
        opacity: m.opacity,
        map: m.map,
        normalMap: m.normalMap,
        roughnessMap: m.roughnessMap,
        metalnessMap: m.metalnessMap,
        envMap: m.envMap
      });
      
      if (Array.isArray(o.material)) {
        o.material[i] = newMat;
      } else {
        o.material = newMat;
      }
      
      console.log(`🎨 Applied color ${paint.getHexString()} to mesh "${o.name}"`);
    });
  });
  
  console.log(`🎨 Color application complete: ${coloredCount}/${meshCount} meshes colored`);
}
