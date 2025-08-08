import React from 'react';
import { useBranding } from './BrandingProvider';

interface DualLogoHeaderProps {
  title?: string;
  subtitle?: string;
}

const DualLogoHeader: React.FC<DualLogoHeaderProps> = ({ 
  title = "COMMAND CENTER",
  subtitle = "Shelter Configuration System"
}) => {
  const { branding } = useBranding();

  return (
    <div className="dual-logo-header">
      <div className="logo-section">
        <div className="weatherhaven-logo">
          <div className="logo-fallback">
            <span className="logo-text">WEATHERHAVEN</span>
          </div>
        </div>
        
        <div className="logo-separator">
          <span className="separator-icon">⚡</span>
        </div>
        
        {branding ? (
          <div className="client-logo">
            <div className="logo-fallback">
              <span className="logo-text">{branding.companyName}</span>
            </div>
          </div>
        ) : (
          <div className="client-logo">
            <span className="logo-text">CLIENT</span>
          </div>
        )}
      </div>
      
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default DualLogoHeader;
