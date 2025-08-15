import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ModelViewerScene } from './ModelViewer';

interface ConfigState {
  color: string;
  isDeployed: boolean;
  isInsideView: boolean;
  selectedInterior?: any;
}

const ShelterConfigurator: React.FC = () => {
  const [configState, setConfigState] = useState<ConfigState>({
    color: '#8B4513',
    isDeployed: false,
    isInsideView: false,
  });

  const [environment, setEnvironment] = useState<'day' | 'night' | 'desert' | 'arctic' | 'jungle'>('day');
  const [weatherEffects, setWeatherEffects] = useState({
    type: 'none' as 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog',
    intensity: 0.5,
    windSpeed: 1,
    windDirection: [1, 0, 0] as [number, number, number],
  });

  const [lightingControls, setLightingControls] = useState({
    sunPosition: [1, 1, 1] as [number, number, number],
    ambientIntensity: 0.4,
    directionalIntensity: 0.8,
  });

  const availableInteriors: any[] = [];

  const handleColorChange = (newColor: string) => {
    setConfigState(prev => ({ ...prev, color: newColor }));
  };

  const handleDeployToggle = () => {
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleViewToggle = () => {
    setConfigState(prev => ({ ...prev, isInsideView: !prev.isInsideView }));
  };

  const handleInteriorChange = (interior: any) => {
    setConfigState(prev => ({ ...prev, selectedInterior: interior }));
  };

  const colorOptions = [
    { name: 'Tan', value: '#8B4513' },
    { name: 'Green', value: '#228B22' },
    { name: 'White', value: '#FFFFFF' },
  ];

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
          <Canvas camera={{ position: [0, 0.2, 6], fov: 50 }} gl={{ antialias: true, alpha: false }} dpr={[1, 2]} shadows>
            <Suspense fallback={null}>
              <ModelViewerScene
                modelPath={configState.isDeployed ? "/models/trecc-open.glb" : "/models/trecc.glb"}
                color={configState.color}
                isDeployed={configState.isDeployed}
                environment={environment}
                weather={weatherEffects.type}
                lighting={lightingControls}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          {/* Deploy Controls - TOP PRIORITY */}
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
                className={`view-btn ${configState.isInsideView ? 'active' : ''}`}
                onClick={handleViewToggle}
              >
                {configState.isInsideView ? '👁️ Outside View' : '🏠 Inside View'}
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

          {/* Interior Selection */}
          {availableInteriors.length > 0 && (
            <div className="control-section">
              <h3>🏠 Interior</h3>
              <select
                className="interior-select"
                value={configState.selectedInterior?.id || ''}
                onChange={(e) => {
                  const selectedInterior = availableInteriors.find(interior => interior.id === e.target.value);
                  if (selectedInterior) {
                    handleInteriorChange(selectedInterior);
                  }
                }}
              >
                <option value="">Select Interior</option>
                {availableInteriors.map(interior => (
                  <option key={interior.id} value={interior.id}>
                    {interior.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Environment Controls */}
          <div className="control-section">
            <h3>🌍 Environment</h3>
            <div className="environment-buttons">
              {['day', 'night', 'desert', 'arctic'].map((env) => (
                <button
                  key={env}
                  className={`env-btn ${environment === env ? 'active' : ''}`}
                  onClick={() => setEnvironment(env as any)}
                >
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Weather Controls */}
          <div className="control-section">
            <h3>🌤️ Weather</h3>
            <div className="weather-buttons">
              {['none', 'rain', 'snow', 'dust', 'storm', 'fog'].map((weather) => (
                <button
                  key={weather}
                  className={`weather-btn ${weatherEffects.type === weather ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: weather as any }))}
                >
                  {weather === 'none' ? 'Clear' : weather.charAt(0).toUpperCase() + weather.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Controls */}
          <div className="control-section">
            <h3>☀️ Lighting</h3>
            <div className="lighting-controls">
              <label>
                Sun Position:
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightingControls.directionalIntensity * 100}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    directionalIntensity: parseFloat(e.target.value) / 100
                  }))}
                />
              </label>
              <label>
                Ambient Light:
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightingControls.ambientIntensity * 100}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    ambientIntensity: parseFloat(e.target.value) / 100
                  }))}
                />
              </label>
            </div>
          </div>

          {/* Debug Info */}
          <div className="control-section debug-section">
            <h3>🔧 Status</h3>
            <div className="debug-info">
              <div>Color: <span style={{ color: configState.color }}>{configState.color}</span></div>
              <div>Deployed: {configState.isDeployed ? 'Yes' : 'No'}</div>
              <div>View: {configState.isInsideView ? 'Inside' : 'Outside'}</div>
              <div>Environment: {environment}</div>
              <div>Weather: {weatherEffects.type}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterConfigurator;
