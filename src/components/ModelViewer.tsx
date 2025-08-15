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
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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
    if (!clonedScene || !color) return;

    const coloredParts: string[] = [];
    const skippedParts: string[] = [];

    const applyColorToShelter = (object: THREE.Object3D) => {
      if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.Material;
        
        // Get the full hierarchy path to better identify parts
        const getObjectPath = (obj: THREE.Object3D): string => {
          const path: string[] = [];
          let current = obj;
          while (current && current.name) {
            path.unshift(current.name.toLowerCase());
            current = current.parent || {} as THREE.Object3D;
          }
          return path.join('/');
        };
        
        const objectName = mesh.name.toLowerCase();
        const objectPath = getObjectPath(mesh);
        
        // VERY AGGRESSIVE shelter detection - color almost everything except wheels/trailer
        const isLikelyShelterBody = (
          // Main shelter body keywords (very broad)
          /shelter|body|main|container|box|unit|cabin|pod|module|section|part|piece|component|element/.test(objectName) ||
          // Shelter structure parts (very broad)
          /wall|panel|roof|floor|ceiling|side|end|front|back|top|bottom|surface|skin|hull|casing|enclosure|housing|cover|lid|cap/.test(objectName) ||
          // Shelter frame parts (but be careful with vehicle frame)
          /frame|structure|support|brace|girder|beam|post|pillar|column|stud|joist|rafter|truss/.test(objectName) ||
          // Shelter interior parts
          /interior|inner|inside|room|space|area|zone|volume|chamber|compartment|section|bay/.test(objectName) ||
          // Shelter access parts
          /door|window|hatch|access|entry|exit|vent|port|opening|aperture|hole|gap/.test(objectName) ||
          // Shelter connection parts
          /joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset/.test(objectName) ||
          // Shelter reinforcement parts
          /reinforcement|stiffener|gusset|pleat|crease|fold|bracket|support|strut|brace/.test(objectName) ||
          // Generic parts that are likely shelter (very broad)
          /part|piece|component|element|section|module|block|plate|sheet|board|slab/.test(objectName) ||
          // Material-based detection (if it's not metal/vehicle parts)
          /plastic|fiber|composite|fabric|cloth|canvas|vinyl|rubber|foam|insulation/.test(objectName)
        );
        
        // VERY SPECIFIC: Never color these parts (blacklist approach)
        const isDefinitelyNotShelter = (
          // Vehicle parts (very specific)
          /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
          /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
          /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
          /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|bracket|support|strut|wire|cable/.test(objectName) ||
          // Check parent names too
          /wheel|tire|tyre|rim|hub|axle|suspension|chassis|trailer|truck|vehicle|engine|motor/.test(objectPath) ||
          // Check if it's part of a wheel/trailer hierarchy
          objectPath.includes('wheel') || objectPath.includes('tire') || objectPath.includes('trailer') ||
          objectPath.includes('chassis') || objectPath.includes('suspension') || objectPath.includes('axle') ||
          objectPath.includes('engine') || objectPath.includes('motor') || objectPath.includes('transmission')
        );
        
        // Color if it's likely a shelter body part AND definitely not a vehicle part
        if (isLikelyShelterBody && !isDefinitelyNotShelter) {
          console.log(`🎨 Coloring shelter part: ${objectName} (path: ${objectPath})`);
          coloredParts.push(`${objectName} (${objectPath})`);
          
          // Create new material to avoid sharing
          const newMaterial = material.clone();
          if (newMaterial instanceof THREE.MeshStandardMaterial || 
              newMaterial instanceof THREE.MeshPhongMaterial ||
              newMaterial instanceof THREE.MeshBasicMaterial) {
            newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
            newMaterial.needsUpdate = true;
          }
          mesh.material = newMaterial;
        } else if (!isDefinitelyNotShelter) {
          // FALLBACK: If it's not definitely a vehicle part, color it (in case shelter parts have unusual names)
          console.log(`🎨 Coloring fallback part: ${objectName} (path: ${objectPath})`);
          coloredParts.push(`${objectName} (${objectPath}) - FALLBACK`);
          
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
          // For all other parts, just clone the material to avoid sharing but keep original colors
          if (material) {
            mesh.material = material.clone();
            if (isDefinitelyNotShelter) {
              console.log(`🚫 Skipping vehicle part: ${objectName} (path: ${objectPath})`);
              skippedParts.push(`${objectName} (${objectPath})`);
            } else {
              console.log(`❓ Unclassified part: ${objectName} (path: ${objectPath})`);
            }
          }
        }
      }
      
      // Recursively apply to children
      object.children.forEach(child => applyColorToShelter(child));
    };

    applyColorToShelter(clonedScene);
    
    // Log summary
    console.log(`🎨 Color application complete:`);
    console.log(`   - Colored parts: ${coloredParts.length}`);
    console.log(`   - Skipped vehicle parts: ${skippedParts.length}`);
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
        <div className="model-error">
          <div className="error-icon">⚠️</div>
          <div className="error-text">Failed to load model</div>
          <div className="error-details">{loadError}</div>
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
  color = '#d2b48c',
  isDeployed = true,
  environment = 'day',
  weather = 'none',
  lighting = {}
}) => {
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
      
      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Additional sun light for better illumination */}
      <directionalLight
        position={sunPosition}
        intensity={0.3}
        color="#ffffff"
      />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color={environment === 'desert' ? '#d2b48c' : 
                 environment === 'arctic' ? '#ffffff' : 
                 environment === 'jungle' ? '#228B22' : '#2a2a2a'} 
        />
      </mesh>

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
