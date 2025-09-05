'use client';

import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/** One-file Model Viewer that loads /models/trecc.glb */
export default function ModelViewer() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b1020' }}>
      <Canvas shadows>
        <Suspense fallback={<Loading />}>
          <Scene color="#D2B48C" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ---------------- Loading UI ---------------- */
function Loading() {
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Loading…</div>
    </Html>
  );
}

/* ---------------- Scene ---------------- */
function Scene({ color = '#D2B48C' }: { color?: string }) {
  // Camera & controls
  const isInteriorView = false; // keep false; you can wire this to props later

  // Lights config (safe defaults)
  const ambientIntensity = 0.3;
  const directionalIntensity = 1.2;
  const sun = { x: 5, y: 8, z: 5 };

  return (
    <>
      {/* Camera */}
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
        position={[sun.x, sun.y, sun.z]}
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
        position={[-sun.x, sun.y * 0.5, -sun.z]}
        intensity={directionalIntensity * 0.3}
        color="#ffffff"
      />

      {/* Subtle environment reflections */}
      <Environment preset="sunset" />

      {/* Ground (hide if you want pure floating) */}
      {!isInteriorView && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.0} />
        </mesh>
      )}

      {/* Model */}
      <TreccModel color={color} />
    </>
  );
}

/* ---------------- Model (trecc.glb) ---------------- */
function TreccModel({ color }: { color?: string }) {
  const path = '/models/trecc.glb';
  const gltf = useGLTF(path) as any; // Suspense will handle loading
  const scene = useMemo<THREE.Group | null>(() => gltf?.scene?.clone(true) ?? null, [gltf]);

  // Apply conservative paint color to body/shell surfaces (avoid wheels/chassis/etc.).
  useEffect(() => {
    if (!scene || !color) return;
    applyBodyColor(scene, color);
  }, [scene, color]);

  if (!scene) return null;
  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

// Preload just the one file that exists
useGLTF.preload('/models/trecc.glb');

/* ---------------- Colour helper ---------------- */
function applyBodyColor(root: THREE.Object3D, hex: string) {
  const bodyMatchers = [
    'body','shell','hull','canopy','tarp','wall','panel','roof','door','side',
    'skin','cover','enclosure','housing','box','container',
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

