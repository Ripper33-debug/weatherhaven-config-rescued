'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SectorCards() {
  const sectors = [
    {
      icon: '🛡️',
      title: 'MILITARY & DEFENSE',
      description: 'Rapid setup, modular expansion, rugged performance for critical operations.',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: '🏛️',
      title: 'GOVERNMENTS & NGOS',
      description: 'Scalable disaster relief and emergency sheltering solutions.',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: '🏭',
      title: 'INDUSTRIAL',
      description: 'Remote camp solutions for mining, oil & gas, and construction.',
      color: 'from-orange-500/20 to-orange-600/20'
    },
    {
      icon: '🔬',
      title: 'COMMERCIAL/RESEARCH',
      description: 'Flexible research stations and commercial applications.',
      color: 'from-emerald-500/20 to-emerald-600/20'
    }
  ];

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
            SOLUTIONS FOR EVERY SECTOR
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            maxWidth: '768px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            From military operations to humanitarian aid, our shelter systems adapt to your specific needs with unmatched flexibility and reliability.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {sectors.map((sector, index) => (
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
                transition: 'all 0.3s ease',
                height: '100%'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '24px'
                }}>
                  {sector.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '16px'
                }}>
                  {sector.title}
                </h3>
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  {sector.description}
                </p>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.025em'
                }}>
                  LEARN MORE →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          textAlign: 'center'
        }}>
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 48px',
                background: 'white',
                color: 'black',
                fontWeight: '500',
                fontSize: '18px',
                letterSpacing: '0.025em',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease'
              }}
            >
              VIEW ALL SOLUTIONS
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
