import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';
import ModelViewer from './ModelViewer';

interface DemoModeProps {
  configState: ConfiguratorState;
  shelter: Shelter;
  onModelLoaded: () => void;
  onExit: () => void;
}

type DemoScene = 'intro' | 'deploy' | 'walkthrough' | 'specs' | 'environment' | 'outro';

const DemoMode: React.FC<DemoModeProps> = ({ 
  configState, 
  shelter, 
  onModelLoaded, 
  onExit 
}) => {
  const [currentScene, setCurrentScene] = useState<DemoScene>('intro');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 3, z: 15 });
  const [environment, setEnvironment] = useState<'day' | 'night' | 'desert' | 'arctic' | 'jungle'>('day');
  const [showScale, setShowScale] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const demoRef = useRef<HTMLDivElement>(null);

  // Demo sequence configuration
  const demoSequence = useMemo(() => [
    { scene: 'intro', duration: 3000, camera: { x: 0, y: 3, z: 15 }, autoRotate: true },
    { scene: 'deploy', duration: 4000, camera: { x: 0, y: 2, z: 8 }, autoRotate: false },
    { scene: 'walkthrough', duration: 5000, camera: { x: 0, y: 1.7, z: 3 }, autoRotate: false },
    { scene: 'specs', duration: 3000, camera: { x: 0, y: 3, z: 12 }, autoRotate: true },
    { scene: 'environment', duration: 4000, camera: { x: 0, y: 3, z: 15 }, autoRotate: true },
    { scene: 'outro', duration: 2000, camera: { x: 0, y: 3, z: 15 }, autoRotate: true }
  ], []);

  // Auto-advance demo sequence
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const nextStep = (currentStep + 1) % demoSequence.length;
      setCurrentStep(nextStep);
      
      const step = demoSequence[nextStep];
      setCurrentScene(step.scene as DemoScene);
      setCameraPosition(step.camera);
      setIsAutoRotating(step.autoRotate);
      
      // Special effects for different scenes
      if (step.scene === 'deploy') {
        setShowScale(true);
      } else if (step.scene === 'environment') {
        setShowParticles(true);
      } else {
        setShowScale(false);
        setShowParticles(false);
      }
    }, demoSequence[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, demoSequence]);

  // Request fullscreen on enter
  useEffect(() => {
    if (demoRef.current && demoRef.current.requestFullscreen) {
      demoRef.current.requestFullscreen().catch(() => {
        // Fullscreen not supported or denied
      });
    }
  }, []);

  const handleSkip = () => {
    const nextStep = (currentStep + 1) % demoSequence.length;
    setCurrentStep(nextStep);
    const step = demoSequence[nextStep];
    setCurrentScene(step.scene as DemoScene);
    setCameraPosition(step.camera);
    setIsAutoRotating(step.autoRotate);
  };

  const handlePause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEnvironmentChange = (newEnv: typeof environment) => {
    setEnvironment(newEnv);
  };

  const renderControls = () => (
    <div className="demo-controls">
      <div className="demo-header">
        <h2>DEMO MODE - {shelter.name}</h2>
        <div className="demo-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentStep + 1) / demoSequence.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="control-buttons">
        <button className="demo-button" onClick={handlePause}>
          {isPlaying ? '⏸️' : '▶️'} {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="demo-button" onClick={handleSkip}>
          ⏭️ Skip
        </button>
        <button className="demo-button" onClick={() => setIsAutoRotating(!isAutoRotating)}>
          🔄 {isAutoRotating ? 'Stop Rotation' : 'Start Rotation'}
        </button>
        <button className="demo-button exit" onClick={onExit}>
          ❌ Exit Demo
        </button>
      </div>
      
      <div className="environment-controls">
        <button 
          className={`env-button ${environment === 'day' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('day')}
        >
          ☀️ Day
        </button>
        <button 
          className={`env-button ${environment === 'night' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('night')}
        >
          🌙 Night
        </button>
        <button 
          className={`env-button ${environment === 'desert' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('desert')}
        >
          🏜️ Desert
        </button>
        <button 
          className={`env-button ${environment === 'arctic' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('arctic')}
        >
          ❄️ Arctic
        </button>
        <button 
          className={`env-button ${environment === 'jungle' ? 'active' : ''}`}
          onClick={() => handleEnvironmentChange('jungle')}
        >
          🌴 Jungle
        </button>
      </div>
      
      <div className="demo-info">
        <div className="scene-info">
          <h3>Current Scene: {currentScene.toUpperCase()}</h3>
          <p>{getSceneDescription(currentScene)}</p>
        </div>
        
        <div className="keyboard-shortcuts">
          <h4>Keyboard Shortcuts:</h4>
          <ul>
            <li><strong>Space:</strong> Pause/Play</li>
            <li><strong>→:</strong> Next Scene</li>
            <li><strong>R:</strong> Toggle Rotation</li>
            <li><strong>S:</strong> Screenshot</li>
            <li><strong>Esc:</strong> Exit Demo</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const getSceneDescription = (scene: DemoScene): string => {
    switch (scene) {
      case 'intro': return 'Introduction to the shelter system';
      case 'deploy': return 'Demonstrating deployment sequence';
      case 'walkthrough': return 'Interior walkthrough and features';
      case 'specs': return 'Technical specifications overview';
      case 'environment': return 'Environmental adaptability';
      case 'outro': return 'Summary and conclusion';
      default: return '';
    }
  };

  const renderDemoScene = () => (
    <Canvas
      camera={{ 
        position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
        fov: 60
      }}
      shadows
    >
      <ModelViewer
        configState={configState}
        onModelLoaded={onModelLoaded}
        shelter={shelter}
        isAutoRotating={isAutoRotating}
        environment={environment}
        showScale={showScale}
        showParticles={showParticles}
      />
    </Canvas>
  );

  return (
    <div className="demo-container" ref={demoRef}>
      {renderControls()}
      
      <div className="demo-viewport">
        {renderDemoScene()}
      </div>
      
      <div className="demo-overlay">
        <div className="scene-indicator">
          {currentScene.toUpperCase()}
        </div>
        
        {showScale && (
          <div className="scale-indicator">
            <div className="human-scale">👤 Human Scale (6ft)</div>
            <div className="vehicle-scale">🚙 Military Humvee (15ft)</div>
          </div>
        )}
        
        {showParticles && (
          <div className="particle-effects">
            <div className="dust-particle"></div>
            <div className="smoke-particle"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoMode;
