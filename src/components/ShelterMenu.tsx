'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { generateShelterPDF, generateComparisonPDF, ShelterSpecs } from '../lib/pdfExport';
import ContactForm from './ContactForm';
import { preloadModel } from '../lib/aws';

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
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      padding: '60px 24px',
      fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
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
        background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)',
        animation: 'gradientShift 8s ease-in-out infinite',
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
          marginBottom: '60px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#94a3b8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Weatherhaven
          </div>
        <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '24px',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            TRECC Configurator
        </h1>
        <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            color: '#e2e8f0',
            maxWidth: '800px',
          margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400'
        }}>
          Explore and customize Weatherhaven's complete range of deployable shelter solutions for military, emergency response, and remote operations
        </p>
        </div>
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
              padding: '14px 28px',
              background: selectedCategory === category 
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                : 'rgba(255, 255, 255, 0.1)',
              border: selectedCategory === category 
                ? '1px solid #3b82f6' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: selectedCategory === category ? 'white' : '#e2e8f0',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'capitalize',
              backdropFilter: 'blur(20px)',
              boxShadow: selectedCategory === category 
                ? '0 8px 25px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              fontSize: '15px',
              letterSpacing: '0.025em'
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

      {/* Specification Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Deployment Time Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#495057' }}>
            Deployment Time
          </label>
          <select
            value={filters.deploymentTime}
            onChange={(e) => handleFilterChange('deploymentTime', e.target.value)}
            disabled={isFiltering}
            style={{
              padding: '8px 12px',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              background: isFiltering ? '#f8f9fa' : '#ffffff',
              color: isFiltering ? '#6c757d' : '#495057',
              fontSize: '0.9rem',
              cursor: isFiltering ? 'not-allowed' : 'pointer',
              minWidth: '120px',
              opacity: isFiltering ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <option value="all">All Times</option>
            <option value="fast">≤ 1 Hour</option>
            <option value="moderate">1-2 Hours</option>
            <option value="extended">&gt; 2 Hours</option>
          </select>
        </div>

        {/* Capacity Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#495057' }}>
            Capacity
          </label>
          <select
            value={filters.capacity}
            onChange={(e) => handleFilterChange('capacity', e.target.value)}
            disabled={isFiltering}
            style={{
              padding: '8px 12px',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              background: isFiltering ? '#f8f9fa' : '#ffffff',
              color: isFiltering ? '#6c757d' : '#495057',
              fontSize: '0.9rem',
              cursor: isFiltering ? 'not-allowed' : 'pointer',
              minWidth: '120px',
              opacity: isFiltering ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <option value="all">All Sizes</option>
            <option value="small">≤ 30 Personnel</option>
            <option value="medium">31-50 Personnel</option>
            <option value="large">&gt; 50 Personnel</option>
          </select>
        </div>

        {/* Weather Rating Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#495057' }}>
            Weather Rating
          </label>
          <select
            value={filters.weatherRating}
            onChange={(e) => handleFilterChange('weatherRating', e.target.value)}
            disabled={isFiltering}
            style={{
              padding: '8px 12px',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              background: isFiltering ? '#f8f9fa' : '#ffffff',
              color: isFiltering ? '#6c757d' : '#495057',
              fontSize: '0.9rem',
              cursor: isFiltering ? 'not-allowed' : 'pointer',
              minWidth: '120px',
              opacity: isFiltering ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <option value="all">All Ratings</option>
            <option value="extreme">★★★★★ Extreme</option>
            <option value="high">★★★★ High</option>
            <option value="moderate">★★★ Moderate</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#495057', opacity: 0 }}>
            Actions
          </label>
          <button
            onClick={() => setFilters({ deploymentTime: 'all', capacity: 'all', weatherRating: 'all' })}
            style={{
              padding: '8px 16px',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              background: '#ffffff',
              color: '#6c757d',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
              e.currentTarget.style.borderColor = '#adb5bd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          >
            Clear Filters
          </button>
        </div>
      </motion.div>

      {/* Loading Indicator */}
      {isFiltering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#0d6efd',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #e9ecef',
            borderTop: '2px solid #0d6efd',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Filtering shelters...
        </motion.div>
      )}

      {/* Results Count */}
      {!isFiltering && filteredShelters.length !== shelters.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#6c757d',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          Showing {filteredShelters.length} of {shelters.length} shelter{filteredShelters.length !== 1 ? 's' : ''}
        </motion.div>
      )}

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
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              padding: '36px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transform: 'translateY(0)',
              transformStyle: 'preserve-3d'
            }}
          >

            {/* Status Indicators */}
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              display: 'flex',
              gap: '12px',
              zIndex: 2
            }}>
              {/* Availability Status */}
              <div style={{
                padding: '8px 14px',
                background: `rgba(${getAvailabilityColor(shelter.availability).slice(1)}, 0.15)`,
                border: `1px solid ${getAvailabilityColor(shelter.availability)}`,
                borderRadius: '16px',
                fontSize: '0.75rem',
              fontWeight: '700',
                color: getAvailabilityColor(shelter.availability),
              textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <span style={{ fontSize: '10px' }}>{getAvailabilityIcon(shelter.availability)}</span>
                {shelter.availability}
              </div>
              
              {/* Category Badge */}
              <div style={{
                padding: '8px 14px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid #3b82f6',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#3b82f6',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
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
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '12px',
                letterSpacing: '-0.025em',
                lineHeight: '1.2'
              }}>
                {shelter.name}
              </h3>
              
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '28px',
                fontSize: '1rem',
                fontWeight: '400'
              }}>
                {shelter.description}
              </p>

              {/* Deployment Time Indicator */}
              <div style={{
                marginBottom: '24px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                backdropFilter: 'blur(10px)'
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
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#1e3a8a',
                margin: 0
              }}>
                TRECC vs HERCONN Comparison
              </h2>
              <button
                onClick={handleExportComparisonPDF}
                style={{
                  padding: '8px 16px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
              >
                Export PDF
              </button>
            </div>

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
                    color: '#1e3a8a',
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

      {/* Contact Form */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        shelterName={contactShelter}
      />

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
