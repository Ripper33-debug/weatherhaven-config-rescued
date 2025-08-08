import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import CommandCenter from './components/CommandCenter';
import ShelterConfigurator from './components/ShelterConfigurator';
import { CollaborationProvider } from './components/CollaborationProvider';
import { BrandingProvider } from './components/BrandingProvider';
import './App.css';

export interface ConfiguratorState {
  isDeployed: boolean;
  isInsideView: boolean;
  color: string;
  isLoading: boolean;
  // Version: 1.0.2 - Final fix for Vercel deployment
}

export interface User {
  username: string;
  rank: string;
  clearance: string;
}

export interface Shelter {
  id: string;
  name: string;
  model: string;
  category: string;
  description: string;
  image: string;
  specs: {
    deployed: any;
    stowed: any;
  };
}

type AppState = 'login' | 'command-center' | 'configurator';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setAppState('command-center');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedShelter(null);
    setAppState('login');
  };

  const handleShelterSelect = (shelter: Shelter) => {
    setSelectedShelter(shelter);
    setAppState('configurator');
  };

  const handleBackToCommandCenter = () => {
    setAppState('command-center');
  };

  return (
    <BrandingProvider>
      <div className="app-container">
        {appState === 'login' && (
          <LoginPage onLogin={handleLogin} />
        )}
        
        {appState === 'command-center' && user && (
          <CollaborationProvider currentUser={user}>
            <CommandCenter 
              user={user}
              onLogout={handleLogout}
              onShelterSelect={handleShelterSelect}
            />
          </CollaborationProvider>
        )}
        
        {appState === 'configurator' && user && selectedShelter && (
          <CollaborationProvider currentUser={user}>
            <ShelterConfigurator
              user={user}
              shelter={selectedShelter}
              onBack={handleBackToCommandCenter}
              onLogout={handleLogout}
            />
          </CollaborationProvider>
        )}
      </div>
    </BrandingProvider>
  );
}

export default App;
