import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ModelViewerScene } from './ModelViewer';

interface ConfigState {
  color: string;
  isDeployed: boolean;
  isInsideView: boolean;
  isInteriorView: boolean;
  selectedInterior?: any;
}

const ShelterConfigurator: React.FC = () => {
  const [configState, setConfigState] = useState<ConfigState>({
    color: '#8B7355',
    isDeployed: false,
    isInsideView: false,
    isInteriorView: false,
  });

  const [environment, setEnvironment] = useState<'day' | 'night' | 'desert' | 'arctic' | 'jungle'>('day');
  const [weatherEffects, setWeatherEffects] = useState({
    type: 'none' as 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog',
    intensity: 0.5,
    windSpeed: 1,
    windDirection: [1, 0, 0] as [number, number, number],
  });

  const [lightingControls, setLightingControls] = useState({
    lightPosition: [10, 10, 5] as [number, number, number],
    lightIntensity: 1.2,
    ambientIntensity: 0.6,
    sunPosition: [100, 20, 100] as [number, number, number],
    skyTurbidity: 6,
    skyRayleigh: 1.5,
    skyMieCoefficient: 0.005,
    skyMieDirectionalG: 0.8,
    sunColor: '#ffffff',
    ambientColor: '#87CEEB',
    shadowQuality: 'high' as 'low' | 'medium' | 'high',
    exposure: 1.0,
    gamma: 2.2,
  });

  const [background3D, setBackground3D] = useState({
    type: 'studio' as 'studio' | 'outdoor' | 'military' | 'desert' | 'arctic' | 'urban',
    groundTexture: 'concrete' as 'concrete' | 'grass' | 'sand' | 'snow' | 'asphalt',
    skybox: 'day' as 'day' | 'night' | 'sunset' | 'storm' | 'clear',
    fog: {
      enabled: false,
      density: 0.01,
      color: '#87CEEB',
    },
  });

  const availableInteriors: any[] = [];

  const handleColorChange = (newColor: string) => {
    console.log('🎨 Color change triggered:', newColor);
    setConfigState(prev => ({ ...prev, color: newColor }));
  };

  const handleDeployToggle = () => {
    console.log('🚀 Deploy toggle triggered');
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleViewToggle = () => {
    setConfigState(prev => ({ ...prev, isInsideView: !prev.isInsideView }));
  };

  const handleInteriorViewToggle = () => {
    console.log('🏠 Interior view toggle triggered');
    setConfigState(prev => ({ ...prev, isInteriorView: !prev.isInteriorView }));
  };

  const handleInteriorChange = (interior: any) => {
    setConfigState(prev => ({ ...prev, selectedInterior: interior }));
  };

  const colorOptions = [
    { name: 'Military Tan', value: '#8B7355' },
    { name: 'OD Green', value: '#2F4F2F' },
    { name: 'Field Gray', value: '#696969' },
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
                modelPath={
                  configState.isInteriorView 
                    ? "/models/interior.glb" // Interior-only model (you'll create this)
                    : configState.isDeployed 
                      ? "/models/trecc-open.glb" 
                      : "/models/trecc.glb"
                }
                color={configState.color}
                isDeployed={configState.isDeployed}
                environment={environment}
                weather={weatherEffects.type}
                lighting={lightingControls}
                background3D={background3D}
              />
              {/* Debug info */}
              <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', color: 'white', padding: 10, borderRadius: 5, fontSize: 12 }}>
                <div>Deployed: {configState.isDeployed ? 'Yes' : 'No'}</div>
                <div>Interior View: {configState.isInteriorView ? 'Yes' : 'No'}</div>
                <div>Model: {
                  configState.isInteriorView 
                    ? 'interior.glb' 
                    : configState.isDeployed 
                      ? 'trecc-open.glb' 
                      : 'trecc.glb'
                }</div>
                <div>Color: {configState.color}</div>
                <div>Environment: {environment}</div>
              </div>
            </Suspense>
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          {/* Deploy Controls - TOP PRIORITY */}
          <div className="control-section deploy-section" style={{ zIndex: 1000, position: 'relative' }}>
            <h3>🚀 Deployment</h3>
            <div className="deploy-buttons">
              <button 
                className={`deploy-btn ${configState.isDeployed ? 'active' : ''}`}
                onClick={handleDeployToggle}
                style={{ zIndex: 1001, position: 'relative' }}
              >
                {configState.isDeployed ? '🔄 Undeploy' : '🚀 Deploy'}
              </button>
              <button 
                className={`view-btn ${configState.isInsideView ? 'active' : ''}`}
                onClick={handleViewToggle}
                style={{ zIndex: 1001, position: 'relative' }}
              >
                {configState.isInsideView ? '👁️ Outside View' : '🏠 Inside View'}
              </button>
              <button 
                className={`interior-btn ${configState.isInteriorView ? 'active' : ''}`}
                onClick={handleInteriorViewToggle}
                style={{ zIndex: 1001, position: 'relative' }}
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
                Light Intensity:
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={lightingControls.lightIntensity * 100}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    lightIntensity: parseFloat(e.target.value) / 100
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
              <label>
                Sun Position X:
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={lightingControls.sunPosition[0]}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    sunPosition: [parseFloat(e.target.value), prev.sunPosition[1], prev.sunPosition[2]]
                  }))}
                />
              </label>
              <label>
                Sun Position Y:
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={lightingControls.sunPosition[1]}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    sunPosition: [prev.sunPosition[0], parseFloat(e.target.value), prev.sunPosition[2]]
                  }))}
                />
              </label>
              <label>
                Sun Position Z:
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={lightingControls.sunPosition[2]}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    sunPosition: [prev.sunPosition[0], prev.sunPosition[1], parseFloat(e.target.value)]
                  }))}
                />
              </label>
              <label>
                Shadow Quality:
                <select
                  value={lightingControls.shadowQuality}
                  onChange={(e) => setLightingControls(prev => ({
                    ...prev,
                    shadowQuality: e.target.value as 'low' | 'medium' | 'high'
                  }))}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
            </div>
          </div>

          {/* 3D Background Controls */}
          <div className="control-section">
            <h3>🌍 3D Background</h3>
            <div className="background-controls">
              <label>
                Scene Type:
                <select
                  value={background3D.type}
                  onChange={(e) => setBackground3D(prev => ({
                    ...prev,
                    type: e.target.value as any
                  }))}
                >
                  <option value="studio">Studio</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="military">Military Base</option>
                  <option value="desert">Desert</option>
                  <option value="arctic">Arctic</option>
                  <option value="urban">Urban</option>
                </select>
              </label>
              <label>
                Ground Texture:
                <select
                  value={background3D.groundTexture}
                  onChange={(e) => setBackground3D(prev => ({
                    ...prev,
                    groundTexture: e.target.value as any
                  }))}
                >
                  <option value="concrete">Concrete</option>
                  <option value="grass">Grass</option>
                  <option value="sand">Sand</option>
                  <option value="snow">Snow</option>
                  <option value="asphalt">Asphalt</option>
                </select>
              </label>
              <label>
                Skybox:
                <select
                  value={background3D.skybox}
                  onChange={(e) => setBackground3D(prev => ({
                    ...prev,
                    skybox: e.target.value as any
                  }))}
                >
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                  <option value="sunset">Sunset</option>
                  <option value="storm">Storm</option>
                  <option value="clear">Clear</option>
                </select>
              </label>
              <div className="fog-controls">
                <label>
                  <input
                    type="checkbox"
                    checked={background3D.fog.enabled}
                    onChange={(e) => setBackground3D(prev => ({
                      ...prev,
                      fog: { ...prev.fog, enabled: e.target.checked }
                    }))}
                  />
                  Enable Fog
                </label>
                {background3D.fog.enabled && (
                  <label>
                    Fog Density:
                    <input
                      type="range"
                      min="0.001"
                      max="0.1"
                      step="0.001"
                      value={background3D.fog.density}
                      onChange={(e) => setBackground3D(prev => ({
                        ...prev,
                        fog: { ...prev.fog, density: parseFloat(e.target.value) }
                      }))}
                    />
                  </label>
                )}
              </div>
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

        {/* Lead Times Button - Bottom Left */}
        <div className="lead-times-button">
          <button 
            className="lead-times-btn"
            onClick={() => {
              // TODO: Implement lead times functionality
              console.log('Lead times clicked');
            }}
          >
            <span className="btn-icon">⏱️</span>
            <span className="btn-text">Lead Times</span>
          </button>
        </div>

        {/* Back to Home Button - Bottom Right */}
        <div className="back-home-button">
          <button 
            className="back-home-btn"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <span className="btn-icon">🏠</span>
            <span className="btn-text">Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShelterConfigurator;
