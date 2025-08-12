import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

function AppContent() {
  const navigate = useNavigate();
  
  // Create a default user to bypass login
  const defaultUser: User = {
    username: 'Demo User',
    rank: 'Customer',
    clearance: 'Standard'
  };

  const [user] = useState<User>(defaultUser);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<ShelterConfiguration | undefined>(undefined);

  const handleLogout = () => {
    // Redirect to home page instead of logout
    window.location.href = '/';
  };

  const handleShelterSelect = (shelter: Shelter, configuration?: ShelterConfiguration) => {
    setSelectedShelter(shelter);
    setSelectedConfiguration(configuration || undefined);
    // Navigate to configurator after selecting shelter
    navigate('/configurator');
  };

  const handleBackToCommandCenter = () => {
    setSelectedConfiguration(undefined);
    navigate('/command-center');
  };

  return (
    <div className="app-container">
      <SiteHeader onLogoutClick={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Static pages driven by siteContent config */}
        <Route path="/military" element={<StaticPage slug="military" />} />
        <Route path="/medical" element={<StaticPage slug="medical" />} />
        <Route path="/commercial" element={<StaticPage slug="commercial" />} />
        <Route path="/innovation" element={<StaticPage slug="innovation" />} />
        <Route path="/company" element={<StaticPage slug="company" />} />
        <Route path="/instock" element={<StaticPage slug="instock" />} />
        <Route path="/contact" element={<StaticPage slug="contact" />} />
        <Route path="/command-center" element={
          <CollaborationProvider currentUser={user}>
            <CommandCenter user={user} onLogout={handleLogout} onShelterSelect={handleShelterSelect} />
          </CollaborationProvider>
        } />
        <Route path="/product" element={selectedShelter ? (
          <ProductDetailPage shelter={selectedShelter} />
        ) : <Navigate to="/command-center" replace />} />
        <Route path="/configurator" element={
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
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
