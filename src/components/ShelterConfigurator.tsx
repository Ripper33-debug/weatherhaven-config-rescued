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

  // Add error state
  const [error, setError] = useState<string | null>(null);

  // Simplified state
  const [configState, setConfigState] = useState<ConfigState>({
    color: '#D2B48C',
    isDeployed: false,
    isInteriorView: false,
    isInsideView: false,
  });

  // Military-style color options
  const colorOptions = [
    { name: 'Desert Tan', value: '#D2B48C' },
    { name: 'OD Green', value: '#556B2F' },
    { name: 'Coyote Brown', value: '#8B4513' },
  ];

  // Simple handlers with error handling
  const handleColorChange = (newColor: string) => {
    try {
      console.log('🎨 Color change requested:', newColor);
      console.log('🎨 Previous color was:', configState.color);
      setConfigState(prev => {
        console.log('🎨 Setting new color:', newColor);
        return { ...prev, color: newColor };
      });
    } catch (err) {
      console.error('❌ Error in handleColorChange:', err);
      setError('Failed to change color');
    }
  };

  const handleDeployToggle = () => {
    try {
      console.log('🚀 Deploy toggle');
      setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
    } catch (err) {
      console.error('❌ Error in handleDeployToggle:', err);
      setError('Failed to toggle deployment');
    }
  };

  const handleInteriorViewToggle = () => {
    try {
      console.log('🏠 Interior view toggle');
      setConfigState(prev => ({ ...prev, isInteriorView: !prev.isInteriorView }));
    } catch (err) {
      console.error('❌ Error in handleInteriorViewToggle:', err);
      setError('Failed to toggle interior view');
    }
  };

  // Determine model path
  const getModelPath = () => {
    try {
      if (configState.isInteriorView) {
        return "/models/trecc-open.glb";
      }
      return configState.isDeployed ? "/models/trecc-open.glb" : "/models/trecc.glb";
    } catch (err) {
      console.error('❌ Error in getModelPath:', err);
      return "/models/trecc.glb"; // fallback
    }
  };

  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());
  console.log('🎨 Color being passed to ModelViewerScene:', configState.color);

  // Show error if there is one
  if (error) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        textAlign: 'center'
      }}>
        <div>
          <h2>Error: {error}</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '1rem 2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="configurator-container" style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      {/* Main Layout */}
      <div className="configurator-main" style={{
        flex: 1,
        display: 'flex',
        height: '100%'
      }}>
        {/* 3D Viewer Section */}
        <div className="viewer-section" style={{
          flex: 1,
          position: 'relative',
          height: '100%'
        }}>
          <Canvas
            camera={{ position: [5, 3, 5], fov: 50 }}
            shadows
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false
            }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
                         <ModelViewerScene
               modelPath={configState.isDeployed ? "/models/trecc-open.glb" : "/models/trecc.glb"}
               color={configState.color}
               isDeployed={configState.isDeployed}
               environment="studio"
               weather="none"
               lighting={{}}
               background3D={{}}
             />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel" style={{
          width: '350px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          overflowY: 'auto'
        }}>
          {/* Deploy/Interior Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
               className="interior-btn"
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
              {configState.isInteriorView ? '🏠 Exterior View' : '🏠 Interior View'}
            </button>
          </div>

          {/* Color Selection */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Shelter Color
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}>
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                                     className={`color-btn ${configState.color === colorOption.value ? 'active' : ''}`}
                   onClick={() => handleColorChange(colorOption.value)}
                  style={{
                    padding: '1rem',
                    background: configState.color === colorOption.value
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${configState.color === colorOption.value ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
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
                  <div style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: colorOption.value,
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }} />
                  {colorOption.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              className="lead-times-btn"
              onClick={() => window.open('/contact', '_blank')}
              style={{
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
              📞 Lead Times
            </button>

            <button
              className="back-home-btn"
              onClick={() => window.location.href = '/'}
              style={{
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
