'use client';

import { motion } from 'framer-motion';

export default function LeadershipTeam() {
  const team = [
    {
      name: 'Sarah Johnson',
      title: 'Chief Executive Officer',
      bio: '20+ years of experience in defense and aerospace industries, leading Weatherhaven\'s global expansion.',
      expertise: ['Strategic Leadership', 'Global Operations', 'Defense Markets']
    },
    {
      name: 'Michael Chen',
      title: 'Chief Technology Officer',
      bio: 'Former NASA engineer with expertise in extreme environment systems and advanced materials.',
      expertise: ['R&D Leadership', 'Innovation Strategy', 'Technical Excellence']
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'Chief Operations Officer',
      bio: 'Operations expert with background in disaster response and humanitarian aid logistics.',
      expertise: ['Supply Chain', 'Quality Management', 'Global Deployment']
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
            LEADERSHIP TEAM
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#a0aec0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Experienced leaders driving innovation and excellence in deployable shelter technology.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {team.map((member, index) => (
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
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#f7fafc',
                marginBottom: '8px'
              }}>
                {member.name}
              </h3>
              
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
                marginBottom: '24px',
                fontWeight: '300'
              }}>
                {member.bio}
              </p>

              <div>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  EXPERTISE
                </h4>
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
      </div>
    </section>
  );
}
