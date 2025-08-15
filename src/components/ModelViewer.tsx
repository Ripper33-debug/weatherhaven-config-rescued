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
  color?: string; // Add color prop
  isDeployed?: boolean; // Add deployment state
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
  category: 'feature' | 'specification' | 'warning' | 'info';
}

// Regex patterns to identify different parts
const WHEEL_TRAILER_RX = /(wheel|tyre|tire|rim|hub|axle|suspension|spoke|lug|valve|fender|mudflap|mudguard|chassis|trailer|truck|vehicle|carriage|undercarriage|running|gear|brake|drum|disc|caliper|spring|shock|strut|link|arm|bracket|mount|bushing|bearing|nut|bolt|fastener|hardware)/i;

const SHELTER_BODY_RX = /(body|main|shell|wall|panel|shelter|container|box|unit|roof|side|end|floor|ceiling|exterior|outer|surface|skin|hull|casing|enclosure|housing|frame|structure|module|section|compartment|space|interior|inner|inside|room|area|zone|volume|cabin|pod|capsule|cylinder|tube|pipe|duct|channel|passage|opening|door|window|hatch|access|entry|exit|vent|port|connection|joint|seam|edge|corner|angle|curve|bend|fold|crease|pleat|gusset|reinforcement|stiffener|support|brace|girder|beam|column|post|pillar|stud|joist|rafter|truss|arch|dome|vault|canopy|awning|cover|lid|cap|top|bottom|base|foundation|platform|deck|stage|level|tier|layer|sheet|plate|board|panel|slab|block|brick|tile|shingle|cladding|siding|facade|face|front|back|left|right|north|south|east|west|upper|lower|middle|center|central|core|heart|nucleus|kernel|essence|main|primary|principal|chief|head|lead|key|essential|vital|crucial|important|significant|major)/i;

function isWheelOrTrailerPart(node: THREE.Object3D): boolean {
  const name = (node.name || '').toLowerCase();
  const parentName = (node.parent?.name || '').toLowerCase();
  const grandParentName = (node.parent?.parent?.name || '').toLowerCase();
  
  return WHEEL_TRAILER_RX.test(name) || WHEEL_TRAILER_RX.test(parentName) || WHEEL_TRAILER_RX.test(grandParentName);
}

function isShelterBodyPart(node: THREE.Object3D): boolean {
  const name = (node.name || '').toLowerCase();
  const parentName = (node.parent?.name || '').toLowerCase();
  
  // First check if it's a wheel/trailer part - if so, definitely don't color it
  if (isWheelOrTrailerPart(node)) {
    return false;
  }
  
  // For everything else, be more permissive - color it unless it's clearly not a body part
  const isDefinitelyNotBody = WHEEL_TRAILER_RX.test(name);
  
  return !isDefinitelyNotBody;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  interiorPath,
  onLoad,
  onError,
  showAnnotations = true,
  showMeasurements = true,
  explodedView = false,
  autoRotate = false,
  color = '#d2b48c',
  isDeployed = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<MeasurementPoint[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [explodedViewProgress, setExplodedViewProgress] = useState(0);

  // Generate sample measurements and annotations
  useEffect(() => {
    const sampleMeasurements: MeasurementPoint[] = [
      { id: 'length', position: [7.15, 0, 0], label: 'Length: 14.3 ft' },
      { id: 'width', position: [0, 3.55, 0], label: 'Width: 7.1 ft' },
      { id: 'height', position: [0, 0, 3.95], label: 'Height: 7.9 ft' }
    ];

    const sampleAnnotations: Annotation[] = [
      {
        id: 'entrance',
        position: [0, 0, 0],
        title: 'Main Entrance',
        description: 'Primary access point with reinforced door and security features',
        category: 'feature'
      },
      {
        id: 'hvac',
        position: [2, 2, 2],
        title: 'HVAC System',
        description: 'Integrated heating, ventilation, and air conditioning system',
        category: 'specification'
      },
      {
        id: 'power',
        position: [-2, 1, 1],
        title: 'Power Distribution',
        description: 'Electrical power distribution and backup systems',
        category: 'info'
      }
    ];

    setMeasurements(sampleMeasurements);
    setAnnotations(sampleAnnotations);
  }, []);

  // Exploded view animation
  useEffect(() => {
    if (explodedView) {
      const interval = setInterval(() => {
        setExplodedViewProgress(prev => {
          if (prev >= 1) return 1;
          return prev + 0.02;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setExplodedViewProgress(prev => {
          if (prev <= 0) return 0;
          return prev - 0.02;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [explodedView]);

  return (
    <div className="model-viewer-container">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 50 }}
        style={{ background: 'var(--bg-primary)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Environment preset="warehouse" />

        <Model
          modelPath={modelPath}
          interiorPath={interiorPath}
          explodedViewProgress={explodedViewProgress}
          color={color}
          isDeployed={isDeployed}
          onLoad={() => {
            setIsLoading(false);
            onLoad?.();
          }}
          onError={(error) => {
            setError(error);
            onError?.(error);
          }}
        />

        {showMeasurements && measurements.map((measurement) => (
          <MeasurementPoint
            key={measurement.id}
            measurement={measurement}
            explodedViewProgress={explodedViewProgress}
          />
        ))}

        {showAnnotations && annotations.map((annotation) => (
          <AnnotationMarker
            key={annotation.id}
            annotation={annotation}
            isSelected={selectedAnnotation === annotation.id}
            onSelect={() => setSelectedAnnotation(annotation.id)}
            explodedViewProgress={explodedViewProgress}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping={true}
          maxDistance={50}
          minDistance={2}
        />

        <Grid />
        <Axes />
      </Canvas>

      {/* Model Controls */}
      <div className="model-controls">
        <button
          className="control-button"
          onClick={() => {
            // Zoom to fit functionality
            const canvas = document.querySelector('canvas');
            if (canvas) {
              // Implementation for zoom to fit
              console.log('Zoom to fit clicked');
            }
          }}
          title="Zoom to Fit"
        >
          🔍
        </button>
        <button
          className="control-button"
          onClick={() => {
            // Reset camera position
            const canvas = document.querySelector('canvas');
            if (canvas) {
              console.log('Reset view clicked');
            }
          }}
          title="Reset View"
        >
          🏠
        </button>
        <button
          className="control-button"
          onClick={() => {
            // Toggle exploded view
            // This would be handled by parent component
          }}
          title="Exploded View"
        >
          💥
        </button>
        <button
          className="control-button"
          onClick={() => {
            // Toggle measurements
          }}
          title="Toggle Measurements"
        >
          📏
        </button>
        <button
          className="control-button"
          onClick={() => {
            // Toggle annotations
          }}
          title="Toggle Annotations"
        >
          📝
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <div className="loading-text">
              <h3>Loading Model</h3>
              <p>Initializing 3D environment...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-overlay">
          <div className="error-message">
            <h3>Error Loading Model</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Annotation Details Panel */}
      {selectedAnnotation && (
        <AnnotationPanel
          annotation={annotations.find(a => a.id === selectedAnnotation)!}
          onClose={() => setSelectedAnnotation(null)}
        />
      )}
    </div>
  );
};

// Model Component with proper color handling
const Model: React.FC<{
  modelPath: string;
  interiorPath?: string;
  explodedViewProgress: number;
  color: string;
  isDeployed: boolean;
  onLoad: () => void;
  onError: (error: string) => void;
}> = ({ modelPath, interiorPath, explodedViewProgress, color, isDeployed, onLoad, onError }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [processedScene, setProcessedScene] = useState<THREE.Object3D | null>(null);
  
  try {
    const { scene } = useGLTF(modelPath);
    
    // Process the scene and apply materials
    useEffect(() => {
      if (scene) {
        const cloned = scene.clone(true);
        
        // Create rubber material for wheels/trailer parts
        const rubberMaterial = new THREE.MeshPhysicalMaterial({
          color: '#111111', // black rubber
          roughness: 0.9,
          metalness: 0.0,
          reflectivity: 0.05,
          clearcoat: 0,
        });

        let coloredCount = 0;
        let skippedCount = 0;

        cloned.traverse((child: any) => {
          if (!child.isMesh || !child.material) return;

          // Always break material sharing
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material = child.material.map((m: any) => m.clone());
            } else {
              child.material = child.material.clone();
            }
          }

          // Tag parts for debugging
          if (isWheelOrTrailerPart(child)) {
            child.userData.isWheel = true;
            console.log(`🔧 Marked as wheel/trailer: ${child.name}`);
            
            // Apply rubber material to wheels/trailer parts
            if (Array.isArray(child.material)) {
              child.material = child.material.map(() => rubberMaterial.clone());
            } else {
              child.material = rubberMaterial.clone();
            }
            skippedCount++;
          } else if (isShelterBodyPart(child)) {
            child.userData.isBody = true;
            console.log(`🏠 Marked as shelter body: ${child.name}`);
            coloredCount++;
          } else {
            console.log(`❓ Unclassified: ${child.name} (parent: ${child.parent?.name || 'none'})`);
            skippedCount++;
          }

          // Enhanced shadow settings
          child.castShadow = true;
          child.receiveShadow = true;
        });

        setProcessedScene(cloned);
        onLoad();
        
        console.log(`Color application complete: ${coloredCount} body parts tagged, ${skippedCount} parts skipped`);
      }
    }, [scene, onLoad]);

    // Apply color changes
    useEffect(() => {
      if (!processedScene) return;

      let coloredCount = 0;
      let skippedCount = 0;

      processedScene.traverse((child: any) => {
        if (!child.isMesh || !child.material) return;
        
        // Only color body parts, skip wheels/trailer parts
        if (!child.userData.isBody || child.userData.isWheel) {
          skippedCount++;
          return;
        }

        coloredCount++;
        console.log(`✅ Coloring body part: ${child.name}`);

        const applyFinish = (mat: any) => {
          const m = mat.clone();
          m.color.set(color);

          // Apply different finishes based on color
          if (color === '#2F4F2F') {        // Dark Military Green - Matte
            m.metalness = 0.1; 
            m.roughness = 0.9;
          } else if (color === '#D2B48C') { // Matte Tan
            m.metalness = 0.1; 
            m.roughness = 0.9;
          } else if (color === '#FFFFFF') { // Matte White
            m.metalness = 0.1; 
            m.roughness = 0.8;
          } else {                          // Custom - Premium
            m.metalness = 0.2; 
            m.roughness = 0.6;
          }
          m.needsUpdate = true;
          return m;
        };

        if (Array.isArray(child.material)) {
          child.material = child.material.map((mm: any) =>
            (mm.isMeshStandardMaterial || mm.isMeshPhysicalMaterial)
              ? applyFinish(mm)
              : new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.6 })
          );
        } else {
          const mm = child.material;
          child.material =
            (mm.isMeshStandardMaterial || mm.isMeshPhysicalMaterial)
              ? applyFinish(mm)
              : new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.6 });
          child.material.needsUpdate = true;
        }
      });
      
      console.log(`Color application complete: ${coloredCount} body parts colored, ${skippedCount} parts skipped`);
    }, [color, processedScene]);

    useFrame(() => {
      if (groupRef.current) {
        // Apply exploded view transformation
        const children = groupRef.current.children;
        children.forEach((child, index) => {
          const direction = new THREE.Vector3(
            Math.sin(index * 0.5) * 2,
            Math.cos(index * 0.5) * 2,
            Math.sin(index * 0.3) * 2
          );
          child.position.lerp(direction.multiplyScalar(explodedViewProgress), 0.1);
        });
      }
    });

    return (
      <group ref={groupRef}>
        {processedScene ? (
          <primitive object={processedScene} />
        ) : (
          // Fallback box while loading
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 4, 2]} />
            <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
          </mesh>
        )}
        {interiorPath && <InteriorModel path={interiorPath} />}
      </group>
    );
  } catch (error) {
    onError('Failed to load model');
    return null;
  }
};

// Interior Model Component
const InteriorModel: React.FC<{ path: string }> = ({ path }) => {
  try {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
  } catch {
    return null;
  }
};

// Measurement Point Component
const MeasurementPoint: React.FC<{
  measurement: MeasurementPoint;
  explodedViewProgress: number;
}> = ({ measurement, explodedViewProgress }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={measurement.position}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial
          color={hovered ? 'var(--accent-cyan)' : 'var(--accent-orange)'}
          emissive={hovered ? 'var(--accent-cyan)' : 'black'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Sphere>
      
      <Html position={[0, 0.5, 0]} center>
        <div className="measurement-tool">
          {measurement.label}
        </div>
      </Html>

      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

// Annotation Marker Component
const AnnotationMarker: React.FC<{
  annotation: Annotation;
  isSelected: boolean;
  onSelect: () => void;
  explodedViewProgress: number;
}> = ({ annotation, isSelected, onSelect, explodedViewProgress }) => {
  const [hovered, setHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feature': return 'var(--accent-cyan)';
      case 'specification': return 'var(--accent-green)';
      case 'warning': return 'var(--accent-red)';
      case 'info': return 'var(--accent-purple)';
      default: return 'var(--accent-orange)';
    }
  };

  return (
    <group position={annotation.position}>
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial
          color={getCategoryColor(annotation.category)}
          emissive={getCategoryColor(annotation.category)}
          emissiveIntensity={isSelected || hovered ? 0.8 : 0.3}
        />
      </Sphere>

      <Html position={[0, 0.3, 0]} center>
        <div className="annotation-marker">
          {annotation.category === 'feature' && '⚡'}
          {annotation.category === 'specification' && '📋'}
          {annotation.category === 'warning' && '⚠️'}
          {annotation.category === 'info' && 'ℹ️'}
        </div>
      </Html>

      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSelect}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

// Annotation Panel Component
const AnnotationPanel: React.FC<{
  annotation: Annotation;
  onClose: () => void;
}> = ({ annotation, onClose }) => {
  return (
    <div className="annotation-panel glass-panel">
      <div className="annotation-header">
        <h3>{annotation.title}</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <p>{annotation.description}</p>
      <div className="annotation-category">
        Category: {annotation.category}
      </div>
    </div>
  );
};

// Grid Component
const Grid: React.FC = () => {
  return (
    <gridHelper args={[20, 20, 'var(--accent-cyan)', 'rgba(255,255,255,0.1)']} />
  );
};

// Axes Component
const Axes: React.FC = () => {
  return (
    <axesHelper args={[5]} />
  );
};

export default ModelViewer;
