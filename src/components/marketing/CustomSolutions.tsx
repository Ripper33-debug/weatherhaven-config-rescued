'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CustomSolutions() {
  const customServices = [
    {
      icon: '🎯',
      title: 'CUSTOM DESIGN',
      description: 'Tailored shelter solutions designed specifically for your unique requirements and environment.',
      features: [
        'Site-specific engineering',
        'Custom dimensions and layout',
        'Specialized equipment integration',
        'Brand-specific styling',
        'Regulatory compliance',
        'Performance optimization'
      ],
      process: [
        'Requirements analysis',
        'Conceptual design',
        'Engineering review',
        'Prototype development',
        'Testing and validation',
        'Production and delivery'
      ]
    },
    {
      icon: '🔧',
      title: 'INTEGRATION SERVICES',
      description: 'Seamless integration of your existing systems and equipment into our shelter solutions.',
      features: [
        'Equipment compatibility analysis',
        'System integration planning',
        'Custom mounting solutions',
        'Power and data integration',
        'Environmental controls',
        'Safety system integration'
      ],
      process: [
        'System assessment',
        'Integration planning',
        'Custom fabrication',
        'Installation support',
        'Testing and commissioning',
        'Training and documentation'
      ]
    },
    {
      icon: '🌍',
      title: 'GLOBAL DEPLOYMENT',
      description: 'Comprehensive deployment services for worldwide operations and remote locations.',
      features: [
        'Logistics planning',
        'Transportation coordination',
        'Site preparation support',
        'Assembly and installation',
        'Local compliance',
        'Ongoing support'
      ],
      process: [
        'Site assessment',
        'Logistics planning',
        'Transport coordination',
        'Site preparation',
        'Installation and testing',
        'Handover and training'
      ]
    }
  ];

  const caseStudies = [
    {
      title: 'Arctic Research Station',
      client: 'International Polar Research Institute',
      challenge: 'Extreme cold weather research facility in remote Arctic location',
      solution: 'Custom insulated shelter system with specialized HVAC and power systems',
      results: [
        'Operational in -50°C temperatures',
        'Reduced deployment time by 60%',
        'Improved research efficiency by 40%',
        'Extended operational season by 3 months'
      ]
    },
    {
      title: 'Mobile Command Center',
      client: 'Department of Homeland Security',
      challenge: 'Rapid deployment command facility for emergency response',
      solution: 'Modular command center with advanced communications and security systems',
      results: [
        'Deployment time reduced to 4 hours',
        'Enhanced coordination capabilities',
        'Improved response times by 50%',
        'Cost savings of $2M annually'
      ]
    },
    {
      title: 'Mining Camp Complex',
      client: 'Global Mining Corporation',
      challenge: 'Complete living and working facility for remote mining operation',
      solution: 'Integrated camp system with living quarters, dining, and medical facilities',
      results: [
        'Accommodated 300+ workers',
        'Improved worker satisfaction by 35%',
        'Reduced operational costs by 25%',
        'Enhanced safety and compliance'
      ]
    }
  ];

  return (
    <section style={{
      padding: '100px 0',
      background: 'rgba(255, 255, 255, 0.01)',
      backdropFilter: 'blur(10px)'
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
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#f7fafc',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            CUSTOM SOLUTIONS
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            When standard solutions don't meet your requirements, our engineering team creates custom shelter systems 
            tailored to your specific needs and environment.
          </p>
        </motion.div>

        {/* Custom Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '100px'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {customServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  padding: '40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Service Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    fontSize: '2.5rem'
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#f7fafc',
                    letterSpacing: '0.02em'
                  }}>
                    {service.title}
                  </h3>
                </div>

                <p style={{
                  fontSize: '0.875rem',
                  color: '#a0aec0',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  fontWeight: '300'
                }}>
                  {service.description}
                </p>

                {/* Features */}
                <div style={{
                  marginBottom: '24px'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    KEY FEATURES
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: '#718096'
                        }}
                      >
                        <div style={{
                          width: '3px',
                          height: '3px',
                          background: '#48bb78',
                          borderRadius: '50%'
                        }} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    PROCESS
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {service.process.map((step, stepIndex) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: '#718096'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          color: '#48bb78',
                          fontWeight: '600'
                        }}>
                          {stepIndex + 1}
                        </div>
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            SUCCESS STORIES
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#a0aec0',
            textAlign: 'center',
            marginBottom: '60px',
            fontWeight: '300'
          }}>
            See how we've helped organizations overcome unique challenges with custom solutions.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '8px'
                }}>
                  {study.title}
                </h4>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#48bb78',
                  fontWeight: '500',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {study.client}
                </p>

                <div style={{
                  marginBottom: '20px'
                }}>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    CHALLENGE
                  </h5>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#a0aec0',
                    lineHeight: '1.5',
                    fontWeight: '300'
                  }}>
                    {study.challenge}
                  </p>
                </div>

                <div style={{
                  marginBottom: '20px'
                }}>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    SOLUTION
                  </h5>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#a0aec0',
                    lineHeight: '1.5',
                    fontWeight: '300'
                  }}>
                    {study.solution}
                  </p>
                </div>

                <div>
                  <h5 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#e2e8f0',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    RESULTS
                  </h5>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {study.results.map((result, resultIndex) => (
                      <motion.div
                        key={result}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: resultIndex * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: '#718096'
                        }}
                      >
                        <div style={{
                          width: '3px',
                          height: '3px',
                          background: '#48bb78',
                          borderRadius: '50%'
                        }} />
                        {result}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: '80px',
            padding: '60px 40px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '16px'
          }}>
            READY TO START YOUR CUSTOM PROJECT?
          </h3>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Our engineering team is ready to work with you to develop a custom solution that meets your exact requirements.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px 32px',
                  background: '#e2e8f0',
                  color: '#1a202c',
                  fontWeight: '600',
                  fontSize: '16px',
                  letterSpacing: '0.025em',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                START CONSULTATION
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '2px solid #4a5568',
                color: '#e2e8f0',
                fontWeight: '600',
                fontSize: '16px',
                letterSpacing: '0.025em',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              DOWNLOAD BROCHURE
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
