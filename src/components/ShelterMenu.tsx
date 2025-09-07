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
    deploymentDifficulty: 'moderate'
  },
  {
    id: 'command-posting',
    name: 'Command Posting',
    description: 'Specialized command posting interior with communications and control systems.',
    category: 'Military',
    image: '/models/command-posting-preview.jpg',
    features: ['Command operations', 'Communications hub', 'Control systems', 'Tactical layout'],
    modelPath: '/models/interiors/CommandPosting.glb',
    specs: ['Comm systems: Integrated', 'Control stations: Multiple', 'Security: Level 2', 'Capacity: 8-15 operators'],
    deploymentTime: 3,
    weatherRating: 4,
    capacity: 15,
    availability: 'limited',
    deploymentDifficulty: 'complex'
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
    deploymentDifficulty: 'easy'
  },
  {
    id: 'command-center',
    name: 'Command Center',
    description: 'Specialized command and control facility for military and emergency operations.',
    category: 'Military',
    image: '/models/command-preview.jpg',
    features: ['Command operations', 'Communications hub', 'Security features', 'Redundant systems'],
    modelPath: 'trecc.glb',
    specs: ['Comm systems: Integrated', 'Security: Level 3', 'Power: Redundant', 'Capacity: 15-30 operators'],
    deploymentTime: 4,
    weatherRating: 4,
    capacity: 30,
    availability: 'available',
    deploymentDifficulty: 'complex'
  },
  {
    id: 'field-hospital',
    name: 'Field Hospital',
    description: 'Complete medical facility for emergency and routine care in remote locations.',
    category: 'Medical',
    image: '/models/hospital-preview.jpg',
    features: ['Medical equipment', 'Sterile environment', 'Patient care', 'Emergency response'],
    modelPath: '/models/trecc-open.glb',
    specs: ['Beds: 10-20', 'OR capacity: 2-4', 'Sterilization: Full', 'Power: Medical grade'],
    deploymentTime: 6,
    weatherRating: 3,
    capacity: 20,
    availability: 'limited',
    deploymentDifficulty: 'complex'
  },
  {
    id: 'disaster-relief',
    name: 'Disaster Relief',
    description: 'Emergency shelter system for disaster response and humanitarian aid.',
    category: 'Emergency',
    image: '/models/relief-preview.jpg',
    features: ['Rapid deployment', 'High capacity', 'Basic amenities', 'Durable construction'],
    modelPath: 'trecc.glb',
    specs: ['Capacity: 50-100 people', 'Deployment: <1 hour', 'Weather: All conditions', 'Durability: Extended'],
    deploymentTime: 1,
    weatherRating: 4,
    capacity: 100,
    availability: 'available',
    deploymentDifficulty: 'easy'
  }
];

export default function ShelterMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredShelter, setHoveredShelter] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      case 'available': return '🟢';
      case 'limited': return '🟡';
      case 'unavailable': return '🔴';
      default: return '⚪';
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
          Weatherhaven Configurator
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
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
          flexWrap: 'wrap'
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
                ? 'linear-gradient(135deg, #4A90E2, #FF6B35)' 
                : 'rgba(0, 0, 0, 0.3)',
              border: selectedCategory === category 
                ? 'none' 
                : '1px solid rgba(74, 144, 226, 0.3)',
              borderRadius: '25px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize',
              backdropFilter: 'blur(10px)',
              boxShadow: selectedCategory === category 
                ? '0 4px 20px rgba(74, 144, 226, 0.4)' 
                : '0 2px 10px rgba(0, 0, 0, 0.2)',
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
                background: 'linear-gradient(135deg, #4A90E2, #FF6B35)',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {shelter.category}
              </div>
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
                color: '#b0b0b0',
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
                    background: 'linear-gradient(135deg, #4A90E2, #FF6B35)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
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
                    🚀 Configure {shelter.name}
                  </span>
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
          Weatherhaven - Global Leader in Deployable Shelter Solutions
        </p>
      </motion.div>
    </div>
  );
}
