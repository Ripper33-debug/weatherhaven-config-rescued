'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Professional Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
        zIndex: -2
      }} />
      
      {/* Subtle Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Professional Accent Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '300px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '5%',
          width: '200px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #718096, transparent)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleX: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#a0aec0',
              marginBottom: '32px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ fontSize: '10px' }}>⚡</span>
            MILITARY-GRADE DEPLOYMENT TECHNOLOGY
          </motion.div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontFamily: 'inherit'
          }}>
            DEPLOYABLE
            <br />
            <span style={{
              background: 'linear-gradient(45deg, #f7fafc, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '800'
            }}>
              SHELTER SOLUTIONS
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              color: '#a0aec0',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6',
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}
          >
            Rapidly deployable shelter systems for defense, disaster response, and remote industry. 
            <br />
            <strong style={{ color: '#e2e8f0', fontWeight: '600' }}>Ready in hours, not weeks.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '80px'
            }}
          >
            <Link href="/configurator">
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
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    transition: 'left 0.5s ease'
                  }}
                  whileHover={{ left: '100%' }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  LAUNCH CONFIGURATOR
                </span>
              </motion.button>
            </Link>

            <Link href="/solutions">
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
                EXPLORE SOLUTIONS
              </motion.button>
            </Link>
          </motion.div>

          {/* Professional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {[
              { number: '24', label: 'HOURS TO DEPLOY', icon: '⚡' },
              { number: '50+', label: 'COUNTRIES SERVED', icon: '🌍' },
              { number: '1000+', label: 'SUCCESSFUL DEPLOYMENTS', icon: '✅' },
              { number: '99.9%', label: 'UPTIME RELIABILITY', icon: '🛡️' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#f7fafc',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#718096',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Professional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#718096',
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '1rem' }}
        >
          ↓
        </motion.div>
        <span>SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}
