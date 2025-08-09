import React from 'react';

const HomepageHero: React.FC<{ onStartConfigure?: () => void }> = ({ onStartConfigure }) => {
  return (
    <section className="hero-section" style={{
      height: '100vh',
      width: '100%',
      background: 'linear-gradient(180deg,#0b1220,#0f172a)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>Deploy Capability. Anywhere.</h1>
      <p style={{ maxWidth: 800, opacity: 0.8 }}>
        Weatherhaven delivers rapidly deployable shelter systems for defense, humanitarian, and commercial operations. Explore our portfolio and configure a solution in real time.
      </p>
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button className="configure-button" onClick={onStartConfigure}>Start Configuring</button>
        <a className="configure-button" href="#products">Explore Products</a>
      </div>
    </section>
  );
};

export default HomepageHero;


