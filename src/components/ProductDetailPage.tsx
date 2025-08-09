import React from 'react';
import { Shelter } from '../App';

interface ProductDetailPageProps {
  shelter: Shelter;
  onConfigure?: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ shelter, onConfigure }) => {
  return (
    <div style={{ color: 'white', background: '#0b1220', minHeight: '100vh', padding: 32 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{shelter.name}</h1>
        {onConfigure ? (
          <button className="configure-button" onClick={onConfigure}>Configure</button>
        ) : (
          <a href="/configurator" className="configure-button">Configure</a>
        )}
      </header>
      <p style={{ opacity: 0.8, marginTop: 8 }}>{shelter.model}</p>
      <div style={{ marginTop: 24 }}>
        <h3>Specifications</h3>
        <ul>
          <li>Deployed: {shelter.specs.deployed.length} × {shelter.specs.deployed.width} × {shelter.specs.deployed.height}</li>
          <li>Stowed: {shelter.specs.stowed.length} × {shelter.specs.stowed.width} × {shelter.specs.stowed.height}</li>
        </ul>
      </div>
      {shelter.configurations && (
        <div style={{ marginTop: 24 }}>
          <h3>Available Configurations</h3>
          <ul>
            {shelter.configurations.map((c) => (
              <li key={c.id}>{c.name} — {c.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;


