import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { User, Shelter, InteriorConfig, ShelterConfiguration } from '../App';
import { getInteriorsForShelter } from '../config/interiors';
import ModelViewer from './ModelViewer';
import Controls from './Controls';
import LoadingSpinner from './LoadingSpinner';
import ARVRMode from './ARVRMode';
import DemoMode from './DemoMode';
import { useCollaboration } from './CollaborationProvider';
import BreadcrumbNav from './BreadcrumbNav';
import LeadTimeCalculator from './LeadTimeCalculator';
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
  const [environment, setEnvironment] = useState<'day' | 'night' | 'desert' | 'arctic' | 'jungle'>('day');
  
  // Lighting controls state
  const [lightingControls, setLightingControls] = useState({
    lightPosition: [10, 10, 5] as [number, number, number],
    lightIntensity: 1.2,
    ambientIntensity: 0.8,
    shadowBias: -0.0001,
    shadowMapSize: 2048,
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
  };

  const handleInteriorChange = (interior: InteriorConfig) => {
    setConfigState(prev => ({ ...prev, selectedInterior: interior }));
  };

  const handleConfigurationChange = (configuration: ShelterConfiguration) => {
    // Update the selected configuration
    // This would typically update the model or interior
    // Configuration change logic will be implemented when interior models are available
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
            <span>🏠</span>
            <span>BACK TO HOME</span>
          </button>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        items={[
          { 
            label: 'Command Center', 
            path: '/command-center',
            onClick: onBack
          },
          { 
            label: shelter.name, 
            path: `/configurator/${shelter.id}` 
          }
        ]} 
      />

      {/* Configuration Selection */}
      {shelter.configurations && shelter.configurations.length > 0 && (
        <div className="configuration-selector">
          <div className="configuration-selector-content">
            <label className="configuration-label">Select Configuration:</label>
            <select 
              className="configuration-dropdown"
              value={selectedConfiguration?.id || ''}
              onChange={(e) => {
                const selectedConfig = shelter.configurations?.find(config => config.id === e.target.value);
                if (selectedConfig) {
                  handleConfigurationChange(selectedConfig);
                }
              }}
            >
              <option value="">Choose configuration...</option>
              {shelter.configurations.map(config => (
                <option key={config.id} value={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
            {selectedConfiguration && (
              <div className="selected-config-info">
                <p>{selectedConfiguration.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collaboration Panel */}
      {showCollaboration && (
        <div className="collaboration-panel">
          <div className="collaboration-header">
            <h3>Live Collaboration</h3>
            <div className="collaboration-status">
              <div className={`status-indicator ${collaboration.isCollaborating ? '' : 'offline'}`}></div>
              {collaboration.isCollaborating ? 'Connected' : 'Offline'}
            </div>
          </div>
          
          {collaboration.isCollaborating && (
            <>
              <div className="active-users">
                <h4>Active Users ({collaboration.activeUsers.length})</h4>
                {collaboration.activeUsers.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="user-avatar">
                      {user.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.user.username}</div>
                      <div className="user-rank">{user.user.rank}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="collaboration-controls">
                <button 
                  className="collab-button"
                  onClick={() => collaboration.shareConfiguration(configState)}
                >
                  Share Config
                </button>
                <button 
                  className="collab-button"
                  onClick={() => setShowCollaboration(false)}
                >
                  Hide Panel
                </button>
              </div>
            </>
          )}
          
          {!collaboration.isCollaborating && (
            <div className="collaboration-controls">
              <button 
                className="collab-button"
                onClick={handleCollaborationToggle}
              >
                Start Session
              </button>
              <button 
                className="collab-button"
                onClick={() => setShowCollaboration(false)}
              >
                Hide Panel
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0.2, 6], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={null}>
            <ModelViewer
              configState={configState}
              onModelLoaded={handleModelLoaded}
              shelter={shelter}
              showScale={showScale}
              environment={environment}
              lightingControls={lightingControls}
              weatherEffects={weatherEffects}
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
        shelter={shelter}
        availableInteriors={availableInteriors}
        onToggleDeploy={handleToggleDeploy}
        onToggleView={handleToggleView}
        onColorChange={handleColorChange}
        onInteriorChange={handleInteriorChange}
        user={user}
      />

      {/* Advanced Controls */}
      <div className="advanced-controls">
        <div className="environment-control">
          <label className="env-label">Environment</label>
          <select
            className="configuration-dropdown"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as any)}
            aria-label="Environment"
          >
            <option value="day">Day</option>
            <option value="night">Night</option>
            <option value="desert">Desert</option>
            <option value="arctic">Arctic</option>
            <option value="jungle">Jungle</option>
          </select>
        </div>
        
        {/* Weather Effects Control */}
        <div className="weather-control">
          <label className="env-label">Weather</label>
          <select
            className="configuration-dropdown"
            value={weatherEffects.type}
            onChange={(e) => setWeatherEffects(prev => ({ ...prev, type: e.target.value as any }))}
            aria-label="Weather"
          >
            <option value="none">Clear</option>
            <option value="rain">Rain</option>
            <option value="snow">Snow</option>
            <option value="dust">Dust</option>
            <option value="storm">Storm</option>
            <option value="fog">Fog</option>
          </select>
          {weatherEffects.type !== 'none' && (
            <div className="weather-sliders">
              <label>Intensity: {weatherEffects.intensity.toFixed(1)}</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={weatherEffects.intensity}
                onChange={(e) => setWeatherEffects(prev => ({ ...prev, intensity: parseFloat(e.target.value) }))}
              />
              <label>Wind Speed: {weatherEffects.windSpeed.toFixed(1)}</label>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={weatherEffects.windSpeed}
                onChange={(e) => setWeatherEffects(prev => ({ ...prev, windSpeed: parseFloat(e.target.value) }))}
              />
              <label>Particle Size: {weatherEffects.particleSize || 'Auto'}</label>
              <input
                type="range"
                min="0.01"
                max="0.3"
                step="0.01"
                value={weatherEffects.particleSize || 0.05}
                onChange={(e) => setWeatherEffects(prev => ({ ...prev, particleSize: parseFloat(e.target.value) }))}
              />
              <label>Wind Direction X: {weatherEffects.windDirection[0].toFixed(1)}</label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={weatherEffects.windDirection[0]}
                onChange={(e) => setWeatherEffects(prev => ({ 
                  ...prev, 
                  windDirection: [parseFloat(e.target.value), prev.windDirection[1], prev.windDirection[2]] 
                }))}
              />
              <label>Wind Direction Z: {weatherEffects.windDirection[2].toFixed(1)}</label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={weatherEffects.windDirection[2]}
                onChange={(e) => setWeatherEffects(prev => ({ 
                  ...prev, 
                  windDirection: [prev.windDirection[0], prev.windDirection[1], parseFloat(e.target.value)] 
                }))}
              />
            </div>
          )}
        </div>
        
        {/* Lighting Controls */}
        <div className="lighting-control">
          <label className="env-label">Lighting & Sun</label>
          <div className="lighting-sliders">
            <label>Light Intensity: {lightingControls.lightIntensity.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={lightingControls.lightIntensity}
              onChange={(e) => setLightingControls(prev => ({ ...prev, lightIntensity: parseFloat(e.target.value) }))}
            />
            <label>Ambient: {lightingControls.ambientIntensity.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={lightingControls.ambientIntensity}
              onChange={(e) => setLightingControls(prev => ({ ...prev, ambientIntensity: parseFloat(e.target.value) }))}
            />
            <label>Sun Position X: {lightingControls.sunPosition[0]}</label>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={lightingControls.sunPosition[0]}
              onChange={(e) => setLightingControls(prev => ({ 
                ...prev, 
                sunPosition: [parseInt(e.target.value), prev.sunPosition[1], prev.sunPosition[2]] 
              }))}
            />
            <label>Sun Position Y: {lightingControls.sunPosition[1]}</label>
            <input
              type="range"
              min="-50"
              max="100"
              step="5"
              value={lightingControls.sunPosition[1]}
              onChange={(e) => setLightingControls(prev => ({ 
                ...prev, 
                sunPosition: [prev.sunPosition[0], parseInt(e.target.value), prev.sunPosition[2]] 
              }))}
            />
            <label>Sun Position Z: {lightingControls.sunPosition[2]}</label>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={lightingControls.sunPosition[2]}
              onChange={(e) => setLightingControls(prev => ({ 
                ...prev, 
                sunPosition: [prev.sunPosition[0], prev.sunPosition[1], parseInt(e.target.value)] 
              }))}
            />
            <label>Sky Turbidity: {lightingControls.skyTurbidity}</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={lightingControls.skyTurbidity}
              onChange={(e) => setLightingControls(prev => ({ ...prev, skyTurbidity: parseInt(e.target.value) }))}
            />
            <label>Shadow Quality: {lightingControls.shadowMapSize}</label>
            <select
              value={lightingControls.shadowMapSize}
              onChange={(e) => setLightingControls(prev => ({ ...prev, shadowMapSize: parseInt(e.target.value) }))}
            >
              <option value={1024}>Low</option>
              <option value={2048}>Medium</option>
              <option value={4096}>High</option>
            </select>
          </div>
        </div>
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

      {/* Footer */}
      <footer className="configurator-footer">
        <div>
          <p>Drag to rotate • Scroll to zoom • Click to interact</p>
          <p>CLASSIFIED MILITARY SYSTEM • WEATHERHAVEN TECHNOLOGIES • {shelter.name}</p>
        </div>
      </footer>

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
