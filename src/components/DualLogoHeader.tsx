import React from 'react';

interface DualLogoHeaderProps {
  title: string;
  subtitle: string;
  user?: any;
}

const DualLogoHeader: React.FC<DualLogoHeaderProps> = ({ title, subtitle, user }) => {
  // Check if user is Firestorm
  const isFirestorm = user?.username === 'Firestorm Systems';

  if (!isFirestorm) {
    return (
      <div className="header-left">
        <h1 className="header-title">WEATHERHAVEN</h1>
        <p className="header-subtitle">{title}</p>
      </div>
    );
  }

  return (
    <div className="dual-logo-header">
      <div className="logo-section">
        <div className="weatherhaven-logo">
          <div className="logo-fallback">
            <h1 className="logo-text">WEATHERHAVEN</h1>
          </div>
        </div>
        
        <div className="logo-separator">
          <span className="separator-icon">⚡</span>
        </div>
        
        <div className="client-logo">
          <div className="logo-fallback">
            <h1 className="logo-text">FIRESTORM</h1>
          </div>
        </div>
      </div>
      
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default DualLogoHeader;
