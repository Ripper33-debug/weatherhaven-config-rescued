'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductComparison() {
  const [selectedProducts, setSelectedProducts] = useState(['Tactical Command Center', 'Field Hospital System']);

  const products = [
    {
      name: 'Tactical Command Center',
      category: 'Military & Defense',
      price: '$250,000 - $500,000',
      deployment: '4-6 hours',
      capacity: '20-50 personnel',
      footprint: '100-200 m²',
      features: [
        'Secure communications suite',
        'Multi-agency coordination',
        'Advanced tech integration',
        '24/7 operations capability',
        'Emergency backup systems',
        'Modular expansion'
      ],
      applications: ['Army', 'Navy', 'Air Force', 'Special Forces', 'Homeland Security'],
      certifications: ['MIL-STD-810', 'IP65', 'Class A Fire Rating']
    },
    {
      name: 'Field Hospital System',
      category: 'Healthcare',
      price: '$300,000 - $750,000',
      deployment: '6-8 hours',
      capacity: '50-100 patients',
      footprint: '150-300 m²',
      features: [
        'Surgical suites',
        'ICU capabilities',
        'Pharmacy & laboratory',
        'Emergency care units',
        'Sterile environments',
        'Medical equipment ready'
      ],
      applications: ['Combat support', 'Disaster response', 'Remote medical care', 'Humanitarian aid'],
      certifications: ['ISO 13485', 'FDA compliant', 'WHO standards']
    },
    {
      name: 'Emergency Relief Shelter',
      category: 'Disaster Response',
      price: '$50,000 - $150,000',
      deployment: '2-4 hours',
      capacity: '100-500 people',
      footprint: '200-500 m²',
      features: [
        'Rapid deployment',
        'Weather resistant',
        'Basic amenities',
        'Scalable design',
        'Easy transport',
        'Minimal crew required'
      ],
      applications: ['Natural disasters', 'Humanitarian aid', 'Refugee camps', 'Emergency response'],
      certifications: ['ISO 9001', 'IP65', 'Wind resistance certified']
    },
    {
      name: 'Industrial Worker Camp',
      category: 'Remote Industry',
      price: '$200,000 - $400,000',
      deployment: '12-24 hours',
      capacity: '100-500 workers',
      footprint: '300-800 m²',
      features: [
        'Living quarters',
        'Dining facilities',
        'Recreation areas',
        'Medical clinic',
        'Laundry services',
        'Security systems'
      ],
      applications: ['Mining', 'Oil & Gas', 'Construction', 'Renewable energy'],
      certifications: ['ISO 14001', 'OHSAS 18001', 'Local building codes']
    },
    {
      name: 'Research Laboratory',
      category: 'Research & Exploration',
      price: '$400,000 - $1,000,000',
      deployment: '12-24 hours',
      capacity: '10-30 researchers',
      footprint: '150-400 m²',
      features: [
        'Laboratory space',
        'Equipment storage',
        'Data center',
        'Living quarters',
        'Environmental controls',
        'Specialized ventilation'
      ],
      applications: ['Arctic research', 'Environmental studies', 'Geological surveys', 'Scientific expeditions'],
      certifications: ['ISO 17025', 'Laboratory safety standards', 'Environmental compliance']
    }
  ];

  const comparisonCriteria = [
    { name: 'Deployment Time', key: 'deployment' },
    { name: 'Capacity', key: 'capacity' },
    { name: 'Footprint', key: 'footprint' },
    { name: 'Price Range', key: 'price' }
  ];

  const selectedProductData = products.filter(product => selectedProducts.includes(product.name));

  return (
    <section style={{
      padding: '100px 0',
      background: 'rgba(255, 255, 255, 0.01)',
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
            marginBottom: '80px'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            PRODUCT COMPARISON
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Compare our shelter systems side by side to find the perfect solution for your requirements.
          </p>
        </motion.div>

        {/* Product Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '60px'
          }}
        >
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            SELECT PRODUCTS TO COMPARE
          </h3>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {products.map((product) => (
              <motion.button
                key={product.name}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (selectedProducts.includes(product.name)) {
                    if (selectedProducts.length > 1) {
                      setSelectedProducts(selectedProducts.filter(p => p !== product.name));
                    }
                  } else {
                    if (selectedProducts.length < 3) {
                      setSelectedProducts([...selectedProducts, product.name]);
                    }
                  }
                }}
                style={{
                  padding: '8px 16px',
                  background: selectedProducts.includes(product.name) 
                    ? '#e2e8f0' 
                    : 'rgba(255, 255, 255, 0.05)',
                  color: selectedProducts.includes(product.name) 
                    ? '#1a202c' 
                    : '#e2e8f0',
                  border: selectedProducts.includes(product.name)
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em'
                }}
              >
                {product.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        {selectedProductData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              overflow: 'auto'
            }}
          >
            <div style={{
              minWidth: '800px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${selectedProductData.length}, 1fr)`,
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  padding: '20px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    CRITERIA
                  </h4>
                </div>
                {selectedProductData.map((product) => (
                  <div key={product.name} style={{
                    padding: '20px',
                    textAlign: 'center',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#f7fafc',
                      marginBottom: '4px'
                    }}>
                      {product.name}
                    </h4>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#a0aec0',
                      fontWeight: '300'
                    }}>
                      {product.category}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              {comparisonCriteria.map((criteria, index) => (
                <div key={criteria.key} style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${selectedProductData.length}, 1fr)`,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}>
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#e2e8f0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {criteria.name}
                    </h5>
                  </div>
                  {selectedProductData.map((product) => (
                    <div key={`${product.name}-${criteria.key}`} style={{
                      padding: '16px 20px',
                      textAlign: 'center',
                      borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#f7fafc',
                        fontWeight: '500'
                      }}>
                        {product[criteria.key as keyof typeof product]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Features Comparison */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${selectedProductData.length}, 1fr)`,
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  padding: '16px 20px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    KEY FEATURES
                  </h5>
                </div>
                {selectedProductData.map((product) => (
                  <div key={`${product.name}-features`} style={{
                    padding: '16px 20px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} style={{
                          fontSize: '0.75rem',
                          color: '#a0aec0',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <div style={{
                            width: '3px',
                            height: '3px',
                            background: '#48bb78',
                            borderRadius: '50%',
                            flexShrink: 0
                          }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Applications Comparison */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${selectedProductData.length}, 1fr)`
              }}>
                <div style={{
                  padding: '16px 20px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    APPLICATIONS
                  </h5>
                </div>
                {selectedProductData.map((product) => (
                  <div key={`${product.name}-applications`} style={{
                    padding: '16px 20px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px'
                    }}>
                      {product.applications.map((app, appIndex) => (
                        <span key={appIndex} style={{
                          padding: '2px 6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '3px',
                          fontSize: '0.625rem',
                          color: '#a0aec0',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            textAlign: 'center'
          }}
        >
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            marginBottom: '24px',
            fontWeight: '300'
          }}>
            Need help choosing the right solution? Our experts are here to help.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '16px 32px',
              background: '#e2e8f0',
              color: '#1a202c',
              fontWeight: '600',
              fontSize: '16px',
              letterSpacing: '0.025em',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            SPEAK WITH AN EXPERT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
