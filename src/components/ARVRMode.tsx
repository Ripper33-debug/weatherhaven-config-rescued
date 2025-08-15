import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';
import ModelViewer from './ModelViewer';

interface ARVRModeProps {
  configState: ConfiguratorState;
  shelter: Shelter;
  onModelLoaded: () => void;
  onExit: () => void;
}

type ViewMode = '360' | 'walkthrough' | 'ar' | 'vr';

const ARVRMode: React.FC<ARVRModeProps> = ({ 
  configState, 
  shelter, 
  onModelLoaded, 
  onExit 
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('360');
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 2, z: 10 });


  useEffect(() => {
    // Request fullscreen when entering AR/VR mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fullscreen not supported or denied
      });
    }

    return () => {
      // Exit fullscreen when leaving
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, []);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    
    // Adjust camera position based on mode
    switch (mode) {
      case 'ar':
        setCameraPosition({ x: 0, y: 1.7, z: 5 }); // Human eye level
        break;
      case 'vr':
        setCameraPosition({ x: 0, y: 1.7, z: 8 }); // VR viewing distance
        break;
      case '360':
        setCameraPosition({ x: 0, y: 3, z: 15 }); // Overview distance
        break;
      case 'walkthrough':
        setCameraPosition({ x: 0, y: 1.7, z: 3 }); // Close-up walkthrough
        break;
    }
  };

  const renderControls = () => (
    <div className="arvr-controls">
      <div className="mode-selector">
        <button 
          className={`mode-button ${viewMode === '360' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('360')}
        >
          <span className="icon-360"></span>
          360° View
        </button>
        
        <button 
          className={`mode-button ${viewMode === 'walkthrough' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('walkthrough')}
        >
          <span className="icon-walkthrough"></span>
          Walkthrough
        </button>
        
        <button 
          className={`mode-button ${viewMode === 'ar' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('ar')}
        >
          <span className="icon-ar"></span>
          AR Mode
        </button>
        
        <button 
          className={`mode-button ${viewMode === 'vr' ? 'active' : ''}`}
          onClick={() => handleViewModeChange('vr')}
        >
          <span className="icon-vr"></span>
          VR Mode
        </button>
      </div>
      
      <div className="camera-controls">
        <button 
          className="camera-preset"
          onClick={() => setCameraPosition({ x: 0, y: 2, z: 10 })}
        >
          Front View
        </button>
        <button 
          className="camera-preset"
          onClick={() => setCameraPosition({ x: 10, y: 2, z: 0 })}
        >
          Side View
        </button>
        <button 
          className="camera-preset"
          onClick={() => setCameraPosition({ x: 0, y: 10, z: 0 })}
        >
          Top View
        </button>
        <button 
          className="camera-preset"
          onClick={() => setCameraPosition({ x: 0, y: 1.7, z: 3 })}
        >
          Interior
        </button>
      </div>
      
      <button className="exit-button" onClick={onExit}>
        <span className="icon-exit"></span>
        Exit AR/VR
      </button>
    </div>
  );

  const renderARVRScene = () => (
    <Canvas
      camera={{ 
        position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
        fov: viewMode === 'walkthrough' ? 75 : 60
      }}
      shadows
    >
      <ModelViewer
        modelPath={shelter.modelPath || '/models/trecc.glb'}
        interiorPath={configState.selectedInterior?.modelPath}
        onLoad={onModelLoaded}
        color={configState.color}
        isDeployed={configState.isDeployed}
        autoRotate={true}
        showAnnotations={false}
        showMeasurements={false}
        explodedView={false}
      />
    </Canvas>
  );

  return (
    <div className="arvr-container">
      <div className="arvr-header">
        <h2>AR/VR Mode - {shelter.name}</h2>
        <p>Experience the shelter in immersive 3D</p>
      </div>
      
      {renderControls()}
      
      <div className="arvr-viewport">
        {renderARVRScene()}
      </div>
      
      <div className="arvr-info">
        <div className="info-panel">
          <h3>Controls</h3>
          <ul>
            <li><strong>Mouse:</strong> Rotate, zoom, pan</li>
            <li><strong>WASD:</strong> Walk around (walkthrough mode)</li>
            <li><strong>Space:</strong> Jump (walkthrough mode)</li>
            <li><strong>Fullscreen:</strong> Immersive experience</li>
          </ul>
        </div>
        
        <div className="info-panel">
          <h3>Current Mode</h3>
          <p>{viewMode.toUpperCase()} - {viewMode === 'ar' ? 'Augmented Reality Simulation' : 
             viewMode === 'vr' ? 'Virtual Reality Simulation' : 
             viewMode === '360' ? '360° Rotation' : 'Walkthrough Mode'}</p>
        </div>
      </div>
    </div>
  );
};

export default ARVRMode;
