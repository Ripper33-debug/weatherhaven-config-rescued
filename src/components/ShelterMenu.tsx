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
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #4A90E2 75%, #00F2FE 100%)',
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
        background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%)',
        pointerEvents: 'none',
        animation: 'gradientShift 8s ease-in-out infinite'
      }} />
      
      {/* Floating geometric elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '60px',
        height: '60px',
        background: 'rgba(74, 144, 226, 0.1)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 107, 53, 0.1)',
        borderRadius: '10px',
        transform: 'rotate(30deg)',
        animation: 'float 7s ease-in-out infinite',
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
          fontWeight: '900',
          color: 'white',
          marginBottom: '20px',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Weatherhaven Configurator
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
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
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(25px)',
              border: '2px solid rgba(74, 144, 226, 0.3)',
              borderRadius: '25px',
              padding: '35px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
                {shelter.category === 'TRECC' ? '🏗️' : '⚡'}
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
