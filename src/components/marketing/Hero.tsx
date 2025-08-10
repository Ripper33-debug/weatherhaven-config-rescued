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

      {/* Weatherhaven Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: '16px 32px',
          borderRadius: '50px',
          border: '2px solid var(--weatherhaven-blue)',
          boxShadow: 'var(--shadow-blue)'
        }}
      >
        <motion.div
          style={{
            width: '40px',
            height: '40px',
            position: 'relative',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--weatherhaven-white)'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          W
        </motion.div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <motion.div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--weatherhaven-white)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
            animate={{
              textShadow: [
                '0 0 10px var(--weatherhaven-blue)',
                '0 0 20px var(--weatherhaven-blue)',
                '0 0 10px var(--weatherhaven-blue)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Weatherhaven
          </motion.div>
          <motion.div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Deployable Shelter Solutions
          </motion.div>
        </div>
      </motion.div>

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

        {/* Interactive Floating Info Panel */}
        <motion.div
          style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '2px solid var(--weatherhaven-blue)',
            borderRadius: '16px',
            padding: '20px',
            maxWidth: '280px',
            zIndex: 15,
            cursor: 'pointer'
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: 'var(--shadow-blue)',
            transition: { duration: 0.3 }
          }}
        >
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
