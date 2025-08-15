'use client';

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
  environment?: 'studio' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'city' | 'park' | 'lobby' | 'desert' | 'arctic' | 'jungle';
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

// Loading Spinner Component
const LoadingSpinner: React.FC = () => (
  <Html center>
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px'
      }} />
      <div>Loading 3D Model...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </Html>
);

// Error Display Component
const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
  <Html center>
    <div style={{ 
      background: 'rgba(255, 0, 0, 0.8)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '200px',
      maxWidth: '300px'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Failed to load model</div>
      <div style={{ fontSize: '12px', wordBreak: 'break-word' }}>{error}</div>
    </div>
  </Html>
);

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
      />
    </points>
  );
};

// Model Component with Error Boundary
const Model: React.FC<{
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
}> = ({ modelPath, color, isDeployed, onLoad, onError }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);

  // Load model with error handling
  useEffect(() => {
    let isMounted = true;
    
    const loadModel = async () => {
      try {
        console.log('🎯 Loading model:', modelPath);
        const result = useGLTF(modelPath);
        if (isMounted) {
          setScene(result.scene);
          setIsModelLoaded(true);
          onLoad?.();
        }
      } catch (error) {
        console.error('Model loading error:', error);
        if (isMounted) {
          const errorMessage = `Failed to load model: ${modelPath}`;
          setLoadError(errorMessage);
          onError?.(errorMessage);
        }
      }
    };

    loadModel();
    
    return () => {
      isMounted = false;
    };
  }, [modelPath, onLoad, onError]);

  // Clone scene safely
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    try {
      return scene.clone();
    } catch (error) {
      console.error('Scene cloning error:', error);
      return scene;
    }
  }, [scene]);

  // Apply color to shelter parts
  useEffect(() => {
    if (!clonedScene || !color) return;

    const coloredParts: string[] = [];
    const skippedParts: string[] = [];

    const applyColorToShelter = (object: THREE.Object3D) => {
      if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.Material;
        
        const objectName = mesh.name.toLowerCase();
        
        const isShelterBody = (
          /shelter|body|main|container|box|unit|cabin|pod/.test(objectName) ||
          /wall|panel|roof|floor|ceiling|side|end|front|back|top|bottom|surface|skin|hull|casing|enclosure|housing/.test(objectName) ||
          /interior|inner|inside|room|space|area|zone|volume|chamber|compartment/.test(objectName) ||
          /door|window|hatch|access|entry|exit|vent|port|opening/.test(objectName) ||
          /shell|cover|outer|external|primary|core|base|main|central/.test(objectName) ||
          /large|big|major|primary|main|central|body|structure/.test(objectName)
        );
        
        const isVehiclePart = (
          /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
          /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
          /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
          /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName) ||
          /frame|support|strut|brace|girder|beam|post|pillar|column|stud|joist|rafter|truss/.test(objectName) ||
          /joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset/.test(objectName) ||
          /reinforcement|stiffener|gusset|pleat|crease|fold|bracket|support|strut|brace/.test(objectName) ||
          /part|piece|component|element|section|module|block|plate|sheet|board|slab/.test(objectName) ||
          /tread|sidewall|bead|valve|stem|cap|cover|hubcap|center|spinner/.test(objectName)
        );
        
        if ((isShelterBody && !isVehiclePart) || (!isVehiclePart && coloredParts.length < 10)) {
          coloredParts.push(objectName);
          
          try {
            const newMaterial = material.clone();
            if (newMaterial instanceof THREE.MeshStandardMaterial || 
                newMaterial instanceof THREE.MeshPhongMaterial ||
                newMaterial instanceof THREE.MeshBasicMaterial) {
              newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
              newMaterial.needsUpdate = true;
            }
            mesh.material = newMaterial;
          } catch (error) {
            console.error('Material cloning error:', error);
          }
        } else {
          skippedParts.push(objectName);
          try {
            if (material) {
              mesh.material = material.clone();
            }
          } catch (error) {
            console.error('Material cloning error:', error);
          }
        }
      }
      
      object.children.forEach(child => applyColorToShelter(child));
    };

    if (clonedScene) {
      applyColorToShelter(clonedScene);
    }
  }, [clonedScene, color]);

  // Handle errors
  if (loadError) {
    return <ErrorDisplay error={loadError} />;
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

// Main ModelViewerScene Component
export const ModelViewerScene: React.FC<ModelViewerProps> = ({
  modelPath,
  color = '#8B7355',
  isDeployed = false,
  environment = 'studio',
  weather = 'none',
  lighting = {},
  background3D = {}
}) => {
  const { camera } = useThree();
  const [measurements, setMeasurements] = useState<MeasurementPoint[]>([]);
  const [showMeasurements, setShowMeasurements] = useState(false);

  // Environment preset mapping
  const getEnvironmentPreset = (env: string) => {
    switch (env) {
      case 'studio': return 'studio';
      case 'sunset': return 'sunset';
      case 'dawn': return 'dawn';
      case 'night': return 'night';
      case 'warehouse': return 'warehouse';
      case 'forest': return 'forest';
      case 'apartment': return 'apartment';
      case 'city': return 'city';
      case 'park': return 'park';
      case 'lobby': return 'lobby';
      case 'desert': return 'desert';
      case 'arctic': return 'arctic';
      case 'jungle': return 'jungle';
      case 'day': return 'sunset';
      default: return 'studio';
    }
  };

  // Lighting configuration
  const {
    lightPosition = [5, 5, 5],
    lightIntensity = 1,
    ambientIntensity = 0.4,
    sunPosition = [1, 1, 1],
    skyTurbidity = 10,
    skyRayleigh = 3,
    skyMieCoefficient = 0.005,
    skyMieDirectionalG = 0.8,
    sunColor = '#ffffff',
    ambientColor = '#404040',
    shadowQuality = 'medium',
    exposure = 1,
    gamma = 2.2
  } = lighting;

  // Shadow map size based on quality
  const shadowMapSize = shadowQuality === 'high' ? 4096 : shadowQuality === 'medium' ? 2048 : 1024;

  // Weather configuration
  const weatherIntensity = weather === 'none' ? 0 : 0.5;
  const windSpeed = weather === 'storm' ? 2 : weather === 'rain' ? 1 : 0.5;
  const windDirection: [number, number, number] = [0.1, 0, 0.1];

  // Background 3D elements
  const renderBackgroundElements = () => {
    const elements: React.ReactElement[] = [];
    
    if (background3D.type === 'desert') {
      // Add dunes and rocks
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(i * 1.5) * 15;
        const z = Math.cos(i * 1.5) * 15;
        elements.push(
          <Box key={`dune-${i}`} args={[3, 1, 2]} position={[x, 0.5, z]} rotation={[0, i * 0.5, 0]}>
            <meshStandardMaterial color="#D2B48C" roughness={0.8} />
          </Box>
        );
      }
    } else if (background3D.type === 'arctic') {
      // Add snow drifts and ice crystals
      for (let i = 0; i < 8; i++) {
        const x = Math.sin(i * 0.8) * 12;
        const z = Math.cos(i * 0.8) * 12;
        elements.push(
          <Box key={`snow-${i}`} args={[2, 0.5, 1.5]} position={[x, 0.25, z]} rotation={[0, i * 0.3, 0]}>
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </Box>
        );
      }
    }
    
    return elements;
  };

  return (
    <>
      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        target={[0, 1, 0]}
      />

      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight
        position={sunPosition}
        intensity={lightIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.3}
        color="#ffffff"
      />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color={background3D.type === 'desert' ? '#D2B48C' : background3D.type === 'arctic' ? '#FFFFFF' : '#404040'}
          roughness={background3D.type === 'desert' ? 0.8 : background3D.type === 'arctic' ? 0.3 : 0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Background 3D Elements */}
      {renderBackgroundElements()}

      {/* Weather Effects */}
      {weather !== 'none' && (
        <WeatherEffects
          type={weather}
          intensity={weatherIntensity}
          windSpeed={windSpeed}
          windDirection={windDirection}
        />
      )}

      {/* Main Model */}
      <Suspense fallback={<LoadingSpinner />}>
        <Model
          modelPath={modelPath}
          color={color}
          isDeployed={isDeployed}
          onLoad={() => console.log('✅ Model loaded successfully')}
          onError={(error) => console.error('❌ Model loading failed:', error)}
        />
      </Suspense>

      {/* Measurements */}
      {showMeasurements && measurements.map((point) => (
        <group key={point.id} position={point.position}>
          <Sphere args={[0.1]}>
            <meshBasicMaterial color="red" />
          </Sphere>
          <Text
            position={[0, 0.2, 0]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {point.label}
          </Text>
        </group>
      ))}
    </>
  );
};

// Preload models
useGLTF.preload('/models/trecc.glb');
useGLTF.preload('/models/trecc-open.glb');
