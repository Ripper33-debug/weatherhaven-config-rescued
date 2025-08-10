'use client';

import { motion } from 'framer-motion';

export default function GlobalDeploymentsStrip() {
  return (
    <section style={{
      padding: '96px 0',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
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
            GLOBAL DEPLOYMENTS
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            maxWidth: '768px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Weatherhaven shelters are deployed worldwide, providing reliable infrastructure in the most challenging environments.
          </p>
        </motion.div>

        <div style={{
          textAlign: 'center',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '24px'
          }}>
            🌍
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '16px'
          }}>
            GLOBAL DEPLOYMENT MAP
          </h3>
          <p style={{
            color: '#d1d5db',
            fontSize: '1rem',
            margin: 0
          }}>
            Interactive map showing our worldwide deployments coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
