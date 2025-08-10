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
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          zIndex: -2
        }}
      />

      {/* Animated Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity: 0.1
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '100px',
              background: 'white',
              left: `${(i * 5) % 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '4rem',
          opacity: 0.1
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        🏗️
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          fontSize: '3rem',
          opacity: 0.1
        }}
        animate={{
          rotate: -360,
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        🚀
      </motion.div>

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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '32px'
            }}
          >
            <span style={{ fontSize: '14px' }}>⚡</span>
            READY TO DEPLOY?
          </motion.div>

          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '700',
            color: 'white',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            START YOUR
            <br />
            <span style={{
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
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
              color: '#d1d5db',
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
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '20px 40px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '700',
                  fontSize: '18px',
                  letterSpacing: '0.025em',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
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
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '20px 40px',
                  background: 'transparent',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '18px',
                  letterSpacing: '0.025em',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease'
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px'
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#d1d5db',
                  fontWeight: '500'
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
