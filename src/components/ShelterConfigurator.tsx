import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewerScene } from './ModelViewer';
import ErrorBoundary from './ErrorBoundary';
import { preloadModel, getAvailableModels, testSupabaseConnection } from '../lib/supabase';
import * as THREE from 'three';
import { ConfigState, ColorOption } from '../types';

interface ShelterConfiguratorProps {
  shelterId?: string;
  defaultModel?: string;
  shelterName?: string;
}

const ShelterConfigurator: React.FC<ShelterConfiguratorProps> = ({ 
  shelterId = 'trecc', 
  defaultModel = 'Trecc Exterior/trecc.glb',
  shelterName = 'TRECC Shelter'
}) => {
  if (process.env.NODE_ENV === 'development') {
  console.log('🚀 ShelterConfigurator component rendering...');
  console.log('🏠 Shelter ID:', shelterId);
  console.log('📁 Default Model:', defaultModel);
  console.log('🏷️ Shelter Name:', shelterName);
  }

  const colorOptions: ColorOption[] = [
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

  // Loading states
  const [isApplyingColor, setIsApplyingColor] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [availableModels, setAvailableModels] = useState<any[]>([]);

  // Load available models and preload them
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Test Supabase connection first
        const isSupabaseWorking = await testSupabaseConnection();
        console.log('🔧 Supabase working:', isSupabaseWorking);
        
        const models = await getAvailableModels();
        setAvailableModels(models);
        
        // Preload all models for faster switching
        models.forEach(model => {
          preloadModel(model.path);
        });
        
        console.log('🎨 Loaded available models:', models);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    
    loadModels();
  }, []);

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
    console.log('🎨 Current configState:', configState);
    setIsApplyingColor(true);
    setConfigState(prev => {
      const newState = { ...prev, color: newColor };
      console.log('🎨 New state:', newState);
      return newState;
    });
    
    // Simulate color application time
    setTimeout(() => {
      setIsApplyingColor(false);
    }, 500);
  };

  const handleDeployToggle = () => {
    setConfigState(prev => ({ ...prev, isDeployed: !prev.isDeployed }));
  };

  const handleInteriorViewToggle = () => {
    setConfigState(prev => ({ ...prev, isInteriorView: !prev.isInteriorView }));
  };


  const handleWalkthroughVideo = () => {
    const videoPath = getWalkthroughVideo();
    if (videoPath) {
      setCurrentVideo(videoPath);
      setShowVideo(true);
    } else {
      // Show error message for missing videos
      alert('Video walkthrough is not available for this configuration.');
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
      return "Trecc Exterior/trecc.glb";
    }
  };

  // Colors are now applied dynamically to the loaded model

  if (process.env.NODE_ENV === 'development') {
  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());
  }

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
            padding: '28px 20px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 30%, rgba(251, 146, 60, 0.15) 70%, rgba(249, 115, 22, 0.2) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
              fontSize: '38px',
              fontWeight: '900',
              color: '#ffffff',
              margin: '0',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
              position: 'relative',
              zIndex: 2
            }}>
              TRECC
            </h2>
          </div>




          {/* View Options */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: '900',
            color: 'white',
            margin: '0 0 20px 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            👁️ View Options
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
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
              {configState.isDeployed ? 'Close View' : 'Open View'}
            </button>
            
            <button
              onClick={handleInteriorViewToggle}
              style={{ 
                background: configState.isInteriorView 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: configState.isInteriorView 
                  ? '2px solid rgba(102, 126, 234, 0.3)'
                  : '2px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: configState.isInteriorView
                  ? '0 8px 25px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!configState.isInteriorView) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!configState.isInteriorView) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              Interior View
            </button>
            
            <button
              onClick={handleWalkthroughVideo}
              disabled={!getWalkthroughVideo()}
              style={{
                background: getWalkthroughVideo() 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                color: 'white',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: getWalkthroughVideo() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: getWalkthroughVideo() ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (getWalkthroughVideo()) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (getWalkthroughVideo()) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              📹 Walkthrough Video {!getWalkthroughVideo() && '(Unavailable)'}
            </button>
          </div>

          {/* Color Options */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: '900',
            color: 'white',
            margin: '0 0 20px 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🎨 Color Options
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  console.log('🔴 BUTTON CLICKED!', option.name, option.value);
                  handleColorChange(option.value);
                }}
                style={{
                  background: configState.color === option.value 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: configState.color === option.value 
                    ? '3px solid rgba(16, 185, 129, 0.8)'
                    : '2px solid rgba(59, 130, 246, 0.1)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: configState.color === option.value
                    ? '0 8px 25px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(16, 185, 129, 0.3)'
                    : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                  zIndex: 10
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

          {/* Specifications */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: '900',
            color: 'white',
            margin: '0 0 20px 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            📋 Specifications
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
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

          {/* Reset Button */}
          <button
            onClick={() => {
              setConfigState({
                color: '#3C3B2E', // Default to OD Green (Olive Drab)
                isDeployed: false,
                isInteriorView: false,
                isInsideView: false,
              });
            }}
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '18px 24px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
            }}
          >
            Reset Configuration
          </button>
        </div>


        {/* 3D Viewer Section */}
        <div className="viewer-section" style={{
          flex: 1,
          position: 'relative',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        }}>
          {/* Loading Overlay */}
          {(isModelLoading || isApplyingColor) && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              backdropFilter: 'blur(4px)'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '24px 32px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  {isModelLoading ? 'Loading Model...' : 'Applying Color...'}
                </div>
              </div>
            </div>
          )}
          <ErrorBoundary>
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
                color={(() => {
                  console.log('🎨 Passing color to ModelViewerScene:', configState.color);
                  return configState.color;
                })()}
              isDeployed={configState.isDeployed}
              environment="studio"
              weather="none"
                lighting={{
                  ambientIntensity: 0.3,
                  directionalIntensity: 1.2,
                  sunPosition: { x: 5, y: 8, z: 5 }
                }}
                background3D={{}}
                onModelReady={() => {
                  console.log('🎨 Model ready callback triggered');
                  setIsModelLoading(false);
                }}
                onColorApplied={() => {
                  console.log('🎨 Color applied callback triggered');
                  setIsApplyingColor(false);
                }}
              />
          </Canvas>
          </ErrorBoundary>
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
                onError={(e) => {
                  console.error('Video failed to load:', currentVideo);
                  alert('Sorry, this video is currently unavailable.');
                  setShowVideo(false);
                }}
            >
                <source src={currentVideo} type="video/mp4" />
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
