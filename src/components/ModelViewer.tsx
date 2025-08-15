'use client';

import React, { useRef, useState, Suspense } from 'react';
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

// Collapsible Lighting Controls Component
const LightingControls: React.FC<{
  ambientIntensity: number;
  directionalIntensity: number;
  sunPosition: { x: number; y: number; z: number };
  onAmbientChange: (value: number) => void;
  onDirectionalChange: (value: number) => void;
  onSunPositionChange: (axis: 'x' | 'y' | 'z', value: number) => void;
}> = ({ ambientIntensity, directionalIntensity, sunPosition, onAmbientChange, onDirectionalChange, onSunPositionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Html position={[-8, 4, 0]}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        borderRadius: '8px',
        minWidth: isCollapsed ? '50px' : '250px',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}>
        {/* Header with collapse button */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }} onClick={() => setIsCollapsed(!isCollapsed)}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            {isCollapsed ? '⚡' : 'Lighting Controls'}
          </span>
          <span style={{ fontSize: '12px' }}>
            {isCollapsed ? '▶' : '▼'}
          </span>
        </div>

        {/* Collapsible content */}
        {!isCollapsed && (
          <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                Ambient Light: {ambientIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={ambientIntensity}
                onChange={(e) => onAmbientChange(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                Sun Intensity: {directionalIntensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={directionalIntensity}
                onChange={(e) => onDirectionalChange(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                Sun Position
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '10px', marginRight: '8px' }}>X:</span>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.5"
                    value={sunPosition.x}
                    onChange={(e) => onSunPositionChange('x', parseFloat(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <span style={{ fontSize: '10px', marginLeft: '4px' }}>{sunPosition.x}</span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', marginRight: '8px' }}>Y:</span>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={sunPosition.y}
                    onChange={(e) => onSunPositionChange('y', parseFloat(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <span style={{ fontSize: '10px', marginLeft: '4px' }}>{sunPosition.y}</span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', marginRight: '8px' }}>Z:</span>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.5"
                    value={sunPosition.z}
                    onChange={(e) => onSunPositionChange('z', parseFloat(e.target.value))}
                    style={{ width: '80%' }}
                  />
                  <span style={{ fontSize: '10px', marginLeft: '4px' }}>{sunPosition.z}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
};

// Simple Model Component
const Model: React.FC<{
  modelPath: string;
  color?: string;
  isDeployed?: boolean;
}> = ({ modelPath, color, isDeployed }) => {
  const meshRef = useRef<THREE.Group>(null);

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

  // Apply color to shelter box only (very specific)
  React.useEffect(() => {
    if (scene && color) {
      console.log('🎨 Starting color application for model:', modelPath);
      console.log('🎨 Color to apply:', color);
      
      const allParts: string[] = [];
      const coloredParts: string[] = [];
      const skippedParts: string[] = [];

      const applyColorToShelter = (object: THREE.Object3D) => {
        if (object.type === 'Mesh' && object instanceof THREE.Mesh) {
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.Material;
          
          const objectName = mesh.name.toLowerCase();
          allParts.push(objectName);
          
          // VERY specific: exclude ALL wheel and trailer parts
          const isVehiclePart = (
            /wheel|tire|tyre|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard/.test(objectName) ||
            /chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|transmission|engine|motor/.test(objectName) ||
            /brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing/.test(objectName) ||
            /nut|bolt|fastener|hardware|screw|washer|pin|clip|clamp|wire|cable/.test(objectName) ||
            /tread|sidewall|bead|valve|stem|cap|cover|hubcap|center|spinner/.test(objectName) ||
            /jockey|jack|stand|support|leg|foot|base/.test(objectName) ||
            /drawbar|hitch|coupling|connection/.test(objectName) ||
            /leaf|spring|suspension|shock|absorber/.test(objectName) ||
            /frame|rail|beam|girder|crossmember/.test(objectName)
          );
          
          // Color if it's NOT a vehicle part
          if (!isVehiclePart) {
            coloredParts.push(objectName);
            
            if (material) {
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
      console.log('🎯 Color being applied:', color);
    }
  }, [scene, color, modelPath]);

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
      scale={isDeployed ? 1 : 0.8}
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
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [directionalIntensity, setDirectionalIntensity] = useState(1.2);
  const [sunPosition, setSunPosition] = useState({ x: 5, y: 8, z: 5 });

  const handleSunPositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setSunPosition(prev => ({ ...prev, [axis]: value }));
  };

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

      {/* Lighting Controls */}
      <LightingControls
        ambientIntensity={ambientIntensity}
        directionalIntensity={directionalIntensity}
        sunPosition={sunPosition}
        onAmbientChange={setAmbientIntensity}
        onDirectionalChange={setDirectionalIntensity}
        onSunPositionChange={handleSunPositionChange}
      />

      {/* Realistic Environment */}
      <Environment preset="sunset" />

      {/* Ground Plane with better material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8}
          metalness={0.0}
        />
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
