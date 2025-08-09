import React, { useState, useEffect } from 'react';
import { Shelter, ShelterConfiguration } from '../App';

interface LeadTimeEstimate {
  productionTime: number; // days
  shippingTime: number; // days
  customsTime: number; // days
  totalTime: number; // days
  rushAvailable: boolean;
  rushCost: number; // percentage increase
}

interface LeadTimeCalculatorProps {
  shelter: Shelter;
  configuration?: ShelterConfiguration;
  isVisible: boolean;
  onClose: () => void;
}

// Base lead times by shelter type (in days)
// Throughput: 2 units every 14 days => 7 days per unit baseline
const baseLeadTimes = {
  trecc: { production: 7, shipping: 7, customs: 3 },
  hercon: { production: 21, shipping: 10, customs: 5 },
  mts: { production: 18, shipping: 8, customs: 4 },
  series: { production: 12, shipping: 6, customs: 2 },
  mex26: { production: 25, shipping: 12, customs: 6 },
  polar: { production: 30, shipping: 15, customs: 8 },
  rdmss: { production: 20, shipping: 9, customs: 4 },
  ateps: { production: 16, shipping: 7, customs: 3 },
  mecc: { production: 22, shipping: 11, customs: 5 }
};

// Location modifiers
const locationModifiers = {
  US: { shipping: 1, customs: 0 },
  Canada: { shipping: 1.5, customs: 1 },
  Europe: { shipping: 2, customs: 2 },
  Asia: { shipping: 2.5, customs: 3 },
  MiddleEast: { shipping: 3, customs: 4 },
  Africa: { shipping: 4, customs: 5 },
  SouthAmerica: { shipping: 3.5, customs: 4 }
};

// Priority modifiers
// Rush: +30% price, Emergency: +50% price
const priorityModifiers = {
  standard: { production: 1, cost: 0 },
  rush: { production: 0.7, cost: 30 },
  emergency: { production: 0.5, cost: 50 }
};

const LeadTimeCalculator: React.FC<LeadTimeCalculatorProps> = ({
  shelter,
  configuration,
  isVisible,
  onClose
}) => {
  const [location, setLocation] = useState('US');
  const [priority, setPriority] = useState<'standard' | 'rush' | 'emergency'>('standard');
  const [quantity, setQuantity] = useState(1);
  const [estimate, setEstimate] = useState<LeadTimeEstimate | null>(null);

  // Calculate lead time estimate
  useEffect(() => {
    if (!shelter || !isVisible) return;

    const shelterType = shelter.id.toLowerCase();
    const baseTimes = baseLeadTimes[shelterType as keyof typeof baseLeadTimes] || baseLeadTimes.trecc;
    const locationMod = locationModifiers[location as keyof typeof locationModifiers] || locationModifiers.US;
    const priorityMod = priorityModifiers[priority];

    // Quantity throughput: 2 units per 14 days (7 days per unit)
    const unitsPerBatch = 2;
    const daysPerBatch = 14;
    const batches = Math.ceil(quantity / unitsPerBatch);
    const baseProductionDays = batches * daysPerBatch;
    const productionTime = Math.ceil(baseProductionDays * priorityMod.production);
    const shippingTime = Math.ceil(baseTimes.shipping * locationMod.shipping);
    const customsTime = Math.ceil(baseTimes.customs * locationMod.customs);
    const totalTime = productionTime + shippingTime + customsTime;

    setEstimate({
      productionTime,
      shippingTime,
      customsTime,
      totalTime,
      rushAvailable: priority === 'standard',
      rushCost: priorityMod.cost
    });
  }, [shelter, configuration, location, priority, quantity, isVisible]);

  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'rgba(239, 68, 68, 0.8)';
      case 'rush': return 'rgba(245, 158, 11, 0.8)';
      default: return 'rgba(34, 197, 94, 0.8)';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="lead-time-calculator-overlay">
      <div className="lead-time-calculator">
        <div className="calculator-header">
          <h3>Lead Time Calculator</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="calculator-content">
          <div className="shelter-info">
            <h4>{shelter.name}</h4>
            {configuration && <p>{configuration.name}</p>}
          </div>

          <div className="calculator-form">
            <div className="form-group">
              <label htmlFor="location">Destination</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="calculator-select"
              >
                <option value="US">United States</option>
                <option value="Canada">Canada</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="MiddleEast">Middle East</option>
                <option value="Africa">Africa</option>
                <option value="SouthAmerica">South America</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority Level</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="calculator-select"
              >
                <option value="standard">Standard (Normal Cost)</option>
                 <option value="rush">Rush (+30% Cost)</option>
                 <option value="emergency">Emergency (+50% Cost)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="calculator-input"
              />
            </div>
          </div>

          {estimate && (
            <div className="estimate-results">
              <div className="estimate-header">
                <h4>Estimated Timeline</h4>
                <div 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(priority) }}
                >
                  {priority.toUpperCase()}
                </div>
              </div>

              <div className="timeline-breakdown">
                <div className="timeline-item">
                  <div className="timeline-icon">🏭</div>
                  <div className="timeline-content">
                    <h5>Production</h5>
                    <p>{estimate.productionTime} days</p>
                    <small>Manufacturing & assembly</small>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">🚢</div>
                  <div className="timeline-content">
                    <h5>Shipping</h5>
                    <p>{estimate.shippingTime} days</p>
                    <small>Transport to destination</small>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">📋</div>
                  <div className="timeline-content">
                    <h5>Customs</h5>
                    <p>{estimate.customsTime} days</p>
                    <small>Clearance & documentation</small>
                  </div>
                </div>
              </div>

              <div className="total-estimate">
                <div className="total-time">
                  <h4>Total Lead Time</h4>
                  <div className="time-display">
                    <span className="days">{estimate.totalTime}</span>
                    <span className="unit">days</span>
                  </div>
                  <p className="delivery-date">
                    Estimated delivery: <strong>{formatDate(estimate.totalTime)}</strong>
                  </p>
                </div>

                {priority !== 'standard' && (
                  <div className="cost-notice">
                    <p>⚠️ Rush fee: +{estimate.rushCost}% to base cost</p>
                  </div>
                )}
              </div>

              <div className="additional-info">
                <h5>Important Notes</h5>
                <ul>
                  <li>Times are estimates and may vary based on current production capacity</li>
                  <li>Throughput assumption: 2 units every 2 weeks</li>
                  <li>Customs times may vary by country and current regulations</li>
                  <li>Speak with your sales advisor for additional options and pricing details</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadTimeCalculator;
