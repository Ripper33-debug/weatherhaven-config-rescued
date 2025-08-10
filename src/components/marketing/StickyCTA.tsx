'use client';

import { motion } from 'framer-motion';

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 40
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '16px 32px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          fontWeight: '600',
          fontSize: '16px',
          letterSpacing: '0.025em',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.3), 0 10px 10px -5px rgba(16, 185, 129, 0.2)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
      >
        REQUEST QUOTE
      </motion.button>
    </motion.div>
  );
}
