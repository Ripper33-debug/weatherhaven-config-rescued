'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Weatherhaven's rapid deployment capability saved us critical time during our disaster response mission. The shelters were operational within hours, not days.",
      author: "Colonel Sarah Martinez",
      position: "Emergency Response Commander",
      organization: "US Army Corps of Engineers",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      quote: "The modular design and ease of setup make Weatherhaven shelters perfect for our remote research stations. Outstanding quality and reliability.",
      author: "Dr. James Chen",
      position: "Research Director",
      organization: "Arctic Research Institute",
      avatar: "👨‍🔬",
      rating: 5
    },
    {
      quote: "We've deployed Weatherhaven systems in 15 countries. Their global support and rapid deployment technology are unmatched in the industry.",
      author: "Maria Rodriguez",
      position: "Operations Manager",
      organization: "International Aid Organization",
      avatar: "👩‍💻",
      rating: 5
    },
    {
      quote: "The configurator tool made it incredibly easy to design our custom shelter solution. The entire process from design to deployment was seamless.",
      author: "Captain David Thompson",
      position: "Logistics Officer",
      organization: "Canadian Armed Forces",
      avatar: "👨‍✈️",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section style={{
      padding: '100px 0',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '12px' }}>⭐</span>
            TRUSTED BY LEADERS WORLDWIDE
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '16px'
          }}>
            WHAT OUR CLIENTS SAY
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Real feedback from military, disaster response, and research organizations worldwide.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Quote Icon */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              fontSize: '3rem',
              color: 'rgba(255, 255, 255, 0.1)'
            }}>
              "
            </div>

            {/* Rating Stars */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '24px'
            }}>
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <span key={i} style={{ fontSize: '1.2rem', color: '#fbbf24' }}>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote style={{
              fontSize: '1.25rem',
              color: 'white',
              lineHeight: '1.6',
              marginBottom: '32px',
              fontStyle: 'italic',
              fontWeight: '300'
            }}>
              {testimonials[currentIndex].quote}
            </blockquote>

            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginRight: '8px'
              }}>
                {testimonials[currentIndex].avatar}
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '4px'
                }}>
                  {testimonials[currentIndex].author}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#d1d5db'
                }}>
                  {testimonials[currentIndex].position}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  fontWeight: '500'
                }}>
                  {testimonials[currentIndex].organization}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '32px'
          }}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            marginTop: '80px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '32px'
          }}>
            TRUSTED BY LEADING ORGANIZATIONS
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { name: 'US Army', icon: '🛡️' },
              { name: 'NATO', icon: '🌍' },
              { name: 'UN Aid', icon: '🏛️' },
              { name: 'Red Cross', icon: '❤️' },
              { name: 'Arctic Research', icon: '🧊' },
              { name: 'Disaster Relief', icon: '🚨' }
            ].map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ fontSize: '2rem' }}>
                  {org.icon}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#d1d5db'
                }}>
                  {org.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
