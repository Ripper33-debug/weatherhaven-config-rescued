'use client';

import { motion } from 'framer-motion';

export default function LeadershipTeam() {
  const executiveTeam = [
    {
      name: 'Sarah Johnson',
      title: 'Chief Executive Officer',
      bio: '20+ years of experience in defense and aerospace industries, leading Weatherhaven\'s global expansion and strategic vision.',
      expertise: ['Strategic Leadership', 'Global Operations', 'Defense Markets', 'M&A'],
      background: 'Former VP at Lockheed Martin, MBA from Harvard Business School',
      achievements: ['Led company to 300% growth in 5 years', 'Established operations in 50+ countries', 'Named "Defense Executive of the Year" 2023']
    },
    {
      name: 'Michael Chen',
      title: 'Chief Technology Officer',
      bio: 'Former NASA engineer with expertise in extreme environment systems and advanced materials. Leading innovation in deployable shelter technology.',
      expertise: ['R&D Leadership', 'Innovation Strategy', 'Technical Excellence', 'AI Integration'],
      background: 'PhD in Aerospace Engineering, 15+ patents in deployable systems',
      achievements: ['Developed industry-first AI deployment optimization', 'Led team to 5 NASA contracts', 'Innovation Award recipient 2022']
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'Chief Operations Officer',
      bio: 'Operations expert with background in disaster response and humanitarian aid logistics. Ensuring flawless global operations.',
      expertise: ['Supply Chain', 'Quality Management', 'Global Deployment', 'Crisis Response'],
      background: 'PhD in Operations Research, Former UN Logistics Director',
      achievements: ['Reduced deployment time by 60%', 'Achieved 99.9% uptime globally', 'Led 100+ disaster response missions']
    }
  ];

  const departmentHeads = [
    {
      name: 'David Thompson',
      title: 'VP of Engineering',
      bio: 'Leading our engineering team in developing next-generation deployable shelter systems.',
      expertise: ['Mechanical Engineering', 'Structural Design', 'Materials Science'],
      background: '20+ years in structural engineering, PE license',
      team: '45 engineers across 3 continents'
    },
    {
      name: 'Lisa Wang',
      title: 'VP of Global Sales',
      bio: 'Driving revenue growth and building strategic partnerships worldwide.',
      expertise: ['International Sales', 'Strategic Partnerships', 'Market Development'],
      background: 'Former VP at Boeing Defense, speaks 4 languages',
      team: '25 sales professionals, 50+ countries covered'
    },
    {
      name: 'James O\'Connor',
      title: 'VP of Manufacturing',
      bio: 'Overseeing state-of-the-art manufacturing facilities and quality control systems.',
      expertise: ['Lean Manufacturing', 'Quality Control', 'Supply Chain Management'],
      background: 'Former Toyota Production System expert',
      team: '200+ manufacturing professionals, 3 global facilities'
    }
  ];

  const technicalExperts = [
    {
      name: 'Dr. Maria Santos',
      title: 'Senior Research Scientist',
      bio: 'Leading breakthrough research in advanced materials and extreme environment systems.',
      expertise: ['Materials Science', 'Nanotechnology', 'Environmental Testing'],
      background: 'PhD from MIT, 25+ peer-reviewed publications'
    },
    {
      name: 'Robert Kim',
      title: 'Chief Software Architect',
      bio: 'Developing cutting-edge software for smart shelter systems and IoT integration.',
      expertise: ['IoT Systems', 'Cloud Architecture', 'Cybersecurity'],
      background: 'Former Google engineer, MS Computer Science Stanford'
    },
    {
      name: 'Amanda Foster',
      title: 'Head of Sustainability',
      bio: 'Driving our commitment to environmental responsibility and sustainable practices.',
      expertise: ['Environmental Science', 'Green Technology', 'Carbon Reduction'],
      background: 'PhD Environmental Science, LEED certified'
    }
  ];

  const companyCulture = {
    values: [
      'Innovation at the Core',
      'Global Collaboration',
      'Excellence in Execution',
      'Customer Success Focus',
      'Environmental Responsibility'
    ],
    stats: [
      { number: '85%', label: 'Employee Retention Rate' },
      { number: '92%', label: 'Customer Satisfaction' },
      { number: '15+', label: 'Average Years Experience' },
      { number: '40+', label: 'Countries Represented' }
    ],
    benefits: [
      'Comprehensive health coverage',
      'Professional development programs',
      'Flexible work arrangements',
      'Global travel opportunities',
      'Innovation time allocation'
    ]
  };

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
            OUR TEAM
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            World-class professionals driving innovation and excellence in deployable shelter technology.
          </p>
        </motion.div>

        {/* Executive Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '80px'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            EXECUTIVE LEADERSHIP
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {executiveTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                  opacity: 0.3
                }} />
                
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '8px'
                }}>
                  {member.name}
                </h4>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#48bb78',
                  fontWeight: '500',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {member.title}
                </p>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#a0aec0',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontWeight: '300'
                }}>
                  {member.bio}
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
                    BACKGROUND
                  </h5>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#718096',
                    fontWeight: '300'
                  }}>
                    {member.background}
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
                    KEY ACHIEVEMENTS
                  </h5>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {member.achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: achievementIndex * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
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
                        {achievement}
                      </motion.div>
                    ))}
                  </div>
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
                    EXPERTISE
                  </h5>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {member.expertise.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: '#a0aec0',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Department Heads */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '80px'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            DEPARTMENT LEADERS
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {departmentHeads.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '4px'
                }}>
                  {member.name}
                </h4>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#48bb78',
                  fontWeight: '500',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {member.title}
                </p>
                
                <p style={{
                  fontSize: '0.75rem',
                  color: '#a0aec0',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  fontWeight: '300'
                }}>
                  {member.bio}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#718096',
                  fontWeight: '300'
                }}>
                  {member.background}
                </div>

                <div style={{
                  marginTop: '12px',
                  fontSize: '0.75rem',
                  color: '#48bb78',
                  fontWeight: '500'
                }}>
                  {member.team}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Experts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginBottom: '80px'
          }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            TECHNICAL EXPERTS
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {technicalExperts.map((expert, index) => (
              <motion.div
                key={expert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#f7fafc',
                  marginBottom: '4px'
                }}>
                  {expert.name}
                </h4>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#48bb78',
                  fontWeight: '500',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {expert.title}
                </p>
                
                <p style={{
                  fontSize: '0.75rem',
                  color: '#a0aec0',
                  lineHeight: '1.5',
                  marginBottom: '8px',
                  fontWeight: '300'
                }}>
                  {expert.bio}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#718096',
                  fontWeight: '300'
                }}>
                  {expert.background}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#f7fafc',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            COMPANY CULTURE
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}
            >
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '20px'
              }}>
                OUR VALUES
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {companyCulture.values.map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.875rem',
                      color: '#a0aec0'
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      background: '#48bb78',
                      borderRadius: '50%'
                    }} />
                    {value}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}
            >
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '20px'
              }}>
                TEAM STATS
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                {companyCulture.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#f7fafc',
                      marginBottom: '4px'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#a0aec0',
                      fontWeight: '300'
                    }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}
            >
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '20px'
              }}>
                EMPLOYEE BENEFITS
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {companyCulture.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.875rem',
                      color: '#a0aec0'
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      background: '#48bb78',
                      borderRadius: '50%'
                    }} />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
