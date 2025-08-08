import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import CommandCenter from './components/CommandCenter';
import ShelterConfigurator from './components/ShelterConfigurator';
import { CollaborationProvider } from './components/CollaborationProvider';
import './App.css';

export interface ConfiguratorState {
  isDeployed: boolean;
  isInsideView: boolean;
  color: string;
  isLoading: boolean;
  // Version: 1.0.8 - Force Vercel to deploy latest commit with all fixes
}

export interface User {
  username: string;
  rank: string;
  clearance: string;
}

export interface InteriorConfig {
  id: string;
  name: string;
  description: string;
  modelPath: string;
  category: string;
}

export interface Shelter {
  id: string;
  name: string;
  model: string;
  category: string;
  description: string;
  image: string;
  modelPath?: string; // Path to main shelter model
  specs: {
    deployed: any;
    stowed: any;
  };
  configurations?: ShelterConfiguration[]; // Available configurations for this shelter type
}

export interface ShelterConfiguration {
  id: string;
  name: string;
  description: string;
  category: string; // 'command', 'medical', 'living', etc.
  modelPath: string;
  interiorPath?: string;
}

type AppState = 'login' | 'command-center' | 'configurator';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ShelterConfiguration | undefined>(undefined);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setAppState('command-center');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedShelter(null);
    setAppState('login');
  };

  const handleShelterSelect = (shelter: Shelter, configuration?: ShelterConfiguration) => {
    setSelectedShelter(shelter);
    setSelectedConfiguration(configuration || undefined);
    setAppState('configurator');
  };

  const handleBackToCommandCenter = () => {
    setAppState('command-center');
    setSelectedConfiguration(undefined);
  };

  return (
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
            selectedConfiguration={selectedConfiguration}
            onBack={handleBackToCommandCenter}
            onLogout={handleLogout}
          />
        </CollaborationProvider>
      )}
    </div>
  );
}

export default App;
