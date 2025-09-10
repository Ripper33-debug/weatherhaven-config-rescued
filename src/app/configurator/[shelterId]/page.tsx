'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Animated percentage component - fluid natural progression
function AnimatedPercentage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 8000; // 8 seconds total
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Apply easing function for more natural progression
      // Ease-out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - (rawProgress / 100), 3);
      const newProgress = easedProgress * 100;
      
      setProgress(newProgress);
      
      if (rawProgress >= 100) {
        clearInterval(interval);
        setProgress(100); // Ensure we end at exactly 100%
      }
    }, 30); // Update every 30ms for ultra-smooth animation

    return () => clearInterval(interval);
  }, []);

  return <>{Math.round(progress)}%</>;
}

// Animated stage component - fluid progression
function AnimatedStage() {
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [stageIcon, setStageIcon] = useState('⚡');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 8000; // 8 seconds total
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / duration) * 100;
      
      // Fluid stage progression based on natural progress
      if (progress < 15) {
        setLoadingStage('Connecting to CloudFront CDN');
        setStageIcon('🌐');
      } else if (progress < 35) {
        setLoadingStage('Downloading 3D model data');
        setStageIcon('📦');
      } else if (progress < 55) {
        setLoadingStage('Processing geometry and textures');
        setStageIcon('🔧');
      } else if (progress < 75) {
        setLoadingStage('Optimizing for display');
        setStageIcon('⚙️');
      } else if (progress < 90) {
        setLoadingStage('Finalizing configuration');
        setStageIcon('✨');
      } else {
        setLoadingStage('Ready!');
        setStageIcon('✅');
        clearInterval(interval);
      }
    }, 50); // Check every 50ms for smoother transitions

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span style={{ fontSize: '20px' }}>{stageIcon}</span>
      <span>{loadingStage}</span>
    </>
  );
}

// Animated progress bar component - fluid natural progression
function AnimatedProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 8000; // 8 seconds total
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Apply same easing function for consistency
      const easedProgress = 1 - Math.pow(1 - (rawProgress / 100), 3);
      const newProgress = easedProgress * 100;
      
      setProgress(newProgress);
      
      if (rawProgress >= 100) {
        clearInterval(interval);
        setProgress(100); // Ensure we end at exactly 100%
      }
    }, 30); // Update every 30ms for ultra-smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: `${progress}%`,
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
      borderRadius: '4px',
      transition: 'width 0.05s ease-out',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
      position: 'relative'
    }}>
      {/* Progress bar shine effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
        animation: 'shimmer 2s ease-in-out infinite'
      }} />
    </div>
  );
}

// Dynamic import with loading fallback
const ShelterConfigurator = dynamic(
  () => import('../../../components/ShelterConfigurator'),
  {
    loading: () => <LoadingScreen />,
    ssr: false // Disable server-side rendering for 3D components
  }
);

// Loading screen component that stays visible for full duration
function LoadingScreen() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasShownLoading = sessionStorage.getItem('configurator-loading-shown');
    
    if (hasShownLoading) {
      // If we've already shown loading, don't show it again
      setShowLoading(false);
      return;
    }
    
    // Mark that we've shown the loading screen
    sessionStorage.setItem('configurator-loading-shown', 'true');
    
    // Always show loading for full 8 seconds regardless of model loading
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null; // Hide loading screen after 8 seconds
  }

  return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {/* Animated blurred background preview */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
          opacity: 0.4,
          animation: 'backgroundPulse 4s ease-in-out infinite'
        }} />
        
        {/* Additional animated overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(74, 144, 226, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
          animation: 'gradientShift 6s ease-in-out infinite'
        }} />
        
        {/* Professional loading overlay */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
          color: 'white',
          padding: '48px 40px',
          borderRadius: '24px',
          textAlign: 'center',
          fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          minWidth: '420px',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}>
          {/* Weatherhaven branding */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#94A3B8',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              Weatherhaven
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#E2E8F0',
              letterSpacing: '-0.02em'
            }}>
              TRECC Configurator
            </div>
          </div>

          {/* Professional spinner */}
          <div style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 32px',
            position: 'relative'
          }}>
            {/* Outer ring */}
            <div style={{
              width: '72px',
              height: '72px',
              border: '3px solid rgba(59, 130, 246, 0.15)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite'
            }} />
            {/* Middle ring */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '48px',
              height: '48px',
              border: '2px solid rgba(96, 165, 250, 0.15)',
              borderTop: '2px solid #60a5fa',
              borderRadius: '50%',
              animation: 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse'
            }} />
            {/* Inner dot */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
          
          {/* Large percentage display */}
          <div style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(96, 165, 250, 0.3)'
          }}>
            <AnimatedPercentage />
          </div>
          
          {/* Loading stage with icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#E2E8F0'
          }}>
            <AnimatedStage />
          </div>

          {/* Enhanced progress bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(148, 163, 184, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '20px',
            position: 'relative'
          }}>
            <AnimatedProgressBar />
          </div>
          
          {/* Professional subtitle */}
          <p style={{ 
            margin: '0', 
            fontSize: '14px', 
            color: '#94A3B8',
            lineHeight: '1.5',
            fontWeight: '500'
          }}>
            Loading your 3D configuration experience
          </p>
        </div>
      </div>
  );
}

const shelterData = {
  'trecc': {
    name: 'TRECC',
    description: 'TRECC deployable shelter system with multiple configuration options',
    defaultModel: 'trecc.glb'
  },
  'command-posting': {
    name: 'Command Posting',
    description: 'Specialized command posting interior',
    defaultModel: 'CommandPosting.glb'
  },
  'herconn': {
    name: 'HERCONN',
    description: 'HERCONN deployable shelter system',
    defaultModel: 'trecc.glb'
  },
  'command-center': {
    name: 'Command Center',
    description: 'Specialized command and control facility',
    defaultModel: 'trecc.glb'
  },
  'field-hospital': {
    name: 'Field Hospital',
    description: 'Complete medical facility for emergency care',
    defaultModel: 'trecc.glb'
  },
  'disaster-relief': {
    name: 'Disaster Relief',
    description: 'Emergency shelter system for disaster response',
    defaultModel: 'trecc.glb'
  }
};

export default function ConfiguratorPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [shelterId, setShelterId] = useState<string>('');
  const [shelter, setShelter] = useState<any>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (params.shelterId) {
      const id = params.shelterId as string;
      setShelterId(id);
      setShelter(shelterData[id as keyof typeof shelterData]);
    }
  }, [params.shelterId]);

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (!shelter) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Shelter Not Found</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.8 }}>
          The requested shelter configuration could not be found.
        </p>
        <Link href="/">
          <button style={{
            padding: '12px 24px',
            background: 'var(--gradient-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Back to Shelter Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Header with Back Button */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <Link href="/">
          <button style={{
            padding: '10px 20px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}>
            ← Back to Menu
          </button>
        </Link>
        
        <div style={{
          padding: '10px 20px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          {shelter.name}
        </div>
      </div>

      <Suspense fallback={
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Loading...
          </div>
        </div>
      }>
        <ShelterConfigurator 
          shelterId={shelterId}
          defaultModel={shelter.defaultModel}
          shelterName={shelter.name}
        />
      </Suspense>
    </div>
  );
}
