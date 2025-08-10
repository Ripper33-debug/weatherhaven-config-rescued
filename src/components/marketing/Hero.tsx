'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Simple animated background */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '400px',
        height: '400px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '300px',
        height: '300px',
        background: 'rgba(147, 51, 234, 0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'pulse 10s ease-in-out infinite 2s'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '300',
            color: 'white',
            marginBottom: '32px',
            lineHeight: '1',
            letterSpacing: '-0.02em'
          }}
        >
          <span style={{
            display: 'block',
            background: 'linear-gradient(to right, white, #d1d5db)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            DEPLOYABLE
          </span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(to right, #d1d5db, white)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            SHELTERS
          </span>
          <span style={{
            display: 'block',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#9ca3af',
            fontWeight: '300',
            marginTop: '24px',
            letterSpacing: '0.1em'
          }}>
            READY IN HOURS — NOT WEEKS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            fontWeight: '300'
          }}
        >
          Weatherhaven delivers modular, field-proven shelter systems for defense, disaster response, and remote industry with unmatched speed and reliability.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link href="/contact">
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
              REQUEST QUOTE
            </motion.button>
          </Link>

          <Link href="/configurator">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 48px',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: '500',
                fontSize: '18px',
                letterSpacing: '0.025em',
                borderRadius: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '20px', height: '20px', marginRight: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                OPEN CONFIGURATOR
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              SCROLL
            </span>
            <div style={{
              width: '1px',
              height: '32px',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent)'
            }}></div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}
