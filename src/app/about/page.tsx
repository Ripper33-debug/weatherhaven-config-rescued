'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const stats = [
    { number: '40+', label: 'Years Experience' },
    { number: '50+', label: 'Countries Served' },
    { number: '1000+', label: 'Deployments' },
    { number: '24/7', label: 'Global Support' }
  ];

  const values = [
    {
      icon: '🚀',
      title: 'INNOVATION',
      description: 'Pioneering advanced shelter technology for extreme environments.'
    },
    {
      icon: '🛡️',
      title: 'RELIABILITY',
      description: 'Delivering consistent performance in the most challenging conditions.'
    },
    {
      icon: '⚡',
      title: 'SPEED',
      description: 'Rapid deployment capabilities that save critical time and resources.'
    },
    {
      icon: '🌍',
      title: 'GLOBAL REACH',
      description: 'Worldwide support and deployment capabilities.'
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
          ABOUT WEATHERHAVEN
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
          Leading the world in deployable shelter solutions for over four decades.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 80px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              <div style={{
                color: '#d1d5db',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '60px',
            marginBottom: '80px',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '32px'
          }}>
            OUR MISSION
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Weatherhaven has been at the forefront of deployable shelter technology for over 40 years. 
            We specialize in creating rapid-deployment shelter solutions that perform reliably in the 
            world's most challenging environments. From military operations to disaster relief, 
            our modular shelter systems provide the infrastructure needed when time and reliability matter most.
          </p>
        </motion.div>

        {/* Values Section */}
        <div style={{
          marginBottom: '80px'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            OUR VALUES
          </motion.h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '24px'
                }}>
                  {value.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '16px'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  fontSize: '0.875rem'
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '24px'
          }}>
            READY TO GET STARTED?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '32px',
            fontWeight: '300'
          }}>
            Contact our team to discuss your shelter requirements.
          </p>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '16px 48px',
              background: 'white',
              color: 'black',
              fontWeight: '500',
              fontSize: '18px',
              letterSpacing: '0.025em',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease'
            }}
          >
            CONTACT US
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
