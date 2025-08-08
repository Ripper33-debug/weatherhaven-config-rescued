import React, { createContext, useContext, useState } from 'react';
import { UserCredentials } from '../config/users';

interface ClientBranding {
  companyName: string;
  logoFolder: number;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  customCss?: string;
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
  };
  features?: {
    enableARVR: boolean;
    enableCollaboration: boolean;
    enableDemoMode: boolean;
    enableExport: boolean;
    enablePricing: boolean;
  };
}

interface BrandingContextType {
  branding: ClientBranding | null;
  setBranding: (branding: ClientBranding | null) => void;
  applyBranding: (user: UserCredentials) => void;
  resetBranding: () => void;
  getClientLogoUrl: (logoFolder: number) => string;
}

const defaultBranding: ClientBranding = {
  companyName: 'Weatherhaven',
  logoFolder: 0,
  primaryColor: '#1a202c',
  secondaryColor: '#4a5568'
};

const BrandingContext = createContext<BrandingContextType | null>(null);

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};

interface BrandingProviderProps {
  children: React.ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const [branding, setBranding] = useState<ClientBranding | null>(null);

  const getClientLogoUrl = (logoFolder: number): string => {
    if (logoFolder === 0) {
      return '/logos/weatherhaven-logo.svg';
    }
    return `/logos/clients/${logoFolder}.svg`;
  };

  const applyBranding = (user: UserCredentials) => {
    if (user.clientBranding) {
      setBranding(user.clientBranding);
      
      // Apply custom CSS variables
      const root = document.documentElement;
      root.style.setProperty('--primary-color', user.clientBranding.primaryColor);
      root.style.setProperty('--secondary-color', user.clientBranding.secondaryColor);
      
      // Apply custom CSS if provided
      if (user.clientBranding.customCss) {
        const styleId = 'custom-branding-css';
        let styleElement = document.getElementById(styleId) as HTMLStyleElement;
        
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = user.clientBranding.customCss;
      }
    } else {
      setBranding(defaultBranding);
      
      // Reset to default colors
      const root = document.documentElement;
      root.style.setProperty('--primary-color', defaultBranding.primaryColor);
      root.style.setProperty('--secondary-color', defaultBranding.secondaryColor);
      
      // Remove custom CSS
      const styleElement = document.getElementById('custom-branding-css');
      if (styleElement) {
        styleElement.remove();
      }
    }
  };

  const resetBranding = () => {
    setBranding(null);
    
    // Reset CSS variables
    const root = document.documentElement;
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--secondary-color');
    
    // Remove custom CSS
    const styleElement = document.getElementById('custom-branding-css');
    if (styleElement) {
      styleElement.remove();
    }
  };

  const value: BrandingContextType = {
    branding,
    setBranding,
    applyBranding,
    resetBranding,
    getClientLogoUrl
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
};
