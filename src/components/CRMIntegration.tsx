import React, { useState, useEffect } from 'react';
import { Shelter, User } from '../App';

interface CRMIntegrationProps {
  user: User;
  shelter: Shelter;
  configuration: any;
  onQuoteGenerated: (quote: any) => void;
  onLeadCreated: (lead: any) => void;
}

interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  organization: string;
  requirements: string;
  budget: number;
  timeline: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  createdAt: Date;
  lastContact: Date;
  notes: string[];
}

interface Quote {
  id: string;
  leadId: string;
  shelter: Shelter;
  configuration: any;
  pricing: {
    basePrice: number;
    options: any[];
    totalPrice: number;
    currency: string;
  };
  shipping: {
    cost: number;
    method: string;
    estimatedDelivery: string;
    containerOptimization: any;
  };
  inventory: {
    inStock: boolean;
    quantity: number;
    alternativeOptions: any[];
    preOrderAvailable: boolean;
    preOrderETA: string;
  };
  validUntil: Date;
  createdAt: Date;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reserved: number;
  available: number;
  location: string;
  cost: number;
  supplier: string;
  leadTime: number;
  alternatives: string[];
}

const CRMIntegration: React.FC<CRMIntegrationProps> = ({
  user,
  shelter,
  configuration,
  onQuoteGenerated,
  onLeadCreated
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quote' | 'lead' | 'inventory' | 'shipping'>('quote');
  const [lead, setLead] = useState<Partial<Lead>>({});
  const [quote, setQuote] = useState<Partial<Quote>>({});
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);

  // Mock inventory data
  useEffect(() => {
    setInventory([
      {
        id: '1',
        name: 'TRECC Command Post',
        category: 'shelter',
        quantity: 15,
        reserved: 3,
        available: 12,
        location: 'Vancouver, BC',
        cost: 125000,
        supplier: 'Weatherhaven',
        leadTime: 4,
        alternatives: ['TRECC Medical', 'TRECC Living']
      },
      {
        id: '2',
        name: 'TRECC Medical',
        category: 'shelter',
        quantity: 8,
        reserved: 2,
        available: 6,
        location: 'Vancouver, BC',
        cost: 145000,
        supplier: 'Weatherhaven',
        leadTime: 6,
        alternatives: ['TRECC Command Post', 'TRECC Living']
      }
    ]);

    setShippingOptions([
      {
        method: 'Air Freight',
        cost: 25000,
        time: '3-5 days',
        containerOptimization: 'Single unit per container'
      },
      {
        method: 'Ocean Freight',
        cost: 8000,
        time: '4-6 weeks',
        containerOptimization: 'Multiple units per container'
      },
      {
        method: 'Ground Transport',
        cost: 5000,
        time: '1-2 weeks',
        containerOptimization: 'Direct delivery'
      }
    ]);
  }, []);

  const generateQuote = () => {
    const basePrice = shelter.specs?.deployed?.basePrice || 125000;
    const options = configuration?.options || [];
    const optionsTotal = options.reduce((sum: number, opt: any) => sum + (opt.price || 0), 0);
    const totalPrice = basePrice + optionsTotal;

    const selectedShipping = shippingOptions[0]; // Default to first option
    const inventoryItem = inventory.find(item => item.name.includes(shelter.name));

    const newQuote: Quote = {
      id: `Q-${Date.now()}`,
      leadId: lead.id || '',
      shelter,
      configuration,
      pricing: {
        basePrice,
        options,
        totalPrice,
        currency: 'USD'
      },
      shipping: {
        cost: selectedShipping.cost,
        method: selectedShipping.method,
        estimatedDelivery: selectedShipping.time,
        containerOptimization: selectedShipping.containerOptimization
      },
      inventory: {
        inStock: inventoryItem?.available ? inventoryItem.available > 0 : false,
        quantity: inventoryItem?.available || 0,
        alternativeOptions: inventoryItem?.alternatives || [],
        preOrderAvailable: true,
        preOrderETA: `+${inventoryItem?.leadTime || 4} weeks`
      },
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date(),
      status: 'draft'
    };

    setQuote(newQuote);
    onQuoteGenerated(newQuote);
  };

  const createLead = () => {
    const newLead: Lead = {
      id: `L-${Date.now()}`,
      customerName: lead.customerName || '',
      email: lead.email || '',
      phone: lead.phone || '',
      organization: lead.organization || '',
      requirements: lead.requirements || '',
      budget: lead.budget || 0,
      timeline: lead.timeline || '',
      status: 'new',
      createdAt: new Date(),
      lastContact: new Date(),
      notes: []
    };

    onLeadCreated(newLead);
  };

  const exportQuote = (format: 'pdf' | 'excel' | 'json') => {
    const data = {
      quote,
      lead,
      shelter,
      configuration,
      generatedBy: user.username,
      generatedAt: new Date().toISOString()
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Quote_${quote.id}_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      {/* CRM Integration Button */}
      <button
        className="crm-integration-button"
        onClick={() => setIsOpen(!isOpen)}
        title="CRM Integration"
      >
        <span className="crm-icon">📊</span>
        <span className="crm-label">CRM</span>
      </button>

      {/* CRM Panel */}
      {isOpen && (
        <div className="crm-integration-panel">
          <div className="crm-header">
            <h3>📊 CRM Integration</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="crm-tabs">
            <button 
              className={`tab ${activeTab === 'quote' ? 'active' : ''}`}
              onClick={() => setActiveTab('quote')}
            >
              💰 Quote Generation
            </button>
            <button 
              className={`tab ${activeTab === 'lead' ? 'active' : ''}`}
              onClick={() => setActiveTab('lead')}
            >
              👤 Lead Management
            </button>
            <button 
              className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              📦 Inventory
            </button>
            <button 
              className={`tab ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              🚚 Shipping & Logistics
            </button>
          </div>

          <div className="crm-content">
            {/* Quote Generation Tab */}
            {activeTab === 'quote' && (
              <div className="quote-tab">
                <div className="quote-preview">
                  <h4>Quote Preview</h4>
                  <div className="quote-details">
                    <div className="quote-item">
                      <span>Shelter:</span>
                      <span>{shelter.name}</span>
                    </div>
                    <div className="quote-item">
                      <span>Base Price:</span>
                      <span>${quote.pricing?.basePrice?.toLocaleString() || '125,000'}</span>
                    </div>
                    <div className="quote-item">
                      <span>Options:</span>
                      <span>${quote.pricing?.options?.reduce((sum: number, opt: any) => sum + (opt.price || 0), 0)?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="quote-item total">
                      <span>Total:</span>
                      <span>${quote.pricing?.totalPrice?.toLocaleString() || '125,000'}</span>
                    </div>
                  </div>
                  
                  <div className="quote-actions">
                    <button className="generate-quote-btn" onClick={generateQuote}>
                      Generate Quote
                    </button>
                    <div className="export-options">
                      <button onClick={() => exportQuote('pdf')}>Export PDF</button>
                      <button onClick={() => exportQuote('excel')}>Export Excel</button>
                      <button onClick={() => exportQuote('json')}>Export JSON</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lead Management Tab */}
            {activeTab === 'lead' && (
              <div className="lead-tab">
                <form className="lead-form">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      value={lead.customerName || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={lead.email || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={lead.phone || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Organization</label>
                    <input
                      type="text"
                      value={lead.organization || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="Enter organization"
                    />
                  </div>
                  <div className="form-group">
                    <label>Requirements</label>
                    <textarea
                      value={lead.requirements || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, requirements: e.target.value }))}
                      placeholder="Describe requirements"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget (USD)</label>
                    <input
                      type="number"
                      value={lead.budget || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                      placeholder="Enter budget"
                    />
                  </div>
                  <div className="form-group">
                    <label>Timeline</label>
                    <select
                      value={lead.timeline || ''}
                      onChange={(e) => setLead(prev => ({ ...prev, timeline: e.target.value }))}
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                  <button type="button" className="create-lead-btn" onClick={createLead}>
                    Create Lead
                  </button>
                </form>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="inventory-tab">
                <h4>Real-time Inventory Status</h4>
                <div className="inventory-list">
                  {inventory.map(item => (
                    <div key={item.id} className="inventory-item">
                      <div className="item-header">
                        <h5>{item.name}</h5>
                        <span className={`stock-status ${item.available > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {item.available > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="item-details">
                        <div className="stock-info">
                          <span>Available: {item.available}</span>
                          <span>Reserved: {item.reserved}</span>
                          <span>Total: {item.quantity}</span>
                        </div>
                        <div className="item-location">
                          <span>Location: {item.location}</span>
                          <span>Lead Time: {item.leadTime} weeks</span>
                        </div>
                        {item.available === 0 && (
                          <div className="alternatives">
                            <h6>Alternative Options:</h6>
                            <ul>
                              {item.alternatives.map(alt => (
                                <li key={alt}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping & Logistics Tab */}
            {activeTab === 'shipping' && (
              <div className="shipping-tab">
                <h4>Shipping & Logistics Options</h4>
                <div className="shipping-options">
                  {shippingOptions.map((option, index) => (
                    <div key={index} className="shipping-option">
                      <div className="option-header">
                        <h5>{option.method}</h5>
                        <span className="shipping-cost">${option.cost.toLocaleString()}</span>
                      </div>
                      <div className="option-details">
                        <div className="delivery-time">
                          <span>⏱️ Delivery Time: {option.time}</span>
                        </div>
                        <div className="container-optimization">
                          <span>📦 {option.containerOptimization}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="logistics-calculator">
                  <h4>Logistics Calculator</h4>
                  <div className="calculator-inputs">
                    <div className="input-group">
                      <label>Destination</label>
                      <select>
                        <option>Select destination</option>
                        <option>North America</option>
                        <option>Europe</option>
                        <option>Asia Pacific</option>
                        <option>Middle East</option>
                        <option>Africa</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Quantity</label>
                      <input type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="input-group">
                      <label>Priority</label>
                      <select>
                        <option>Standard</option>
                        <option>Express</option>
                        <option>Emergency</option>
                      </select>
                    </div>
                  </div>
                  <button className="calculate-shipping-btn">
                    Calculate Shipping & Delivery
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CRMIntegration;
