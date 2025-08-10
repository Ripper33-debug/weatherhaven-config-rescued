'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import VideoBackground from '../ui/VideoBackground';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// Magnetic Button Component
const MagneticButton = ({ children, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        ...props.style,
        x: springX,
        y: springY
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default function Hero() {
  const [counts, setCounts] = useState({
    deployments: 0,
    countries: 0,
    reliability: 0,
    hours: 0
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLocation, setHoveredLocation] = useState<{
    x: number;
    y: number;
    country: string;
    deployments: number;
    color: string;
    region: string;
  } | null>(null);

  // Live data counters
  useEffect(() => {
    const targetCounts = {
      deployments: 1000,
      countries: 50,
      reliability: 99.9,
      hours: 24
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        deployments: Math.floor(targetCounts.deployments * progress),
        countries: Math.floor(targetCounts.countries * progress),
        reliability: Number((targetCounts.reliability * progress).toFixed(1)),
        hours: Math.floor(targetCounts.hours * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for particle system
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--bg-darker)'
    }}>
      <VideoBackground
        videoSrc="/videos/weatherhaven-hero.mp4"
        fallbackImage="/images/hero-bg.jpg"
        overlay={true}
        overlayOpacity={0.7}
      >
        {/* Weatherhaven Brand Grid Pattern */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 102, 204, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 204, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            zIndex: 1
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        


        {/* Weatherhaven Brand Lines */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--weatherhaven-blue), transparent)',
            zIndex: 2
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '150px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--weatherhaven-orange), transparent)',
            zIndex: 2
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />

        {/* Floating 3D Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '80px',
            height: '80px',
            background: 'rgba(0, 102, 204, 0.1)',
            border: '2px solid rgba(0, 102, 204, 0.3)',
            borderRadius: '8px',
            zIndex: 2,
            transform: 'rotateX(45deg) rotateY(45deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [45, 405],
            rotateY: [45, 405],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '4px',
            background: 'var(--weatherhaven-blue-light)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px var(--weatherhaven-blue-light)'
          }} />
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 102, 0, 0.1)',
            border: '2px solid rgba(255, 102, 0, 0.3)',
            borderRadius: '50%',
            zIndex: 2,
            transform: 'rotateX(30deg) rotateZ(30deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [30, 390],
            rotateZ: [30, 390],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '3px',
            height: '3px',
            background: 'var(--weatherhaven-orange)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px var(--weatherhaven-orange)'
          }} />
        </motion.div>

        {/* Weatherhaven Brand Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '25%',
            right: '25%',
            width: '60px',
            height: '60px',
            background: 'rgba(0, 102, 204, 0.1)',
            border: '2px solid var(--weatherhaven-blue)',
            borderRadius: '12px',
            zIndex: 2,
            transform: 'rotateX(45deg) rotateY(45deg)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--weatherhaven-blue)',
            cursor: 'pointer'
          }}
          animate={{
            rotateY: [45, 405],
            rotateX: [45, 405],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: 1
          }}
          whileHover={{
            scale: 1.5,
            boxShadow: '0 0 30px var(--weatherhaven-blue)',
            transition: { duration: 0.3 }
          }}
        >
          W
        </motion.div>

        {/* Weatherhaven Orange Element */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '20%',
            width: '50px',
            height: '50px',
            background: 'rgba(255, 102, 0, 0.1)',
            border: '2px solid var(--weatherhaven-orange)',
            borderRadius: '50%',
            zIndex: 2,
            transform: 'rotateX(30deg) rotateZ(30deg)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--weatherhaven-orange)',
            cursor: 'pointer'
          }}
          animate={{
            rotateX: [30, 390],
            rotateZ: [30, 390],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
          whileHover={{
            scale: 1.4,
            boxShadow: '0 0 25px var(--weatherhaven-orange)',
            transition: { duration: 0.3 }
          }}
        >
          H
        </motion.div>

        {/* Advanced Tech HUD Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '200px',
            height: '200px',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: '50%',
            zIndex: 2
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              background: 'var(--primary-cyan)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '150px',
            height: '150px',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: '50%',
            zIndex: 2
          }}
          animate={{
            rotate: -360,
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '3px',
              height: '3px',
              background: 'var(--primary-green)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </motion.div>

        {/* Data Stream Lines */}
        <motion.div
          style={{
            position: 'absolute',
            top: '30%',
            right: '20%',
            width: '2px',
            height: '100px',
            background: 'linear-gradient(180deg, transparent, var(--primary-cyan), transparent)',
            zIndex: 2
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            bottom: '40%',
            left: '15%',
            width: '2px',
            height: '80px',
            background: 'linear-gradient(180deg, transparent, var(--primary-green), transparent)',
            zIndex: 2
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />

        {/* Corner Brackets */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50px',
          width: '60px',
          height: '60px',
          borderTop: '2px solid var(--primary-cyan)',
          borderLeft: '2px solid var(--primary-cyan)',
          zIndex: 2
        }} />

        <div style={{
          position: 'absolute',
          top: '50px',
          right: '50px',
          width: '60px',
          height: '60px',
          borderTop: '2px solid var(--primary-cyan)',
          borderRight: '2px solid var(--primary-cyan)',
          zIndex: 2
        }} />

        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '50px',
          width: '60px',
          height: '60px',
          borderBottom: '2px solid var(--primary-green)',
          borderLeft: '2px solid var(--primary-green)',
          zIndex: 2
        }} />

        <div style={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
          width: '60px',
          height: '60px',
          borderBottom: '2px solid var(--primary-green)',
          borderRight: '2px solid var(--primary-green)',
          zIndex: 2
        }} />



      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Split Layout - Content Left, Visual Right */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            {/* Left Column - Content */}
            <div style={{ textAlign: 'left' }}>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                    fontWeight: '900',
                    color: 'var(--text-primary)',
                    marginBottom: '32px',
                    lineHeight: '0.85',
                    letterSpacing: '-0.04em',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 0 60px rgba(0, 102, 204, 0.5)',
                    position: 'relative'
                  }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    background: 'var(--gradient-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '900',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  DEPLOYABLE
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    background: 'var(--gradient-accent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '900',
                    position: 'relative',
                    display: 'block'
                  }}
                >
                  SHELTER SOLUTIONS
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                  marginBottom: '48px'
                }}
              >
                <p style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  fontWeight: '400',
                  letterSpacing: '0.02em',
                  marginBottom: '32px'
                }}>
                  Advanced deployable shelter systems engineered for defense operations, disaster response, and remote industrial applications.
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '1.1rem',
                    color: 'var(--text-accent)',
                    fontWeight: '600'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      background: 'var(--primary-green)',
                      borderRadius: '50%',
                      boxShadow: '0 0 15px var(--primary-green)'
                    }} />
                    <span>Ready in hours, not weeks</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '1.1rem',
                    color: 'var(--text-accent)',
                    fontWeight: '600'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      background: 'var(--primary-cyan)',
                      borderRadius: '50%',
                      boxShadow: '0 0 15px var(--primary-cyan)'
                    }} />
                    <span>Global deployment capability</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                <Link href="/configurator">
                  <MagneticButton
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '20px 40px',
                      background: 'var(--gradient-primary)',
                      color: 'var(--text-primary)',
                      fontWeight: '700',
                      fontSize: '16px',
                      letterSpacing: '0.1em',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-blue)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      textTransform: 'uppercase',
                      minWidth: '200px'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        transition: 'left 0.6s ease'
                      }}
                      whileHover={{ left: '100%' }}
                    />
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '0',
                        height: '0',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{
                        width: '300px',
                        height: '300px',
                        transition: { duration: 0.6 }
                      }}
                    />
                    <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🚀</span>
                      <span>LAUNCH CONFIGURATOR</span>
                    </span>
                  </MagneticButton>
                </Link>

                <Link href="/solutions">
                  <MagneticButton
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '20px 40px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '2px solid var(--weatherhaven-orange)',
                      color: 'var(--weatherhaven-orange)',
                      fontWeight: '700',
                      fontSize: '16px',
                      letterSpacing: '0.1em',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backdropFilter: 'blur(30px)',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      boxShadow: 'var(--shadow-orange)',
                      minWidth: '200px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '0',
                        height: '0',
                        background: 'rgba(0, 212, 255, 0.1)',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{
                        width: '300px',
                        height: '300px',
                        transition: { duration: 0.6 }
                      }}
                    />
                    <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔍</span>
                      <span>EXPLORE SOLUTIONS</span>
                    </span>
                  </MagneticButton>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                height: '100%'
              }}
            >
              {/* Central Visual Element */}
              <motion.div
                style={{
                  width: '300px',
                  height: '300px',
                  border: '3px solid var(--weatherhaven-blue-light)',
                  borderRadius: '50%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 102, 204, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 50px rgba(0, 102, 204, 0.3)'
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <motion.div
                  style={{
                    width: '200px',
                    height: '200px',
                    border: '2px solid var(--weatherhaven-orange)',
                    borderRadius: '50%',
                    position: 'relative'
                  }}
                  animate={{
                    rotate: -360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <motion.div
                    style={{
                      width: '100px',
                      height: '100px',
                      border: '2px solid var(--accent-cyan)',
                      borderRadius: '50%',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'var(--gradient-accent)',
                      borderRadius: '50%',
                      boxShadow: '0 0 30px rgba(0, 102, 204, 0.5)'
                    }} />
                  </motion.div>
                </motion.div>
              </motion.div>

                      {/* Floating Data Points */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              background: `hsl(${i * 60}, 70%, 60%)`,
              borderRadius: '50%',
              boxShadow: `0 0 15px hsl(${i * 60}, 70%, 60%)`
            }}
            animate={{
              x: [0, Math.sin(i) * 50, 0],
              y: [0, Math.cos(i) * 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}

        {/* Interactive Particle System */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${Math.random() * 0.3 + 0.1})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              pointerEvents: 'none',
              zIndex: 1
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 2 + 0.5],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
            whileHover={{
              scale: 3,
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
        ))}

        {/* Mouse-following particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`mouse-particle-${i}`}
            style={{
              position: 'fixed',
              width: '4px',
              height: '4px',
              background: `rgba(0, 102, 204, ${0.3 - i * 0.03})`,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1000
            }}
            animate={{
              x: mousePosition.x + i * 10,
              y: mousePosition.y + i * 10,
              scale: [1, 0],
              opacity: [0.3, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.1
            }}
          />
        ))}

        {/* Interactive World Map */}
        <motion.div
          style={{
            position: 'absolute',
            top: '5%',
            right: '3%',
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid var(--weatherhaven-blue)',
            borderRadius: '20px',
            padding: '24px',
            width: '400px',
            height: '300px',
            zIndex: 15,
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{
            scale: 1.02,
            boxShadow: 'var(--shadow-blue)',
            transition: { duration: 0.3 }
          }}
        >
          {/* Map Header */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--weatherhaven-orange)',
              borderRadius: '50%',
              boxShadow: '0 0 10px var(--weatherhaven-orange)'
            }} />
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--weatherhaven-white)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Global Deployments
            </div>
          </motion.div>

          {/* World Map Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 102, 204, 0.3)',
            overflow: 'hidden'
          }}>
            {/* Real World Map */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 500"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0.4
              }}
            >
              {/* North America */}
              <path d="M150,120 L200,110 L250,120 L280,140 L300,160 L320,180 L340,200 L360,220 L380,240 L400,260 L420,280 L440,300 L460,320 L480,340 L500,360 L520,380 L540,400 L560,420 L580,440 L600,460 L620,480 L640,500 L660,480 L680,460 L700,440 L720,420 L740,400 L760,380 L780,360 L800,340 L820,320 L840,300 L860,280 L880,260 L900,240 L920,220 L940,200 L960,180 L980,160 L1000,140 L1000,120 L980,100 L960,80 L940,60 L920,40 L900,20 L880,0 L860,20 L840,40 L820,60 L800,80 L780,100 L760,120 L740,140 L720,160 L700,180 L680,200 L660,220 L640,240 L620,260 L600,280 L580,300 L560,320 L540,340 L520,360 L500,380 L480,400 L460,420 L440,440 L420,460 L400,480 L380,500 L360,480 L340,460 L320,440 L300,420 L280,400 L260,380 L240,360 L220,340 L200,320 L180,300 L160,280 L140,260 L120,240 L100,220 L80,200 L60,180 L40,160 L20,140 L0,120 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
              
              {/* South America */}
              <path d="M300,300 L320,320 L340,340 L360,360 L380,380 L400,400 L420,420 L440,440 L460,460 L480,480 L500,500 L520,480 L540,460 L560,440 L580,420 L600,400 L620,380 L640,360 L660,340 L680,320 L700,300 L720,280 L740,260 L760,240 L780,220 L800,200 L820,180 L840,160 L860,140 L880,120 L900,100 L920,80 L940,60 L960,40 L980,20 L1000,0 L1000,20 L980,40 L960,60 L940,80 L920,100 L900,120 L880,140 L860,160 L840,180 L820,200 L800,220 L780,240 L760,260 L740,280 L720,300 L700,320 L680,340 L660,360 L640,380 L620,400 L600,420 L580,440 L560,460 L540,480 L520,500 L500,480 L480,460 L460,440 L440,420 L420,400 L400,380 L380,360 L360,340 L340,320 L320,300 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
              
              {/* Europe */}
              <path d="M450,100 L470,120 L490,140 L510,160 L530,180 L550,200 L570,220 L590,240 L610,260 L630,280 L650,300 L670,320 L690,340 L710,360 L730,380 L750,400 L770,420 L790,440 L810,460 L830,480 L850,500 L870,480 L890,460 L910,440 L930,420 L950,400 L970,380 L990,360 L1010,340 L1030,320 L1050,300 L1070,280 L1090,260 L1110,240 L1130,220 L1150,200 L1170,180 L1190,160 L1210,140 L1230,120 L1250,100 L1270,80 L1290,60 L1310,40 L1330,20 L1350,0 L1350,20 L1330,40 L1310,60 L1290,80 L1270,100 L1250,120 L1230,140 L1210,160 L1190,180 L1170,200 L1150,220 L1130,240 L1110,260 L1090,280 L1070,300 L1050,320 L1030,340 L1010,360 L990,380 L970,400 L950,420 L930,440 L910,460 L890,480 L870,500 L850,480 L830,460 L810,440 L790,420 L770,400 L750,380 L730,360 L710,340 L690,320 L670,300 L650,280 L630,260 L610,240 L590,220 L570,200 L550,180 L530,160 L510,140 L490,120 L470,100 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
              
              {/* Africa */}
              <path d="M500,150 L520,170 L540,190 L560,210 L580,230 L600,250 L620,270 L640,290 L660,310 L680,330 L700,350 L720,370 L740,390 L760,410 L780,430 L800,450 L820,470 L840,490 L860,510 L880,530 L900,550 L920,570 L940,590 L960,610 L980,630 L1000,650 L1000,670 L980,690 L960,710 L940,730 L920,750 L900,770 L880,790 L860,810 L840,830 L820,850 L800,870 L780,890 L760,910 L740,930 L720,950 L700,970 L680,990 L660,1010 L640,1030 L620,1050 L600,1070 L580,1090 L560,1110 L540,1130 L520,1150 L500,1170 L480,1150 L460,1130 L440,1110 L420,1090 L400,1070 L380,1050 L360,1030 L340,1010 L320,990 L300,970 L280,950 L260,930 L240,910 L220,890 L200,870 L180,850 L160,830 L140,810 L120,790 L100,770 L80,750 L60,730 L40,710 L20,690 L0,670 L0,650 L20,630 L40,610 L60,590 L80,570 L100,550 L120,530 L140,510 L160,490 L180,470 L200,450 L220,430 L240,410 L260,390 L280,370 L300,350 L320,330 L340,310 L360,290 L380,270 L400,250 L420,230 L440,210 L460,190 L480,170 L500,150 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
              
              {/* Asia */}
              <path d="M700,80 L720,100 L740,120 L760,140 L780,160 L800,180 L820,200 L840,220 L860,240 L880,260 L900,280 L920,300 L940,320 L960,340 L980,360 L1000,380 L1020,400 L1040,420 L1060,440 L1080,460 L1100,480 L1120,500 L1140,480 L1160,460 L1180,440 L1200,420 L1220,400 L1240,380 L1260,360 L1280,340 L1300,320 L1320,300 L1340,280 L1360,260 L1380,240 L1400,220 L1420,200 L1440,180 L1460,160 L1480,140 L1500,120 L1520,100 L1540,80 L1560,60 L1580,40 L1600,20 L1600,40 L1580,60 L1560,80 L1540,100 L1520,120 L1500,140 L1480,160 L1460,180 L1440,200 L1420,220 L1400,240 L1380,260 L1360,280 L1340,300 L1320,320 L1300,340 L1280,360 L1260,380 L1240,400 L1220,420 L1200,440 L1180,460 L1160,480 L1140,500 L1120,480 L1100,460 L1080,440 L1060,420 L1040,400 L1020,380 L1000,360 L980,340 L960,320 L940,300 L920,280 L900,260 L880,240 L860,220 L840,200 L820,180 L800,160 L780,140 L760,120 L740,100 L720,80 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
              
              {/* Australia */}
              <path d="M850,300 L870,320 L890,340 L910,360 L930,380 L950,400 L970,420 L990,440 L1010,460 L1030,480 L1050,500 L1070,480 L1090,460 L1110,440 L1130,420 L1150,400 L1170,380 L1190,360 L1210,340 L1230,320 L1250,300 L1270,280 L1290,260 L1310,240 L1330,220 L1350,200 L1370,180 L1390,160 L1410,140 L1430,120 L1450,100 L1470,80 L1490,60 L1510,40 L1530,20 L1550,0 L1550,20 L1530,40 L1510,60 L1490,80 L1470,100 L1450,120 L1430,140 L1410,160 L1390,180 L1370,200 L1350,220 L1330,240 L1310,260 L1290,280 L1270,300 L1250,320 L1230,340 L1210,360 L1190,380 L1170,400 L1150,420 L1130,440 L1110,460 L1090,480 L1070,500 L1050,480 L1030,460 L1010,440 L990,420 L970,400 L950,380 L930,360 L910,340 L890,320 L870,300 Z" fill="rgba(0, 102, 204, 0.15)" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1"/>
            </svg>

            {/* Real Deployment Locations */}
            {[
              { x: 15, y: 35, country: 'USA', deployments: 120, color: 'var(--weatherhaven-orange)', region: 'North America' },
              { x: 20, y: 30, country: 'Canada', deployments: 45, color: 'var(--weatherhaven-blue)', region: 'North America' },
              { x: 25, y: 40, country: 'Mexico', deployments: 28, color: 'var(--weatherhaven-blue)', region: 'North America' },
              { x: 45, y: 35, country: 'UK', deployments: 67, color: 'var(--weatherhaven-orange)', region: 'Europe' },
              { x: 50, y: 40, country: 'Germany', deployments: 89, color: 'var(--weatherhaven-blue)', region: 'Europe' },
              { x: 55, y: 35, country: 'France', deployments: 52, color: 'var(--weatherhaven-orange)', region: 'Europe' },
              { x: 60, y: 45, country: 'Italy', deployments: 38, color: 'var(--weatherhaven-blue)', region: 'Europe' },
              { x: 70, y: 45, country: 'Australia', deployments: 34, color: 'var(--weatherhaven-blue)', region: 'Oceania' },
              { x: 75, y: 50, country: 'Japan', deployments: 23, color: 'var(--weatherhaven-orange)', region: 'Asia' },
              { x: 80, y: 40, country: 'China', deployments: 42, color: 'var(--weatherhaven-blue)', region: 'Asia' },
              { x: 85, y: 45, country: 'India', deployments: 29, color: 'var(--weatherhaven-orange)', region: 'Asia' },
              { x: 60, y: 55, country: 'South Africa', deployments: 18, color: 'var(--weatherhaven-blue)', region: 'Africa' },
              { x: 35, y: 60, country: 'Brazil', deployments: 31, color: 'var(--weatherhaven-orange)', region: 'South America' },
              { x: 30, y: 58, country: 'Argentina', deployments: 15, color: 'var(--weatherhaven-blue)', region: 'South America' },
              { x: 65, y: 42, country: 'Russia', deployments: 25, color: 'var(--weatherhaven-orange)', region: 'Europe/Asia' },
              { x: 40, y: 50, country: 'Saudi Arabia', deployments: 22, color: 'var(--weatherhaven-blue)', region: 'Middle East' }
            ].map((location, index) => (
              <motion.div
                key={location.country}
                style={{
                  position: 'absolute',
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  width: '10px',
                  height: '10px',
                  background: location.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 20px ${location.color}`,
                  cursor: 'pointer',
                  zIndex: 10
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3 + index * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.05
                }}
                whileHover={{
                  scale: 2.5,
                  boxShadow: `0 0 30px ${location.color}`,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredLocation(location)}
                onHoverEnd={() => setHoveredLocation(null)}
              >
                {/* Pulse Ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    border: `2px solid ${location.color}`,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              </motion.div>
            ))}

            {/* Animated Global Network Lines */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '2px',
                background: 'var(--weatherhaven-blue)',
                borderRadius: '50%'
              }}
              animate={{
                scale: [1, 150, 1],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Enhanced Deployment Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <div>
              <span style={{ color: 'var(--weatherhaven-blue)' }}>●</span> Active: 678
            </div>
            <div>
              <span style={{ color: 'var(--weatherhaven-orange)' }}>●</span> Countries: 50+
            </div>
            <div>
              <span style={{ color: 'var(--accent-cyan)' }}>●</span> Continents: 6
            </div>
          </div>
        </motion.div>

        {/* Enhanced Deployment Tooltip */}
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              top: `${hoveredLocation.y * 2.4}px`,
              left: `${hoveredLocation.x * 4}px`,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${hoveredLocation.color}`,
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '12px',
              color: 'var(--weatherhaven-white)',
              zIndex: 20,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 20px ${hoveredLocation.color}40`
            }}
          >
            <div style={{
              fontWeight: '700',
              marginBottom: '4px',
              color: hoveredLocation.color
            }}>
              {hoveredLocation.country}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginBottom: '2px'
            }}>
              {hoveredLocation.deployments} Active Deployments
            </div>
            <div style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              {hoveredLocation.region}
            </div>
          </motion.div>
        )}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--weatherhaven-orange)',
              borderRadius: '50%',
              boxShadow: '0 0 10px var(--weatherhaven-orange)'
            }} />
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'var(--weatherhaven-white)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Live Status
            </div>
          </motion.div>
          
          <div style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '12px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: 'var(--weatherhaven-orange)' }}>●</span> System: Operational
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>●</span> Global Network: Active
            </div>
            <div>
              <span style={{ color: 'var(--weatherhaven-blue-light)' }}>●</span> Deployments: Ready
            </div>
          </div>
          
          <motion.div
            style={{
              height: '2px',
              background: 'var(--gradient-primary)',
              borderRadius: '1px'
            }}
            animate={{
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>

          {/* Advanced Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {[
              { 
                number: counts.hours, 
                label: 'HOURS TO DEPLOY', 
                icon: '⚡',
                color: 'var(--weatherhaven-orange)',
                description: 'Rapid deployment capability',
                suffix: ''
              },
              { 
                number: counts.countries, 
                label: 'COUNTRIES SERVED', 
                icon: '🌍',
                color: 'var(--weatherhaven-blue-light)',
                description: 'Global operational reach',
                suffix: '+'
              },
              { 
                number: counts.deployments, 
                label: 'SUCCESSFUL DEPLOYMENTS', 
                icon: '✅',
                color: 'var(--weatherhaven-blue)',
                description: 'Proven track record',
                suffix: '+'
              },
              { 
                number: counts.reliability, 
                label: 'UPTIME RELIABILITY', 
                icon: '🛡️',
                color: 'var(--accent-cyan)',
                description: 'Mission-critical reliability',
                suffix: '%'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(30px)',
                  border: `2px solid ${stat.color}`,
                  borderRadius: '16px',
                  boxShadow: `0 0 30px ${stat.color}20`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    opacity: 0.6
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                
                {/* Hover Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${stat.color}15, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  whileHover={{ opacity: 1 }}
                />
                
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: stat.color,
                  marginBottom: '8px',
                  textShadow: `0 0 20px ${stat.color}80`
                }}>
                  {stat.number}{stat.suffix}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontWeight: '400',
                  lineHeight: '1.4'
                }}>
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Weatherhaven Brand Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--weatherhaven-blue-light)',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          zIndex: 10
        }}
      >
        <motion.div
          style={{
            width: '2px',
            height: '40px',
            background: 'linear-gradient(180deg, var(--weatherhaven-blue-light), transparent)',
            borderRadius: '1px'
          }}
          animate={{ 
            scaleY: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            fontSize: '1.2rem',
            filter: 'drop-shadow(0 0 10px var(--primary-cyan))'
          }}
        >
          ↓
        </motion.div>
        <span style={{ 
          textShadow: '0 0 10px var(--primary-cyan)',
          filter: 'drop-shadow(0 0 5px var(--primary-cyan))'
        }}>
          SCROLL TO EXPLORE
        </span>
      </motion.div>
      </VideoBackground>
    </section>
  );
}
