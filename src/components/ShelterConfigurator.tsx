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
    { name: 'Desert Tan', value: '#D2B48C' },
    { name: 'OD Green', value: '#556B2F' },
    { name: 'Coyote Brown', value: '#8B4513' },
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
    console.log('🏠 Interior view toggle');
    setConfigState(prev => ({ ...prev, isInteriorView: !prev.isInteriorView }));
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
    if (configState.isInteriorView) {
      return "/models/trecc-open.glb";
    }
    return configState.isDeployed ? "/models/trecc-open.glb" : "/models/trecc.glb";
  };

  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());
  console.log('🎨 Color being passed to ModelViewerScene:', configState.color);

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
          width: '320px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a1a2e',
              margin: '0 0 4px 0',
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
              Customize Your Shelter
            </p>
          </div>

          {/* Lighting Controls */}
          <div style={{
            background: 'rgba(26, 26, 46, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(26, 26, 46, 0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a2e',
              margin: '0 0 16px 0'
            }}>
              Lighting
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#666' }}>
                  Ambient Light: {lightingState.ambientIntensity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={lightingState.ambientIntensity}
                  onChange={(e) => handleLightingChange('ambientIntensity', parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: '#666' }}>
                  Sun Intensity: {lightingState.directionalIntensity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={lightingState.directionalIntensity}
                  onChange={(e) => handleLightingChange('directionalIntensity', parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px', color: '#666' }}>
                  Sun Position
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', minWidth: '20px' }}>X:</span>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      value={lightingState.sunPosition.x}
                      onChange={(e) => handleSunPositionChange('x', parseFloat(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: '10px', minWidth: '25px' }}>{lightingState.sunPosition.x}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', minWidth: '20px' }}>Y:</span>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="0.5"
                      value={lightingState.sunPosition.y}
                      onChange={(e) => handleSunPositionChange('y', parseFloat(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: '10px', minWidth: '25px' }}>{lightingState.sunPosition.y}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', minWidth: '20px' }}>Z:</span>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      value={lightingState.sunPosition.z}
                      onChange={(e) => handleSunPositionChange('z', parseFloat(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: '10px', minWidth: '25px' }}>{lightingState.sunPosition.z}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deploy/Interior Controls */}
          <div style={{
            background: 'rgba(26, 26, 46, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(26, 26, 46, 0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a2e',
              margin: '0 0 16px 0'
            }}>
              View Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleDeployToggle}
                style={{
                  background: configState.isDeployed 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
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
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                {configState.isInteriorView ? 'Exterior View' : 'Interior View'}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div style={{
            background: 'rgba(26, 26, 46, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(26, 26, 46, 0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a2e',
              margin: '0 0 16px 0'
            }}>
              Color Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleColorChange(option.value)}
                  style={{
                    background: configState.color === option.value 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.8)',
                    color: configState.color === option.value ? 'white' : '#1a1a2e',
                    border: configState.color === option.value 
                      ? 'none' 
                      : `2px solid ${option.value}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: configState.color === option.value 
                      ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    backgroundColor: option.value,
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }} />
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            background: 'rgba(26, 26, 46, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(26, 26, 46, 0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a2e',
              margin: '0 0 16px 0'
            }}>
              Actions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  color: '#1a1a2e',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
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
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
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
