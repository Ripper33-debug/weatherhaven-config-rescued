'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutHero() {
  const stats = [
    { number: '40+', label: 'Years Experience' },
    { number: '50+', label: 'Countries Served' },
    { number: '1000+', label: 'Deployments' },
    { number: '24/7', label: 'Global Support' }
  ];

  return (
    <section style={{
      padding: '120px 0 80px',
      background: 'rgba(255, 255, 255, 0.01)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            ABOUT WEATHERHAVEN
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            GLOBAL LEADER IN
            <br />
            <span style={{
              background: 'linear-gradient(45deg, #f7fafc, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '800'
            }}>
              DEPLOYABLE SHELTERS
            </span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            For over four decades, Weatherhaven has been pioneering deployable shelter technology, 
            providing rapid-deployment solutions that perform reliably in the world's most challenging environments.
          </p>

          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '64px'
          }}>
            <Link href="/products">
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
                EXPLORE PRODUCTS
              </motion.button>
            </Link>

            <Link href="/contact">
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
                CONTACT US
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              style={{
                padding: '32px 24px',
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
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: '#f7fafc',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              
              <div style={{
                fontSize: '0.875rem',
                color: '#a0aec0',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
