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
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #4facfe 75%, #00f2fe 100%)' }}>
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

/* ---------------- Loading ---------------- */
function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [stageIcon, setStageIcon] = useState('⚡');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 20) {
          setLoadingStage('Connecting to CloudFront CDN');
          setStageIcon('🌐');
          return prev + 1.5;
        } else if (prev < 50) {
          setLoadingStage('Downloading 3D model data');
          setStageIcon('📦');
          return prev + 0.8;
        } else if (prev < 80) {
          setLoadingStage('Processing geometry and textures');
          setStageIcon('🔧');
          return prev + 0.6;
        } else if (prev < 95) {
          setLoadingStage('Optimizing for display');
          setStageIcon('⚙️');
          return prev + 0.3;
        } else if (prev < 100) {
          setLoadingStage('Finalizing configuration');
          setStageIcon('✨');
          return prev + 0.2;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <Html center>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {/* Animated blurred background preview */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
          opacity: 0.4,
          animation: 'backgroundPulse 4s ease-in-out infinite'
        }} />
        
        {/* Additional animated overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(74, 144, 226, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
          animation: 'gradientShift 6s ease-in-out infinite'
        }} />
        
        {/* Loading overlay */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
          color: 'white',
          padding: '48px 40px',
          borderRadius: '24px',
          textAlign: 'center',
          fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          minWidth: '420px',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        {/* Weatherhaven branding */}
        <div style={{
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#94A3B8',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Weatherhaven
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#E2E8F0',
            letterSpacing: '-0.02em'
          }}>
            TRECC Configurator
          </div>
        </div>

        {/* Professional spinner */}
        <div style={{
          width: '72px',
          height: '72px',
          margin: '0 auto 32px',
          position: 'relative'
        }}>
          {/* Outer ring */}
          <div style={{
            width: '72px',
            height: '72px',
            border: '3px solid rgba(74, 144, 226, 0.15)',
            borderTop: '3px solid #4A90E2',
            borderRadius: '50%',
            animation: 'spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />
          {/* Middle ring */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '48px',
            height: '48px',
            border: '2px solid rgba(255, 107, 53, 0.15)',
            borderTop: '2px solid #FF6B35',
            borderRadius: '50%',
            animation: 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse'
          }} />
          {/* Inner dot */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            background: 'linear-gradient(135deg, #4A90E2 0%, #FF6B35 100%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        </div>
        
        {/* Large percentage display */}
        <div style={{
          fontSize: '56px',
          fontWeight: '800',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #4A90E2 0%, #FF6B35 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          textShadow: '0 0 30px rgba(74, 144, 226, 0.3)'
        }}>
          {Math.round(progress)}%
        </div>
        
        {/* Loading stage with icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '24px',
          color: '#E2E8F0'
        }}>
          <span style={{ fontSize: '20px' }}>{stageIcon}</span>
          <span>{loadingStage}</span>
        </div>

        {/* Enhanced progress bar */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(148, 163, 184, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4A90E2 0%, #FF6B35 100%)',
            borderRadius: '4px',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(74, 144, 226, 0.4)',
            position: 'relative'
          }}>
            {/* Progress bar shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
              animation: 'shimmer 2s ease-in-out infinite'
            }} />
          </div>
        </div>
        
        {/* Professional subtitle */}
        <p style={{ 
          margin: '0', 
          fontSize: '14px', 
          color: '#94A3B8',
          lineHeight: '1.5',
          fontWeight: '500'
        }}>
          Loading your 3D configuration experience
        </p>
        </div>
      </div>
    </Html>
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

      {/* Controls: LEFT = ROTATE, MIDDLE = ZOOM (no panning) */}
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
    if (modelPath.includes('Model_stowed_green') || modelPath.includes('Shelter_Stowed_DesertTan')) {
      // Both compressed models need the same orientation (no rotation)
      return new THREE.Euler(0, 0, 0); // No rotation needed
    } else if (modelPath.includes('Open_simplified')) {
      // Open model needs the same orientation as compressed models
      return new THREE.Euler(0, 0, 0); // No rotation needed
    } else {
      // Original tan model (trecc.glb) needs the original fix
      return new THREE.Euler(-Math.PI / 2, Math.PI, 0);
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
    return (
      <Html center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          border: '2px solid #4A90E2',
          boxShadow: '0 0 20px rgba(74, 144, 226, 0.3)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #333',
            borderTop: '3px solid #4A90E2',
            borderRadius: '50%',
            margin: '0 auto 15px auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{ 
            fontSize: '18px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4A90E2, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Loading model...
          </div>
        </div>
      </Html>
    );
  }

  // Show error state if AWS failed or model loading timeout
  if (hasError || modelLoadTimeout) {
    return (
      <Html center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '30px',
          borderRadius: '15px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          border: '2px solid #ff4444',
          boxShadow: '0 0 20px rgba(255, 68, 68, 0.3)'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '15px',
            color: '#ff4444'
          }}>
            ⚠
          </div>
          <div style={{ 
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            Model Loading Error
          </div>
          <div style={{
            fontSize: '14px',
            opacity: 0.8,
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            The 3D model failed to load. This could be due to a network issue or the model file being unavailable.<br/>
            Please try refreshing the page.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ff4444, #cc0000)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)'
            }}
          >
            🔄 Please Refresh
          </button>
        </div>
      </Html>
    );
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
