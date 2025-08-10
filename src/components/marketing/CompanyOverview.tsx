'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CompanyOverview() {
  const achievements = [
    { number: '35+', label: 'YEARS OF EXPERIENCE', description: 'Industry leadership since 1988' },
    { number: '50+', label: 'COUNTRIES SERVED', description: 'Global deployment capability' },
    { number: '1000+', label: 'SUCCESSFUL DEPLOYMENTS', description: 'Proven track record worldwide' },
    { number: '24/7', label: 'GLOBAL SUPPORT', description: 'Round-the-clock assistance' }
  ];

  const capabilities = [
    {
      icon: '🏗️',
      title: 'RAPID DEPLOYMENT',
      description: 'Complete shelter systems operational within 24 hours',
      features: ['Modular design', 'Single-person setup', 'No heavy machinery', 'Any environment']
    },
    {
      icon: '🛡️',
      title: 'MILITARY GRADE',
      description: 'Built to withstand extreme conditions and security requirements',
      features: ['Ballistic protection', 'EMI/RFI shielding', 'Chemical resistance', 'Blast-resistant']
    },
    {
      icon: '🌍',
      title: 'GLOBAL COMPATIBILITY',
      description: 'Designed for deployment in any climate or terrain worldwide',
      features: ['-60°C to +60°C', '200 km/h winds', 'Seismic zones', 'Salt spray resistance']
    },
    {
      icon: '🔧',
      title: 'MODULAR SCALABILITY',
      description: 'Infinitely expandable systems that grow with your needs',
      features: ['Interconnectable units', 'Custom configurations', 'Easy expansion', 'Standardized components']
    }
  ];

  return (
    <section style={{
      padding: '120px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
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
            <span style={{ fontSize: '10px' }}>🏢</span>
            INDUSTRY LEADER
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            ABOUT WEATHERHAVEN
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            For over three decades, Weatherhaven has been the global leader in rapidly deployable shelter solutions, 
            serving military, disaster response, and remote industry applications worldwide.
          </p>
        </motion.div>

        {/* Company Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                textAlign: 'center',
                padding: '32px 24px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                opacity: 0.3
              }} />
              
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#f7fafc',
                marginBottom: '12px'
              }}>
                {achievement.number}
              </div>
              
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#e2e8f0',
                marginBottom: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {achievement.label}
              </div>
              
              <div style={{
                fontSize: '0.75rem',
                color: '#718096',
                fontWeight: '300'
              }}>
                {achievement.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '80px'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            CORE CAPABILITIES
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '16px'
                }}>
                  {capability.icon}
                </div>
                
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '12px'
                }}>
                  {capability.title}
                </h4>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#a0aec0',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontWeight: '300'
                }}>
                  {capability.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {capability.features.map((feature, featureIndex) => (
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
                        width: '4px',
                        height: '4px',
                        background: '#48bb78',
                        borderRadius: '50%'
                      }} />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
            READY TO DEPLOY YOUR SOLUTION?
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            fontWeight: '300'
          }}>
            Contact our team of experts to discuss your specific requirements and get a customized solution.
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
                CONTACT US
              </motion.button>
            </Link>
            
            <Link href="/case-studies">
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
                VIEW CASE STUDIES
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
