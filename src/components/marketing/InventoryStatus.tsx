'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  maxStock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
  location: string;
  leadTime: string;
  price: string;
  image: string;
}

export default function InventoryStatus() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('stock');

  useEffect(() => {
    // Simulate real-time inventory data
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Tactical Command Center',
        category: 'Military & Defense',
        stockLevel: 8,
        maxStock: 12,
        status: 'in-stock',
        location: 'Vancouver, BC',
        leadTime: 'Ready to Ship',
        price: '$450,000',
        image: '🛡️'
      },
      {
        id: '2',
        name: 'Field Hospital System',
        category: 'Healthcare',
        stockLevel: 3,
        maxStock: 8,
        status: 'low-stock',
        location: 'Vancouver, BC',
        leadTime: '2-3 weeks',
        price: '$650,000',
        image: '🏥'
      },
      {
        id: '3',
        name: 'Emergency Relief Shelter',
        category: 'Disaster Response',
        stockLevel: 25,
        maxStock: 50,
        status: 'in-stock',
        location: 'Houston, TX',
        leadTime: 'Ready to Ship',
        price: '$60,000',
        image: '🚨'
      },
      {
        id: '4',
        name: 'Logistics Support Hub',
        category: 'Military & Defense',
        stockLevel: 0,
        maxStock: 5,
        status: 'out-of-stock',
        location: 'Vancouver, BC',
        leadTime: '6-8 weeks',
        price: '$350,000',
        image: '📦'
      },
      {
        id: '5',
        name: 'Mobile Medical Clinic',
        category: 'Healthcare',
        stockLevel: 12,
        maxStock: 15,
        status: 'in-stock',
        location: 'Vancouver, BC',
        leadTime: 'Ready to Ship',
        price: '$180,000',
        image: '🚑'
      },
      {
        id: '6',
        name: 'Industrial Worker Camp',
        category: 'Remote Industry',
        stockLevel: 2,
        maxStock: 10,
        status: 'low-stock',
        location: 'Calgary, AB',
        leadTime: '3-4 weeks',
        price: '$280,000',
        image: '🏭'
      },
      {
        id: '7',
        name: 'Research Laboratory',
        category: 'Research & Exploration',
        stockLevel: 0,
        maxStock: 3,
        status: 'pre-order',
        location: 'Vancouver, BC',
        leadTime: '8-10 weeks',
        price: '$520,000',
        image: '🔬'
      },
      {
        id: '8',
        name: 'Food Distribution Center',
        category: 'Disaster Response',
        stockLevel: 6,
        maxStock: 8,
        status: 'in-stock',
        location: 'Houston, TX',
        leadTime: 'Ready to Ship',
        price: '$120,000',
        image: '🍽️'
      }
    ];

    setInventory(mockInventory);
  }, []);

  const categories = ['all', 'Military & Defense', 'Healthcare', 'Disaster Response', 'Remote Industry', 'Research & Exploration'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return '#48bb78';
      case 'low-stock': return '#f59e0b';
      case 'out-of-stock': return '#ef4444';
      case 'pre-order': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      case 'pre-order': return 'Pre-Order';
      default: return 'Unknown';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const filteredInventory = inventory.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (sortBy) {
      case 'stock':
        return b.stockLevel - a.stockLevel;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'price':
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      default:
        return 0;
    }
  });

  return (
    <section style={{
      padding: '100px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            INVENTORY STATUS
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Real-time availability of our deployable shelter systems. Check stock levels and lead times for immediate deployment.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === category 
                    ? 'rgba(72, 187, 120, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: selectedCategory === category 
                    ? '1px solid rgba(72, 187, 120, 0.3)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  color: selectedCategory === category ? '#48bb78' : '#a0aec0',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#f7fafc',
              fontSize: '0.875rem'
            }}
          >
            <option value="stock">Sort by Stock Level</option>
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="price">Sort by Price</option>
          </select>
        </motion.div>

        {/* Inventory Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {sortedInventory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '2rem' }}>
                  {item.image}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#f7fafc',
                    marginBottom: '4px'
                  }}>
                    {item.name}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#a0aec0',
                    fontWeight: '300'
                  }}>
                    {item.category}
                  </p>
                </div>
                <div style={{
                  padding: '6px 12px',
                  background: `rgba(${getStatusColor(item.status).replace('#', '')}, 0.1)`,
                  color: getStatusColor(item.status),
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {getStatusText(item.status)}
                </div>
              </div>

              {/* Stock Level */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#e2e8f0',
                    fontWeight: '500'
                  }}>
                    Stock Level
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#f7fafc',
                    fontWeight: '600'
                  }}>
                    {item.stockLevel} / {item.maxStock}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${getStockPercentage(item.stockLevel, item.maxStock)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                      height: '100%',
                      background: getStatusColor(item.status),
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    LOCATION
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#e2e8f0',
                    fontWeight: '500'
                  }}>
                    {item.location}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    LEAD TIME
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#e2e8f0',
                    fontWeight: '500'
                  }}>
                    {item.leadTime}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    PRICE
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#48bb78',
                    fontWeight: '600'
                  }}>
                    {item.price}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    AVAILABILITY
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: getStatusColor(item.status),
                    fontWeight: '600'
                  }}>
                    {item.stockLevel > 0 ? `${item.stockLevel} Available` : 'Contact Sales'}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: item.stockLevel > 0 
                    ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: item.stockLevel > 0 
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: item.stockLevel > 0 ? '#ffffff' : '#a0aec0',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: item.stockLevel > 0 ? 'pointer' : 'default',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em'
                }}
              >
                {item.stockLevel > 0 ? 'Request Quote' : 'Contact Sales'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#48bb78',
              marginBottom: '8px'
            }}>
              {inventory.filter(item => item.status === 'in-stock').length}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#a0aec0',
              fontWeight: '500'
            }}>
              In Stock
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: '8px'
            }}>
              {inventory.filter(item => item.status === 'low-stock').length}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#a0aec0',
              fontWeight: '500'
            }}>
              Low Stock
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#3b82f6',
              marginBottom: '8px'
            }}>
              {inventory.filter(item => item.status === 'pre-order').length}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#a0aec0',
              fontWeight: '500'
            }}>
              Pre-Order Available
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: '8px'
            }}>
              {inventory.filter(item => item.status === 'out-of-stock').length}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#a0aec0',
              fontWeight: '500'
            }}>
              Out of Stock
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
