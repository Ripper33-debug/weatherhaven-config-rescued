import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomepageHero from './components/HomepageHero';
import ProductDetailPage from './components/ProductDetailPage';
import SiteHeader from './components/SiteHeader';
import StaticPage from './components/StaticPage';
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

type AppState = 'login' | 'home' | 'command-center' | 'product' | 'configurator';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ShelterConfiguration | undefined>(undefined);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setAppState('home');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedShelter(null);
    setAppState('login');
  };

  const handleShelterSelect = (shelter: Shelter, configuration?: ShelterConfiguration) => {
    setSelectedShelter(shelter);
    setSelectedConfiguration(configuration || undefined);
    setAppState('product');
  };

  const handleBackToCommandCenter = () => {
    setAppState('command-center');
    setSelectedConfiguration(undefined);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <SiteHeader isAuthenticated={!!user} onLoginClick={() => setAppState('login')} onLogoutClick={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/" element={user ? <HomepageHero onStartConfigure={() => setAppState('command-center')} /> : <Navigate to="/login" replace />} />
          {/* Static page placeholders to mirror weatherhaven.com IA */}
          <Route path="/solutions" element={<StaticPage title="Solutions" />} />
          <Route path="/products" element={<StaticPage title="Products" />} />
          <Route path="/industries" element={<StaticPage title="Industries" />} />
          <Route path="/case-studies" element={<StaticPage title="Case Studies" />} />
          <Route path="/resources" element={<StaticPage title="Resources" />} />
          <Route path="/about" element={<StaticPage title="About" />} />
          <Route path="/contact" element={<StaticPage title="Contact" />} />
          <Route path="/command-center" element={user ? (
            <CollaborationProvider currentUser={user}>
              <CommandCenter user={user} onLogout={handleLogout} onShelterSelect={handleShelterSelect} />
            </CollaborationProvider>
          ) : <Navigate to="/login" replace />} />
          <Route path="/product" element={user && selectedShelter ? (
            <ProductDetailPage shelter={selectedShelter} onConfigure={() => setAppState('configurator')} />
          ) : <Navigate to="/command-center" replace />} />
          <Route path="/configurator" element={user && selectedShelter ? (
            <CollaborationProvider currentUser={user}>
              <ShelterConfigurator
                user={user}
                shelter={selectedShelter}
                selectedConfiguration={selectedConfiguration}
                onBack={handleBackToCommandCenter}
                onLogout={handleLogout}
              />
            </CollaborationProvider>
          ) : <Navigate to="/command-center" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
