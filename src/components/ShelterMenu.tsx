'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { generateShelterPDF, generateComparisonPDF, ShelterSpecs } from '../lib/pdfExport';
import ContactForm from './ContactForm';
import { preloadModel } from '../lib/aws';
import MiniModelViewer from './MiniModelViewer';

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
    description: 'Advanced deployable shelter system with multiple configuration options for military, emergency response, and remote operations.',
    category: 'TRECC',
    image: '/models/trecc-preview.jpg',
    features: ['Multiple configurations', 'Rapid deployment', 'Modular design', 'Extreme weather protection', 'Military-grade construction'],
    modelPath: 'Shelter_Stowed_DesertTan-v1.glb',
    specs: ['Deployment time: <2 hours', 'Capacity: 20-50 personnel', 'Weather rating: Extreme', 'Configurations: Open/Closed/Interior'],
    deploymentTime: 2,
    weatherRating: 5,
    capacity: 50,
    availability: 'available',
    deploymentDifficulty: 'moderate',
    useCases: ['Military Operations', 'Emergency Response', 'Remote Research', 'Disaster Relief', 'Field Command Centers'],
    technicalSpecs: {
      dimensions: '20ft x 8ft x 8ft (closed)',
      weight: '2,500 lbs',
      materials: 'Aluminum frame, composite panels',
      power: 'Solar + generator compatible',
      climate: '-40°F to +120°F',
      certifications: 'MIL-STD-810G, NATO approved'
    }
  }
];

export default function ShelterMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState({
    deploymentTime: 'all',
    capacity: 'all',
    weatherRating: 'all'
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactShelter, setContactShelter] = useState<string>('');

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

  // Prevent hydration mismatch and preload models
  useEffect(() => {
    setMounted(true);
    
    // Temporarily disable preloading to fix black screen issue
    const preloadModels = async () => {
      console.log('🚀 Preloading disabled to fix model loading issues');
      // Preloading temporarily disabled due to interference with model loading
      // await preloadModel('Shelter_Stowed_DesertTan-v1.glb');
      // await preloadModel('Model_stowed_green-v1.glb');
    };
    
    preloadModels();
  }, []);

  const categories = ['all', ...Array.from(new Set(shelters.map(s => s.category)))];
  
  const filteredShelters = shelters.filter(shelter => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || shelter.category === selectedCategory;
    
    // Deployment time filter
    const deploymentMatch = filters.deploymentTime === 'all' || 
      (filters.deploymentTime === 'fast' && shelter.deploymentTime <= 1) ||
      (filters.deploymentTime === 'moderate' && shelter.deploymentTime > 1 && shelter.deploymentTime <= 2) ||
      (filters.deploymentTime === 'extended' && shelter.deploymentTime > 2);
    
    // Capacity filter
    const capacityMatch = filters.capacity === 'all' ||
      (filters.capacity === 'small' && shelter.capacity <= 30) ||
      (filters.capacity === 'medium' && shelter.capacity > 30 && shelter.capacity <= 50) ||
      (filters.capacity === 'large' && shelter.capacity > 50);
    
    // Weather rating filter
    const weatherMatch = filters.weatherRating === 'all' ||
      (filters.weatherRating === 'extreme' && shelter.weatherRating >= 5) ||
      (filters.weatherRating === 'high' && shelter.weatherRating >= 4) ||
      (filters.weatherRating === 'moderate' && shelter.weatherRating >= 3);
    
    return categoryMatch && deploymentMatch && capacityMatch && weatherMatch;
  });

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsTransitioning(false);
    }, 150);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setIsFiltering(true);
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setTimeout(() => {
      setIsFiltering(false);
    }, 200);
  };

  const handleExportPDF = (shelter: Shelter) => {
    const shelterSpecs: ShelterSpecs = {
      name: shelter.name,
      description: shelter.description,
      category: shelter.category,
      deploymentTime: shelter.deploymentTime,
      weatherRating: shelter.weatherRating,
      capacity: shelter.capacity,
      availability: shelter.availability,
      deploymentDifficulty: shelter.deploymentDifficulty,
      features: shelter.features,
      useCases: shelter.useCases,
      technicalSpecs: shelter.technicalSpecs
    };
    generateShelterPDF(shelterSpecs);
  };

  const handleExportComparisonPDF = () => {
    const shelterSpecs: ShelterSpecs[] = shelters.map(shelter => ({
      name: shelter.name,
      description: shelter.description,
      category: shelter.category,
      deploymentTime: shelter.deploymentTime,
      weatherRating: shelter.weatherRating,
      capacity: shelter.capacity,
      availability: shelter.availability,
      deploymentDifficulty: shelter.deploymentDifficulty,
      features: shelter.features,
      useCases: shelter.useCases,
      technicalSpecs: shelter.technicalSpecs
    }));
    generateComparisonPDF(shelterSpecs);
  };

  const handleContactSales = (shelterName?: string) => {
    setContactShelter(shelterName || '');
    setShowContactForm(true);
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
        linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
      `,
      padding: '80px 24px',
      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '20px'
        }}
      >
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <Link href="/" style={{ 
            color: '#f97316', 
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ea580c'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#f97316'}
          >
            Home
          </Link>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>›</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Shelter Configurator</span>
        </nav>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          marginBottom: '80px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '50px',
            marginBottom: '32px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#3b82f6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Military Grade Solutions
          </span>
        </motion.div>

        <h1 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '24px',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          letterSpacing: '-0.02em',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Weatherhaven
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            position: 'relative',
            display: 'inline-block'
          }}
        >
          <p style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.4',
            fontWeight: '300'
          }}>
            Deployable Shelter Solutions
          </p>
          
          {/* Decorative line */}
          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #3b82f6, #ff6b35)',
            margin: '20px auto 0 auto',
            borderRadius: '2px',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
          }} />
        </motion.div>
      </motion.div>

      {/* Simple TRECC Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '60px',
          position: 'relative',
          zIndex: 1
        }}
      >

        {/* TRECC Product Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -8 }}
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
              rgba(255, 255, 255, 0.03)
            `,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            padding: '60px',
            maxWidth: '700px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.4),
              0 10px 30px rgba(59, 130, 246, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Animated background elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg,
                rgba(59, 130, 246, 0.05) 90deg,
                transparent 180deg,
                rgba(255, 107, 53, 0.05) 270deg,
                transparent 360deg
              )
            `,
            animation: 'spin 20s linear infinite',
            pointerEvents: 'none'
          }} />
          
          {/* Corner accents */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRadius: '0 20px 0 0'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            border: '2px solid rgba(255, 107, 53, 0.3)',
            borderTop: 'none',
            borderRight: 'none',
            borderRadius: '0 0 0 20px'
          }} />
          {/* Product Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              TRECC
            </h2>
            
            {/* Subtitle */}
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '20px',
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#3b82f6',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Deployable Shelter System
              </span>
            </div>
          </motion.div>
          
          {/* Product Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              marginBottom: '40px',
              lineHeight: '1.6',
              fontWeight: '300',
              position: 'relative',
              zIndex: 2
            }}
          >
            Advanced deployable shelter system with multiple configuration options for military, emergency response, and remote operations.
          </motion.p>
          
          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{
              marginBottom: '40px',
              textAlign: 'left',
              maxWidth: '450px',
              margin: '0 auto 40px auto',
              position: 'relative',
              zIndex: 2
            }}
          >
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '24px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Key Features
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { text: 'Multiple configurations', icon: '⚙️' },
                { text: 'Rapid deployment', icon: '⚡' },
                { text: 'Modular design', icon: '🧩' },
                { text: 'Extreme weather protection', icon: '🛡️' },
                { text: 'Military-grade construction', icon: '🏗️' }
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  style={{
                    color: '#e2e8f0',
                    fontSize: '1rem',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <span style={{
                    fontSize: '1.2rem',
                    filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))'
                  }}>{feature.icon}</span>
                  <span style={{ fontWeight: '500' }}>{feature.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Configure Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <Link href="/configurator/trecc">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `
                    linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #ff6b35 100%)
                  `,
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '18px 40px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: `
                    0 12px 32px rgba(59, 130, 246, 0.4),
                    0 6px 16px rgba(255, 107, 53, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Button shine effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s ease'
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  Configure TRECC
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
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
