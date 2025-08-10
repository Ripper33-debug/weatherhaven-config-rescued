'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '⚡',
      title: 'RAPID DEPLOYMENT',
      description: 'Set up complete shelter systems in under 24 hours, not weeks. Our modular design enables lightning-fast deployment in any environment.',
      benefits: ['24-hour setup time', 'Modular components', 'No heavy machinery required', 'Single-person deployment']
    },
    {
      icon: '🌍',
      title: 'GLOBAL COMPATIBILITY',
      description: 'Designed for extreme environments worldwide. From Arctic research stations to desert military operations.',
      benefits: ['Temperature range: -60°C to +60°C', 'Wind resistance up to 200 km/h', 'Seismic zone compatibility', 'Salt spray resistance']
    },
    {
      icon: '🛡️',
      title: 'MILITARY GRADE',
      description: 'Built to military specifications for maximum durability and security. Trusted by armed forces worldwide.',
      benefits: ['Ballistic protection options', 'EMI/RFI shielding', 'Chemical resistance', 'Blast-resistant design']
    },
    {
      icon: '🔧',
      title: 'MODULAR DESIGN',
      description: 'Infinitely scalable shelter systems. Start small and expand as your needs grow.',
      benefits: ['Interconnectable units', 'Custom configurations', 'Easy expansion', 'Standardized components']
    },
    {
      icon: '💡',
      title: 'SMART INTEGRATION',
      description: 'Built-in power, HVAC, and communication systems. Ready for immediate operation.',
      benefits: ['Integrated power systems', 'Climate control', 'Satellite communications', 'IoT connectivity']
    },
    {
      icon: '♻️',
      title: 'SUSTAINABLE',
      description: 'Eco-friendly materials and energy-efficient systems. Minimize environmental impact.',
      benefits: ['Solar power integration', 'Recyclable materials', 'Energy-efficient HVAC', 'Water recycling systems']
    }
  ];

  return (
    <section style={{
      padding: '120px 0',
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#a0aec0',
            marginBottom: '24px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            <span style={{ fontSize: '10px' }}>⚡</span>
            CUTTING-EDGE TECHNOLOGY
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            WHY CHOOSE WEATHERHAVEN
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Advanced features that set our deployable shelter systems apart from the competition.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '80px'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveFeature(index)}
              style={{
                background: activeFeature === index 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${activeFeature === index 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.05)'}`,
                borderRadius: '8px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Hover Effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)',
                  opacity: 0
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  flexShrink: 0
                }}>
                  {feature.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f7fafc',
                    marginBottom: '12px',
                    letterSpacing: '0.02em'
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#a0aec0',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    fontWeight: '300'
                  }}>
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: benefitIndex * 0.1 }}
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
                          width: '4px',
                          height: '4px',
                          background: '#48bb78',
                          borderRadius: '50%'
                        }} />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '48px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '16px'
          }}>
            EXPERIENCE THE DIFFERENCE
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            fontWeight: '300'
          }}>
            See how our advanced features work together to create the most efficient deployable shelter system in the world.
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
                padding: '16px 32px',
                background: '#e2e8f0',
                color: '#1a202c',
                fontWeight: '600',
                fontSize: '16px',
                letterSpacing: '0.025em',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}
            >
              WATCH DEMO
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #4a5568',
                color: '#e2e8f0',
                fontWeight: '600',
                fontSize: '16px',
                letterSpacing: '0.025em',
                borderRadius: '4px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}
            >
              DOWNLOAD SPECS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
