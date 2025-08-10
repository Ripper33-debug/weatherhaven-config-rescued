'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductCategories() {
  const categories = [
    {
      category: 'MILITARY & DEFENSE',
      icon: '🛡️',
      products: [
        {
          name: 'Tactical Command Center',
          description: 'Advanced command and control facility for military operations',
          specs: ['Secure communications', 'Multi-agency coordination', 'Rapid deployment', 'Advanced tech integration'],
          deployment: '4-6 hours',
          capacity: '20-50 personnel',
          applications: ['Army', 'Navy', 'Air Force', 'Special Forces']
        },
        {
          name: 'Field Hospital System',
          description: 'Complete medical facility for emergency and routine care',
          specs: ['Surgical suites', 'ICU capabilities', 'Pharmacy', 'Laboratory'],
          deployment: '6-8 hours',
          capacity: '50-100 patients',
          applications: ['Combat support', 'Disaster response', 'Remote medical care']
        },
        {
          name: 'Logistics Support Hub',
          description: 'Comprehensive supply and maintenance facility',
          specs: ['Warehouse space', 'Maintenance bays', 'Fuel storage', 'Communications'],
          deployment: '8-12 hours',
          capacity: '100+ personnel',
          applications: ['Supply chain', 'Maintenance operations', 'Training facilities']
        }
      ]
    },
    {
      category: 'DISASTER RESPONSE',
      icon: '🚨',
      products: [
        {
          name: 'Emergency Relief Shelter',
          description: 'Immediate shelter solution for disaster victims',
          specs: ['Rapid deployment', 'Weather resistant', 'Basic amenities', 'Scalable'],
          deployment: '2-4 hours',
          capacity: '100-500 people',
          applications: ['Natural disasters', 'Humanitarian aid', 'Refugee camps']
        },
        {
          name: 'Mobile Medical Clinic',
          description: 'Portable healthcare facility for emergency response',
          specs: ['Treatment rooms', 'Pharmacy', 'Laboratory', 'Emergency care'],
          deployment: '4-6 hours',
          capacity: '20-50 patients/day',
          applications: ['Emergency response', 'Remote healthcare', 'Disaster relief']
        },
        {
          name: 'Food Distribution Center',
          description: 'Centralized facility for aid distribution',
          specs: ['Storage areas', 'Distribution points', 'Security', 'Communications'],
          deployment: '6-8 hours',
          capacity: '1000+ people/day',
          applications: ['Humanitarian aid', 'Disaster relief', 'Community support']
        }
      ]
    },
    {
      category: 'REMOTE INDUSTRY',
      icon: '🏭',
      products: [
        {
          name: 'Industrial Worker Camp',
          description: 'Complete living facility for remote industrial operations',
          specs: ['Living quarters', 'Dining facilities', 'Recreation areas', 'Medical clinic'],
          deployment: '12-24 hours',
          capacity: '100-500 workers',
          applications: ['Mining', 'Oil & Gas', 'Construction', 'Renewable energy']
        },
        {
          name: 'Maintenance & Workshop',
          description: 'Comprehensive maintenance and repair facility',
          specs: ['Workshop bays', 'Tool storage', 'Parts inventory', 'Office space'],
          deployment: '8-12 hours',
          capacity: '20-50 technicians',
          applications: ['Equipment maintenance', 'Vehicle repair', 'Industrial support']
        },
        {
          name: 'Administrative Complex',
          description: 'Office and administrative facility for remote operations',
          specs: ['Conference rooms', 'Office space', 'Communications', 'Security'],
          deployment: '6-8 hours',
          capacity: '50-100 staff',
          applications: ['Project management', 'Administrative support', 'Client meetings']
        }
      ]
    },
    {
      category: 'RESEARCH & EXPLORATION',
      icon: '🔬',
      products: [
        {
          name: 'Research Laboratory',
          description: 'Specialized facility for scientific research and analysis',
          specs: ['Laboratory space', 'Equipment storage', 'Data center', 'Living quarters'],
          deployment: '12-24 hours',
          capacity: '10-30 researchers',
          applications: ['Arctic research', 'Environmental studies', 'Geological surveys']
        },
        {
          name: 'Exploration Base Camp',
          description: 'Base facility for exploration and survey missions',
          specs: ['Command center', 'Equipment storage', 'Communications', 'Medical support'],
          deployment: '8-12 hours',
          capacity: '20-50 personnel',
          applications: ['Exploration missions', 'Survey operations', 'Research expeditions']
        },
        {
          name: 'Climate Research Station',
          description: 'Specialized facility for climate and environmental research',
          specs: ['Research labs', 'Data collection', 'Living quarters', 'Communications'],
          deployment: '12-24 hours',
          capacity: '15-40 researchers',
          applications: ['Climate research', 'Environmental monitoring', 'Scientific studies']
        }
      ]
    }
  ];

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
            PRODUCT CATEGORIES
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Explore our comprehensive range of deployable shelter systems, each designed for specific applications and environments.
          </p>
        </motion.div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
            style={{
              marginBottom: '80px'
            }}
          >
            {/* Category Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '2.5rem'
              }}>
                {category.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '4px'
                }}>
                  {category.category}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#a0aec0',
                  fontWeight: '300'
                }}>
                  Specialized solutions for {category.category.toLowerCase()} applications
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {category.products.map((product, productIndex) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: productIndex * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Product Header */}
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#f7fafc',
                      marginBottom: '8px'
                    }}>
                      {product.name}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#a0aec0',
                      lineHeight: '1.6',
                      fontWeight: '300'
                    }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      KEY FEATURES
                    </h5>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {product.specs.map((spec, specIndex) => (
                        <motion.div
                          key={spec}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: specIndex * 0.1 }}
                          viewport={{ once: true }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.75rem',
                            color: '#718096'
                          }}
                        >
                          <div style={{
                            width: '3px',
                            height: '3px',
                            background: '#48bb78',
                            borderRadius: '50%'
                          }} />
                          {spec}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Deployment Info */}
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
                        DEPLOYMENT
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#e2e8f0',
                        fontWeight: '600'
                      }}>
                        {product.deployment}
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
                        CAPACITY
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#e2e8f0',
                        fontWeight: '600'
                      }}>
                        {product.capacity}
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div style={{
                    marginBottom: '24px'
                  }}>
                    <h5 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#e2e8f0',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      APPLICATIONS
                    </h5>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {product.applications.map((app, appIndex) => (
                        <motion.span
                          key={app}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: appIndex * 0.1 }}
                          viewport={{ once: true }}
                          style={{
                            padding: '3px 8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            fontSize: '0.625rem',
                            color: '#a0aec0',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {app}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '12px 24px',
                        background: 'transparent',
                        border: '1px solid #4a5568',
                        color: '#e2e8f0',
                        fontWeight: '500',
                        fontSize: '14px',
                        letterSpacing: '0.025em',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase'
                      }}
                    >
                      REQUEST QUOTE
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
