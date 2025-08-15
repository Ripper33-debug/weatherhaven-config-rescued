'use client';

import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
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
  const [currentModelPath, setCurrentModelPath] = useState<string>('');

  // Load model with better error handling
  let scene: THREE.Group | null = null;
  let loadError: string | null = null;
  
  try {
    console.log('📁 Attempting to load model:', modelPath);
    const result = useGLTF(modelPath);
    scene = result.scene;
    console.log('✅ Model loaded successfully:', modelPath);
  } catch (err) {
    console.error('❌ Failed to load model:', modelPath, err);
    loadError = `Failed to load model: ${modelPath}`;
  }

  // Track when model path changes
  React.useEffect(() => {
    console.log('🔄 ModelViewer useEffect triggered');
    console.log('📁 Model path:', modelPath);
    console.log('🎨 Color:', color);
    console.log('🚀 Is deployed:', isDeployed);
    console.log('🏠 Is interior view:', modelPath.includes('interior'));
    
    if (modelPath !== currentModelPath) {
      console.log('🔄 Model path changed from:', currentModelPath, 'to:', modelPath);
      setCurrentModelPath(modelPath);
    }
  }, [modelPath, currentModelPath]);

  // Apply color to shelter ONLY (very specific)
  React.useEffect(() => {
    if (scene && color) {
      const timer = setTimeout(() => {
        console.log('⏰ Applying color after delay...');
        console.log('🎨 Target color:', color);
        console.log('📁 Current model path:', modelPath);
        
        const applyColorToShelter = (scene: THREE.Object3D) => {
          const coloredParts: string[] = [];
          const skippedParts: string[] = [];
          
          console.log('🔍 Starting color application...');
          console.log('🎨 Target color:', color);
          
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              const mesh = object as THREE.Mesh;
              const objectName = mesh.name.toLowerCase();
              const material = mesh.material;
              
              console.log(`🔍 Processing object: ${objectName}`);
              
              // ULTRA specific: ONLY color the shelter box - be extremely restrictive
              const isShelterBox = (
                /shelter|body|main|container|box|unit|cabin|pod/.test(objectName) ||
                /wall|panel|roof|floor|ceiling|side|end|front|back|top|bottom|surface|skin|hull|casing|enclosure|housing/.test(objectName) ||
                /interior|inner|inside|room|space|area|zone|volume|chamber|compartment/.test(objectName) ||
                /door|window|hatch|access|entry|exit|vent|port|opening/.test(objectName) ||
                /shell|cover|outer|external|primary|core|base|main|central/.test(objectName) ||
                /large|big|major|primary|main|central|body|structure/.test(objectName)
              );

              // Exclude ALL vehicle, trailer, and mechanical parts - be extremely comprehensive
              const isVehiclePart = (
                /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
                /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
                /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
                /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName) ||
                /tread|sidewall|bead|valve|stem|cap|cover|hubcap|center|spinner/.test(objectName) ||
                /jockey|jack|stand|support|leg|foot|base/.test(objectName) ||
                /drawbar|hitch|coupling|connection/.test(objectName) ||
                /leaf|spring|suspension|shock|absorber/.test(objectName) ||
                /frame|rail|beam|girder|crossmember/.test(objectName) ||
                /trailer|chassis|undercarriage|running|gear/.test(objectName) ||
                /trailer|chassis|frame|rail|beam|girder|crossmember|support|leg|foot|base|stand|jack/.test(objectName) ||
                /trailer|chassis|undercarriage|running|gear|transmission|engine|motor|brake|drum|disc|caliper/.test(objectName) ||
                /trailer|chassis|suspension|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
                /trailer|chassis|wheel|tire|tyre|rim|hub|axle|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
                /trailer|chassis|drawbar|hitch|coupling|connection|jockey|jack|stand|support|leg|foot|base/.test(objectName) ||
                /trailer|chassis|frame|rail|beam|girder|crossmember|support|leg|foot|base|stand|jack|wheel|tire|axle|suspension|spring|shock|strut|link|arm|bracket|mount|bushing|bearing|drawbar|hitch|coupling|connection|jockey|undercarriage|running|gear|vehicle|carriage|transmission|engine|motor|brake|drum|disc|caliper|fender|mudflap|mudguard|rim|hub|spoke|lug|valve|tread|sidewall|bead|stem|cap|cover|hubcap|center|spinner|nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName)
              );
              
              console.log(`🔍 isVehiclePart: ${isVehiclePart} for ${objectName}`);
              
              // SIMPLIFIED LOGIC: Color everything EXCEPT trailer/vehicle parts
              if (!isVehiclePart) {
                // Additional check: make sure it's not ANY kind of trailer or vehicle part
                const isAnyTrailerPart = /trailer|chassis|frame|rail|beam|girder|crossmember|support|leg|foot|base|stand|jack|wheel|tire|axle|suspension|spring|shock|strut|link|arm|bracket|mount|bushing|bearing|drawbar|hitch|coupling|connection|jockey|undercarriage|running|gear|vehicle|carriage|transmission|engine|motor|brake|drum|disc|caliper|fender|mudflap|mudguard|rim|hub|spoke|lug|valve|tread|sidewall|bead|stem|cap|cover|hubcap|center|spinner|nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName);
                
                // EXTRA check: make sure it's not ANY wheel-related part
                const isAnyWheelPart = /wheel|tire|tyre|rim|hub|axle|spoke|lug|valve|tread|sidewall|bead|stem|cap|cover|hubcap|center|spinner/.test(objectName);
                
                console.log(`🔍 isAnyTrailerPart: ${isAnyTrailerPart}, isAnyWheelPart: ${isAnyWheelPart} for ${objectName}`);
                
                if (!isAnyTrailerPart && !isAnyWheelPart) {
                  coloredParts.push(objectName);
                  
                  if (material && !Array.isArray(material)) {
                    try {
                      const newMaterial = material.clone();
                      if (newMaterial instanceof THREE.MeshStandardMaterial || 
                          newMaterial instanceof THREE.MeshPhongMaterial ||
                          newMaterial instanceof THREE.MeshBasicMaterial) {
                        newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
                        // More realistic material properties
                        if (newMaterial instanceof THREE.MeshStandardMaterial) {
                          newMaterial.roughness = 0.7; // Slightly rough for realistic paint
                          newMaterial.metalness = 0.0; // No metalness for paint
                          newMaterial.envMapIntensity = 0.3; // Subtle environment reflection
                        }
                        newMaterial.needsUpdate = true;
                        console.log(`🎨 Applied realistic color ${color} to: ${objectName}`);
                      }
                      mesh.material = newMaterial;
                    } catch (err) {
                      console.error('Material error:', err);
                    }
                  }
                } else {
                  skippedParts.push(objectName);
                  console.log(`🚫 Skipped trailer/wheel part: ${objectName}`);
                }
              } else {
                skippedParts.push(objectName);
                console.log(`🚫 Skipped vehicle part: ${objectName}`);
                // Keep original material for vehicle parts
                if (material && !Array.isArray(material)) {
                  try {
                    mesh.material = material.clone();
                  } catch (err) {
                    console.error('Material error:', err);
                  }
                }
              }
            }
          });
          
          console.log('📊 Color application summary:');
          console.log('✅ Colored parts:', coloredParts);
          console.log('🚫 Skipped parts:', skippedParts);
        };
        
        if (scene) {
          applyColorToShelter(scene);
        }
        
        console.log('🎯 Color being applied:', color);
      }, 100); // Small delay to ensure model is loaded

      return () => clearTimeout(timer);
    }
  }, [scene, color, modelPath, isDeployed]); // Added isDeployed to dependencies

  if (loadError) {
    return <ErrorDisplay error={loadError} />;
  }

  if (!scene) {
    return <LoadingSpinner />;
  }

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={[0, 0, 0]}
      scale={1} // Keep same scale for both deployed and undeployed
    />
  );
};

// Main Scene Component
export const ModelViewerScene: React.FC<ModelViewerProps> = ({
  modelPath,
  color = '#D2B48C',
  isDeployed = false,
  environment = 'studio',
  weather = 'none',
  lighting = {},
  background3D = {}
}) => {
  // Use lighting props or defaults
  const ambientIntensity = lighting.ambientIntensity ?? 0.3;
  const directionalIntensity = lighting.directionalIntensity ?? 1.2;
  const sunPosition = lighting.sunPosition ?? { x: 5, y: 8, z: 5 };

  // Check if this is interior view
  const isInteriorView = modelPath.includes('interior');

  return (
    <>
      {/* Camera with different positions for interior vs exterior */}
      <PerspectiveCamera
        makeDefault
        position={isInteriorView ? [0, 1.7, 0] : [5, 3, 5]} // Center of interior space for first-person feel
        fov={isInteriorView ? 60 : 75} // Narrower FOV for more realistic first-person view
        near={0.1}
        far={1000}
      />

      {/* Basic Camera Controls */}
      <OrbitControls 
        enablePan={isInteriorView ? false : true} // Disable pan in interior for more first-person feel
        enableZoom={true}
        enableRotate={true}
        minDistance={isInteriorView ? 0.1 : 2}
        maxDistance={isInteriorView ? 5 : 20}
        target={isInteriorView ? [0, 1.7, 1] : [0, 0.5, 0]} // Look slightly forward in interior for first-person feel
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={isInteriorView ? 0.5 : 1} // Slower rotation for interior
        zoomSpeed={isInteriorView ? 0.5 : 1} // Slower zoom for interior
      />

      {/* Realistic Lighting Setup */}
      <ambientLight intensity={ambientIntensity} color="#ffffff" />
      
      {/* Main directional light (sun) */}
      <directionalLight
        position={[sunPosition.x, sunPosition.y, sunPosition.z]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#ffffff"
      />

      {/* Fill light for better shadows */}
      <directionalLight
        position={[-sunPosition.x, sunPosition.y * 0.5, -sunPosition.z]}
        intensity={directionalIntensity * 0.3}
        color="#ffffff"
      />

      {/* Realistic Environment */}
      <Environment preset="sunset" />

      {/* Ground Plane with better material - only show for exterior */}
      {!isInteriorView && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
      )}

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
