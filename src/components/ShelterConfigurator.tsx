import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ModelViewerScene } from './ModelViewer';
import ErrorBoundary from './ErrorBoundary';
import { preloadModel, getAvailableModels, testAWSConnection } from '../lib/aws';
import * as THREE from 'three';
import { ConfigState, ColorOption } from '../types';
import ContactForm from './ContactForm';
import { buildShareUrl, encodeConfigToQuery, saveShortCode, resolveShortCode } from '../lib/share';
import { estimatePrice } from '../lib/pricing';

interface ShelterConfiguratorProps {
  shelterId?: string;
  defaultModel?: string;
  shelterName?: string;
}

const ShelterConfigurator: React.FC<ShelterConfiguratorProps> = ({ 
  shelterId = 'trecc', 
  defaultModel = 'trecc.glb',
  shelterName = 'TRECC Shelter'
}) => {
  if (process.env.NODE_ENV === 'development') {
  console.log('🚀 ShelterConfigurator component rendering...');
  console.log('🏠 Shelter ID:', shelterId);
  console.log('📁 Default Model:', defaultModel);
  console.log('🏷️ Shelter Name:', shelterName);
  }

  const colorOptions: ColorOption[] = [
    { name: 'CARC Tan (Desert)', value: '#B8A082' },
    { name: 'OD Green (Olive Drab)', value: '#3C3B2E' },
    { name: 'Arctic White (Coming Soon)', value: '#F8F8F8' }
  ];

  const [configState, setConfigState] = useState<ConfigState>({
    color: '#B8A082', // Default to CARC Tan (Desert) - faster loading
    isDeployed: false,
    isInteriorView: false,
    isInsideView: false,
  });

  // Loading states
  const [isApplyingColor, setIsApplyingColor] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false); // Start as false to avoid showing loading overlay
  const [availableModels, setAvailableModels] = useState<any[]>([]);

  // Load available models and preload them
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Test AWS connection first
               const isAWSWorking = await testAWSConnection();
        console.log('🔧 AWS working:', isAWSWorking);
        
        const models = await getAvailableModels();
        setAvailableModels(models);
        
        // Preloading disabled to fix model loading issues
        // models.forEach(model => {
        //   preloadModel(model.path);
        // });
        
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
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const [prefillMsg, setPrefillMsg] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');

  const getWalkthroughVideo = () => {
    if (shelterId === 'trecc') {
      if (configState.isInteriorView) {
        return '/videos/trecc-interior-walkthrough.mp4';
      } else if (configState.isDeployed) {
        return '/videos/trecc-open-walkthrough.mp4';
      } else {
        return '/videos/trecc-closed-walkthrough.mp4';
      }
    } else if (shelterId === 'herconn') {
      return '/videos/herconn-walkthrough.mp4';
    } else if (shelterId === 'command-posting') {
      return '/videos/command-posting-walkthrough.mp4';
    }
    return '';
  };

  const handleColorChange = (newColor: string) => {
    console.log('🎨 Color change requested:', newColor);
    console.log('🎨 Current configState:', configState);
    setIsModelLoading(true); // Show loading while switching models
    setConfigState(prev => {
      const newState = { ...prev, color: newColor };
      console.log('🎨 New state:', newState);
      return newState;
    });
    
    // Model will reload automatically when getModelPath() returns new path
    setTimeout(() => {
      setIsModelLoading(false);
    }, 1000);
  };

  const handleDeployToggle = () => {
    console.log('🔄 DEPLOY TOGGLE CLICKED!');
    console.log('🎨 Current state before toggle:', { 
      color: configState.color, 
      isDeployed: configState.isDeployed 
    });
    
    setConfigState(prev => {
      const newState = { ...prev, isDeployed: !prev.isDeployed };
      console.log('🎨 New state after toggle:', newState);
      return newState;
    });
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
    // Always use AWS CloudFront models - no local paths
    if (shelterId === 'command-posting') {
      return "CommandPosting.glb"; // AWS path
      } else {
      // Check if open view is enabled
      if (configState.isDeployed) {
        // Use specific open models based on color
        if (configState.color === '#B8A082') {
          console.log('🚪 OPEN VIEW: Desert Tan selected - loading _desert_tan_open.glb');
          console.log('🎨 Current state:', { color: configState.color, isDeployed: configState.isDeployed });
          return "_desert_tan_open.glb"; // Desert Tan open model
    } else {
          console.log('🚪 OPEN VIEW: Other color selected - loading Open_simplified.glb');
          console.log('🎨 Current state:', { color: configState.color, isDeployed: configState.isDeployed });
          return "Open_simplified.glb"; // Generic open view model
        }
      }
      
      // Use pre-colored models based on selected color for closed view
      const colorModelMap: Record<string, string> = {
        '#3C3B2E': 'Model_stowed_green-v1.glb',      // Military Green (Draco compressed - 45.3MB)
        '#B8A082': 'Shelter_Stowed_DesertTan-v1.glb', // Desert Tan (Draco compressed - 43.8MB)
        '#F8F8F8': 'Shelter_Stowed_DesertTan-v1.glb'  // Arctic White - fallback to compressed tan until white model is uploaded
      };
      
      const selectedModel = colorModelMap[configState.color] || 'Shelter_Stowed_DesertTan-v1.glb'; // fallback to compressed Desert Tan
      console.log('🎨 CLOSED VIEW: Model selection:', {
        color: configState.color,
        model: selectedModel,
        isDeployed: configState.isDeployed,
        availableModels: Object.keys(colorModelMap)
      });
      return selectedModel;
    }
  };

  // Colors are now applied dynamically to the loaded model

  if (process.env.NODE_ENV === 'development') {
  console.log('🎯 Current state:', configState);
  console.log('📁 Model path:', getModelPath());
  }

  // Apply config from URL or short code on mount
  useEffect(() => {
    try {
      const query = typeof window !== 'undefined' ? window.location.search : '';
      const params = new URLSearchParams(query);
      const code = params.get('c');
      if (code) {
        const cfg = resolveShortCode(code);
        if (cfg) {
          setConfigState(prev => ({
            ...prev,
            color: cfg.color ?? prev.color,
            isDeployed: !!cfg.isDeployed,
            isInteriorView: !!cfg.isInteriorView,
            isInsideView: !!cfg.isInsideView
          }));
        }
      } else {
        const color = params.get('color');
        if (color) {
          setConfigState(prev => ({
            ...prev,
            color,
            isDeployed: params.get('d') === '1',
            isInteriorView: params.get('i') === '1',
            isInsideView: params.get('in') === '1'
          }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleShareUrl = () => {
    const cfg = {
      color: configState.color,
      isDeployed: configState.isDeployed,
      isInteriorView: configState.isInteriorView,
      isInsideView: configState.isInsideView
    };
    const url = buildShareUrl(window.location.href.split('?')[0], cfg);
    navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard.'));
  };

  const handleCreateShortCode = () => {
    const cfg = {
      color: configState.color,
      isDeployed: configState.isDeployed,
      isInteriorView: configState.isInteriorView,
      isInsideView: configState.isInsideView
    };
    const code = saveShortCode(cfg);
    setShortCode(code);
    const base = window.location.href.split('?')[0];
    const url = `${base}?c=${code}`;
    navigator.clipboard.writeText(url).then(() => alert(`Short link copied: ${url}`));
  };

  const handleRequestQuote = () => {
    const estimate = estimatePrice({
      shelterId: shelterId,
      isDeployed: configState.isDeployed,
      isInteriorView: configState.isInteriorView,
      color: configState.color
    });
    const params = encodeURIComponent(encodeConfigToQuery({
      color: configState.color,
      isDeployed: configState.isDeployed,
      isInteriorView: configState.isInteriorView,
      isInsideView: configState.isInsideView
    }));
    const msg = `Requesting quote for ${shelterName}\n\n` +
      `Configuration: ${decodeURIComponent(params)}\n` +
      `Estimate: $${estimate.total.toLocaleString()} (base $${estimate.base.toLocaleString()} + options ${estimate.options.map(o=>o.label+': $'+o.amount.toLocaleString()).join(', ') || 'none'})\n` +
      `${estimate.note}`;
    setPrefillMsg(msg);
    setShowContactForm(true);
  };

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
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(148, 163, 184, 0.2)',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          zIndex: 10,
          position: 'absolute',
          left: '0px',
          top: 0,
          height: '100%',
          borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px'
        }}>
          {/* Clean Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            position: 'relative',
            padding: '24px 20px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#E2E8F0',
              margin: '0',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              TRECC
            </h2>
          </div>




          {/* View Options */}
            <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#94A3B8',
            margin: '0 0 16px 0',
            textAlign: 'left',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
            }}>
              View Options
            </h3>
            
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                  <button
                    onClick={handleDeployToggle}
                    style={{
                      background: configState.isDeployed 
                  ? '#f97316'
                  : 'transparent',
                color: configState.isDeployed ? 'white' : 'white',
                      border: 'none',
                borderRadius: '0px',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                boxShadow: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                if (!configState.isDeployed) {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                }
                    }}
                    onMouseLeave={(e) => {
                if (!configState.isDeployed) {
                  e.currentTarget.style.background = 'transparent';
                }
                    }}
                  >
              {configState.isDeployed ? 'Close View' : 'Open View'}
                  </button>

                  <button
                    onClick={handleInteriorViewToggle}
                    style={{
                      background: configState.isInteriorView 
                  ? '#f97316'
                  : 'transparent',
                color: configState.isInteriorView ? 'white' : 'white',
                      border: 'none',
                borderRadius: '0px',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                boxShadow: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                if (!configState.isInteriorView) {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                }
                    }}
                    onMouseLeave={(e) => {
                if (!configState.isInteriorView) {
                  e.currentTarget.style.background = 'transparent';
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
                  ? 'transparent'
                  : 'transparent',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0px',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: getWalkthroughVideo() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                boxShadow: 'none',
                      textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: getWalkthroughVideo() ? 1 : 0.6,
                fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                if (getWalkthroughVideo()) {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                }
                    }}
                    onMouseLeave={(e) => {
                if (getWalkthroughVideo()) {
                  e.currentTarget.style.background = 'transparent';
                }
                    }}
                  >
              Walkthrough Video {!getWalkthroughVideo() && '(Unavailable)'}
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
              Color Options
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
                    ? '#f97316'
                    : 'transparent',
                  color: 'white',
                    border: 'none',
                    borderRadius: '0px',
                  padding: '16px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  position: 'relative',
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                  zIndex: 10,
                  fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (configState.color !== option.value) {
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (configState.color !== option.value) {
                    e.currentTarget.style.background = 'transparent';
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
                color: '#B8A082', // Default to CARC Tan (Desert) - faster loading
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
              letterSpacing: '0.5px',
              marginBottom: '20px'
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

          {/* Contact Sales Button */}
              <button
            onClick={handleRequestQuote}
                style={{
              background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
              color: 'white',
                  border: 'none',
                  borderRadius: '16px',
              padding: '18px 24px',
              fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(13, 110, 253, 0.4)',
                  textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(13, 110, 253, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.4)';
            }}
          >
            📄 Request Quote with Config
          </button>

          {/* Share Row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleShareUrl}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 18px',
                fontSize: '13px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
              }}
            >
              🔗 Copy Share URL
            </button>
            <button
              onClick={handleCreateShortCode}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 18px',
                fontSize: '13px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)'
              }}
            >
              🔒 Create Short Code
              </button>
            </div>
          </div>


        {/* 3D Viewer Section */}
        <div className="viewer-section" style={{
          flex: 1,
          position: 'relative',
          height: '100%',
          background: 'transparent'
        }}>
          <ErrorBoundary>
          <Canvas
            camera={{ position: [5, 3, 5], fov: 50 }}
            shadows={false}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false
            }}
            dpr={[1, 1.5]}
            performance={{ min: 0.8 }}
            style={{ background: 'transparent' }}
          >
            <ModelViewerScene
              modelPath={getModelPath()}
              color={null} // No dynamic coloring - using pre-colored models
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

      {/* Contact Form */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        shelterName={shelterName}
        prefillMessage={prefillMsg}
      />
    </div>
  );
};

export default ShelterConfigurator;
