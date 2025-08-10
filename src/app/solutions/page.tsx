'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: '🛡️',
      title: 'MILITARY & DEFENSE',
      description: 'Rapid setup, modular expansion, rugged performance for critical operations.',
      features: ['Rapid deployment in <6 hours', 'Modular expansion capabilities', 'Rugged performance in extreme conditions', 'Secure communications integration'],
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: '🏛️',
      title: 'GOVERNMENTS & NGOS',
      description: 'Scalable disaster relief and emergency sheltering solutions.',
      features: ['Emergency response ready', 'Scalable infrastructure', 'Rapid disaster relief', 'Multi-agency coordination'],
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: '🏭',
      title: 'INDUSTRIAL',
      description: 'Remote camp solutions for mining, oil & gas, and construction.',
      features: ['Remote site deployment', 'Heavy-duty construction', 'Environmental protection', 'Long-term sustainability'],
      color: 'from-orange-500/20 to-orange-600/20'
    },
    {
      icon: '🔬',
      title: 'COMMERCIAL/RESEARCH',
      description: 'Flexible research stations and commercial applications.',
      features: ['Research facility ready', 'Commercial applications', 'Flexible configurations', 'Advanced technology integration'],
      color: 'from-emerald-500/20 to-emerald-600/20'
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
          SOLUTIONS FOR EVERY SECTOR
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
          From military operations to humanitarian aid, our shelter systems adapt to your specific needs with unmatched flexibility and reliability.
        </motion.p>
      </div>

      {/* Solutions Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 80px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {solutions.map((solution, index) => (
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
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '24px'
              }}>
                {solution.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                {solution.title}
              </h3>
              <p style={{
                color: '#d1d5db',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {solution.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0'
              }}>
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} style={{
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={`/solutions/${solution.title.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}>
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
                    fontWeight: '500'
                  }}
                >
                  LEARN MORE →
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
