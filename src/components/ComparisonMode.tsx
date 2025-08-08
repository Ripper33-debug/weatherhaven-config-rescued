import React, { useState, useEffect } from 'react';
import { Shelter } from '../App';

interface ComparisonModeProps {
  shelters: Shelter[];
  isVisible: boolean;
  onClose: () => void;
  onShelterSelect: (shelter: Shelter) => void;
}

interface ComparisonFeature {
  name: string;
  category: 'dimensions' | 'performance' | 'features' | 'specifications';
  key: string;
  unit?: string;
}

const ComparisonMode: React.FC<ComparisonModeProps> = ({
  shelters,
  isVisible,
  onClose,
  onShelterSelect
}) => {
  const [selectedShelters, setSelectedShelters] = useState<Shelter[]>([]);
  const [comparisonFeatures] = useState<ComparisonFeature[]>([
    // Dimensions
    { name: 'Deployed Length', category: 'dimensions', key: 'deployed.length', unit: 'ft' },
    { name: 'Deployed Width', category: 'dimensions', key: 'deployed.width', unit: 'ft' },
    { name: 'Deployed Height', category: 'dimensions', key: 'deployed.height', unit: 'ft' },
    { name: 'Stowed Length', category: 'dimensions', key: 'stowed.length', unit: 'ft' },
    { name: 'Stowed Width', category: 'dimensions', key: 'stowed.width', unit: 'ft' },
    { name: 'Stowed Height', category: 'dimensions', key: 'stowed.height', unit: 'ft' },
    
    // Performance
    { name: 'Setup Time', category: 'performance', key: 'setupTime' },
    { name: 'Max Payload', category: 'performance', key: 'maxPayload' },
    { name: 'Weather Rating', category: 'performance', key: 'weatherRating' },
    { name: 'Temperature Range', category: 'performance', key: 'tempRange' },
    
    // Features
    { name: 'Solar Power', category: 'features', key: 'solarPower' },
    { name: 'Air Conditioning', category: 'features', key: 'airConditioning' },
    { name: 'Heating System', category: 'features', key: 'heating' },
    { name: 'Lighting System', category: 'features', key: 'lighting' },
    { name: 'Power System', category: 'features', key: 'powerSystem' },
    
    // Specifications
    { name: 'Material', category: 'specifications', key: 'material' },
    { name: 'Insulation', category: 'specifications', key: 'insulation' },
    { name: 'Flooring', category: 'specifications', key: 'flooring' },
    { name: 'Ventilation', category: 'specifications', key: 'ventilation' }
  ]);

  const [activeCategory, setActiveCategory] = useState<'dimensions' | 'performance' | 'features' | 'specifications'>('dimensions');

  // Auto-select first 3 shelters when opening
  useEffect(() => {
    if (isVisible && selectedShelters.length === 0) {
      setSelectedShelters(shelters.slice(0, 3));
    }
  }, [isVisible, shelters, selectedShelters.length]);

  const handleShelterToggle = (shelter: Shelter) => {
    if (selectedShelters.find(s => s.id === shelter.id)) {
      setSelectedShelters(selectedShelters.filter(s => s.id !== shelter.id));
    } else if (selectedShelters.length < 4) {
      setSelectedShelters([...selectedShelters, shelter]);
    }
  };

  const getFeatureValue = (shelter: Shelter, feature: ComparisonFeature) => {
    const specs = shelter.specs;
    
    switch (feature.key) {
      case 'deployed.length':
        return specs.deployed.length;
      case 'deployed.width':
        return specs.deployed.width;
      case 'deployed.height':
        return specs.deployed.height;
      case 'stowed.length':
        return specs.stowed.length;
      case 'stowed.width':
        return specs.stowed.width;
      case 'stowed.height':
        return specs.stowed.height;
      case 'setupTime':
        return '15-20 minutes';
      case 'maxPayload':
        return '2,700 lbs';
      case 'weatherRating':
        return 'All-weather';
      case 'tempRange':
        return '-40°F to +120°F';
      case 'solarPower':
        return '460W array';
      case 'airConditioning':
        return '24V AC unit';
      case 'heating':
        return '800W electric';
      case 'lighting':
        return 'LED system';
      case 'powerSystem':
        return '24V compatible';
      case 'material':
        return 'Aluminum frame';
      case 'insulation':
        return 'Thermal barrier';
      case 'flooring':
        return 'Heavy-duty vinyl';
      case 'ventilation':
        return 'HVAC system';
      default:
        return 'N/A';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dimensions': return '📏';
      case 'performance': return '⚡';
      case 'features': return '🔧';
      case 'specifications': return '📋';
      default: return '📊';
    }
  };

  const filteredFeatures = comparisonFeatures.filter(f => f.category === activeCategory);

  if (!isVisible) return null;

  return (
    <div className="comparison-mode-overlay">
      <div className="comparison-mode">
        <div className="comparison-header">
          <h3>Shelter Comparison</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="comparison-content">
          {/* Shelter Selection */}
          <div className="shelter-selection">
            <h4>Select Shelters to Compare (Max 4)</h4>
            <div className="shelter-grid">
              {shelters.map(shelter => (
                <button
                  key={shelter.id}
                  className={`shelter-select-btn ${selectedShelters.find(s => s.id === shelter.id) ? 'selected' : ''}`}
                  onClick={() => handleShelterToggle(shelter)}
                >
                  <div className="shelter-icon">{shelter.name.charAt(0)}</div>
                  <div className="shelter-name">{shelter.name}</div>
                  <div className="shelter-category">{shelter.category}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedShelters.length > 0 && (
            <>
              {/* Category Tabs */}
              <div className="category-tabs">
                {(['dimensions', 'performance', 'features', 'specifications'] as const).map(category => (
                  <button
                    key={category}
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    <span className="category-icon">{getCategoryIcon(category)}</span>
                    <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </button>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="comparison-table">
                <div className="table-header">
                  <div className="feature-column">Feature</div>
                  {selectedShelters.map(shelter => (
                    <div key={shelter.id} className="shelter-column">
                      <div className="shelter-header">
                        <h5>{shelter.name}</h5>
                        <button 
                          className="configure-btn"
                          onClick={() => onShelterSelect(shelter)}
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="table-body">
                  {filteredFeatures.map(feature => (
                    <div key={feature.key} className="feature-row">
                      <div className="feature-name">
                        {feature.name}
                        {feature.unit && <span className="unit">({feature.unit})</span>}
                      </div>
                      {selectedShelters.map(shelter => (
                        <div key={shelter.id} className="feature-value">
                          {getFeatureValue(shelter, feature)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="comparison-summary">
                <h4>Summary</h4>
                <div className="summary-grid">
                  {selectedShelters.map(shelter => (
                    <div key={shelter.id} className="summary-card">
                      <h5>{shelter.name}</h5>
                      <div className="summary-stats">
                        <div className="stat">
                          <span className="stat-label">Deployed Area:</span>
                          <span className="stat-value">
                            {shelter.specs.deployed.length} × {shelter.specs.deployed.width} ft
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Configurations:</span>
                          <span className="stat-value">
                            {shelter.configurations?.length || 0} available
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Best For:</span>
                          <span className="stat-value">
                            {shelter.category === 'trecc' ? 'Command & Control' :
                             shelter.category === 'hercon' ? 'Hardwall Operations' :
                             shelter.category === 'mts' ? 'Mobile Teams' :
                             shelter.category === 'series' ? 'General Purpose' :
                             shelter.category === 'mex26' ? 'Maintenance' :
                             shelter.category === 'polar' ? 'Extreme Cold' :
                             shelter.category === 'rdmss' ? 'Rapid Deployment' :
                             shelter.category === 'ateps' ? 'Air Transport' :
                             shelter.category === 'mecc' ? 'Container Operations' : 'Specialized Use'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonMode;
