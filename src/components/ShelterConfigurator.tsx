import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewerScene } from './ModelViewer';
import * as THREE from 'three';

interface ConfigState {
  color: string;
  isDeployed: boolean;
  isInteriorView: boolean;
  isInsideView: boolean;
}

const ShelterConfigurator: React.FC = () => {
  console.log('🚀 ShelterConfigurator component rendering...');

  const colorOptions = [
    { name: 'Desert Tan', value: '#8B7355' }, // Darker desert tan
    { name: 'OD Green', value: '#4A5D23' },
    { name: 'Arctic White', value: '#F5F5F5' } // Arctic white instead of coyote brown
  ];

  const [configState, setConfigState] = useState<ConfigState>({
    color: '#D2B48C',
    isDeployed: false,
    isInteriorView: false,
    isInsideView: false,
  });

  // Lighting state
  const [lightingState, setLightingState] = useState({
    ambientIntensity: 0.3,
    directionalIntensity: 1.2,
    sunPosition: { x: 5, y: 8, z: 5 }
  });

  const handleColorChange = (newColor: string) => {
    console.log('🎨 Color change requested:', newColor);
    console.log('🎨 Previous color was:', configState.color);
    setConfigState(prev => {
      console.log('🎨 Setting new color:', newColor);
      return { ...prev, color: newColor };
    });
  };

  const handleDeployToggle = () => {
    console.log('🚀 Deploy toggle');
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleInteriorViewToggle = () => {
    console.log('🏠 Interior view toggle clicked');
    console.log('🏠 Current isInteriorView:', configState.isInteriorView);
    console.log('🏠 Current isDeployed:', configState.isDeployed);
    
    setConfigState(prev => {
      const newState = { ...prev, isInteriorView: !prev.isInteriorView };
      console.log('🏠 New state will be:', newState);
      return newState;
    });
  };

  const handleLightingChange = (type: string, value: number) => {
    setLightingState(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSunPositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setLightingState(prev => ({
      ...prev,
      sunPosition: {
        ...prev.sunPosition,
        [axis]: value
      }
    }));
  };

  const getModelPath = () => {
    let path;
    if (configState.isInteriorView) {
      path = "/models/interiors/interior.glb";
    } else if (configState.isDeployed) {
      path = "/models/trecc-open.glb";
    } else {
      path = "/models/trecc.glb";
    }
    console.log('📁 Model path requested:', path);
    console.log('📁 Is deployed:', configState.isDeployed);
    console.log('📁 Is interior view:', configState.isInteriorView);
    return path;
  };

  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());
  console.log('🎨 Color being passed to ModelViewerScene:', configState.color);
  console.log('🚀 Is deployed state:', configState.isDeployed);

  return (
    <div className="configurator-container" style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Main Layout */}
      <div className="configurator-main" style={{
        flex: 1,
        display: 'flex',
        height: '100%',
        position: 'relative'
      }}>
        {/* Left Side - Lighting Controls */}
        <div className="left-controls" style={{
          width: '300px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
          overflowY: 'auto',
          zIndex: 10
        }}>
          {/* Lighting Controls Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}>
              Lighting Controls
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#666',
              margin: '0',
              fontWeight: '500'
            }}>
              Adjust scene lighting
            </p>
          </div>

          {/* Sun Intensity Control */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <label style={{ 
              fontSize: '15px', 
              display: 'block', 
              marginBottom: '16px', 
              color: '#1a1a2e',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              Sun Intensity: {lightingState.directionalIntensity.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={lightingState.directionalIntensity}
              onChange={(e) => handleLightingChange('directionalIntensity', parseFloat(e.target.value))}
              style={{ 
                width: '100%',
                height: '10px',
                borderRadius: '5px',
                background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '12px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              More Sun ← → Less Sun
            </div>
          </div>

          {/* Sun Position Controls - Simplified */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <label style={{ 
              fontSize: '15px', 
              display: 'block', 
              marginBottom: '20px', 
              color: '#1a1a2e',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              Sun Position
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '14px', minWidth: '28px', fontWeight: '800', color: '#1a1a2e' }}>←→:</span>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={lightingState.sunPosition.x}
                  onChange={(e) => handleSunPositionChange('x', parseFloat(e.target.value))}
                  style={{ 
                    flex: 1,
                    height: '10px',
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                    outline: 'none',
                    cursor: 'pointer',
                    boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <span style={{ fontSize: '14px', minWidth: '35px', fontWeight: '800', color: '#1a1a2e' }}>{lightingState.sunPosition.x}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '14px', minWidth: '28px', fontWeight: '800', color: '#1a1a2e' }}>↑↓:</span>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={lightingState.sunPosition.y}
                  onChange={(e) => handleSunPositionChange('y', parseFloat(e.target.value))}
                  style={{ 
                    flex: 1,
                    height: '10px',
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                    outline: 'none',
                    cursor: 'pointer',
                    boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <span style={{ fontSize: '14px', minWidth: '35px', fontWeight: '800', color: '#1a1a2e' }}>{lightingState.sunPosition.y}</span>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '16px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              Left/Right ←→ Up/Down ↑↓
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setLightingState({
                ambientIntensity: 0.3,
                directionalIntensity: 1.2,
                sunPosition: { x: 5, y: 8, z: 5 }
              });
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '18px 24px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
          >
            Reset Lighting
          </button>
        </div>

        {/* 3D Viewer Section */}
        <div className="viewer-section" style={{
          flex: 1,
          position: 'relative',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
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
              modelPath={getModelPath()}
              color={configState.color}
              isDeployed={configState.isDeployed}
              environment="studio"
              weather="none"
              lighting={lightingState}
              background3D={{}}
            />
          </Canvas>
        </div>

        {/* Professional Controls Panel */}
        <div className="controls-panel" style={{
          width: '340px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}>
              TRECC Configurator
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: '0',
              fontWeight: '500'
            }}>
              Customize your shelter
            </p>
          </div>

          {/* Deploy/Interior Controls */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 24px 0'
            }}>
              View Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button
                onClick={handleDeployToggle}
                style={{
                  background: configState.isDeployed 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                {configState.isDeployed ? 'Undeploy' : 'Deploy'}
              </button>

              <button
                onClick={handleInteriorViewToggle}
                style={{
                  background: configState.isInteriorView 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                {configState.isInteriorView ? 'Exterior View' : 'Interior View'}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 24px 0'
            }}>
              Color Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleColorChange(option.value)}
                  style={{
                    background: configState.color === option.value 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.95)',
                    color: configState.color === option.value ? 'white' : '#1a1a2e',
                    border: configState.color === option.value 
                      ? 'none' 
                      : `3px solid ${option.value}`,
                    borderRadius: '16px',
                    padding: '20px 24px',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: configState.color === option.value 
                      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
                      : '0 6px 20px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                  onMouseEnter={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                    }
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: option.value,
                    border: '3px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }} />
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 24px 0'
            }}>
              Actions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  color: '#1a1a2e',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(255, 154, 158, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 154, 158, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 154, 158, 0.4)';
                }}
              >
                Back to Home
              </button>

              <button
                onClick={() => window.open('/contact', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                  color: '#1a1a2e',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(168, 237, 234, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(168, 237, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 237, 234, 0.4)';
                }}
              >
                Lead Times
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterConfigurator;
