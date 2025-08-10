'use client';

import dynamic from 'next/dynamic';

// Dynamically import the existing App component with no SSR
const ConfiguratorApp = dynamic(() => import('../../App'), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          border: '4px solid #10b981',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p style={{ color: 'white', fontSize: '18px' }}>Loading Configurator...</p>
      </div>
    </div>
  ),
});

export default function ConfiguratorPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <ConfiguratorApp />
    </div>
  );
}
