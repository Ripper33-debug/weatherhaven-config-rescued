'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;      // kept for API compatibility, ignored in favor of /models/trecc.glb
  color?: string;         // main body color
  isDeployed?: boolean;   // kept for API compatibility (not used now)
  environment?: string;
  weather?: string;
  lighting?: any;
  background3D?: any;
}

/* ---------------- UI bits ---------------- */
const LoadingSpinner: React.FC = () => (
  <Html center>
    <div style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Loading…</div>
  </Html>
);

const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
  <Html center>
    <div
      style={{
        background: 'rgba(255, 0, 0, 0.85)',
        color: 'white',
        padding: 16,
        borderRadius: 10,
        minWidth: 240,
        textAlign: 'center',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Model Load Error</div>
      <div style={{ fontSize: 12, opacity: 0.9 }}>{error}</div>
    </div>
  </Html>
);

/* ------------- Simple recolor helper ------------- */
/** Safely applies a paint color to meshes that look like the shelter body/shell.
 *  (Ultra-conservative: it tries to avoid wheels/chassis/trailer bits.)
 */
function applyBodyColor(root: THREE.Object3D, hex: string) {
  const bodyMatchers = [
    'body', 'shell', 'hull', 'canopy', 'tarp', 'wall', 'panel', 'roof', 'door', 'side',
    'skin', 'cover', 'enclosure', 'housing', 'box', 'container',
  ];
  const excludeMatchers = [
    'wheel','tire','tyre','rim','hub','axle','suspension','shock','spring','brake','drum','disc',
    'fender','mudflap','mudguard','chassis','trailer','drawbar','hitch','coupling','engine','motor',
    'wire','cable','hose','bolt','nut','screw','washer','bearing','bushing','link','arm','bracket',
    'frame','rail','beam','crossmember','jack','stand','support','undercarriage','running gear'
  ];
  const paint = new THREE.Color(hex);

  root.traverse((o: any) => {
    if (!o.isMesh) return;
    const name = (o.name + ' ' + (o.material?.name || '')).toLowerCase();
    const isBody = bodyMatchers.some(k => name.includes(k));
    const isExcluded = excludeMatchers.some(k => name.includes(k));
    if (!isBody || isExcluded) return;

    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach((m: any, i: number) => {
      if (!m) return;
      // Ensure we have a PBR material for consistent color
      let mat = m;
      if (!m.isMeshStandardMaterial) {
        mat = new THREE.MeshStandardMaterial({
          color: (m.color?.clone?.() ?? new THREE.Color(0xffffff)),
        });
      } else {
        mat = m.clone();
      }
      if (mat.color) mat.color.copy(paint);
      if ('metalness' in mat) mat.metalness = Math.min(mat.metalness ?? 0.25, 0.25);
      if ('roughness' in mat) mat.roughness = Math.max(mat.roughness ?? 0.6, 0.35);
      mat.envMapIntensity = 0.3;
      mat.needsUpdate = true;
      if (Array.isArray(o.material)) o.material[i] = mat; else o.material = mat;
    });
  });
}

/* ---------------- Model ---------------- */
const Model: React.FC<{ color?: string }> = ({ color }) => {
  const fixedPath = '/models/trecc.glb'; // <-- force the single model
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load via drei (cache-aware). If it throws, catch with state and render an overlay.
  let gltf: any = null;
  try {
    gltf = useGLTF(fixedPath);
  } catch (e) {
    setLoadError(`Failed to load ${fixedPath}`);
  }

  const scene = useMemo<THREE.Group | null>(() => {
    if (!gltf?.scene) return null;
    return gltf.scene.clone(true);
  }, [gltf]);

  // Apply color when model is ready or color changes.
  useEffect(() => {
    if (!scene || !color) return;
    try {
      applyBodyColor(scene, color);
    } catch (e) {
      console.warn('Recolor failed:', e);
    }
  }, [scene, color]);

  if (loadError) return <ErrorDisplay error={loadError} />;
  if (!scene) return null;

  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
};

/* --------------- Scene wrapper --------------- */
export const ModelViewerScene: React.FC<ModelViewerProps> = ({
  modelPath,                 // kept for API compatibility (ignored)
  color = '#D2B48C',         // tan default
  isDeployed = false,        // kept for API compatibility (ignored)
  environment = 'studio',    // kept
  weather = 'none',          // kept
  lighting = {},
  background3D = {},
}) => {
  // Lighting defaults from your previous code
  const ambientIntensity = lighting.ambientIntensity ?? 0.3;
  const directionalIntensity = lighting.directionalIntensity ?? 1.2;
  const sunPosition = lighting.sunPosition ?? { x: 5, y: 8, z: 5 };

  // Preserve your “interior view” heuristic even if modelPath is ignored for the file path
  const isInteriorView = modelPath?.includes('interior');

  // WebGL context loss handling
  const { gl } = useThree();
  useEffect(() => {
    const handleLost = () => console.warn('WebGL context lost – attempting to restore…');
    const handleRestored = () => console.log('WebGL context restored');
    gl.domElement.addEventListener('webglcontextlost', handleLost);
    gl.domElement.addEventListener('webglcontextrestored', handleRestored);
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleLost);
      gl.domElement.removeEventListener('webglcontextrestored', handleRestored);
    };
  }, [gl]);

  return (
    <>
      {/* Camera (same behavior you had) */}
      <PerspectiveCamera
        makeDefault
        position={isInteriorView ? [0, 1.7, 0] : [5, 3, 5]}
        fov={isInteriorView ? 60 : 75}
        near={0.1}
        far={1000}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={!isInteriorView}
        enableZoom
        enableRotate
        minDistance={isInteriorView ? 0.1 : 2}
        maxDistance={isInteriorView ? 5 : 20}
        target={isInteriorView ? [0, 1.7, 1] : [0, 0.5, 0]}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={isInteriorView ? 0.5 : 1}
        zoomSpeed={isInteriorView ? 0.5 : 1}
      />

      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} color="#ffffff" />
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
      <directionalLight
        position={[-sunPosition.x, sunPosition.y * 0.5, -sunPosition.z]}
        intensity={directionalIntensity * 0.3}
        color="#ffffff"
      />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Ground (exterior only) */}
      {!isInteriorView && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.0} />
        </mesh>
      )}

      {/* Model */}
      <Suspense fallback={<LoadingSpinner />}>
        <Model color={color} />
      </Suspense>
    </>
  );
};

/* ---- Preload only the file that exists ---- */
useGLTF.preload('/models/trecc.glb');
