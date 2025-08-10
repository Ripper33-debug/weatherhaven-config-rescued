'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SolutionsShowcase() {
  const solutions = [
    {
      category: 'MILITARY & DEFENSE',
      icon: '🛡️',
      title: 'Combat Support Systems',
      description: 'Rapidly deployable command centers, medical facilities, and logistics hubs for military operations.',
      features: [
        'Command & Control Centers',
        'Field Hospitals',
        'Logistics Warehouses',
        'Training Facilities'
      ],
      applications: ['Army', 'Navy', 'Air Force', 'Special Forces'],
      image: '🏕️'
    },
    {
      category: 'DISASTER RESPONSE',
      icon: '🚨',
      title: 'Emergency Relief Operations',
      description: 'Immediate shelter solutions for natural disasters, humanitarian crises, and emergency situations.',
      features: [
        'Emergency Shelters',
        'Medical Tents',
        'Food Distribution Centers',
        'Temporary Housing'
      ],
      applications: ['Natural Disasters', 'Humanitarian Aid', 'Refugee Camps', 'Emergency Response'],
      image: '🏥'
    },
    {
      category: 'REMOTE INDUSTRY',
      icon: '🏭',
      title: 'Industrial Camp Solutions',
      description: 'Complete living and working facilities for remote mining, oil & gas, and construction operations.',
      features: [
        'Worker Accommodations',
        'Dining Facilities',
        'Recreation Centers',
        'Maintenance Shops'
      ],
      applications: ['Mining', 'Oil & Gas', 'Construction', 'Renewable Energy'],
      image: '⛏️'
    },
    {
      category: 'RESEARCH & EXPLORATION',
      icon: '🔬',
      title: 'Scientific Research Stations',
      description: 'Specialized facilities for Arctic research, environmental studies, and scientific expeditions.',
      features: [
        'Research Laboratories',
        'Living Quarters',
        'Equipment Storage',
        'Communication Centers'
      ],
      applications: ['Arctic Research', 'Environmental Studies', 'Geological Surveys', 'Climate Research'],
      image: '🧊'
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
            <span style={{ fontSize: '10px' }}>🎯</span>
            SPECIALIZED SOLUTIONS
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            SOLUTIONS FOR EVERY MISSION
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            From military operations to disaster relief, our deployable shelter systems are designed to meet the most demanding requirements.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '4px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '500',
                color: '#a0aec0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {solution.category}
              </div>

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '2.5rem'
                }}>
                  {solution.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f7fafc',
                    marginBottom: '4px'
                  }}>
                    {solution.title}
                  </h3>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {solution.category}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: '#a0aec0',
                lineHeight: '1.6',
                marginBottom: '24px',
                fontWeight: '300'
              }}>
                {solution.description}
              </p>

              {/* Features */}
              <div style={{
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  KEY FEATURES
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {solution.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
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
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div style={{
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  APPLICATIONS
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {solution.applications.map((app, appIndex) => (
                    <motion.span
                      key={app}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: appIndex * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        padding: '4px 8px',
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
              <Link href="/solutions">
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
                  LEARN MORE
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            padding: '48px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '16px'
          }}>
            NEED A CUSTOM SOLUTION?
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            fontWeight: '300'
          }}>
            Our engineering team can design and deploy custom shelter solutions for your specific requirements.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/contact">
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
                REQUEST QUOTE
              </motion.button>
            </Link>
            
            <Link href="/configurator">
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
                DESIGN YOUR SOLUTION
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
