'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import with loading fallback
const ShelterConfigurator = dynamic(
  () => import('../components/ShelterConfigurator'),
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

export default function HomePage() {
  return (
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
        Loading TRECC Configurator...
      </div>
    }>
      <ShelterConfigurator />
    </Suspense>
  );
}
