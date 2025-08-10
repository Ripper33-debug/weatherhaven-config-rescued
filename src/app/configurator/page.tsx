'use client';

import dynamic from 'next/dynamic';

// Dynamically import the existing App component with no SSR
const ConfiguratorApp = dynamic(() => import('../../App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Configurator...</p>
      </div>
    </div>
  ),
});

export default function ConfiguratorPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <ConfiguratorApp />
    </div>
  );
}
