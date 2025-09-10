'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Animated percentage component
function AnimatedPercentage() {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [stageIcon, setStageIcon] = useState('⚡');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 20) {
          setLoadingStage('Connecting to CloudFront CDN');
          setStageIcon('🌐');
          return prev + 1.5;
        } else if (prev < 50) {
          setLoadingStage('Downloading 3D model data');
          setStageIcon('📦');
          return prev + 0.8;
        } else if (prev < 80) {
          setLoadingStage('Processing geometry and textures');
          setStageIcon('🔧');
          return prev + 0.6;
        } else if (prev < 95) {
          setLoadingStage('Optimizing for display');
          setStageIcon('⚙️');
          return prev + 0.3;
        } else if (prev < 100) {
          setLoadingStage('Finalizing configuration');
          setStageIcon('✨');
          return prev + 0.2;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return <>{Math.round(progress)}%</>;
}

// Animated stage component
function AnimatedStage() {
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [stageIcon, setStageIcon] = useState('⚡');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev === 'Initializing...') {
          setStageIcon('🌐');
          return 'Connecting to CloudFront CDN';
        } else if (prev === 'Connecting to CloudFront CDN') {
          setStageIcon('📦');
          return 'Downloading 3D model data';
        } else if (prev === 'Downloading 3D model data') {
          setStageIcon('🔧');
          return 'Processing geometry and textures';
        } else if (prev === 'Processing geometry and textures') {
          setStageIcon('⚙️');
          return 'Optimizing for display';
        } else if (prev === 'Optimizing for display') {
          setStageIcon('✨');
          return 'Finalizing configuration';
        } else {
          clearInterval(interval);
          return 'Ready!';
        }
      });
    }, 2000); // Change stage every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span style={{ fontSize: '20px' }}>{stageIcon}</span>
      <span>{loadingStage}</span>
    </>
  );
}

// Animated progress bar component
function AnimatedProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 20) {
          return prev + 1.5;
        } else if (prev < 50) {
          return prev + 0.8;
        } else if (prev < 80) {
          return prev + 0.6;
        } else if (prev < 95) {
          return prev + 0.3;
        } else if (prev < 100) {
          return prev + 0.2;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: `${progress}%`,
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
      borderRadius: '4px',
      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
    loading: () => (
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
    ),
    ssr: false // Disable server-side rendering for 3D components
  }
);

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
                {shelter.name} Configurator
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
