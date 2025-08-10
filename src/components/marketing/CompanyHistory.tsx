'use client';

import { motion } from 'framer-motion';

export default function CompanyHistory() {
  const milestones = [
    {
      year: '1983',
      title: 'Company Founded',
      description: 'Weatherhaven established in Vancouver, Canada, pioneering deployable shelter technology.'
    },
    {
      year: '1990',
      title: 'First Military Contract',
      description: 'Secured major military contract for tactical command centers, establishing defense market presence.'
    },
    {
      year: '1995',
      title: 'International Expansion',
      description: 'Opened European operations and began serving clients in over 20 countries worldwide.'
    },
    {
      year: '2000',
      title: 'Disaster Response Division',
      description: 'Launched specialized division for emergency response and humanitarian aid shelters.'
    },
    {
      year: '2008',
      title: 'Arctic Research Success',
      description: 'Deployed custom research facilities in extreme Arctic conditions, expanding into scientific applications.'
    },
    {
      year: '2015',
      title: 'Global Manufacturing',
      description: 'Established manufacturing facilities in North America, Europe, and Asia for global reach.'
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched digital configurator platform and advanced IoT integration for smart shelters.'
    },
    {
      year: '2024',
      title: 'Future Forward',
      description: 'Leading the industry with sustainable materials and next-generation deployable solutions.'
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
            OUR HISTORY
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Four decades of innovation, growth, and commitment to excellence in deployable shelter technology.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          paddingLeft: '40px'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(180deg, #48bb78 0%, #e2e8f0 100%)',
            opacity: 0.3
          }} />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                marginBottom: '60px',
                paddingLeft: '40px'
              }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-20px',
                top: '8px',
                width: '12px',
                height: '12px',
                background: '#48bb78',
                borderRadius: '50%',
                border: '3px solid #1a202c',
                boxShadow: '0 0 0 3px rgba(72, 187, 120, 0.2)'
              }} />

              <div style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    padding: '4px 12px',
                    background: 'rgba(72, 187, 120, 0.1)',
                    border: '1px solid rgba(72, 187, 120, 0.2)',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#48bb78',
                    letterSpacing: '0.05em'
                  }}>
                    {milestone.year}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f7fafc'
                  }}>
                    {milestone.title}
                  </h3>
                </div>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#a0aec0',
                  lineHeight: '1.6',
                  fontWeight: '300'
                }}>
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
