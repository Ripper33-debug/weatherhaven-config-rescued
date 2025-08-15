import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { ModelViewerScene } from './ModelViewer';

interface ConfigState {
  color: string;
  isDeployed: boolean;
  isInteriorView: boolean;
  isInsideView: boolean;
  selectedInterior?: any;
}

const ShelterConfigurator: React.FC = () => {
  console.log('🚀 ShelterConfigurator component rendering...');

  // Simplified state
  const [configState, setConfigState] = useState<ConfigState>({
    color: '#8B7355',
    isDeployed: false,
    isInteriorView: false,
    isInsideView: false,
  });

  // Simple color options
  const colorOptions = [
    { name: 'Military Tan', value: '#8B7355' },
    { name: 'OD Green', value: '#2F4F2F' },
    { name: 'Field Gray', value: '#696969' },
  ];

  // Simple handlers
  const handleColorChange = (newColor: string) => {
    console.log('🎨 Color change:', newColor);
    setConfigState(prev => ({ ...prev, color: newColor }));
  };

  const handleDeployToggle = () => {
    console.log('🚀 Deploy toggle');
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleInteriorViewToggle = () => {
    console.log('🏠 Interior view toggle');
    setConfigState(prev => ({ ...prev, isInteriorView: !prev.isInteriorView }));
  };

  // Determine model path
  const getModelPath = () => {
    if (configState.isInteriorView) {
      return "/models/trecc-open.glb";
    }
    return configState.isDeployed ? "/models/trecc-open.glb" : "/models/trecc.glb";
  };

  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());

  return (
    <div className="configurator-container">
      {/* Header */}
      <div className="configurator-header">
        <h1>TRECC Shelter Configurator</h1>
        <p>Customize your shelter with real-time 3D visualization</p>
      </div>

      {/* Main Layout */}
      <div className="configurator-main">
        {/* 3D Viewer */}
        <div className="viewer-section">
          <Canvas 
            camera={{ position: [0, 0.2, 6], fov: 50 }} 
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]} 
            shadows
          >
            <Suspense fallback={null}>
              <ModelViewerScene
                modelPath={getModelPath()}
                color={configState.color}
                isDeployed={configState.isDeployed}
                environment="studio"
                weather="none"
                lighting={{}}
                background3D={{}}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          {/* Deploy Controls */}
          <div className="control-section deploy-section">
            <h3>🚀 Deployment</h3>
            <div className="deploy-buttons">
              <button 
                className={`deploy-btn ${configState.isDeployed ? 'active' : ''}`}
                onClick={handleDeployToggle}
              >
                {configState.isDeployed ? '🔄 Undeploy' : '🚀 Deploy'}
              </button>
              <button 
                className={`interior-btn ${configState.isInteriorView ? 'active' : ''}`}
                onClick={handleInteriorViewToggle}
              >
                {configState.isInteriorView ? '🏠 Exit Interior' : '🏠 Interior Only'}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="control-section">
            <h3>🎨 Color</h3>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`color-btn ${configState.color === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.value)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Lead Times Button */}
          <div className="lead-times-button">
            <button className="lead-times-btn">
              📋 Lead Times
            </button>
          </div>

          {/* Back to Home Button */}
          <div className="back-home-button">
            <button className="back-home-btn" onClick={() => window.location.href = '/'}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterConfigurator;
