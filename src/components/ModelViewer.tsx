'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { ModelViewerSceneProps, TreccModelProps, ReadyInfo } from '../types';
import { getModelUrl } from '../lib/aws';

/** Full-page viewer wrapper */
export default function ModelViewer() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'transparent' }}>
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        performance={{ min: 0.8 }}
        gl={{ 
          antialias: false, 
          alpha: false, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <Suspense fallback={null}>
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
  isInteriorView,
  environment, 
  weather, 
  lighting, 
  background3D,
  onModelReady,
  onColorApplied
}: ModelViewerSceneProps) {
  console.log('🎨 ModelViewerScene received color:', color);
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 1.5, 0));
  
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

      {/* Controls: Different settings for interior vs exterior view */}
      <OrbitControls
        ref={controlsRef}
        enablePan={isInteriorView}
        enableZoom={!isInteriorView}
        enableRotate
        enableDamping
        dampingFactor={0.1}
        zoomSpeed={1.0}
        rotateSpeed={0.8}
        minPolarAngle={isInteriorView ? -Math.PI / 6 : -10 * Math.PI / 180}
        maxPolarAngle={isInteriorView ? Math.PI / 3 : Math.PI / 2}
        minDistance={isInteriorView ? 0.5 : 3}
        maxDistance={isInteriorView ? 8 : 15}
        target={isInteriorView ? new THREE.Vector3(0, 1.5, 4) : cameraTarget.current}
      />

      {/* Lights */}
      <ambientLight intensity={lighting?.ambientIntensity || 0.35} />
      <directionalLight
        position={[lighting?.sunPosition?.x || 6, lighting?.sunPosition?.y || 10, lighting?.sunPosition?.z || 6]}
        intensity={lighting?.directionalIntensity || 1.2}
        castShadow={false}
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


/* ---------------- Scene ---------------- */
function Scene({ color = '#3C3B2E' }: { color?: string }) {
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 1.5, 0));

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

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.1}
        zoomSpeed={1.0}
        rotateSpeed={0.8}
        minPolarAngle={-10 * Math.PI / 180}
        maxPolarAngle={Math.PI / 2}
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
        modelPath="trecc.glb"
        color={color}
        onReady={({ center, radius }) => {
          // Update camera target to model center
          cameraTarget.current.copy(center);
          if (controlsRef.current) {
            controlsRef.current.target.copy(center);
            controlsRef.current.update();
          }
        }}
        onColorApplied={() => {}}
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
  const [actualModelPath, setActualModelPath] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [modelLoadTimeout, setModelLoadTimeout] = useState(false);
  
  // Get AWS URL for the model
  useEffect(() => {
    const loadModelUrl = async () => {
      try {
        const filename = modelPath || 'trecc.glb';
        console.log('🎨 Loading model:', filename);
        console.log('🎨 Model URL will be:', `https://d3kx2t94cz9q1y.cloudfront.net/${filename}`);
        
        // Add timeout for large models (especially green model at 528MB)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Model loading timeout')), 60000); // 60 second timeout
        });
        
        const urlPromise = getModelUrl(filename);
        const awsUrl = await Promise.race([urlPromise, timeoutPromise]) as string;
        
        setActualModelPath(awsUrl);
        console.log('🎨 Using AWS model URL:', awsUrl);
      } catch (error) {
        console.error('❌ AWS failed for model:', modelPath, error);
        console.error('❌ Error details:', error);
        
        // If compressed model fails, try fallback to original
        if (modelPath?.includes('Model_stowed_green-v1')) {
          console.log('🔄 Compressed green model failed, trying fallback to original...');
          try {
            const fallbackUrl = await getModelUrl('Model_stowed_green.glb');
            setActualModelPath(fallbackUrl);
            console.log('✅ Fallback to original green model successful');
            return;
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
          }
        }
        
        // If compressed tan model fails, try fallback to original
        if (modelPath?.includes('Shelter_Stowed_DesertTan-v1')) {
          console.log('🔄 Compressed tan model failed, trying fallback to original...');
          try {
            const fallbackUrl = await getModelUrl('trecc.glb');
            setActualModelPath(fallbackUrl);
            console.log('✅ Fallback to original tan model successful');
            return;
          } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
          }
        }
        
        setHasError(true);
        setActualModelPath(null);
      }
    };
    
    loadModelUrl();
  }, [modelPath]);
  
  // Always call hooks in the same order - use a fallback URL for useGLTF
  const fallbackUrl = 'https://d3kx2t94cz9q1y.cloudfront.net/trecc.glb';
  const modelUrl = actualModelPath || fallbackUrl;
  
  const gltf = useGLTF(modelUrl, true) as any; // Use draco compression if available
  
  // Debug model loading
  useEffect(() => {
    if (gltf) {
      console.log('🎨 GLTF loaded successfully:', modelUrl);
      console.log('🎨 GLTF scene:', gltf.scene);
      console.log('🎨 GLTF children count:', gltf.scene?.children?.length);
    } else {
      console.log('🎨 GLTF still loading:', modelUrl);
    }
  }, [gltf, modelUrl]);
  
  // Set timeout for model loading
  useEffect(() => {
    if (actualModelPath && !gltf) {
      const timeout = setTimeout(() => {
        console.log('⏰ Model loading timeout - showing error');
        setModelLoadTimeout(true);
      }, 10000); // 10 second timeout
      
      return () => clearTimeout(timeout);
    }
  }, [actualModelPath, gltf]);
  
  const scene = useMemo<THREE.Group | null>(() => {
    if (!gltf) return null;
    
    return gltf?.scene?.clone(true) ?? null;
  }, [gltf]);
  
  // Debug scene creation
  useEffect(() => {
    if (scene) {
      console.log('🎨 Scene created successfully:', scene);
      console.log('🎨 Scene children:', scene.children.length);
    } else {
      console.log('🎨 Scene not created yet');
    }
  }, [scene]);

  // Orientation/Grounding constants - different fixes for different models
  const getRotationFix = (modelPath: string) => {
    if (
      modelPath.includes('Green_stowed') ||
      modelPath.includes('Shelter_Stowed_DesertTan') ||
      modelPath.includes('arctic_white_closed') ||
      modelPath.includes('Shelter_desert_tan_open') ||
      modelPath.includes('green_open') ||
      modelPath.includes('arctic_white_open') ||
      modelPath.includes('Green_Open_Interior') ||
      modelPath.includes('Model_stowed_green') ||
      modelPath.includes('_desert_tan_open') ||
      modelPath.includes('Open_simplified')
    ) {
      // All S3 models should stand upright - no rotation needed
      return new THREE.Euler(0, 0, 0);
    } else {
      // Default fallback - no rotation
      return new THREE.Euler(0, 0, 0);
    }
  };

  // Once loaded, fix orientation, center it, then sit it on the ground (y=0).
  useEffect(() => {
    if (!scene) return;

    // Performance optimization: reduce polygon count for large models
    if (modelPath?.includes('Model_stowed_green')) {
      console.log('🎨 Optimizing large green model for performance...');
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
          // Reduce material complexity
          if (child.material) {
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
          }
        }
      });
    }

    // 1) Apply rotation fix BEFORE measuring
    const rotationFix = getRotationFix(modelPath || '');
    scene.rotation.copy(rotationFix);

    // 2) Center the model at the origin
    let box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // 3) Recompute and raise so it sits on y=0
    box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.5;
    scene.position.y += -box.min.y;

    // Notify parent about bounds/center (for camera target)
    onReady?.({ center: new THREE.Vector3(0, size.y * 0.5, 0), radius });
  }, [scene, onReady]);

  // Apply color to the model
  useEffect(() => {
    console.log('🎨 Color effect triggered - scene:', !!scene, 'color:', color);
    
    if (!scene || !color) {
      console.log('🎨 Color effect skipped - scene:', !!scene, 'color:', color);
      return;
    }

    // Apply color immediately without timeout
    applyBodyColor(scene, color);
    onColorApplied?.();
  }, [scene, color, onColorApplied]);

  // Show loading state while getting AWS URL
  if (actualModelPath === null) {
    return null; // no overlay/spinner during model URL resolution
  }

  // Show error state if AWS failed or model loading timeout
  if (hasError || modelLoadTimeout) {
    return null; // fail silently without overlay
  }

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
}

/* ---------------- Colour helper ---------------- */
function applyBodyColor(root: THREE.Object3D, hex: string) {
  console.log('🎨 applyBodyColor called with:', hex);
  console.log('🎨 Root object:', root);

  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Look for materials that might be the body/shell
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              // Only change materials that look like they could be the body
              if (mat.name.toLowerCase().includes('body') || 
                  mat.name.toLowerCase().includes('shell') ||
                  mat.name.toLowerCase().includes('main') ||
                  mat.name.toLowerCase().includes('frame') ||
                  mat.name === '' || // Default material name
                  mat.color.getHex() === 0x3c3b2e) { // Current default color
                console.log('🎨 Changing material color:', mat.name, 'to', hex);
                mat.color.setHex(parseInt(hex.replace('#', ''), 16));
                mat.needsUpdate = true;
              }
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          // Single material
          if (child.material.name.toLowerCase().includes('body') || 
              child.material.name.toLowerCase().includes('shell') ||
              child.material.name.toLowerCase().includes('main') ||
              child.material.name.toLowerCase().includes('frame') ||
              child.material.name === '' ||
              child.material.color.getHex() === 0x3c3b2e) {
            console.log('🎨 Changing material color:', child.material.name, 'to', hex);
            child.material.color.setHex(parseInt(hex.replace('#', ''), 16));
            child.material.needsUpdate = true;
          }
        }
      }
    }
  });
}

// Model caching
const modelCache = new Map<string, any>();

function cacheModel(url: string, gltf: any) {
  modelCache.set(url, gltf);
  console.log('🎨 Cached model:', url);
}
