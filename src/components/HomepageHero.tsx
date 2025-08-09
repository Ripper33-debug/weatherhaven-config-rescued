import React from 'react';
import { resolvedSiteContent as siteContent } from '../config/siteContent';

const HomepageHero: React.FC<{ onStartConfigure?: () => void }> = ({ onStartConfigure }) => {
  const hero = siteContent.home.hero;
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
      <h1 style={{ fontSize: 48, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{hero.heading}</h1>
      <h2 style={{ fontSize: 24, marginBottom: 16, opacity: 0.85, fontWeight: 500, textTransform: 'uppercase' }}>{hero.subheading}</h2>
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        {onStartConfigure && (
          <button className="configure-button" onClick={onStartConfigure}>Start Configuring</button>
        )}
        {hero.ctas.map((cta, idx) => (
          <a key={idx} className="configure-button" href={cta.href}>{cta.label}</a>
        ))}
      </div>
    </section>
  );
};

export default HomepageHero;


