'use client';

import { motion } from 'framer-motion';

export default function GlobalPresence() {
  const regions = [
    {
      region: 'NORTH AMERICA',
      countries: ['United States', 'Canada', 'Mexico'],
      facilities: ['Headquarters', 'Manufacturing', 'R&D Center'],
      icon: '🇺🇸'
    },
    {
      region: 'EUROPE',
      countries: ['United Kingdom', 'Germany', 'France', 'Netherlands'],
      facilities: ['Regional Office', 'Service Center', 'Training Facility'],
      icon: '🇪🇺'
    },
    {
      region: 'ASIA PACIFIC',
      countries: ['Australia', 'Japan', 'South Korea', 'Singapore'],
      facilities: ['Regional Office', 'Distribution Center', 'Support Hub'],
      icon: '🌏'
    },
    {
      region: 'MIDDLE EAST',
      countries: ['UAE', 'Saudi Arabia', 'Israel', 'Qatar'],
      facilities: ['Regional Office', 'Service Center', 'Training Facility'],
      icon: '🌍'
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
            GLOBAL PRESENCE
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Serving clients worldwide with local expertise and global support capabilities.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {regions.map((region, index) => (
            <motion.div
              key={region.region}
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
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '2rem'
                }}>
                  {region.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  letterSpacing: '0.02em'
                }}>
                  {region.region}
                </h3>
              </div>

              <div style={{
                marginBottom: '20px'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  COUNTRIES
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px'
                }}>
                  {region.countries.map((country, countryIndex) => (
                    <motion.span
                      key={country}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: countryIndex * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        padding: '2px 6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                        fontSize: '0.75rem',
                        color: '#a0aec0',
                        fontWeight: '400'
                      }}
                    >
                      {country}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  FACILITIES
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {region.facilities.map((facility, facilityIndex) => (
                    <motion.div
                      key={facility}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: facilityIndex * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
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
                      {facility}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
