'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function ParallaxCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Professional Background */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
          zIndex: -2
        }}
      />

      {/* Professional Grid Pattern */}
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

      {/* Professional Accent Lines */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
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
          bottom: '30%',
          left: '5%',
          width: '200px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #718096, transparent)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scaleX: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{
          opacity,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
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
            READY TO DEPLOY?
          </motion.div>

          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            START YOUR
            <br />
            <span style={{
              background: 'linear-gradient(45deg, #f7fafc, #e2e8f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '800'
            }}>
              DEPLOYMENT
            </span>
            <br />
            TODAY
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#a0aec0',
              marginBottom: '48px',
              lineHeight: '1.6',
              fontWeight: '300'
            }}
          >
            Join hundreds of organizations worldwide who trust Weatherhaven for their critical shelter needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '64px'
            }}
          >
            <Link href="/configurator">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '18px 36px',
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

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '18px 36px',
                  background: 'transparent',
                  border: '2px solid #4a5568',
                  color: '#e2e8f0',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.025em',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
              >
                TALK TO EXPERTS
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '24px',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {[
              { number: '24/7', label: 'SUPPORT' },
              { number: '50+', label: 'COUNTRIES' },
              { number: '1000+', label: 'DEPLOYMENTS' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
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
      </motion.div>
    </section>
  );
}
