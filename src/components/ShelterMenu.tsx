'use client';
import { useState, useEffect } from 'react';
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
  specs?: string[];
  deploymentTime: number; // in hours
  weatherRating: number; // 1-5 scale
  capacity: number; // max personnel
  availability: 'available' | 'limited' | 'unavailable';
  deploymentDifficulty: 'easy' | 'moderate' | 'complex';
  useCases?: string[];
  technicalSpecs?: {
    dimensions: string;
    weight: string;
    materials: string;
    power: string;
    climate: string;
    certifications: string;
  };
}

const shelters: Shelter[] = [
  {
    id: 'trecc',
    name: 'TRECC',
    description: 'TRECC deployable shelter system with multiple configuration options.',
    category: 'TRECC',
    image: '/models/trecc-preview.jpg',
    features: ['Multiple configurations', 'Rapid deployment', 'Modular design', 'Extreme weather protection'],
    modelPath: 'trecc.glb',
    specs: ['Deployment time: <2 hours', 'Capacity: 20-50 personnel', 'Weather rating: Extreme', 'Configurations: Open/Closed/Interior'],
    deploymentTime: 2,
    weatherRating: 5,
    capacity: 50,
    availability: 'available',
    deploymentDifficulty: 'moderate',
    useCases: ['Military Operations', 'Emergency Response', 'Remote Research', 'Disaster Relief'],
    technicalSpecs: {
      dimensions: '20ft x 8ft x 8ft (closed)',
      weight: '2,500 lbs',
      materials: 'Aluminum frame, composite panels',
      power: 'Solar + generator compatible',
      climate: '-40°F to +120°F',
      certifications: 'MIL-STD-810G, NATO approved'
    }
  },
  {
    id: 'herconn',
    name: 'HERCONN',
    description: 'HERCONN deployable shelter system for tactical and emergency operations.',
    category: 'HERCONN',
    image: '/models/herconn-preview.jpg',
    features: ['Rapid deployment', 'Tactical operations', 'Emergency response', 'Modular design'],
    modelPath: 'trecc.glb',
    specs: ['Deployment time: <1 hour', 'Capacity: 15-30 personnel', 'Weather rating: Extreme'],
    deploymentTime: 1,
    weatherRating: 5,
    capacity: 30,
    availability: 'available',
    deploymentDifficulty: 'easy',
    useCases: ['Tactical Operations', 'Emergency Response', 'Field Hospitals', 'Command Centers'],
    technicalSpecs: {
      dimensions: '16ft x 6ft x 6ft (closed)',
      weight: '1,800 lbs',
      materials: 'Lightweight aluminum, ballistic panels',
      power: 'Battery + solar hybrid',
      climate: '-30°F to +110°F',
      certifications: 'MIL-STD-810G, Ballistic protection'
    }
  }
];

export default function ShelterMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredShelter, setHoveredShelter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Helper functions for visual indicators
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return '#00ff88';
      case 'limited': return '#ffaa00';
      case 'unavailable': return '#ff4444';
      default: return '#666';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return '●';
      case 'limited': return '●';
      case 'unavailable': return '●';
      default: return '●';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#00ff88';
      case 'moderate': return '#ffaa00';
      case 'complex': return '#ff4444';
      default: return '#666';
    }
  };

  const getWeatherIcon = (rating: number) => {
    if (rating >= 5) return '🌪️';
    if (rating >= 4) return '⛈️';
    if (rating >= 3) return '🌧️';
    if (rating >= 2) return '🌤️';
    return '☀️';
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['all', ...Array.from(new Set(shelters.map(s => s.category)))];
  
  const filteredShelters = selectedCategory === 'all' 
    ? shelters 
    : shelters.filter(shelter => shelter.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsTransitioning(false);
    }, 150);
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
      padding: '40px 20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.02) 100%)',
        pointerEvents: 'none'
      }} />
      
      
      {/* Subtle pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(74, 144, 226, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.02) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: '#212529',
          marginBottom: '20px',
          textShadow: 'none',
          letterSpacing: '-0.02em'
        }}>
          Weatherhaven Configurator
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: '#6c757d',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6',
          textShadow: 'none'
        }}>
          Explore and customize Weatherhaven's complete range of deployable shelter solutions for military, emergency response, and remote operations
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
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryChange(category)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '12px 24px',
              background: selectedCategory === category 
                ? '#0d6efd' 
                : '#ffffff',
              border: selectedCategory === category 
                ? '1px solid #0d6efd' 
                : '1px solid #dee2e6',
              borderRadius: '6px',
              color: selectedCategory === category ? 'white' : '#495057',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'none',
              backdropFilter: 'none',
              boxShadow: selectedCategory === category 
                ? '0 2px 4px rgba(13, 110, 253, 0.2)' 
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(255, 107, 53, 0.2))',
                  borderRadius: '25px',
                  zIndex: -1
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {category}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Shelter Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isTransitioning ? 0.3 : 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '30px',
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
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
              background: '#ffffff',
              backdropFilter: 'none',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(0)',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setHoveredShelter(shelter.id)}
            onMouseLeave={() => setHoveredShelter(null)}
          >
            {/* Enhanced Hover Overlay with Glow */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(255, 107, 53, 0.15))',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                borderRadius: '25px'
              }}
              animate={{ opacity: hoveredShelter === shelter.id ? 1 : 0 }}
            />
            
            {/* Glowing border effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: 'linear-gradient(45deg, #4A90E2, #FF6B35, #4A90E2)',
                borderRadius: '27px',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                zIndex: -1,
                filter: 'blur(8px)'
              }}
              animate={{ opacity: hoveredShelter === shelter.id ? 0.6 : 0 }}
            />

            {/* Status Indicators */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              gap: '8px',
              zIndex: 2
            }}>
              {/* Availability Status */}
              <div style={{
                padding: '6px 10px',
                background: `rgba(${getAvailabilityColor(shelter.availability).slice(1)}, 0.2)`,
                border: `1px solid ${getAvailabilityColor(shelter.availability)}`,
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '600',
                color: getAvailabilityColor(shelter.availability),
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>{getAvailabilityIcon(shelter.availability)}</span>
                {shelter.availability}
              </div>
              
              {/* Category Badge */}
              <div style={{
                padding: '6px 12px',
                background: '#6c757d',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '500',
                color: 'white',
                textTransform: 'none',
                letterSpacing: '0'
              }}>
                {shelter.category}
              </div>
            </div>

            {/* Enhanced Shelter Image Placeholder */}
            <div style={{
              width: '100%',
              height: '220px',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))',
              borderRadius: '20px',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(74, 144, 226, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
              {/* Military-style background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(45deg, transparent 40%, rgba(74, 144, 226, 0.1) 50%, transparent 60%),
                  linear-gradient(-45deg, transparent 40%, rgba(255, 107, 53, 0.1) 50%, transparent 60%)
                `,
                backgroundSize: '20px 20px'
              }} />
              
              {/* Military-style icon */}
              <div style={{
                fontSize: '4rem',
                color: '#4A90E2',
                opacity: 0.8,
                textShadow: '0 0 20px rgba(74, 144, 226, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>
                {shelter.category === 'TRECC' ? '■' : '▲'}
              </div>
              
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(74, 144, 226, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 3s ease-in-out infinite'
              }} />
            </div>

            {/* Shelter Info */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#212529',
                marginBottom: '10px'
              }}>
                {shelter.name}
              </h3>
              
              <p style={{
                color: '#6c757d',
                lineHeight: '1.6',
                marginBottom: '25px',
                fontSize: '0.95rem'
              }}>
                {shelter.description}
              </p>

              {/* Deployment Time Indicator */}
              <div style={{
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                border: '1px solid rgba(74, 144, 226, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#4A90E2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    ⏱️ Deployment Time
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    color: getDifficultyColor(shelter.deploymentDifficulty),
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {shelter.deploymentDifficulty}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(6 - shelter.deploymentTime) / 6 * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                      height: '100%',
                      background: shelter.deploymentTime <= 2 
                        ? 'linear-gradient(90deg, #00ff88, #00cc66)' 
                        : shelter.deploymentTime <= 4 
                        ? 'linear-gradient(90deg, #ffaa00, #ff8800)' 
                        : 'linear-gradient(90deg, #ff4444, #cc2222)',
                      borderRadius: '4px',
                      boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)'
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#888',
                  marginTop: '4px',
                  textAlign: 'right'
                }}>
                  {shelter.deploymentTime} hour{shelter.deploymentTime !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Weather Resistance & Capacity */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                {/* Weather Rating */}
                <div style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 107, 53, 0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.2rem',
                    marginBottom: '4px'
                  }}>
                    {getWeatherIcon(shelter.weatherRating)}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#FF6B35',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Weather Rating
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2px'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: star <= shelter.weatherRating ? '#FF6B35' : 'rgba(255, 107, 53, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Capacity Meter */}
                <div style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.2rem',
                    marginBottom: '4px'
                  }}>
                    👥
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#00ff88',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    Capacity
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'white',
                    fontWeight: '700'
                  }}>
                    {shelter.capacity}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#888'
                  }}>
                    personnel
                  </div>
                </div>
              </div>

              {/* Features */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px'
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

              {/* Specifications */}
              {shelter.specs && (
                <div style={{
                  marginBottom: '25px',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-accent)',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Key Specifications
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                  }}>
                    {shelter.specs.map((spec, idx) => (
                      <div key={idx} style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          background: 'var(--text-accent)',
                          borderRadius: '50%'
                        }} />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Configure Button */}
              <Link href={`/configurator/${shelter.id}`}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '16px 30px',
                    background: '#0d6efd',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.5s ease'
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    Configure {shelter.name}
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Detailed Hover Overlay */}
            {hoveredShelter === shelter.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  padding: '24px',
                  zIndex: 10,
                  overflow: 'auto'
                }}
                onMouseEnter={() => setShowDetails(shelter.id)}
                onMouseLeave={() => setShowDetails(null)}
              >
                {/* Technical Specifications */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#212529',
                    marginBottom: '12px',
                    borderBottom: '2px solid #0d6efd',
                    paddingBottom: '4px'
                  }}>
                    Technical Specifications
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.9rem' }}>
                    <div><strong>Dimensions:</strong> {shelter.technicalSpecs?.dimensions}</div>
                    <div><strong>Weight:</strong> {shelter.technicalSpecs?.weight}</div>
                    <div><strong>Materials:</strong> {shelter.technicalSpecs?.materials}</div>
                    <div><strong>Power:</strong> {shelter.technicalSpecs?.power}</div>
                    <div><strong>Climate:</strong> {shelter.technicalSpecs?.climate}</div>
                    <div><strong>Certifications:</strong> {shelter.technicalSpecs?.certifications}</div>
                  </div>
                </div>

                {/* Use Cases */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#212529',
                    marginBottom: '12px',
                    borderBottom: '2px solid #0d6efd',
                    paddingBottom: '4px'
                  }}>
                    Use Cases
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {shelter.useCases?.map((useCase, index) => (
                      <span key={index} style={{
                        background: '#e9ecef',
                        color: '#495057',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                  <button
                    onClick={() => setShowComparison(true)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#5a6268'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#6c757d'}
                  >
                    Compare
                  </button>
                  <Link href={`/configurator/${shelter.id}`} style={{ flex: 1 }}>
                    <button
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#0d6efd',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#0b5ed7'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#0d6efd'}
                    >
                      Configure
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Comparison Modal */}
      {showComparison && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowComparison(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowComparison(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6c757d'
              }}
            >
              ×
            </button>

            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#212529',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              TRECC vs HERCONN Comparison
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {shelters.map((shelter) => (
                <div key={shelter.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    color: '#212529',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    {shelter.name}
                  </h3>

                  {/* Key Specs */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Key Specifications</h4>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <div><strong>Deployment Time:</strong> {shelter.deploymentTime} hour{shelter.deploymentTime > 1 ? 's' : ''}</div>
                      <div><strong>Capacity:</strong> {shelter.capacity} personnel</div>
                      <div><strong>Weather Rating:</strong> {'★'.repeat(shelter.weatherRating)}</div>
                      <div><strong>Difficulty:</strong> {shelter.deploymentDifficulty}</div>
                    </div>
                  </div>

                  {/* Technical Specs */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Technical Details</h4>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <div><strong>Dimensions:</strong> {shelter.technicalSpecs?.dimensions}</div>
                      <div><strong>Weight:</strong> {shelter.technicalSpecs?.weight}</div>
                      <div><strong>Materials:</strong> {shelter.technicalSpecs?.materials}</div>
                      <div><strong>Power:</strong> {shelter.technicalSpecs?.power}</div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Use Cases</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {shelter.useCases?.map((useCase, index) => (
                        <span key={index} style={{
                          background: '#e9ecef',
                          color: '#495057',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontSize: '0.8rem'
                        }}>
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{
          textAlign: 'center',
          marginTop: '80px',
          padding: '40px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          Weatherhaven - Global Leader in Deployable Shelter Solutions
        </p>
      </motion.div>
    </div>
  );
}
