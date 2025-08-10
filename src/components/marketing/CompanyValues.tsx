'use client';

import { motion } from 'framer-motion';

export default function CompanyValues() {
  const values = [
    {
      icon: '🚀',
      title: 'INNOVATION',
      description: 'Pioneering advanced shelter technology for extreme environments.',
      details: ['Continuous R&D investment', 'Cutting-edge materials', 'Advanced engineering', 'Future-focused solutions']
    },
    {
      icon: '🛡️',
      title: 'RELIABILITY',
      description: 'Delivering consistent performance in the most challenging conditions.',
      details: ['Rigorous testing protocols', 'Quality assurance', 'Proven track record', 'Dependable performance']
    },
    {
      icon: '⚡',
      title: 'SPEED',
      description: 'Rapid deployment capabilities that save critical time and resources.',
      details: ['Quick deployment', 'Efficient logistics', 'Time-critical solutions', 'Rapid response']
    },
    {
      icon: '🌍',
      title: 'GLOBAL REACH',
      description: 'Worldwide support and deployment capabilities.',
      details: ['International presence', 'Local expertise', 'Global logistics', '24/7 support']
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
            OUR VALUES
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            The principles that guide our mission to provide world-class deployable shelter solutions.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                textAlign: 'center',
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
                marginBottom: '24px'
              }}>
                {value.icon}
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '16px',
                letterSpacing: '0.02em'
              }}>
                {value.title}
              </h3>
              
              <p style={{
                fontSize: '0.875rem',
                color: '#a0aec0',
                lineHeight: '1.6',
                marginBottom: '24px',
                fontWeight: '300'
              }}>
                {value.description}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {value.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      fontSize: '0.75rem',
                      color: '#718096',
                      fontWeight: '300'
                    }}
                  >
                    • {detail}
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
