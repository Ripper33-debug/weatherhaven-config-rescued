'use client';

import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    {
      category: 'QUALITY MANAGEMENT',
      certs: [
        { name: 'ISO 9001:2015', description: 'Quality Management Systems' },
        { name: 'ISO 14001:2015', description: 'Environmental Management' },
        { name: 'OHSAS 18001', description: 'Occupational Health & Safety' }
      ]
    },
    {
      category: 'DEFENSE & MILITARY',
      certs: [
        { name: 'MIL-STD-810', description: 'Environmental Engineering Considerations' },
        { name: 'MIL-STD-461', description: 'Electromagnetic Interference' },
        { name: 'NATO AQAP', description: 'NATO Quality Assurance' }
      ]
    },
    {
      category: 'SAFETY & COMPLIANCE',
      certs: [
        { name: 'UL Listed', description: 'Underwriters Laboratories Safety' },
        { name: 'CE Marking', description: 'European Conformity' },
        { name: 'CSA Certified', description: 'Canadian Standards Association' }
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
            CERTIFICATIONS & STANDARDS
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Meeting the highest industry standards and regulatory requirements worldwide.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {certifications.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
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
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                opacity: 0.3
              }} />
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                {category.category}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {category.certs.map((cert, certIndex) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: certIndex * 0.1 }}
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
                      gap: '16px'
                    }}>
                      <div style={{
                        flex: '1'
                      }}>
                        <h4 style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#e2e8f0',
                          marginBottom: '4px'
                        }}>
                          {cert.name}
                        </h4>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#a0aec0',
                          fontWeight: '300'
                        }}>
                          {cert.description}
                        </p>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        background: 'rgba(72, 187, 120, 0.1)',
                        border: '1px solid rgba(72, 187, 120, 0.2)',
                        borderRadius: '4px',
                        fontSize: '0.625rem',
                        color: '#48bb78',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        CERTIFIED
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
