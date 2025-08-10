'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import VideoBackground from '../ui/VideoBackground';

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
      <VideoBackground
        videoSrc="/videos/weatherhaven-hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        overlay={true}
        overlayOpacity={0.6}
      >
        {/* Animated Accent Lines */}
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '300px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, var(--primary-cyan), transparent)',
            zIndex: 1
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
            background: 'linear-gradient(90deg, transparent, var(--primary-green), transparent)',
            zIndex: 1
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

        {/* Floating Tech Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '8%',
            width: '60px',
            height: '60px',
            border: '2px solid var(--primary-cyan)',
            borderRadius: '50%',
            opacity: 0.3
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: '40px',
            height: '40px',
            border: '2px solid var(--primary-green)',
            borderRadius: '50%',
            opacity: 0.4
          }}
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 1
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
              padding: '12px 24px',
              background: 'var(--gradient-card)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-accent)',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--text-accent)',
              marginBottom: '32px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: 'var(--shadow-secondary)'
            }}
          >
            <span style={{ fontSize: '14px' }}>⚡</span>
            MILITARY-GRADE DEPLOYMENT TECHNOLOGY
          </motion.div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontFamily: 'inherit',
            textShadow: '0 0 30px rgba(0, 212, 255, 0.3)'
          }}>
            DEPLOYABLE
            <br />
            <span style={{
              background: 'var(--gradient-primary)',
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
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.6',
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}
          >
            Rapidly deployable shelter systems for defense, disaster response, and remote industry. 
            <br />
            <strong style={{ color: 'var(--text-accent)', fontWeight: '600' }}>Ready in hours, not weeks.</strong>
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
                  background: 'var(--gradient-primary)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.025em',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-primary)',
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
                  background: 'var(--bg-card)',
                  border: '2px solid var(--border-accent)',
                  color: 'var(--text-accent)',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.025em',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  boxShadow: 'var(--shadow-secondary)'
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
                  background: 'var(--gradient-card)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-dark)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--text-accent)',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
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
          color: 'var(--text-accent)',
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
      </VideoBackground>
    </section>
  );
}
