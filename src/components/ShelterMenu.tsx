'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Shelter {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  modelPath: string;
}

const shelters: Shelter[] = [
  {
    id: 'trecc',
    name: 'TRECC Shelter',
    description: 'Advanced deployable shelter system for tactical operations and emergency response.',
    category: 'Tactical',
    image: '/models/trecc-preview.jpg',
    features: ['Rapid deployment', 'Modular design', 'Extreme weather protection', 'Command center ready'],
    modelPath: '/models/trecc.glb'
  },
  {
    id: 'trecc-open',
    name: 'TRECC Deployed',
    description: 'Fully deployed TRECC shelter showing interior layout and operational configuration.',
    category: 'Tactical',
    image: '/models/trecc-open-preview.jpg',
    features: ['Fully deployed', 'Interior layout', 'Operational ready', 'Multi-purpose'],
    modelPath: '/models/trecc-open.glb'
  },
  {
    id: 'interior',
    name: 'Interior View',
    description: 'Detailed interior view of TRECC shelter showing internal layout and equipment placement.',
    category: 'Interior',
    image: '/models/interior-preview.jpg',
    features: ['Interior layout', 'Equipment placement', 'Space utilization', 'Comfort features'],
    modelPath: '/models/interiors/interior.glb'
  },
  {
    id: 'titanium',
    name: 'Titanium Variant',
    description: 'Premium titanium construction variant offering enhanced durability and performance.',
    category: 'Premium',
    image: '/models/titanium-preview.jpg',
    features: ['Titanium construction', 'Enhanced durability', 'Premium finish', 'Extended lifespan'],
    modelPath: '/models/titanium.glb'
  }
];

export default function ShelterMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredShelter, setHoveredShelter] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(shelters.map(s => s.category)))];
  
  const filteredShelters = selectedCategory === 'all' 
    ? shelters 
    : shelters.filter(shelter => shelter.category === selectedCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      padding: '40px 20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}
      >
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          color: 'var(--text-primary)',
          marginBottom: '20px',
          background: 'var(--gradient-text)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          TRECC Shelter Configurator
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Select a shelter type to customize and configure your deployable shelter system
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '12px 24px',
              background: selectedCategory === category 
                ? 'var(--gradient-primary)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: selectedCategory === category 
                ? 'none' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Shelter Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {filteredShelters.map((shelter, index) => (
          <motion.div
            key={shelter.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ y: -10, scale: 1.02 }}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setHoveredShelter(shelter.id)}
            onMouseLeave={() => setHoveredShelter(null)}
          >
            {/* Hover Overlay */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(255, 102, 0, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              animate={{ opacity: hoveredShelter === shelter.id ? 1 : 0 }}
            />

            {/* Category Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '6px 12px',
              background: 'var(--gradient-accent)',
              borderRadius: '15px',
              fontSize: '0.8rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {shelter.category}
            </div>

            {/* Shelter Image Placeholder */}
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.2), rgba(255, 102, 0, 0.2))',
              borderRadius: '15px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '3rem',
                color: 'var(--text-accent)',
                opacity: 0.7
              }}>
                🏠
              </div>
            </div>

            {/* Shelter Info */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '10px'
              }}>
                {shelter.name}
              </h3>
              
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontSize: '0.95rem'
              }}>
                {shelter.description}
              </p>

              {/* Features */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '25px'
              }}>
                {shelter.features.map((feature, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(0, 102, 204, 0.2)',
                      border: '1px solid rgba(0, 102, 204, 0.3)',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      color: 'var(--text-accent)',
                      fontWeight: '500'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Configure Button */}
              <Link href={`/configurator/${shelter.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    padding: '15px 30px',
                    background: 'var(--gradient-primary)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 102, 204, 0.3)'
                  }}
                >
                  Configure {shelter.name}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{
          textAlign: 'center',
          marginTop: '80px',
          padding: '40px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          TRECC Shelter Systems - Advanced Deployable Solutions
        </p>
      </motion.div>
    </div>
  );
}
