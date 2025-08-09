import React from 'react';

const container: React.CSSProperties = { color: 'white', background: '#0b1220', minHeight: '100vh', padding: '48px 24px', maxWidth: 1200, margin: '0 auto' };

const StaticPage: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <div style={container}>
      <h1 style={{ marginBottom: 16 }}>{title}</h1>
      <div style={{ opacity: 0.9, lineHeight: 1.7 }}>{children || 'Content coming soon.'}</div>
    </div>
  );
};

export default StaticPage;


