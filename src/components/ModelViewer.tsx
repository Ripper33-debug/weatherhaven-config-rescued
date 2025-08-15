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

  // Apply color to shelter box only (very specific)
  useEffect(() => {
    if (scene && color) {
      const allParts: string[] = [];
      const coloredParts: string[] = [];
      const skippedParts: string[] = [];

      const applyColorToShelter = (object: THREE.Object3D) => {
        if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.Material;
          
          const objectName = mesh.name.toLowerCase();
          allParts.push(objectName);
          
          // Very specific: only color the main shelter box
          const isShelterBox = (
            /shelter|body|main|container|box|unit|cabin|pod/.test(objectName) ||
            /wall|panel|roof|floor|ceiling|side|end|front|back|top|bottom|surface|skin|hull|casing|enclosure|housing/.test(objectName) ||
            /interior|inner|inside|room|space|area|zone|volume|chamber|compartment/.test(objectName) ||
            /door|window|hatch|access|entry|exit|vent|port|opening/.test(objectName) ||
            /shell|cover|outer|external|primary|core|base|main|central/.test(objectName) ||
            /large|big|major|primary|main|central|body|structure/.test(objectName)
          );
          
          // Exclude ALL vehicle and mechanical parts
          const isVehiclePart = (
            /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
            /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
            /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
            /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName) ||
            /frame|support|strut|brace|girder|beam|post|pillar|column|stud|joist|rafter|truss/.test(objectName) ||
            /joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset/.test(objectName) ||
            /reinforcement|stiffener|gusset|pleat|crease|fold|bracket|support|strut|brace/.test(objectName) ||
            /part|piece|component|element|section|module|block|plate|sheet|board|slab/.test(objectName) ||
            /tread|sidewall|bead|valve|stem|cap|cover|hubcap|center|spinner/.test(objectName) ||
            /leg|foot|base|stand|support|jack|stabilizer|leveler/.test(objectName) ||
            /handle|grip|knob|lever|switch|control|button/.test(objectName) ||
            /lock|latch|hinge|pivot|swivel|rotation/.test(objectName)
          );
          
          // Only color if it's a shelter box AND not a vehicle part
          if (isShelterBox && !isVehiclePart) {
            coloredParts.push(objectName);
            
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
          } else {
            skippedParts.push(objectName);
            // Keep original material for vehicle parts
            if (material) {
              try {
                mesh.material = material.clone();
              } catch (err) {
                console.error('Material error:', err);
              }
            }
          }
        }
        
        object.children.forEach(child => applyColorToShelter(child));
      };
      
      applyColorToShelter(scene);
      
      console.log('🔍 All parts in model:', allParts);
      console.log('🎨 Colored parts:', coloredParts);
      console.log('🚫 Skipped parts:', skippedParts);
      console.log('📊 Summary - Colored:', coloredParts.length, 'Skipped:', skippedParts.length, 'Total:', allParts.length);
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
        target={[0, 0.5, 0]}
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
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
