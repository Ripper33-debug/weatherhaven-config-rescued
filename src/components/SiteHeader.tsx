import React from 'react';

interface SiteHeaderProps {
  isAuthenticated: boolean;
  onLogoutClick: () => void;
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  alignItems: 'center'
};

const linkStyle: React.CSSProperties = { color: 'white', textDecoration: 'none', opacity: 0.9 };

const SiteHeader: React.FC<SiteHeaderProps> = ({ isAuthenticated, onLogoutClick }) => {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', color: 'white'
    }}>
      <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>Weatherhaven</a>
      <nav style={navStyle}>
        <a href="/solutions" style={linkStyle}>Solutions</a>
        <a href="/products" style={linkStyle}>Products</a>
        <a href="/industries" style={linkStyle}>Industries</a>
        <a href="/case-studies" style={linkStyle}>Case Studies</a>
        <a href="/resources" style={linkStyle}>Resources</a>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/contact" style={linkStyle}>Contact</a>
        <a href="/configurator" style={{ ...linkStyle, fontWeight: 600 }}>Configurator</a>
      </nav>
      <div>
        {isAuthenticated && (
          <button onClick={onLogoutClick} className="configure-button">Logout</button>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;


