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
    <div className="configurator-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <div className="configurator-header" style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1.5rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 0.5rem 0',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          TRECC Shelter Configurator
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '1.1rem',
          margin: '0',
          fontWeight: '400'
        }}>
          Customize your shelter with real-time 3D visualization
        </p>
      </div>

      {/* Main Layout */}
      <div className="configurator-main" style={{
        flex: 1,
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* 3D Viewer */}
        <div className="viewer-section" style={{
          flex: 1,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
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
        <div className="controls-panel" style={{
          width: '320px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Deploy Controls */}
          <div className="control-section">
            <h3 style={{
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 1rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🚀 Deployment
            </h3>
            <div className="deploy-buttons" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button 
                className={`deploy-btn ${configState.isDeployed ? 'active' : ''}`}
                onClick={handleDeployToggle}
                style={{
                  padding: '1rem 1.5rem',
                  background: configState.isDeployed 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {configState.isDeployed ? '🔄 Undeploy' : '🚀 Deploy'}
              </button>
              <button 
                className={`interior-btn ${configState.isInteriorView ? 'active' : ''}`}
                onClick={handleInteriorViewToggle}
                style={{
                  padding: '1rem 1.5rem',
                  background: configState.isInteriorView 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {configState.isInteriorView ? '🏠 Exit Interior' : '🏠 Interior Only'}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="control-section">
            <h3 style={{
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 1rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎨 Color
            </h3>
            <div className="color-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}>
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`color-btn ${configState.color === color.value ? 'active' : ''}`}
                  style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: color.value,
                    border: configState.color === color.value 
                      ? '3px solid white' 
                      : '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleColorChange(color.value)}
                  title={color.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '4px',
                    right: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    textAlign: 'center'
                  }}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lead Times Button */}
          <div className="lead-times-button" style={{ marginTop: 'auto' }}>
            <button className="lead-times-btn" style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              📋 Lead Times
            </button>
          </div>

          {/* Back to Home Button */}
          <div className="back-home-button">
            <button 
              className="back-home-btn" 
              onClick={() => window.location.href = '/'}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterConfigurator;
