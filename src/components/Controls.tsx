import React, { useState } from 'react';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';
import PricingPanel from './PricingPanel';

interface ControlsProps {
  configState: ConfiguratorState;
  onToggleDeploy: () => void;
  onToggleView: () => void;
  onColorChange: (color: string) => void;
  shelter: Shelter;
  user: any;
}

const Controls: React.FC<ControlsProps> = ({
  configState,
  onToggleDeploy,
  onToggleView,
  onColorChange,
  shelter,
  user,
}) => {
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  const colorOptions = [
    { name: 'Military Green', value: '#4A5568' },
    { name: 'Desert Tan', value: '#D69E2E' },
    { name: 'Arctic White', value: '#F7FAFC' },
    { name: 'Navy Blue', value: '#2C5282' },
    { name: 'Charcoal', value: '#2D3748' },
    { name: 'Camo Brown', value: '#8B4513' },
  ];

  const specifications = {
    deployed: {
      length: '171.4" (14.3 ft)',
      width: '85.4" (7.1 ft)',
      height: '94.3" (7.9 ft)',
      weight: '2,300 lbs (1,040 kg)',
      maxPayload: '2,700 lbs (1,210 kg)',
      grossWeight: '5,000 lbs (2,250 kg)',
      capacity: 'Command post operations',
      setupTime: '15-20 minutes',
      materials: 'Aluminum frame, reinforced panels',
      insulation: 'Thermal barrier system',
      flooring: 'Heavy-duty vinyl',
      ventilation: 'HVAC system with ducts',
      lighting: 'Green/White LED system',
      power: '24V compatible, 2kW generator',
      weather: 'All-weather resistant',
      certification: 'MIL-STD-810G compliant',
      solarPanels: '460W solar array',
      airConditioner: '24V AC unit',
      heating: '800W electric heater',
      display: '55" command display',
      desks: 'Deployable workstations',
      electrical: 'AC outlet strips',
      generator: '28VDC, 2kW capacity'
    },
    stowed: {
      length: '84.0" (7.0 ft)',
      width: '85.4" (7.1 ft)',
      height: '57.0" (4.8 ft)',
      weight: '2,300 lbs (1,040 kg)',
      transport: 'Standard military trailer',
      stacking: 'Up to 3 units high',
      deployment: 'TRECC actuator system',
      storage: 'Compact footprint',
      cargoDoor: 'Single cargo door access',
      solarPanels: '460W solar array (folded)',
      components: 'All modules stowed internally'
    }
  };

  const currentSpecs = configState.isDeployed ? specifications.deployed : specifications.stowed;
  
  // Type-safe access to specifications
  const getSpecValue = (key: string) => {
    return (currentSpecs as any)[key] || 'N/A';
  };

  return (
    <div className="controls-panel">
      {/* Title */}
      <div className="controls-title">
        <h2>{shelter.name}</h2>
        <p>{shelter.model}</p>
      </div>

      {/* Deploy/Stow Toggle */}
      <div className="control-section">
        <h3>Deployment State</h3>
        <button
          onClick={onToggleDeploy}
          className="btn-primary"
        >
          <span>{configState.isDeployed ? '🛖' : '📦'}</span>
          <span>{configState.isDeployed ? 'Deployed' : 'Stowed'}</span>
        </button>
        <p className="control-description">
          {configState.isDeployed 
            ? 'Command post fully operational with extended workspace' 
            : 'Compact transport configuration'
          }
        </p>
      </div>

      {/* View Toggle */}
      <div className="control-section">
        <h3>View Mode</h3>
        <button
          onClick={onToggleView}
          className="btn-secondary"
        >
          <span>{configState.isInsideView ? '👁️' : '🏠'}</span>
          <span>{configState.isInsideView ? 'Inside View' : 'Outside View'}</span>
        </button>
      </div>

      {/* Color Selection */}
      <div className="control-section">
        <h3>Exterior Color</h3>
        <div className="color-grid">
          {colorOptions.map((color) => (
            <div key={color.value} className="color-option">
              <button
                onClick={() => onColorChange(color.value)}
                className={`color-button ${
                  configState.color === color.value ? 'active' : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
              <p className="color-name">{color.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Dropdown */}
      <div className="control-section">
        <button
          onClick={() => setSpecsExpanded(!specsExpanded)}
          className="specs-toggle"
        >
          <h3>Technical Specifications</h3>
          <span className="toggle-icon">{specsExpanded ? '▼' : '▶'}</span>
        </button>
        
        {specsExpanded && (
          <div className="specs-content">
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">
                  {currentSpecs.length} × {currentSpecs.width} × {currentSpecs.height}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Curb Weight:</span>
                <span className="spec-value">{currentSpecs.weight}</span>
              </div>
              {configState.isDeployed && (
                <>
                  <div className="spec-item">
                    <span className="spec-label">Max Payload:</span>
                    <span className="spec-value">{getSpecValue('maxPayload')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Gross Weight:</span>
                    <span className="spec-value">{getSpecValue('grossWeight')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Setup Time:</span>
                    <span className="spec-value">{getSpecValue('setupTime')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Solar Power:</span>
                    <span className="spec-value">{getSpecValue('solarPanels')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Air Conditioning:</span>
                    <span className="spec-value">{getSpecValue('airConditioner')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Heating:</span>
                    <span className="spec-value">{getSpecValue('heating')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Display:</span>
                    <span className="spec-value">{getSpecValue('display')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Workstations:</span>
                    <span className="spec-value">{getSpecValue('desks')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Generator:</span>
                    <span className="spec-value">{getSpecValue('generator')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Lighting:</span>
                    <span className="spec-value">{getSpecValue('lighting')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Power System:</span>
                    <span className="spec-value">{getSpecValue('power')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Materials:</span>
                    <span className="spec-value">{getSpecValue('materials')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Certification:</span>
                    <span className="spec-value">{getSpecValue('certification')}</span>
                  </div>
                </>
              )}
              {!configState.isDeployed && (
                <>
                  <div className="spec-item">
                    <span className="spec-label">Transport:</span>
                    <span className="spec-value">{getSpecValue('transport')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Stacking:</span>
                    <span className="spec-value">{getSpecValue('stacking')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Deployment:</span>
                    <span className="spec-value">{getSpecValue('deployment')}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Access:</span>
                    <span className="spec-value">{getSpecValue('cargoDoor')}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="control-section">
        <h3>Pricing & Quote</h3>
        <button
          onClick={() => setShowPricing(true)}
          className="btn-primary pricing-button"
        >
          <span>💰</span>
          <span>Click for Quote</span>
        </button>
        <p className="control-description">
          Get instant pricing and generate a professional quote
        </p>
      </div>

      {/* Status Indicator */}
      <div className="status-section">
        <div className="status-row">
          <span className="status-label">Status:</span>
          <span className="status-value">
            {configState.isLoading ? 'Loading...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>

    {/* Pricing Panel */}
    {showPricing && (
      <PricingPanel
        configState={configState}
        shelter={shelter}
        user={user}
        onClose={() => setShowPricing(false)}
      />
    )}
  );
};

export default Controls;
