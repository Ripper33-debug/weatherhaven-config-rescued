'use client';

import { motion } from 'framer-motion';

export default function TechnicalSpecs() {
  const specs = [
    {
      category: 'STRUCTURAL INTEGRITY',
      icon: '🏗️',
      specifications: [
        {
          name: 'Frame Construction',
          value: 'Aluminum alloy 6061-T6',
          description: 'High-strength, corrosion-resistant aluminum framework'
        },
        {
          name: 'Load Capacity',
          value: 'Up to 500 kg/m²',
          description: 'Designed for heavy equipment and personnel loads'
        },
        {
          name: 'Wind Resistance',
          value: '120 km/h sustained',
          description: 'Engineered for extreme weather conditions'
        },
        {
          name: 'Snow Load',
          value: '2.4 kN/m²',
          description: 'Certified for heavy snow accumulation'
        }
      ]
    },
    {
      category: 'ENVIRONMENTAL PROTECTION',
      icon: '🌡️',
      specifications: [
        {
          name: 'Temperature Range',
          value: '-40°C to +60°C',
          description: 'Operational in extreme temperature environments'
        },
        {
          name: 'Waterproof Rating',
          value: 'IP65',
          description: 'Protected against dust and water ingress'
        },
        {
          name: 'UV Resistance',
          value: '10+ years',
          description: 'Long-term exposure protection'
        },
        {
          name: 'Fire Rating',
          value: 'Class A',
          description: 'Fire-resistant materials and construction'
        }
      ]
    },
    {
      category: 'DEPLOYMENT & MOBILITY',
      icon: '⚡',
      specifications: [
        {
          name: 'Deployment Time',
          value: '2-24 hours',
          description: 'Varies by system size and complexity'
        },
        {
          name: 'Crew Requirements',
          value: '2-8 personnel',
          description: 'Minimal crew for rapid deployment'
        },
        {
          name: 'Transport Method',
          value: 'Air, sea, land',
          description: 'Multiple transportation options available'
        },
        {
          name: 'Footprint',
          value: '20-500 m²',
          description: 'Scalable from compact to large facilities'
        }
      ]
    },
    {
      category: 'UTILITIES & INFRASTRUCTURE',
      icon: '🔌',
      specifications: [
        {
          name: 'Electrical System',
          value: '110V/220V/380V',
          description: 'Multi-voltage compatibility'
        },
        {
          name: 'HVAC Capacity',
          value: 'Up to 50 kW',
          description: 'Heating, ventilation, and air conditioning'
        },
        {
          name: 'Water System',
          value: 'Pressurized',
          description: 'Integrated plumbing and waste management'
        },
        {
          name: 'Communications',
          value: 'Satellite ready',
          description: 'Built-in communications infrastructure'
        }
      ]
    },
    {
      category: 'SAFETY & SECURITY',
      icon: '🔒',
      specifications: [
        {
          name: 'Security Level',
          value: 'Level 3',
          description: 'Enhanced security features available'
        },
        {
          name: 'Emergency Systems',
          value: 'Integrated',
          description: 'Fire suppression and emergency lighting'
        },
        {
          name: 'Access Control',
          value: 'Electronic',
          description: 'Advanced access control systems'
        },
        {
          name: 'Surveillance',
          value: 'CCTV ready',
          description: 'Pre-wired for surveillance systems'
        }
      ]
    },
    {
      category: 'MAINTENANCE & LIFECYCLE',
      icon: '🔧',
      specifications: [
        {
          name: 'Service Life',
          value: '20+ years',
          description: 'Extended operational lifespan'
        },
        {
          name: 'Maintenance Cycle',
          value: 'Annual',
          description: 'Minimal maintenance requirements'
        },
        {
          name: 'Warranty',
          value: '5 years',
          description: 'Comprehensive warranty coverage'
        },
        {
          name: 'Spare Parts',
          value: 'Global support',
          description: 'Worldwide spare parts availability'
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
            TECHNICAL SPECIFICATIONS
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Our deployable shelter systems are engineered to the highest standards, ensuring reliability and performance in the most demanding environments.
          </p>
        </motion.div>

        {/* Specifications Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px'
        }}>
          {specs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
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
              {/* Category Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '2rem'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  letterSpacing: '0.02em'
                }}>
                  {category.category}
                </h3>
              </div>

              {/* Specifications List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {category.specifications.map((spec, specIndex) => (
                  <motion.div
                    key={spec.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: specIndex * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                      gap: '16px'
                    }}>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#e2e8f0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        flex: '1'
                      }}>
                        {spec.name}
                      </h4>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#48bb78',
                        textAlign: 'right',
                        flex: '0 0 auto'
                      }}>
                        {spec.value}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#a0aec0',
                      lineHeight: '1.5',
                      fontWeight: '300'
                    }}>
                      {spec.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: '80px',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '16px'
          }}>
            CUSTOM ENGINEERING SOLUTIONS
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto 24px',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            All specifications can be customized to meet your specific requirements. Our engineering team works closely with clients 
            to develop tailored solutions that exceed expectations.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 24px',
                background: '#e2e8f0',
                color: '#1a202c',
                fontWeight: '600',
                fontSize: '14px',
                letterSpacing: '0.025em',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              DOWNLOAD SPEC SHEET
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid #4a5568',
                color: '#e2e8f0',
                fontWeight: '600',
                fontSize: '14px',
                letterSpacing: '0.025em',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              REQUEST ENGINEERING REVIEW
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
