'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
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
    name: 'TRECC Shelter',
    description: 'Advanced deployable shelter system',
    defaultModel: '/models/trecc.glb'
  },
  'trecc-open': {
    name: 'TRECC Deployed',
    description: 'Fully deployed TRECC shelter',
    defaultModel: '/models/trecc-open.glb'
  },
  'interior': {
    name: 'Interior View',
    description: 'Detailed interior view of TRECC shelter',
    defaultModel: '/models/interiors/interior.glb'
  },
  'titanium': {
    name: 'Titanium Variant',
    description: 'Premium titanium construction variant',
    defaultModel: '/models/titanium.glb'
  }
};

export default function ConfiguratorPage() {
  const params = useParams();
  const shelterId = params.shelterId as string;
  const shelter = shelterData[shelterId as keyof typeof shelterData];

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
