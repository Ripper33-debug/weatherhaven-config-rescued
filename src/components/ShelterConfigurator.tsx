import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { User, Shelter, InteriorConfig, ShelterConfiguration } from '../App';
import { getInteriorsForShelter } from '../config/interiors';
import ModelViewer, { ModelViewerScene } from './ModelViewer';
import Controls from './Controls';
import LoadingSpinner from './LoadingSpinner';
import ARVRMode from './ARVRMode';
import DemoMode from './DemoMode';
import { useCollaboration } from './CollaborationProvider';
import BreadcrumbNav from './BreadcrumbNav';
import LeadTimeCalculator from './LeadTimeCalculator';
import SmartAssistant from './SmartAssistant';
import CustomAI from './CustomAI';
import CRMIntegration from './CRMIntegration';
import PerformanceOptimizer from './PerformanceOptimizer';
import './CommandCenter.css';

interface ShelterConfiguratorProps {
  user: User;
  shelter: Shelter;
  selectedConfiguration?: ShelterConfiguration;
  onBack: () => void;
  onLogout: () => void;
}

export interface ConfiguratorState {
  isDeployed: boolean;
  isInsideView: boolean;
  color: string;
  isLoading: boolean;
  selectedInterior?: InteriorConfig;
}

const ShelterConfigurator: React.FC<ShelterConfiguratorProps> = ({
  user,
  shelter,
  selectedConfiguration,
  onBack,
  onLogout
}) => {
  const [configState, setConfigState] = useState<ConfiguratorState>({
    isDeployed: true,
    isInsideView: false,
    color: '#d2b48c',
    isLoading: true,
    selectedInterior: undefined,
  });

  // Get available interiors for this shelter
  const availableInteriors = getInteriorsForShelter(shelter.category);

  const [isARVRMode, setIsARVRMode] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showLeadTimeCalculator, setShowLeadTimeCalculator] = useState(false);
  const [showScale, setShowScale] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [environment, setEnvironment] = useState<'day' | 'night' | 'desert' | 'arctic' | 'jungle'>('day');
  
  // Collapsible section states
  const [environmentExpanded, setEnvironmentExpanded] = useState(true);
  const [weatherExpanded, setWeatherExpanded] = useState(false);
  const [lightingExpanded, setLightingExpanded] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  
  // Lighting controls state
  const [lightingControls, setLightingControls] = useState({
    lightPosition: [10, 10, 5] as [number, number, number],
    lightIntensity: 1.2,
    ambientIntensity: 0.8,
    shadowBias: -0.0005,
    shadowMapSize: 4096,
    shadowRadius: 2,
    sunPosition: [100, 20, 100] as [number, number, number],
    skyTurbidity: 6,
    skyRayleigh: 1.5,
    skyMieCoefficient: 0.005,
    skyMieDirectionalG: 0.8
  });
  
  // Weather effects state
  const [weatherEffects, setWeatherEffects] = useState({
    type: 'none' as 'none' | 'rain' | 'snow' | 'dust' | 'storm' | 'fog',
    intensity: 0.5,
    windSpeed: 1.0,
    windDirection: [0, 0, 1] as [number, number, number],
    particleSize: undefined as number | undefined,
    particleColor: undefined as string | undefined
  });
  
  // Collaboration context
  const collaboration = useCollaboration();

  const handleToggleDeploy = () => {
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleToggleView = () => {
    setConfigState(prev => ({ ...prev, isInsideView: !prev.isInsideView }));
  };

  const handleColorChange = (color: string) => {
    setConfigState(prev => ({ ...prev, color }));
    setShowColorPicker(false);
  };

  const handleInteriorChange = (interior: InteriorConfig) => {
    setConfigState(prev => ({ ...prev, selectedInterior: interior }));
  };

  const handleConfigurationChange = (configuration: ShelterConfiguration) => {
    // Apply configuration settings
    setConfigState(prev => ({
      ...prev,
      // Configuration change logic will be implemented when interior models are available
    }));
  };

  const handleModelLoaded = () => {
    setConfigState(prev => ({ ...prev, isLoading: false }));
  };

  const handleARVRMode = () => {
    setIsARVRMode(true);
  };

  const handleExitARVR = () => {
    setIsARVRMode(false);
  };

  const handleDemoMode = () => {
    setIsDemoMode(true);
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
  };

  const handleCollaborationToggle = () => {
    if (collaboration.isCollaborating) {
      collaboration.leaveSession();
    } else {
      const sessionId = prompt('Enter session ID to join (or leave empty to create new):') || 
                       Math.random().toString(36).substring(2, 15);
      collaboration.joinSession(sessionId);
    }
  };

  // If in AR/VR mode, render the AR/VR component
  if (isARVRMode) {
    return (
      <ARVRMode
        configState={configState}
        shelter={shelter}
        onModelLoaded={handleModelLoaded}
        onExit={handleExitARVR}
      />
    );
  }

  // If in demo mode, render the demo component
  if (isDemoMode) {
    return (
      <DemoMode
        configState={configState}
        shelter={shelter}
        onModelLoaded={handleModelLoaded}
        onExit={handleExitDemo}
      />
    );
  }

  return (
    <div className="fullscreen-configurator">
      {/* Single Clean Header */}
      <header className="configurator-header">
        <div className="header-left">
          <button onClick={onBack} className="back-button">
            ← Back to Command Center
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
            <span>🏠</span>
            <span>BACK TO HOME</span>
          </button>
        </div>
      </header>

      {/* Configuration Quick Select */}
      {shelter.configurations && shelter.configurations.length > 0 && (
        <div className="quick-config-selector">
          <select 
            className="config-select"
            value={selectedConfiguration?.id || ''}
            onChange={(e) => {
              const selectedConfig = shelter.configurations?.find(config => config.id === e.target.value);
              if (selectedConfig) {
                handleConfigurationChange(selectedConfig);
              }
            }}
          >
            <option value="">Select Configuration</option>
            {shelter.configurations.map(config => (
              <option key={config.id} value={config.id}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Full Screen 3D Canvas */}
      <div className="fullscreen-canvas">
        <Canvas
          camera={{ position: [0, 0.2, 6], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={null}>
            <ModelViewerScene
              modelPath={shelter.modelPath || '/models/trecc.glb'}
              interiorPath={configState.selectedInterior?.modelPath}
              onLoad={handleModelLoaded}
              color={configState.color}
              isDeployed={configState.isDeployed}
              autoRotate={false}
              showAnnotations={true}
              showMeasurements={true}
              explodedView={false}
              environment={environment}
              weather={weatherEffects.type}
              lighting={lightingControls}
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

      {/* Right Side - Main Controls Panel */}
      <div className="right-controls">
        {/* Deploy/View Controls - Prominently placed at top */}
        <div className="main-control-section">
          <h3 className="section-title">🚀 Deployment & View</h3>
          <div className="deploy-controls">
            <button
              className={`deploy-btn ${configState.isDeployed ? 'active' : ''}`}
              onClick={handleToggleDeploy}
              title="Toggle Deployed/Undeployed View"
            >
              <span className="btn-icon">🚀</span>
              <span className="btn-text">{configState.isDeployed ? 'Deployed' : 'Undeployed'}</span>
            </button>
            
            <button
              className={`view-btn ${configState.isInsideView ? 'active' : ''}`}
              onClick={handleToggleView}
              title="View Inside/Outside"
            >
              <span className="btn-icon">👁️</span>
              <span className="btn-text">{configState.isInsideView ? 'Outside View' : 'Inside View'}</span>
            </button>
          </div>
        </div>

        {/* Color Selection */}
        <div className="main-control-section">
          <h3 className="section-title">🎨 Color Selection</h3>
          <div className="color-controls">
            <div className="color-options">
              <button
                className={`color-btn ${configState.color === '#2F4F2F' ? 'active' : ''}`}
                onClick={() => handleColorChange('#2F4F2F')}
                style={{ backgroundColor: '#2F4F2F' }}
                title="Dark Military Green"
              >
                Military Green
              </button>
              <button
                className={`color-btn ${configState.color === '#D2B48C' ? 'active' : ''}`}
                onClick={() => handleColorChange('#D2B48C')}
                style={{ backgroundColor: '#D2B48C' }}
                title="Matte Tan"
              >
                Matte Tan
              </button>
              <button
                className={`color-btn ${configState.color === '#FFFFFF' ? 'active' : ''}`}
                onClick={() => handleColorChange('#FFFFFF')}
                style={{ backgroundColor: '#FFFFFF', color: '#000' }}
                title="Matte White"
              >
                Matte White
              </button>
            </div>
          </div>
        </div>

        {/* Interior Selection */}
        {availableInteriors.length > 0 && (
          <div className="main-control-section">
            <h3 className="section-title">🏠 Interior Configuration</h3>
            <div className="interior-controls">
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
          </div>
        )}

        {/* Debug Panel */}
        <div className="main-control-section">
          <h3 className="section-title">🔧 Debug Info</h3>
          <div className="debug-info">
            <div className="debug-item">
              <span className="debug-label">Current Color:</span>
              <span className="debug-value" style={{ color: configState.color }}>
                {configState.color}
              </span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Deployment:</span>
              <span className="debug-value">
                {configState.isDeployed ? 'Deployed' : 'Undeployed'}
              </span>
            </div>
            <div className="debug-item">
              <span className="debug-label">View Mode:</span>
              <span className="debug-value">
                {configState.isInsideView ? 'Inside' : 'Outside'}
              </span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Environment:</span>
              <span className="debug-value">{environment}</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Weather:</span>
              <span className="debug-value">{weatherEffects.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Environment Controls */}
      <div className="left-controls">
        
        {/* Environment Presets */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => setEnvironmentExpanded(!environmentExpanded)}>
            <h3 className="section-title">🌍 Environment</h3>
            <span className="expand-icon">{environmentExpanded ? '−' : '+'}</span>
          </div>
          {environmentExpanded && (
            <div className="section-content">
              <div className="preset-buttons">
                <button 
                  className={`preset-btn ${environment === 'day' ? 'active' : ''}`}
                  onClick={() => setEnvironment('day')}
                >
                  ☀️ Day
                </button>
                <button 
                  className={`preset-btn ${environment === 'night' ? 'active' : ''}`}
                  onClick={() => setEnvironment('night')}
                >
                  🌙 Night
                </button>
                <button 
                  className={`preset-btn ${environment === 'desert' ? 'active' : ''}`}
                  onClick={() => setEnvironment('desert')}
                >
                  🏜️ Desert
                </button>
                <button 
                  className={`preset-btn ${environment === 'arctic' ? 'active' : ''}`}
                  onClick={() => setEnvironment('arctic')}
                >
                  ❄️ Arctic
                </button>
                <button 
                  className={`preset-btn ${environment === 'jungle' ? 'active' : ''}`}
                  onClick={() => setEnvironment('jungle')}
                >
                  🌴 Jungle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Weather Effects */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => setWeatherExpanded(!weatherExpanded)}>
            <h3 className="section-title">🌤️ Weather</h3>
            <span className="expand-icon">{weatherExpanded ? '−' : '+'}</span>
          </div>
          {weatherExpanded && (
            <div className="section-content">
              <div className="weather-presets">
                <button 
                  className={`weather-btn ${weatherEffects.type === 'none' ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: 'none' }))}
                >
                  ☀️ Clear
                </button>
                <button 
                  className={`weather-btn ${weatherEffects.type === 'rain' ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: 'rain' }))}
                >
                  🌧️ Rain
                </button>
                <button 
                  className={`weather-btn ${weatherEffects.type === 'snow' ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: 'snow' }))}
                >
                  ❄️ Snow
                </button>
                <button 
                  className={`weather-btn ${weatherEffects.type === 'storm' ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: 'storm' }))}
                >
                  ⛈️ Storm
                </button>
                <button 
                  className={`weather-btn ${weatherEffects.type === 'fog' ? 'active' : ''}`}
                  onClick={() => setWeatherEffects(prev => ({ ...prev, type: 'fog' }))}
                >
                  🌫️ Fog
                </button>
              </div>
              
              {weatherEffects.type !== 'none' && (
                <div className="weather-sliders">
                  <div className="slider-group">
                    <label>💨 Intensity: {weatherEffects.intensity.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={weatherEffects.intensity}
                      onChange={(e) => setWeatherEffects(prev => ({ ...prev, intensity: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="slider-group">
                    <label>🌪️ Wind: {weatherEffects.windSpeed.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={weatherEffects.windSpeed}
                      onChange={(e) => setWeatherEffects(prev => ({ ...prev, windSpeed: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sun & Lighting */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => setLightingExpanded(!lightingExpanded)}>
            <h3 className="section-title">☀️ Sun & Lighting</h3>
            <span className="expand-icon">{lightingExpanded ? '−' : '+'}</span>
          </div>
          {lightingExpanded && (
            <div className="section-content">
              {/* Sun Position Presets */}
              <div className="sun-presets">
                <button 
                  className="sun-btn"
                  onClick={() => setLightingControls(prev => ({ 
                    ...prev, 
                    sunPosition: [100, 50, 100] 
                  }))}
                >
                  🌅 Sunrise
                </button>
                <button 
                  className="sun-btn"
                  onClick={() => setLightingControls(prev => ({ 
                    ...prev, 
                    sunPosition: [0, 100, 0] 
                  }))}
                >
                  ☀️ Noon
                </button>
                <button 
                  className="sun-btn"
                  onClick={() => setLightingControls(prev => ({ 
                    ...prev, 
                    sunPosition: [-100, 50, 100] 
                  }))}
                >
                  🌇 Sunset
                </button>
                <button 
                  className="sun-btn"
                  onClick={() => setLightingControls(prev => ({ 
                    ...prev, 
                    sunPosition: [0, -50, 0] 
                  }))}
                >
                  🌃 Night
                </button>
              </div>

              {/* Simple Lighting Controls */}
              <div className="lighting-sliders">
                <div className="slider-group">
                  <label>💡 Brightness: {lightingControls.lightIntensity.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={lightingControls.lightIntensity}
                    onChange={(e) => setLightingControls(prev => ({ ...prev, lightIntensity: parseFloat(e.target.value) }))}
                  />
                </div>
                <div className="slider-group">
                  <label>🌅 Ambient: {lightingControls.ambientIntensity.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={lightingControls.ambientIntensity}
                    onChange={(e) => setLightingControls(prev => ({ ...prev, ambientIntensity: parseFloat(e.target.value) }))}
                  />
                </div>
                <div className="slider-group">
                  <label>🌫️ Sky: {lightingControls.skyTurbidity}</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={lightingControls.skyTurbidity}
                    onChange={(e) => setLightingControls(prev => ({ ...prev, skyTurbidity: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Shadow Quality */}
              <div className="shadow-controls">
                <label>🕶️ Shadow Quality:</label>
                <select
                  className="quality-select"
                  value={lightingControls.shadowMapSize}
                  onChange={(e) => setLightingControls(prev => ({ ...prev, shadowMapSize: parseInt(e.target.value) }))}
                >
                  <option value={1024}>Low</option>
                  <option value={2048}>Medium</option>
                  <option value={4096}>High</option>
                  <option value={8192}>Ultra</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Features */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => setAdvancedExpanded(!advancedExpanded)}>
            <h3 className="section-title">⚙️ Advanced</h3>
            <span className="expand-icon">{advancedExpanded ? '−' : '+'}</span>
          </div>
          {advancedExpanded && (
            <div className="section-content">
              <button 
                className="advanced-button"
                onClick={handleDemoMode}
              >
                <span className="icon-demo"></span>
                Demo Mode
              </button>
              
              <button 
                className="advanced-button"
                onClick={handleARVRMode}
              >
                <span className="icon-vr"></span>
                AR/VR Mode
              </button>
              
              <button 
                className={`advanced-button ${showCollaboration ? 'active' : ''}`}
                onClick={() => setShowCollaboration(!showCollaboration)}
              >
                <span className="icon-collaboration"></span>
                Collaboration
              </button>
              
              <button 
                className="advanced-button"
                onClick={() => setShowLeadTimeCalculator(true)}
              >
                <span>⏱️</span>
                Lead Time
              </button>
              
              <button 
                className={`advanced-button ${showScale ? 'active' : ''}`}
                onClick={() => setShowScale(!showScale)}
              >
                <span>📏</span>
                Scale
              </button>
              
              {collaboration.isCollaborating && (
                <div className="session-info">
                  Session: {collaboration.sessionId}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Left Side - Color Options */}
      <div className="right-color-panel">
        <h3 className="color-panel-title">🎨 Exterior Colors</h3>
        
        {/* Matte Color Options */}
        <div className="matte-colors">
          <h4>Matte Finishes</h4>
          <div className="color-grid">
            <div className="color-option">
              <button
                className={`color-button ${configState.color === '#2F4F2F' ? 'active' : ''}`}
                onClick={() => handleColorChange('#2F4F2F')}
                style={{ backgroundColor: '#2F4F2F' }}
                title="Dark Military Green (Matte)"
              />
              <span className="color-name">Dark Military Green</span>
              <span className="color-finish">Matte</span>
            </div>
            
            <div className="color-option">
              <button
                className={`color-button ${configState.color === '#D2B48C' ? 'active' : ''}`}
                onClick={() => handleColorChange('#D2B48C')}
                style={{ backgroundColor: '#D2B48C' }}
                title="Matte Tan"
              />
              <span className="color-name">Matte Tan</span>
              <span className="color-finish">Matte</span>
            </div>
            
            <div className="color-option">
              <button
                className={`color-button ${configState.color === '#FFFFFF' ? 'active' : ''}`}
                onClick={() => handleColorChange('#FFFFFF')}
                style={{ backgroundColor: '#FFFFFF' }}
                title="Matte White"
              />
              <span className="color-name">Matte White</span>
              <span className="color-finish">Matte</span>
            </div>
          </div>
        </div>

        {/* Custom Color Option */}
        <div className="custom-color-section">
          <h4>Custom Colors</h4>
          <div className="custom-color-option">
            <button
              className={`color-button custom ${configState.color !== '#2F4F2F' && configState.color !== '#D2B48C' && configState.color !== '#FFFFFF' ? 'active' : ''}`}
              onClick={() => setShowColorPicker(true)}
              style={{ 
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)',
                position: 'relative'
              }}
              title="Custom Color (+$10,000)"
            >
              <span className="custom-badge">$10K</span>
            </button>
            <span className="color-name">Custom Color</span>
            <span className="color-price">+$10,000</span>
            <span className="color-description">Any color you specify</span>
          </div>
        </div>

        {/* Color Picker Modal */}
        {showColorPicker && (
          <div className="color-picker-modal">
            <div className="color-picker-content">
              <h4>Choose Custom Color</h4>
              <input
                type="color"
                value={configState.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="color-input"
              />
              <div className="color-picker-actions">
                <button onClick={() => setShowColorPicker(false)}>Apply</button>
                <button onClick={() => setShowColorPicker(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="configurator-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>Drag to rotate • Scroll to zoom • Click to interact</p>
            <p>CLASSIFIED MILITARY SYSTEM • WEATHERHAVEN TECHNOLOGIES • {shelter.name}</p>
          </div>
          
          <div className="footer-right">
            <div className="footer-buttons">
              <button 
                className="footer-btn performance-btn"
                onClick={() => setShowLeadTimeCalculator(true)}
                title="Performance Metrics"
              >
                <span className="btn-icon">📊</span>
                <span className="btn-text">Performance</span>
              </button>
              
              <button 
                className="footer-btn crm-btn"
                onClick={() => {/* CRM Integration */}}
                title="CRM Integration"
              >
                <span className="btn-icon">📋</span>
                <span className="btn-text">CRM</span>
              </button>
              
              <button 
                className="footer-btn assistant-btn"
                onClick={() => {/* Smart Assistant */}}
                title="AI Assistant"
              >
                <span className="btn-icon">🤖</span>
                <span className="btn-text">Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Smart Configuration Assistant */}
      <SmartAssistant
        onConfigurationSuggested={(config) => {
          console.log('AI suggested configuration:', config);
          // Apply the suggested configuration
        }}
        availableShelters={[shelter]}
        availableInteriors={availableInteriors}
      />

      {/* Custom AI Assistant */}
      <CustomAI
        onConfigurationSuggested={(config) => {
          console.log('Custom AI suggested configuration:', config);
          // Apply the suggested configuration
        }}
      />

      {/* CRM Integration */}
      <CRMIntegration
        user={user}
        shelter={shelter}
        configuration={configState}
        onQuoteGenerated={(quote) => {
          console.log('Quote generated:', quote);
        }}
        onLeadCreated={(lead) => {
          console.log('Lead created:', lead);
        }}
      />

      {/* Performance Optimizer */}
      <PerformanceOptimizer
        onOptimizationApplied={(optimizations) => {
          console.log('Performance optimizations applied:', optimizations);
        }}
        onPerformanceMetrics={(metrics) => {
          console.log('Performance metrics:', metrics);
        }}
      />

      {/* Lead Time Calculator */}
      <LeadTimeCalculator
        shelter={shelter}
        configuration={selectedConfiguration}
        isVisible={showLeadTimeCalculator}
        onClose={() => setShowLeadTimeCalculator(false)}
      />
    </div>
  );
};

export default ShelterConfigurator;
