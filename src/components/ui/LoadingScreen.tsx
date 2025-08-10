'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        flexDirection: 'column'
      }}
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#f7fafc',
          marginBottom: '2rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        WEATHERHAVEN
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          color: '#a0aec0',
          fontSize: '1rem',
          marginBottom: '3rem',
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: '1.6'
        }}
      >
        Deployable Shelter Solutions
      </motion.p>

      {/* Loading Bar */}
      <div style={{
        width: '300px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #e2e8f0, #a0aec0)',
            borderRadius: '1px'
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          color: '#718096',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        INITIALIZING SYSTEM
      </motion.div>

      {/* Animated Dots */}
      <motion.div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '1rem'
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              width: '8px',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '50%'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
