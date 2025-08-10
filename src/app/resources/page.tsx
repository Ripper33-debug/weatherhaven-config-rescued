'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'TECHNICAL SPECIFICATIONS',
      category: 'Documentation',
      description: 'Comprehensive technical specifications for all shelter systems.',
      type: 'PDF',
      size: '2.4 MB',
      image: '📋'
    },
    {
      title: 'INSTALLATION GUIDE',
      category: 'Manual',
      description: 'Step-by-step installation and setup instructions.',
      type: 'PDF',
      size: '1.8 MB',
      image: '🔧'
    },
    {
      title: 'MAINTENANCE MANUAL',
      category: 'Manual',
      description: 'Complete maintenance procedures and schedules.',
      type: 'PDF',
      size: '3.1 MB',
      image: '🛠️'
    },
    {
      title: 'SAFETY PROTOCOLS',
      category: 'Safety',
      description: 'Safety guidelines and emergency procedures.',
      type: 'PDF',
      size: '1.2 MB',
      image: '🛡️'
    },
    {
      title: 'PRODUCT CATALOG',
      category: 'Marketing',
      description: 'Complete product catalog with specifications.',
      type: 'PDF',
      size: '5.2 MB',
      image: '📖'
    },
    {
      title: 'CASE STUDY VIDEOS',
      category: 'Media',
      description: 'Video demonstrations of real-world deployments.',
      type: 'MP4',
      size: '45.7 MB',
      image: '🎥'
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
          RESOURCES
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
          Access technical documentation, manuals, and resources for our shelter systems.
        </motion.p>
      </div>

      {/* Resources Grid */}
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
          {resources.map((resource, index) => (
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
                {resource.image}
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
                {resource.category}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>
                {resource.title}
              </h3>
              <p style={{
                color: '#d1d5db',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {resource.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <span style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  {resource.type} • {resource.size}
                </span>
              </div>
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
                DOWNLOAD →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
