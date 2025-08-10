'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    {
      name: 'DEPLOYABLE SHELTERS',
      category: 'Core Product',
      description: 'Rapidly deployable modular shelter systems for any environment.',
      specs: ['Deploy in <6 hours', 'Modular expansion', 'All-weather protection', 'Custom configurations'],
      image: '🏠'
    },
    {
      name: 'MOBILE COMMAND CENTERS',
      category: 'Military & Defense',
      description: 'Advanced command and control facilities for critical operations.',
      specs: ['Secure communications', 'Multi-agency coordination', 'Rapid deployment', 'Advanced tech integration'],
      image: '🛡️'
    },
    {
      name: 'MEDICAL CLINICS',
      category: 'Healthcare',
      description: 'Fully equipped medical facilities for emergency response and remote care.',
      specs: ['Medical equipment ready', 'Sterile environments', 'Emergency response', 'Remote deployment'],
      image: '🏥'
    },
    {
      name: 'REMOTE CAMPS',
      category: 'Industrial',
      description: 'Complete living and working facilities for remote industrial operations.',
      specs: ['Living quarters', 'Workshop spaces', 'Environmental protection', 'Long-term sustainability'],
      image: '🏕️'
    }
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{
        padding: '120px 20px 80px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '300',
            color: 'white',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}
        >
          FEATURED PRODUCTS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}
        >
          Our modular shelter systems are engineered for rapid deployment and exceptional performance in any environment.
        </motion.p>
      </div>

      {/* Products Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 80px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '40px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                {product.image}
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#10b981',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block',
                marginBottom: '16px'
              }}>
                {product.category}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                {product.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {product.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0'
              }}>
                {product.specs.map((spec, specIndex) => (
                  <li key={specIndex} style={{
                    color: '#9ca3af',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#10b981',
                      marginRight: '8px',
                      fontSize: '1.2rem'
                    }}>✓</span>
                    {spec}
                  </li>
                ))}
              </ul>
              <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    fontWeight: '500',
                    width: '100%'
                  }}
                >
                  VIEW DETAILS →
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
