import React from 'react';

interface SiteHeaderProps {
  onLogoutClick: () => void;
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'center'
};

const linkStyle: React.CSSProperties = { 
  color: 'rgba(226, 232, 240, 0.8)', 
  textDecoration: 'none', 
  fontWeight: '500',
  fontSize: '13px',
  letterSpacing: '0.05em',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase'
};

const SiteHeader: React.FC<SiteHeaderProps> = ({ onLogoutClick }) => {
  return (
    <header style={{
      position: 'sticky', 
      top: 0, 
      zIndex: 40,
      background: 'rgba(26, 32, 44, 0.95)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '0 24px', 
      height: '64px',
      color: 'white'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        fontSize: '20px',
        fontWeight: '700',
        color: '#f7fafc',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        WEATHERHAVEN
      </div>
      
      <nav style={navStyle}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/solutions" style={linkStyle}>Solutions</a>
        <a href="/products" style={linkStyle}>Products</a>
        <a href="/case-studies" style={linkStyle}>Case Studies</a>
        <a href="/resources" style={linkStyle}>Resources</a>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/contact" style={linkStyle}>Contact</a>
        <a href="/instock" style={linkStyle}>Instock</a>
        <a href="/configurator" style={{ ...linkStyle, fontWeight: '600', color: '#f7fafc' }}>Configurator</a>
      </nav>
      
      <div>
        <button 
          onClick={onLogoutClick} 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f7fafc',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Back to Home
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;


