'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: 'MILITARY DEPLOYMENT',
      subtitle: 'Rapid Response in Extreme Conditions',
      description: 'Successfully deployed shelter systems in under 4 hours during critical military operations.',
      stats: ['4 hours deployment', '120 km/h winds', '-40°C temperature', '50+ personnel'],
      category: 'Military',
      image: '🛡️'
    },
    {
      title: 'DISASTER RELIEF',
      subtitle: 'Emergency Response Coordination',
      description: 'Provided immediate shelter solutions for disaster relief operations across multiple regions.',
      stats: ['24/7 availability', 'Multi-agency support', 'Rapid scaling', 'Remote deployment'],
      category: 'Emergency',
      image: '🏥'
    },
    {
      title: 'REMOTE INDUSTRIAL',
      subtitle: 'Mining Camp Infrastructure',
      description: 'Established complete living and working facilities in remote mining operations.',
      stats: ['Long-term sustainability', 'Environmental protection', 'Complete facilities', 'Remote access'],
      category: 'Industrial',
      image: '🏭'
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
          CASE STUDIES
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
          Real-world deployments demonstrating the reliability and effectiveness of our shelter systems.
        </motion.p>
      </div>

      {/* Case Studies Grid */}
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
          {caseStudies.map((study, index) => (
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
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                {study.image}
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
                {study.category}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '8px'
              }}>
                {study.title}
              </h3>
              <p style={{
                color: '#10b981',
                fontSize: '1rem',
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                {study.subtitle}
              </p>
              <p style={{
                color: '#d1d5db',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {study.description}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {study.stats.map((stat, statIndex) => (
                  <div key={statIndex} style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#10b981',
                      marginRight: '8px',
                      fontSize: '1rem'
                    }}>✓</span>
                    {stat}
                  </div>
                ))}
              </div>
              <Link href={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`}>
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
                  READ FULL CASE STUDY →
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
