'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;
  interiorPath?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  showAnnotations?: boolean;
  showMeasurements?: boolean;
  explodedView?: boolean;
  autoRotate?: boolean;
  color?: string;
  isDeployed?: boolean;
  environment?: 'day' | 'night' | 'desert' | 'arctic' | 'jungle';
  weather?: 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog';
  lighting?: {
    lightPosition?: [number, number, number];
    lightIntensity?: number;
    ambientIntensity?: number;
    sunPosition?: [number, number, number];
    skyTurbidity?: number;
    skyRayleigh?: number;
    skyMieCoefficient?: number;
    skyMieDirectionalG?: number;
    sunColor?: string;
    ambientColor?: string;
    shadowQuality?: 'low' | 'medium' | 'high';
    exposure?: number;
    gamma?: number;
  };
  background3D?: {
    type?: 'studio' | 'outdoor' | 'military' | 'desert' | 'arctic' | 'urban';
    groundTexture?: 'concrete' | 'grass' | 'sand' | 'snow' | 'asphalt';
    skybox?: 'day' | 'night' | 'sunset' | 'storm' | 'clear';
    fog?: {
      enabled?: boolean;
      density?: number;
      color?: string;
    };
  };
}

interface MeasurementPoint {
  id: string;
  position: [number, number, number];
  label: string;
  distance?: number;
}

interface Annotation {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  type: 'info' | 'warning' | 'error';
}

// Loading Component with Animation
const LoadingSpinner: React.FC = () => (
  <Html center>
    <div className="model-loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-text">
        <span className="loading-title">Loading TRECC Model</span>
        <span className="loading-subtitle">Initializing 3D environment...</span>
      </div>
      <div className="loading-progress">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  </Html>
);

// Enhanced Model Component with Zoom to Fit
const Model: React.FC<{
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
}> = ({ modelPath, color, isDeployed, onLoad, onError }) => {
  console.log('🎯 Model component loading:', modelPath);
  const meshRef = useRef<THREE.Group>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Add error handling for model loading
  let scene: THREE.Group | undefined;
  try {
    const result = useGLTF(modelPath);
    scene = result.scene;
  } catch (error) {
    console.error('Model loading error:', error);
    setLoadError(`Failed to load model: ${modelPath}`);
    onError?.(`Failed to load model: ${modelPath}`);
  }

  // Clone the scene to avoid sharing materials
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const clone = scene.clone();
    return clone;
  }, [scene]);

  useEffect(() => {
    if (clonedScene) {
      setIsModelLoaded(true);
      onLoad?.();
    }
  }, [clonedScene, onLoad]);

  useEffect(() => {
    if (loadError) {
      onError?.(loadError);
    }
  }, [loadError, onError]);

  // Apply color to shelter body parts (exclude wheels/trailer)
  useEffect(() => {
    console.log('🎨 Color effect triggered:', { color, hasScene: !!clonedScene });
    if (!clonedScene || !color) {
      console.log('❌ No scene or color, skipping color application');
      return;
    }

    const coloredParts: string[] = [];
    const skippedParts: string[] = [];

    const applyColorToShelter = (object: THREE.Object3D) => {
      if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.Material;
        
        const objectName = mesh.name.toLowerCase();
        
        // MORE AGGRESSIVE: Color parts that could be shelter body
        const isShelterBody = (
          // Main shelter body keywords
          /shelter|body|main|container|box|unit|cabin|pod/.test(objectName) ||
          // Shelter structure parts
          /wall|panel|roof|floor|ceiling|side|end|front|back|top|bottom|surface|skin|hull|casing|enclosure|housing/.test(objectName) ||
          // Shelter interior parts
          /interior|inner|inside|room|space|area|zone|volume|chamber|compartment/.test(objectName) ||
          // Shelter access parts
          /door|window|hatch|access|entry|exit|vent|port|opening/.test(objectName) ||
          // Additional shelter-like parts
          /shell|cover|outer|external|primary|core|base|main|central/.test(objectName) ||
          // Generic large parts that are likely shelter
          /large|big|major|primary|main|central|body|structure/.test(objectName)
        );
        
        // VERY COMPREHENSIVE: Exclude all vehicle and mechanical parts
        const isVehiclePart = (
          // All vehicle parts
          /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
          /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
          /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
          /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName) ||
          // Additional vehicle/mechanical parts
          /frame|support|strut|brace|girder|beam|post|pillar|column|stud|joist|rafter|truss/.test(objectName) ||
          /joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset/.test(objectName) ||
          /reinforcement|stiffener|gusset|pleat|crease|fold|bracket|support|strut|brace/.test(objectName) ||
          // Generic parts that could be vehicle
          /part|piece|component|element|section|module|block|plate|sheet|board|slab/.test(objectName) ||
          // Additional wheel/tire related terms
          /tread|sidewall|bead|valve|stem|cap|cover|hubcap|center|spinner/.test(objectName)
        );
        
        // Color if it's likely shelter body AND not definitely a vehicle part
        // OR if it's not a vehicle part (more aggressive fallback)
        if ((isShelterBody && !isVehiclePart) || (!isVehiclePart && coloredParts.length < 10)) {
          console.log(`🎨 Coloring shelter part: ${objectName} (${isShelterBody ? 'shelter' : 'fallback'})`);
          coloredParts.push(objectName);
          
          // Create new material to avoid sharing
          const newMaterial = material.clone();
          if (newMaterial instanceof THREE.MeshStandardMaterial || 
              newMaterial instanceof THREE.MeshPhongMaterial ||
              newMaterial instanceof THREE.MeshBasicMaterial) {
            newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
            newMaterial.needsUpdate = true;
          }
          mesh.material = newMaterial;
        } else {
          console.log(`🚫 Skipping part: ${objectName} (${isShelterBody ? 'shelter' : 'not shelter'}, ${isVehiclePart ? 'vehicle' : 'not vehicle'})`);
          skippedParts.push(objectName);
          // Clone material to avoid sharing but keep original colors
          if (material) {
            mesh.material = material.clone();
          }
        }
      }
      
      // Recursively apply to children
      object.children.forEach(child => applyColorToShelter(child));
    };

    // First, let's see what parts are in the model
    const allParts: string[] = [];
    const traverseModel = (object: THREE.Object3D) => {
      if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
        allParts.push(object.name);
      }
      object.children.forEach(child => traverseModel(child));
    };
    traverseModel(clonedScene);
    console.log('🔍 All parts in model:', allParts);
    
    applyColorToShelter(clonedScene);
    
    // Log summary
    console.log(`🎨 Color application complete:`);
    console.log(`   - Colored parts: ${coloredParts.length}`);
    console.log(`   - Skipped parts: ${skippedParts.length}`);
    if (coloredParts.length === 0) {
      console.log(`⚠️  No parts were colored! Check if the model has the expected part names.`);
      console.log(`🔍 Try changing colors to see if any parts respond.`);
    } else {
      console.log(`✅ Successfully colored ${coloredParts.length} parts`);
    }
  }, [clonedScene, color]);

  if (loadError) {
    return (
      <Html center>
        <div style={{ 
          background: 'rgba(255, 0, 0, 0.8)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center',
          minWidth: '200px'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Failed to load model</div>
          <div style={{ fontSize: '12px' }}>{loadError}</div>
        </div>
      </Html>
    );
  }

  if (!clonedScene) {
    return <LoadingSpinner />;
  }

  return (
    <primitive 
      ref={meshRef}
      object={clonedScene} 
      position={[0, 0, 0]}
      scale={isDeployed ? 1 : 0.8}
    />
  );
};

// Weather Effects Component
const WeatherEffects: React.FC<{
  type: 'rain' | 'snow' | 'dust' | 'storm' | 'fog';
  intensity: number;
  windSpeed: number;
  windDirection: [number, number, number];
}> = ({ type, intensity, windSpeed, windDirection }) => {
  console.log('🌧️ WeatherEffects props:', { type, intensity, windSpeed, windDirection });
  const particlesRef = useRef<THREE.Points>(null);
  const [particles, setParticles] = useState<THREE.Vector3[]>([]);

  // Generate particles based on weather type
  useEffect(() => {
    const particleCount = Math.floor(intensity * 1000);
    const newParticles: THREE.Vector3[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 20
        )
      );
    }
    
    setParticles(newParticles);
  }, [intensity]);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particles.length; i++) {
        const i3 = i * 3;
        
        // Move particles down
        positions[i3 + 1] -= windSpeed * 0.1;
        
        // Add wind effect
        positions[i3] += windDirection[0] * windSpeed * 0.05;
        positions[i3 + 2] += windDirection[2] * windSpeed * 0.05;
        
        // Reset particles that fall below ground
        if (positions[i3 + 1] < -0.5) {
          positions[i3 + 1] = Math.random() * 10 + 5;
          positions[i3] = (Math.random() - 0.5) * 20;
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (particles.length === 0) return null;

  const getParticleColor = () => {
    switch (type) {
      case 'rain': return '#87CEEB';
      case 'snow': return '#FFFFFF';
      case 'dust': return '#D2B48C';
      case 'storm': return '#4A4A4A';
      case 'fog': return '#CCCCCC';
      default: return '#FFFFFF';
    }
  };

  const getParticleSize = () => {
    switch (type) {
      case 'rain': return 0.05;
      case 'snow': return 0.1;
      case 'dust': return 0.02;
      case 'storm': return 0.08;
      case 'fog': return 0.15;
      default: return 0.05;
    }
  };

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(particles.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={getParticleSize()}
        color={getParticleColor()}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Camera Controller with Zoom to Fit
const CameraController: React.FC<{
  onZoomToFit: (fn: () => void) => void;
  onResetView: (fn: () => void) => void;
  autoRotate?: boolean;
}> = ({ onZoomToFit, onResetView, autoRotate = false }) => {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);

  const zoomToFit = () => {
    if (!scene || !camera) return;

    // Calculate bounding box of the scene
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Calculate optimal camera distance
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;

    // Set camera position
    camera.position.set(
      center.x + cameraDistance * 0.5,
      center.y + cameraDistance * 0.3,
      center.z + cameraDistance * 0.5
    );

    // Look at center
    camera.lookAt(center);

    // Update controls target
    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }

    // Trigger smooth animation
    if (controlsRef.current) {
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
    }
  };

  const resetView = () => {
    if (!camera) return;

    // Reset to default position
    camera.position.set(0, 0.2, 6);
    camera.lookAt(0, 0, 0);

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Expose functions to parent
  useEffect(() => {
    onZoomToFit(() => zoomToFit);
    onResetView(() => resetView);
  }, [onZoomToFit, onResetView]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.05}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      maxDistance={20}
      minDistance={1}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
    />
  );
};

// Main ModelViewer Scene Component (no Canvas)
const ModelViewerScene: React.FC<ModelViewerProps> = ({
  modelPath,
  interiorPath,
  onLoad,
  onError,
  showAnnotations = false,
  showMeasurements = false,
  explodedView = false,
  autoRotate = false,
  color = '#8B7355',
  isDeployed = true,
  environment = 'day',
  weather = 'none',
  lighting = {}
}) => {
  console.log('🌍 ModelViewerScene props:', { color, environment, weather, lighting, modelPath, isDeployed });
  const [zoomToFitFn, setZoomToFitFn] = useState<(() => void) | null>(null);
  const [resetViewFn, setResetViewFn] = useState<(() => void) | null>(null);

  const handleModelLoad = () => {
    onLoad?.();
  };

  // Get environment preset based on environment prop
  const getEnvironmentPreset = () => {
    switch (environment) {
      case 'night': return 'night';
      case 'desert': return 'sunset';
      case 'arctic': return 'dawn';
      case 'jungle': return 'forest';
      case 'day': return 'sunset';
      default: return 'sunset';
    }
  };

  // Get lighting settings
  const {
    lightPosition = [10, 10, 5],
    lightIntensity = 1.2,
    ambientIntensity = 0.6,
    sunPosition = [100, 20, 100],
    skyTurbidity = 6,
    skyRayleigh = 1.5,
    skyMieCoefficient = 0.005,
    skyMieDirectionalG = 0.8
  } = lighting;

  return (
    <>
      {/* Environment */}
      <Environment preset={getEnvironmentPreset()} />
      
      {/* Enhanced Lighting System */}
      <ambientLight intensity={ambientIntensity} color={lighting.ambientColor || "#87CEEB"} />
      
      {/* Main Sun Light with Shadows */}
      <directionalLight
        position={sunPosition}
        intensity={lightIntensity}
        color={lighting.sunColor || "#ffffff"}
        castShadow
        shadow-mapSize-width={lighting.shadowQuality === 'high' ? 4096 : lighting.shadowQuality === 'medium' ? 2048 : 1024}
        shadow-mapSize-height={lighting.shadowQuality === 'high' ? 4096 : lighting.shadowQuality === 'medium' ? 2048 : 1024}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />

      {/* Fill Light for better illumination */}
      <directionalLight
        position={[lightPosition[0] * -0.5, lightPosition[1], lightPosition[2] * -0.5]}
        intensity={lightIntensity * 0.3}
        color="#ffffff"
      />

      {/* Enhanced 3D Environment */}
      {/* Ground Plane with Texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color={environment === 'desert' ? '#d2b48c' : 
                 environment === 'arctic' ? '#ffffff' : 
                 environment === 'jungle' ? '#228B22' : 
                 environment === 'night' ? '#1a1a1a' : '#2a2a2a'}
          roughness={environment === 'desert' ? 0.8 : 
                     environment === 'arctic' ? 0.3 : 
                     environment === 'jungle' ? 0.6 : 0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Environment-specific 3D Elements */}
      {environment === 'desert' && (
        <>
          {/* Desert Dunes */}
          {Array.from({ length: 8 }, (_, i) => {
            const seed = i * 123.456; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 20) % 40 - 20;
            const z = (Math.cos(seed) * 20) % 40 - 20;
            const size = (Math.sin(seed * 2) + 1) * 1.5 + 2;
            return (
              <mesh key={`dune-${i}`} position={[x, -0.3, z]} receiveShadow>
                <sphereGeometry args={[size, 8, 6]} />
                <meshStandardMaterial color="#d2b48c" roughness={0.9} />
              </mesh>
            );
          })}
          {/* Desert Rocks */}
          {Array.from({ length: 5 }, (_, i) => {
            const seed = i * 789.012; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 15) % 30 - 15;
            const z = (Math.cos(seed) * 15) % 30 - 15;
            const sizeX = (Math.sin(seed * 2) + 1) * 1 + 0.5;
            const sizeY = (Math.cos(seed * 3) + 1) * 0.5 + 0.3;
            const sizeZ = (Math.sin(seed * 4) + 1) * 1 + 0.5;
            return (
              <mesh key={`rock-${i}`} position={[x, -0.2, z]} receiveShadow castShadow>
                <boxGeometry args={[sizeX, sizeY, sizeZ]} />
                <meshStandardMaterial color="#8B7355" roughness={0.8} />
              </mesh>
            );
          })}
        </>
      )}

      {environment === 'arctic' && (
        <>
          {/* Snow Drifts */}
          {Array.from({ length: 6 }, (_, i) => {
            const seed = i * 456.789; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 15) % 30 - 15;
            const z = (Math.cos(seed) * 15) % 30 - 15;
            const size = (Math.sin(seed * 2) + 1) * 1 + 1;
            return (
              <mesh key={`snow-${i}`} position={[x, -0.2, z]} receiveShadow>
                <sphereGeometry args={[size, 8, 6]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
            );
          })}
          {/* Ice Crystals */}
          {Array.from({ length: 10 }, (_, i) => {
            const seed = i * 321.654; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 20) % 40 - 20;
            const y = (Math.cos(seed * 2) + 1) * 1.5 + 0.5;
            const z = (Math.cos(seed) * 20) % 40 - 20;
            const height = (Math.sin(seed * 3) + 1) * 1 + 1;
            return (
              <mesh key={`ice-${i}`} position={[x, y, z]} receiveShadow>
                <boxGeometry args={[0.1, height, 0.1]} />
                <meshStandardMaterial color="#E0FFFF" transparent opacity={0.7} />
              </mesh>
            );
          })}
        </>
      )}

      {environment === 'jungle' && (
        <>
          {/* Jungle Trees */}
          {Array.from({ length: 12 }, (_, i) => {
            const seed = i * 654.321; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 20) % 40 - 20;
            const z = (Math.cos(seed) * 20) % 40 - 20;
            return (
              <group key={`tree-${i}`} position={[x, 0, z]}>
                {/* Tree Trunk */}
                <mesh receiveShadow castShadow>
                  <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
                  <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
                {/* Tree Foliage */}
                <mesh position={[0, 3, 0]} receiveShadow castShadow>
                  <sphereGeometry args={[2, 8, 6]} />
                  <meshStandardMaterial color="#228B22" roughness={0.6} />
                </mesh>
              </group>
            );
          })}
          {/* Jungle Ground Cover */}
          {Array.from({ length: 20 }, (_, i) => {
            const seed = i * 987.654; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 20) % 40 - 20;
            const z = (Math.cos(seed) * 20) % 40 - 20;
            const size = (Math.sin(seed * 2) + 1) * 0.25 + 0.3;
            return (
              <mesh key={`bush-${i}`} position={[x, -0.1, z]} receiveShadow>
                <sphereGeometry args={[size, 6, 4]} />
                <meshStandardMaterial color="#32CD32" roughness={0.7} />
              </mesh>
            );
          })}
        </>
      )}

      {environment === 'night' && (
        <>
          {/* Night Sky Elements */}
          {Array.from({ length: 50 }, (_, i) => {
            const seed = i * 147.258; // Stable seed for consistent positioning
            const x = (Math.sin(seed) * 50) % 100 - 50;
            const y = (Math.cos(seed * 2) + 1) * 10 + 10;
            const z = (Math.cos(seed) * 50) % 100 - 50;
            return (
              <mesh key={`star-${i}`} position={[x, y, z]}>
                <sphereGeometry args={[0.05, 4, 4]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
              </mesh>
            );
          })}
          {/* Moon */}
          <mesh position={[15, 15, 15]} receiveShadow>
            <sphereGeometry args={[2, 16, 16]} />
            <meshStandardMaterial color="#F0F8FF" emissive="#F0F8FF" emissiveIntensity={0.2} />
          </mesh>
        </>
      )}

      {/* Model */}
      <Model
        modelPath={modelPath}
        color={color}
        isDeployed={isDeployed}
        onLoad={handleModelLoad}
        onError={onError}
        // Removed onDebugInfo prop as per edit hint
      />

      {/* Camera Controller */}
      <CameraController
        onZoomToFit={(fn) => setZoomToFitFn(() => fn)}
        onResetView={(fn) => setResetViewFn(() => fn)}
        autoRotate={autoRotate}
      />

      {/* Weather Effects */}
      {weather !== 'none' && (
        <WeatherEffects 
          type={weather} 
          intensity={0.5}
          windSpeed={1.0}
          windDirection={[0, 0, 1]}
        />
      )}
    </>
  );
};

// Wrapper component that provides Canvas if needed
const ModelViewer: React.FC<ModelViewerProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [zoomToFitFn, setZoomToFitFn] = useState<(() => void) | null>(null);
  const [resetViewFn, setResetViewFn] = useState<(() => void) | null>(null);

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const handleModelLoad = () => {
    setIsLoading(false);
    setLoadProgress(100);
    props.onLoad?.();
  };

  const handleZoomToFit = () => {
    if (zoomToFitFn) {
      zoomToFitFn();
    }
  };

  const handleResetView = () => {
    if (resetViewFn) {
      resetViewFn();
    }
  };

  return (
    <div className="model-viewer-container">
      <Canvas
        camera={{ position: [0, 0.2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        shadows
      >
        <ModelViewerScene
          {...props}
          onLoad={handleModelLoad}
        />
      </Canvas>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button 
          className="zoom-btn zoom-fit-btn"
          onClick={handleZoomToFit}
          disabled={isLoading}
          title="Zoom to Fit Model"
        >
          <span className="btn-icon">🔍</span>
          <span className="btn-text">Fit</span>
        </button>
        <button 
          className="zoom-btn zoom-reset-btn"
          onClick={handleResetView}
          disabled={isLoading}
          title="Reset View"
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">Reset</span>
        </button>
      </div>

      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner-large">
              <div className="spinner-ring-large"></div>
              <div className="spinner-ring-large"></div>
              <div className="spinner-ring-large"></div>
            </div>
            <div className="loading-text-large">
              <span className="loading-title-large">Loading TRECC Configuration</span>
              <span className="loading-subtitle-large">Preparing 3D environment...</span>
            </div>
            <div className="loading-progress-large">
              <div className="progress-bar-large">
                <div 
                  className="progress-fill-large"
                  style={{ width: `${loadProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">{Math.round(loadProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
export { ModelViewerScene };
