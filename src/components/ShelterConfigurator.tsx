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

interface ShelterConfiguratorProps {
  shelterId?: string;
  defaultModel?: string;
  shelterName?: string;
}

const ShelterConfigurator: React.FC<ShelterConfiguratorProps> = ({ 
  shelterId = 'trecc', 
  defaultModel = '/models/trecc.glb',
  shelterName = 'TRECC Shelter'
}) => {
  console.log('🚀 ShelterConfigurator component rendering...');
  console.log('🏠 Shelter ID:', shelterId);
  console.log('📁 Default Model:', defaultModel);
  console.log('🏷️ Shelter Name:', shelterName);

  const colorOptions = [
    { name: 'OD Green (Olive Drab)', value: '#3C3B2E' },
    { name: 'CARC Tan (Desert)', value: '#B8A082' },
    { name: 'Arctic White', value: '#F8F8F8' }
  ];

  const [configState, setConfigState] = useState<ConfigState>({
    color: '#3C3B2E', // Default to OD Green (Olive Drab)
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

  // Video walkthrough state
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');

  const getWalkthroughVideo = () => {
    if (shelterId === 'trecc') {
      if (configState.isInteriorView) {
        return '/videos/trecc-interior-walkthrough.mp4';
      } else if (configState.isDeployed) {
        return '/videos/trecc-open-walkthrough.mp4';
      } else {
        return '/videos/trecc-closed-walkthrough.mp4';
      }
    } else if (shelterId === 'command-posting') {
      return '/videos/command-posting-walkthrough.mp4';
    }
    return '';
  };

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

  const handleWalkthroughVideo = () => {
    const videoPath = getWalkthroughVideo();
    if (videoPath) {
      setCurrentVideo(videoPath);
      setShowVideo(true);
    }
  };

  // Update video when configuration changes
  React.useEffect(() => {
    if (showVideo) {
      const videoPath = getWalkthroughVideo();
      if (videoPath && videoPath !== currentVideo) {
        setCurrentVideo(videoPath);
      }
    }
  }, [configState.isDeployed, configState.isInteriorView, shelterId]);

  const getModelPath = () => {
    // Always load the single base model for all configurations
    if (shelterId === 'command-posting') {
      return "/models/interiors/CommandPosting.glb";
    } else {
      // Use single TRECC model for all states - colors and views applied dynamically
      return "/models/trecc.glb";
    }
  };

  // Colors are now applied dynamically to the loaded model

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
        {/* Left Side - Lighting Controls (Visible by default) */}
        <div className="left-controls" style={{
          width: '360px',
          background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.95) 0%, rgba(99, 102, 241, 0.9) 30%, rgba(251, 146, 60, 0.95) 70%, rgba(249, 115, 22, 0.98) 100%)',
          backdropFilter: 'blur(30px) saturate(200%) brightness(1.1)',
          borderRight: '2px solid rgba(59, 130, 246, 0.2)',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          boxShadow: '16px 0 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 2px 0 0 rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          zIndex: 10,
          position: 'absolute',
          left: '0px',
          top: 0,
          height: '100%',
          borderTopRightRadius: '32px',
          borderBottomRightRadius: '32px'
        }}>
          {/* Enhanced Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            position: 'relative',
            padding: '24px 0',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              width: '8px',
              height: '8px',
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(79, 172, 254, 0.6)'
            }} />
            <h2 style={{
              fontSize: '28px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              TRECC
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#4a5568',
              margin: '0',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Lighting Controls
            </p>
          </div>

          {/* Sun Intensity Control */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.3) 100%)',
            borderRadius: '28px',
            padding: '32px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(15px) saturate(120%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              width: '4px',
              height: '4px',
              background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 107, 53, 0.4)'
            }} />
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              width: '2px',
              height: '2px',
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(79, 172, 254, 0.4)'
            }} />
            <label style={{ 
              fontSize: '16px', 
              display: 'block', 
              marginBottom: '20px', 
              color: 'white',
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ☀️ Sun Intensity: {lightingState.directionalIntensity.toFixed(1)}
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
                height: '12px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 50%, #4facfe 100%)',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                WebkitAppearance: 'none',
                appearance: 'none'
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


          {/* Lighting Presets */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <label style={{ 
              fontSize: '15px', 
              display: 'block', 
              marginBottom: '16px', 
              color: 'white',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              Lighting Presets
            </label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Day', ambient: 0.4, directional: 1.5, sun: { x: 5, y: 10, z: 5 } },
                { name: 'Night', ambient: 0.1, directional: 0.3, sun: { x: -5, y: 2, z: -5 } },
                { name: 'Overcast', ambient: 0.6, directional: 0.8, sun: { x: 3, y: 6, z: 3 } },
                { name: 'Desert', ambient: 0.2, directional: 2.0, sun: { x: 8, y: 12, z: 8 } }
              ].map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setLightingState({
                      ambientIntensity: preset.ambient,
                      directionalIntensity: preset.directional,
                      sunPosition: preset.sun
                    });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '14px 20px',
                    fontSize: '13px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.3)';
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.3) 100%)',
            borderRadius: '28px',
            padding: '32px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(15px) saturate(120%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              width: '4px',
              height: '4px',
              background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 107, 53, 0.4)'
            }} />
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              width: '2px',
              height: '2px',
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(79, 172, 254, 0.4)'
            }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 24px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              📋 Specifications
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Dimensions:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>20' × 8' × 8'</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Weight:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>2,400 lbs</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Capacity:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>8-12 personnel</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Deployment:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>15 minutes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Power:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>Solar + Generator</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>Temperature:</span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>-40°F to +120°F</span>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.3) 100%)',
            borderRadius: '28px',
            padding: '32px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(15px) saturate(120%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              width: '4px',
              height: '4px',
              background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 107, 53, 0.4)'
            }} />
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              width: '2px',
              height: '2px',
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(79, 172, 254, 0.4)'
            }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 24px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🎨 Color Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleColorChange(option.value)}
                  style={{
                    background: configState.color === option.value 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: configState.color === option.value 
                      ? '2px solid rgba(102, 126, 234, 0.3)'
                      : '2px solid rgba(59, 130, 246, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: configState.color === option.value
                      ? '0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (configState.color !== option.value) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <span>{option.name}</span>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: option.value,
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* View Options */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.3) 100%)',
            borderRadius: '28px',
            padding: '32px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(15px) saturate(120%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              width: '4px',
              height: '4px',
              background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(255, 107, 53, 0.4)'
            }} />
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              width: '2px',
              height: '2px',
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(79, 172, 254, 0.4)'
            }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 24px 0',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              👁️ View Options
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                onClick={handleDeployToggle}
                style={{
                  background: configState.isDeployed 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: configState.isDeployed 
                    ? '2px solid rgba(102, 126, 234, 0.3)'
                    : '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: configState.isDeployed
                    ? '0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!configState.isDeployed) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!configState.isDeployed) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                Open View
              </button>
              
              <button
                onClick={handleInteriorViewToggle}
                style={{
                  background: configState.isInsideView 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: configState.isInsideView 
                    ? '2px solid rgba(102, 126, 234, 0.3)'
                    : '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: configState.isInsideView
                    ? '0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!configState.isInsideView) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!configState.isInsideView) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                Interior View
              </button>
              
              <button
                onClick={handleWalkthroughVideo}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                📹 Walkthrough Video
              </button>
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
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
      </div>


      {/* Walkthrough Video Modal */}
      {showVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            position: 'relative',
            width: '90%',
            maxWidth: '1200px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ×
            </button>

            {/* Video Title */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: 'white',
              fontSize: '24px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {configState.isInteriorView ? 'Interior Walkthrough' : 
               configState.isDeployed ? 'Open Configuration Walkthrough' : 
               'Closed Configuration Walkthrough'}
            </div>

            {/* Video Player */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '0',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              background: '#000',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <video
                controls
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                poster="/videos/trecc-poster.jpg"
              >
                <source src="/videos/trecc-walkthrough.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterConfigurator;
