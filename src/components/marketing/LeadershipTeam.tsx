'use client';

import { motion } from 'framer-motion';

export default function LeadershipTeam() {
  const executiveTeam = [
    {
      name: 'Ray Castelli, B. Comm',
      title: 'Chief Executive Officer',
      bio: 'Ray joined Weatherhaven as CEO in 2008 after a 20 year international business career in technology, natural resources and government/defence. He has significant international procurement expertise.',
      expertise: ['Strategic Leadership', 'International Business', 'Government Relations', 'Technology'],
      background: 'Former co-founder and SVP of Dallas-based Quadrem (now SAP), Chair of Open Network for Commerce Exchange (ONCE), Chief of Staff to Minister of National Defence',
      achievements: ['Led Weatherhaven since 2008', 'Established global procurement standards', 'Speaks 5 languages', 'Alumnus of SFU Business School and INSEAD']
    },
    {
      name: 'James Kirk, M. Eng, C. Eng',
      title: 'Chief Operating Officer',
      bio: 'A graduate of the UK Ministry of Defence, Engineering and Science Group, James earned a Master\'s Degree in Mechanical Engineering from the University of Sheffield.',
      expertise: ['Operations Management', 'Defense Procurement', 'Engineering Leadership', 'European Markets'],
      background: '10 years within MOD leading strategic UK Defence procurement programmes, Technical Director at Weatherhaven since 2008',
      achievements: ['Managing Director UK 2014-2019', 'Vice President of Global Sales 2019-2021', 'COO since 2021', 'Sustained growth in European military market']
    },
    {
      name: 'Alberto Moreno, B. Eng.',
      title: 'Chief Business Development Officer',
      bio: 'A graduate of the engineering program at UDLAP in Mexico in 1992, Alberto brings extensive experience in program management and operations.',
      expertise: ['Business Development', 'Program Management', 'Operations', 'Supply Chain'],
      background: 'Former program manager at Oceanworks, led Weatherhaven PMO 2012-2015, Chief Operations Officer 2015-2020',
      achievements: ['Led newly formed Project Management Office (PMO)', 'Oversaw all production operations, supply chain, quality, engineering', 'Appointed CBDO in November 2020']
    },
    {
      name: 'Jessica Au, CPA, CA',
      title: 'Chief Financial Officer',
      bio: 'Jessica was appointed Chief Financial Officer of Weatherhaven in 2025, following her progression from Vice President of Finance, a role she assumed in 2022.',
      expertise: ['Financial Strategy', 'Corporate Governance', 'Operational Excellence', 'Multinational Operations'],
      background: 'Joined as Controller in 2018, VP Finance 2022-2025, Senior finance positions across utilities, energy, technology, manufacturing, and defense sectors',
      achievements: ['Chartered Professional Accountant (CPA, CA)', 'Bachelor of Commerce from UBC', 'More than a decade of management and leadership experience', 'Former PwC professional']
    }
  ];

  const departmentHeads = [
    {
      name: 'Natalia Mederios, B. Eng, MBA',
      title: 'Managing Director, Weatherhaven Brazil',
      bio: 'Natalia graduated from Universidad Federal de Minas Gerais, with a degree in Electrical Engineering, and a post graduate major in renewable energy.',
      expertise: ['Brazilian Markets', 'Renewable Energy', 'Strategic Planning', 'Multilingual Leadership'],
      background: 'MBA IBMEC in Rio de Janeiro, former Marketing and Sales Director at ESTRE Waste Management, Vice President of Environmental Solutions Brazil',
      team: 'Leading Weatherhaven operations in Brazil since 2014'
    },
    {
      name: 'Dr. Susannah Kirk, B.Eng PhD C. Eng MRAeS',
      title: 'Managing Director, Weatherhaven Global Solutions (UK)',
      bio: 'Susannah has a degree in Aeronautical Engineering from Loughborough University and a PhD in Static Aeroelasticity from University of Bristol.',
      expertise: ['Aeronautical Engineering', 'Computational Fluid Dynamics', 'Finite Element Analysis', 'Camp Design'],
      background: 'Chartered Engineer and Member of the Royal Aeronautical Society, 10 years experience in aerospace engineering',
      team: 'Head of Engineering in UK, specializing in CAD and camp design visualizations'
    },
    {
      name: 'Hugo Cueva, B. Eng.',
      title: 'Managing Director, Weatherhaven Peru',
      bio: 'A Civil Engineer with more than 15 years of experience in projects management and control, Hugo graduated from the National University of Engineering of Peru.',
      expertise: ['Project Management', 'Civil Engineering', 'Process Improvement', 'Cost Control'],
      background: 'Strong knowledge in project management based on PMI standards, joined Weatherhaven Peru as Logistics Coordinator in 2010',
      team: 'General Manager of Peruvian branch since 2015, developed many processes achieving time and cost reduction'
    },
    {
      name: 'Scott Jackson',
      title: 'VP Business Development - USA',
      bio: 'A skilled team leader and authority in expeditionary solutions, Scott leads Weatherhaven\'s business development efforts in the US shelter solutions market.',
      expertise: ['US Defense Markets', 'Strategic Planning', 'Program Management', 'Expeditionary Solutions'],
      background: 'Retired Air Force SMSgt with 20 years of honorable active-duty service, Regional Manager at DHS Systems (DRASH), AAR Mobility',
      team: 'Member of Weatherhaven\'s Senior Management Team, introducing "Next Generation Shelter Solutions" to the US Market'
    }
  ];

  const technicalExperts = [
    {
      name: 'Karla Arias',
      title: 'Business Development Director - Latin America',
      bio: 'As the current Business Development Director for Latin America, Karla works with clients in the Latin American military and medical markets.',
      expertise: ['Latin American Markets', 'Military Sales', 'Medical Markets', 'Bilingual Sales'],
      background: 'Diploma in Hotel and Resort Management in 1993, started at Weatherhaven in 1993'
    },
    {
      name: 'Mike Ball',
      title: 'Global Commercial Sales Lead',
      bio: 'Mike has over 27 years of experience in the relocatable shelter and remote site based industry, primarily focusing on the mining and gas industry.',
      expertise: ['Commercial Markets', 'Mining Industry', 'Gas Industry', 'Exploration'],
      background: 'Graduate of Economics from the University of British Columbia, post graduate study in sales and marketing, extensive international experience'
    },
    {
      name: 'Sweena Chatha',
      title: 'Senior Director of Sales and Marketing - Canada Defence',
      bio: 'Sweena focuses on the Canadian military and medical shelters, and works with clients to provide expertise on various options for remote-site shelters.',
      expertise: ['Canadian Defence', 'Medical Shelters', 'Remote-Site Solutions', 'Marketing Communications'],
      background: 'Bachelor of Journalism at Carleton University, Certificate of Media Techniques and Marketing Communications at BCIT, started at Weatherhaven in 2001'
    },
    {
      name: 'George Banks-Martin',
      title: 'Sales Lead - UK and Europe',
      bio: 'George has worked at Weatherhaven Global Solutions since 2008 in a variety of roles from technical writing to training and joined the sales team in 2016.',
      expertise: ['UK Markets', 'European Markets', 'Polar Research', 'Emergency Response'],
      background: 'Studied history at Oxford University and African politics at SOAS, London University, previous career as a classical concert and opera singer'
    }
  ];

  const companyCulture = {
    values: [
      'Over 1000 Years Combined Experience',
      'Global Deployment Expertise',
      'Any Climate, Any Terrain',
      'Customer-Centric Solutions',
      'Innovation in Deployable Technology'
    ],
    stats: [
      { number: '1000+', label: 'Years Combined Experience' },
      { number: '40+', label: 'Years in Business' },
      { number: 'Global', label: 'Deployment Capability' },
      { number: '5', label: 'Languages Spoken' }
    ],
    benefits: [
      'International career opportunities',
      'Professional development programs',
      'Exposure to cutting-edge technology',
      'Global travel and deployment experience',
      'Work with world-class engineering teams'
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
            Our team has over 1000 years of experience designing, planning, and implementing shelter and camp solutions in every corner of the globe. Any climate. Any terrain. Any logistical challenge.
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
            REGIONAL MANAGING DIRECTORS
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
            REGIONAL SALES LEADS
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
