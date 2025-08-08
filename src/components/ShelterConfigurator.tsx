import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { User, Shelter } from '../App';
import ModelViewer from './ModelViewer';
import Controls from './Controls';
import LoadingSpinner from './LoadingSpinner';
import ARVRMode from './ARVRMode';
import DemoMode from './DemoMode';
import { useCollaboration } from './CollaborationProvider';

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

  const [isARVRMode, setIsARVRMode] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  
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
            <span>🚪</span>
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

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

      {/* Advanced Controls */}
      <div className="advanced-controls">
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
          <p>CLASSIFIED MILITARY SYSTEM • {shelter.name}</p>
        </div>
      </footer>
    </div>
  );
};

export default ShelterConfigurator;
