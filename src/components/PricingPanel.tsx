import React, { useState, useEffect, useCallback } from 'react';
import { ConfiguratorState } from './ShelterConfigurator';
import { Shelter } from '../App';

interface PricingPanelProps {
  configState: ConfiguratorState;
  shelter: Shelter;
  user: any;
  onClose: () => void;
}

interface PricingBreakdown {
  basePrice: number;
  colorPremium: number;
  deploymentSystem: number;
  solarArray: number;
  hvacSystem: number;
  displaySystem: number;
  generator: number;
  lighting: number;
  electrical: number;
  total: number;
  currency: string;
  validUntil: string;
}

const PricingPanel: React.FC<PricingPanelProps> = ({
  configState,
  shelter,
  user,
  onClose
}) => {
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculatePricing = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const basePrice = 85000;
      const colorPremium = getColorPremium(configState.color);
      const deploymentSystem = 12000;
      const solarArray = 8000;
      const hvacSystem = 15000;
      const displaySystem = 5000;
      const generator = 12000;
      const lighting = 3000;
      const electrical = 4000;
      
      const subtotal = basePrice + colorPremium + deploymentSystem + solarArray + 
                      hvacSystem + displaySystem + generator + lighting + electrical;
      
      const discountAmount = (subtotal * discount) / 100;
      const total = subtotal - discountAmount;
      
      setPricing({
        basePrice,
        colorPremium,
        deploymentSystem,
        solarArray,
        hvacSystem,
        displaySystem,
        generator,
        lighting,
        electrical,
        total: total * quantity,
        currency: 'USD',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      
      setIsLoading(false);
    }, 500);
  }, [configState.color, quantity, discount]);

  useEffect(() => {
    calculatePricing();
  }, [calculatePricing]);

  const getColorPremium = (color: string) => {
    const colorPremiums: { [key: string]: number } = {
      '#F7FAFC': 2000, // Arctic White
      '#D69E2E': 1500,  // Desert Tan
      '#2C5282': 1000,  // Navy Blue
      '#4A5568': 0,     // Military Green
      '#2D3748': 0,     // Charcoal
      '#8B4513': 500    // Camo Brown
    };
    // Custom colors get a premium of 10-15k (using 12.5k as average)
    return colorPremiums[color] || 12500;
  };

  const getColorName = (color: string) => {
    const colorMap: { [key: string]: string } = {
      '#4A5568': 'Military Green',
      '#D69E2E': 'Desert Tan',
      '#F7FAFC': 'Arctic White',
      '#2C5282': 'Navy Blue',
      '#2D3748': 'Charcoal',
      '#8B4513': 'Camo Brown'
    };
    return colorMap[color] || `Custom Color (${color})`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generateQuote = () => {
    if (!pricing) return;
    
    const quoteData = {
      quoteNumber: `Q-${Date.now()}`,
      date: new Date().toISOString(),
      client: user.clientBranding?.companyName || 'Weatherhaven Technologies',
      contact: user.username,
      shelter: shelter.name,
      configuration: {
        isDeployed: configState.isDeployed,
        color: getColorName(configState.color),
        quantity: quantity
      },
      pricing: pricing,
      validUntil: pricing.validUntil
    };

    // Generate quote document
    const blob = new Blob([JSON.stringify(quoteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quote_${shelter.name}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="pricing-panel-overlay">
        <div className="pricing-panel">
          <div className="loading-spinner"></div>
          <p>Calculating pricing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-panel-overlay">
      <div className="pricing-panel">
        <div className="pricing-header">
          <h2>Pricing Information</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="pricing-content">
          {/* Configuration Summary */}
          <div className="pricing-section">
            <h3>Configuration Summary</h3>
            <div className="config-summary">
              <div className="config-item">
                <span className="config-label">Shelter:</span>
                <span className="config-value">{shelter.name}</span>
              </div>
              <div className="config-item">
                <span className="config-label">State:</span>
                <span className="config-value">{configState.isDeployed ? 'Deployed' : 'Stowed'}</span>
              </div>
              <div className="config-item">
                <span className="config-label">Color:</span>
                <span className="config-value">{getColorName(configState.color)}</span>
              </div>
              <div className="config-item">
                <span className="config-label">Quantity:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="quantity-input"
                />
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="pricing-section">
            <div className="pricing-toggle">
              <h3>Price Breakdown</h3>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="toggle-button"
              >
                {showBreakdown ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showBreakdown && pricing && (
              <div className="price-breakdown">
                <div className="breakdown-item">
                  <span>Base Shelter</span>
                  <span>{formatCurrency(pricing.basePrice)}</span>
                </div>
                {pricing.colorPremium > 0 && (
                  <div className="breakdown-item">
                    <span>Color Premium ({getColorName(configState.color)})</span>
                    <span>{formatCurrency(pricing.colorPremium)}</span>
                  </div>
                )}
                <div className="breakdown-item">
                  <span>Deployment System</span>
                  <span>{formatCurrency(pricing.deploymentSystem)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Solar Array (460W)</span>
                  <span>{formatCurrency(pricing.solarArray)}</span>
                </div>
                <div className="breakdown-item">
                  <span>HVAC System</span>
                  <span>{formatCurrency(pricing.hvacSystem)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Command Display (55")</span>
                  <span>{formatCurrency(pricing.displaySystem)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Generator (2kW)</span>
                  <span>{formatCurrency(pricing.generator)}</span>
                </div>
                <div className="breakdown-item">
                  <span>LED Lighting System</span>
                  <span>{formatCurrency(pricing.lighting)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Electrical System</span>
                  <span>{formatCurrency(pricing.electrical)}</span>
                </div>
                <div className="breakdown-divider"></div>
                <div className="breakdown-item subtotal">
                  <span>Subtotal</span>
                  <span>{formatCurrency(pricing.total / quantity)}</span>
                </div>
                {quantity > 1 && (
                  <div className="breakdown-item">
                    <span>Quantity ({quantity})</span>
                    <span>{formatCurrency(pricing.total)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Discount */}
          <div className="pricing-section">
            <label htmlFor="discount">Discount (%)</label>
            <input
              id="discount"
              type="number"
              min="0"
              max="50"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="discount-input"
            />
          </div>

          {/* Total */}
          {pricing && (
            <div className="pricing-total">
              <div className="total-amount">
                <span className="total-label">Total Price</span>
                <span className="total-value">{formatCurrency(pricing.total)}</span>
              </div>
              <div className="total-note">
                <p>Quote valid until {pricing.validUntil}</p>
                <p>All prices in {pricing.currency}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pricing-actions">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button
            onClick={generateQuote}
            className="btn-primary"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPanel;
