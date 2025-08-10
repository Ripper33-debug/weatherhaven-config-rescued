'use client';

import { motion } from 'framer-motion';

export default function ProofBar() {
  const stats = [
    { icon: '🌍', value: '50+', label: 'COUNTRIES', description: 'Global deployments' },
    { icon: '⚡', value: '<6', label: 'HOURS', description: 'Setup time' },
    { icon: '💨', value: '120', label: 'KM/H', description: 'Wind rating' },
    { icon: '🛠️', value: '24/7', label: 'SUPPORT', description: 'Global field support' },
  ];

  return (
    <section style={{
      padding: '80px 0',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.875rem, 3vw, 2.25rem)',
            fontWeight: '300',
            color: 'white',
            marginBottom: '16px'
          }}>
            PROVEN PERFORMANCE
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            maxWidth: '768px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Trusted by governments and organizations worldwide for rapid, reliable deployment
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                textAlign: 'center'
              }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: '2.25rem',
                  marginBottom: '16px'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 'clamp(1.875rem, 3vw, 2.25rem)',
                  fontWeight: '300',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db',
                  marginBottom: '4px',
                  letterSpacing: '0.025em'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  fontWeight: '300'
                }}>
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
