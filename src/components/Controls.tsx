import React, { useState } from 'react';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter, InteriorConfig } from '../App';
import PricingPanel from './PricingPanel';

interface ControlsProps {
  configState: ConfiguratorState;
  shelter: Shelter;
  availableInteriors: InteriorConfig[];
  onToggleDeploy: () => void;
  onToggleView: () => void;
  onColorChange: (color: string) => void;
  onInteriorChange: (interior: InteriorConfig) => void;
  user: any;
}

const Controls: React.FC<ControlsProps> = ({
  configState,
  shelter,
  availableInteriors,
  onToggleDeploy,
  onToggleView,
  onColorChange,
  onInteriorChange,
  user,
}) => {
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#FF6B35');
  
  const colorOptions = [
    { name: 'Dark Green (Matte)', value: '#2F4F2F', finish: 'matte', premium: 0 },
    { name: 'Tan (Satin)', value: '#D2B48C', finish: 'satin', premium: 0 },
    { name: 'White (Matte)', value: '#FFFFFF', finish: 'matte', premium: 0 },
    { name: 'Custom Color (+$150,000)', value: '#FF6B35', finish: 'custom', premium: 150000 },
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
                onClick={() => {
                  if (color.finish === 'custom') {
                    setShowColorPicker(true);
                  } else {
                    onColorChange(color.value);
                  }
                }}
                className={`color-button ${
                  configState.color === color.value ? 'active' : ''
                }`}
                style={{ 
                  backgroundColor: color.value,
                  position: 'relative'
                }}
                title={color.name}
              >
                {color.finish === 'custom' && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#FFD700',
                    color: '#000',
                    fontSize: '10px',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    $150K
                  </span>
                )}
              </button>
              <p className="color-name">{color.name}</p>
              {color.premium > 0 && (
                <p style={{
                  fontSize: '10px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  margin: '2px 0 0 0'
                }}>
                  +${color.premium.toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Custom Color Picker Modal */}
        {showColorPicker && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--bg-card)',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid var(--weatherhaven-blue)',
              maxWidth: '400px',
              width: '90%'
            }}>
              <h3 style={{ color: 'var(--weatherhaven-white)', marginBottom: '16px' }}>
                Choose Custom Color (+$150,000)
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  color: 'var(--text-secondary)', 
                  display: 'block', 
                  marginBottom: '8px' 
                }}>
                  Color:
                </label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowColorPicker(false)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--text-muted)',
                    color: 'var(--text-secondary)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onColorChange(customColor);
                    setShowColorPicker(false);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--weatherhaven-blue)',
                    border: 'none',
                    color: 'var(--weatherhaven-white)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Apply Color
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interior Selection */}
      {availableInteriors.length > 0 && (
        <div className="control-section">
          <h3>Interior Configuration</h3>
          <select
            value={configState.selectedInterior?.id || ''}
            onChange={(e) => {
              const selected = availableInteriors.find(interior => interior.id === e.target.value);
              if (selected) {
                onInteriorChange(selected);
              }
            }}
            className="interior-select"
          >
            <option value="">Select Interior Configuration</option>
            {availableInteriors.map((interior) => (
              <option key={interior.id} value={interior.id}>
                {interior.name}
              </option>
            ))}
          </select>
          {configState.selectedInterior && (
            <p className="control-description">
              {configState.selectedInterior.description}
            </p>
          )}
        </div>
      )}

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
          <span>Get Pricing</span>
        </button>
        <p className="control-description">
          View pricing and generate a quote
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

      {/* Pricing Panel */}
      {showPricing && (
        <PricingPanel
          configState={configState}
          shelter={shelter}
          user={user}
          onClose={() => setShowPricing(false)}
        />
      )}
    </div>
  );
};

export default Controls;
