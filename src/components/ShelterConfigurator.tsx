import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { User, Shelter } from '../App';
import ModelViewer from './ModelViewer';
import Controls from './Controls';
import LoadingSpinner from './LoadingSpinner';

interface ShelterConfiguratorProps {
  user: User;
  shelter: Shelter;
  onBack: () => void;
  onLogout: () => void;
}

export interface ConfiguratorState {
  isDeployed: boolean;
  isInsideView: boolean;
  color: string;
  isLoading: boolean;
}

const ShelterConfigurator: React.FC<ShelterConfiguratorProps> = ({
  user,
  shelter,
  onBack,
  onLogout
}) => {
  const [configState, setConfigState] = useState<ConfiguratorState>({
    isDeployed: true,
    isInsideView: false,
    color: '#4A5568',
    isLoading: true,
  });

  const handleToggleDeploy = () => {
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleToggleView = () => {
    setConfigState(prev => ({ ...prev, isInsideView: !prev.isInsideView }));
  };

  const handleColorChange = (color: string) => {
    setConfigState(prev => ({ ...prev, color }));
  };

  const handleModelLoaded = () => {
    setConfigState(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="configurator-container">
      {/* Header */}
      <header className="configurator-header">
        <div className="header-left">
          <button onClick={onBack} className="back-button">
            <span>←</span>
            <span>BACK TO COMMAND CENTER</span>
          </button>
          <div className="shelter-info">
            <h1>{shelter.name}</h1>
            <p>{shelter.model}</p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-rank">{user.rank}</span>
            <span className="user-name">{user.username}</span>
            <span className="user-clearance">{user.clearance}</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <span>🚪</span>
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ModelViewer
              configState={configState}
              onModelLoaded={handleModelLoaded}
              shelter={shelter}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading Overlay */}
      {configState.isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}

      {/* Controls Panel */}
      <Controls
        configState={configState}
        onToggleDeploy={handleToggleDeploy}
        onToggleView={handleToggleView}
        onColorChange={handleColorChange}
        shelter={shelter}
      />

      {/* Footer */}
      <footer className="configurator-footer">
        <div>
          <p>Drag to rotate • Scroll to zoom • Click to interact</p>
          <p>CLASSIFIED MILITARY SYSTEM • {shelter.name}</p>
        </div>
      </footer>
    </div>
  );
};

export default ShelterConfigurator;
