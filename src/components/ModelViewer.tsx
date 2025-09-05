'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, PerspectiveCamera, MOUSE } from '@react-three/drei';
import * as THREE from 'three';

/** Full-page viewer wrapper */
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

/* ---------------- UI ---------------- */
function Loading() {
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Loading…</div>
    </Html>
  );
}

/* ---------------- Scene ---------------- */
function Scene({ color = '#D2B48C' }: { color?: string }) {
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0.75, 0)); // default until model reports real center

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

      {/* Controls: LEFT = PAN, RIGHT = ROTATE, MIDDLE = ZOOM */}
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        mouseButtons={{ LEFT: MOUSE.PAN, RIGHT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY }}
        enableDamping
        dampingFactor={0.08}
        zoomSpeed={1}
        rotateSpeed={0.9}
        panSpeed={0.8}
      />

      {/* Lights */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[sun.x, sun.y, sun.z]}
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment reflections */}
      <Environment preset="sunset" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#2a2f3a" roughness={0.9} metalness={0} />
      </mesh>

      {/* Model */}
      <TreccModel
        color={color}
        onReady={({ center, radius }) => {
          // Center camera target and frame the model nicely
          cameraTarget.current.copy(center);
          if (controlsRef.current) {
            controlsRef.current.target.copy(center);
            controlsRef.current.update();
          }
        }}
      />
    </>
  );
}

/* ---------------- Model (trecc.glb) ---------------- */
type ReadyInfo = { center: THREE.Vector3; radius: number };

function TreccModel({
  color,
  onReady,
}: {
  color?: string;
  onReady?: (info: ReadyInfo) => void;
}) {
  const path = '/models/trecc.glb';
  const gltf = useGLTF(path) as any; // Suspense handles loading
  const scene = useMemo<THREE.Group | null>(() => gltf?.scene?.clone(true) ?? null, [gltf]);

  // Orientation/Grounding constants
  // If the model is still on its side, swap which axis you fix below (X/Z).
  const ROTATE_FIX = new THREE.Euler(-Math.PI / 2, 0, 0); // rotate -90° around X to lay flat

  // Once loaded, fix orientation, center it, then sit it on the ground (y=0).
  useEffect(() => {
    if (!scene) return;

    // 1) Apply rotation fix BEFORE measuring
    scene.rotation.copy(ROTATE_FIX);

    // 2) Center the model at the origin
    let box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center); // move so origin is center

    // 3) Recompute and raise so it sits on y=0
    box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z) * 0.5;
    scene.position.y += -box.min.y; // push up so bottom touches ground

    // Notify parent about bounds/center (for camera target)
    onReady?.({ center: new THREE.Vector3(0, size.y * 0.5, 0), radius });
  }, [scene, onReady]);

  // Conservative paint (only “body/shell” words; avoids wheels/chassis)
  useEffect(() => {
    if (!scene || !color) return;
    applyBodyColor(scene, color);
  }, [scene, color]);

  if (!scene) return null;
  return <primitive object={scene} castShadow receiveShadow />;
}

// Preload just the one model we use
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
