'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Dynamic import with loading fallback
const ShelterConfigurator = dynamic(
  () => import('../../../components/ShelterConfigurator'),
  {
    loading: () => (
      <div style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        Loading TRECC Configurator...
      </div>
    ),
    ssr: false // Disable server-side rendering for 3D components
  }
);

const shelterData = {
  'trecc': {
    name: 'TRECC',
    description: 'TRECC deployable shelter system with multiple configuration options',
    defaultModel: '/models/trecc.glb'
  },
  'command-posting': {
    name: 'Command Posting',
    description: 'Specialized command posting interior',
    defaultModel: '/models/interiors/CommandPosting.glb'
  },
  'herconn': {
    name: 'HERCONN',
    description: 'HERCONN deployable shelter system',
    defaultModel: '/models/trecc.glb'
  },
  'command-center': {
    name: 'Command Center',
    description: 'Specialized command and control facility',
    defaultModel: '/models/trecc.glb'
  },
  'field-hospital': {
    name: 'Field Hospital',
    description: 'Complete medical facility for emergency care',
    defaultModel: '/models/trecc-open.glb'
  },
  'disaster-relief': {
    name: 'Disaster Relief',
    description: 'Emergency shelter system for disaster response',
    defaultModel: '/models/trecc.glb'
  }
};

export default function ConfiguratorPage() {
  const params = useParams();
  const [isClient, setIsClient] = useState(false);
  const [shelterId, setShelterId] = useState<string>('');
  const [shelter, setShelter] = useState<any>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    if (params.shelterId) {
      const id = params.shelterId as string;
      setShelterId(id);
      setShelter(shelterData[id as keyof typeof shelterData]);
    }
  }, [params.shelterId]);

  // Don't render until client-side
  if (!isClient) {
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
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        Loading TRECC Configurator...
      </div>
    );
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
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          Loading {shelter.name} Configurator...
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
