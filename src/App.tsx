import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ShelterConfiguration | undefined>(undefined);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedShelter(null);
  };

  const handleShelterSelect = (shelter: Shelter, configuration?: ShelterConfiguration) => {
    setSelectedShelter(shelter);
    setSelectedConfiguration(configuration || undefined);
  };

  const handleBackToCommandCenter = () => {
    setSelectedConfiguration(undefined);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <SiteHeader isAuthenticated={!!user} onLogoutClick={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/" element={<HomePage />} />
          {/* Static pages driven by siteContent config */}
          <Route path="/military" element={<StaticPage slug="military" />} />
          <Route path="/medical" element={<StaticPage slug="medical" />} />
          <Route path="/commercial" element={<StaticPage slug="commercial" />} />
          <Route path="/innovation" element={<StaticPage slug="innovation" />} />
          <Route path="/company" element={<StaticPage slug="company" />} />
          <Route path="/instock" element={<StaticPage slug="instock" />} />
          <Route path="/contact" element={<StaticPage slug="contact" />} />
          <Route path="/command-center" element={user ? (
            <CollaborationProvider currentUser={user}>
              <CommandCenter user={user} onLogout={handleLogout} onShelterSelect={handleShelterSelect} />
            </CollaborationProvider>
          ) : <Navigate to="/login" replace />} />
          <Route path="/product" element={user && selectedShelter ? (
            <ProductDetailPage shelter={selectedShelter} />
          ) : <Navigate to="/command-center" replace />} />
          <Route path="/configurator" element={user ? (
            selectedShelter ? (
              <CollaborationProvider currentUser={user}>
                <ShelterConfigurator
                  user={user}
                  shelter={selectedShelter}
                  selectedConfiguration={selectedConfiguration}
                  onBack={handleBackToCommandCenter}
                  onLogout={handleLogout}
                />
              </CollaborationProvider>
            ) : <Navigate to="/command-center" replace />
          ) : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
