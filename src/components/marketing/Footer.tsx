'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { name: 'Military & Defense', href: '/solutions/military' },
      { name: 'Disaster Response', href: '/solutions/disaster' },
      { name: 'Remote Industry', href: '/solutions/industrial' },
      { name: 'Research & Development', href: '/solutions/research' }
    ],
    products: [
      { name: 'TRECC System', href: '/products/trecc' },
      { name: 'Accessories', href: '/products/accessories' },
      { name: 'Interiors', href: '/products/interiors' },
      { name: 'Custom Solutions', href: '/products/custom' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'News & Updates', href: '/news' },
      { name: 'Careers', href: '/careers' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Technical Support', href: '/support' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Training', href: '/training' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/weatherhaven', icon: '🔗' },
    { name: 'Twitter', href: 'https://twitter.com/weatherhaven', icon: '🐦' },
    { name: 'YouTube', href: 'https://youtube.com/@weatherhaven', icon: '📺' },
    { name: 'Instagram', href: 'https://instagram.com/weatherhaven', icon: '📷' }
  ];

  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '60px 0 20px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px'
            }}>
              WEATHERHAVEN
            </h3>
            <p style={{
              color: '#d1d5db',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              Leading provider of deployable shelter solutions for defense, disaster response, and remote industry applications.
            </p>
            
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '16px'
            }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              SOLUTIONS
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {footerLinks.solutions.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{
                        color: '#d1d5db',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              PRODUCTS
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {footerLinks.products.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{
                        color: '#d1d5db',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              COMPANY
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {footerLinks.company.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{
                        color: '#d1d5db',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>
              SUPPORT
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {footerLinks.support.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      style={{
                        color: '#d1d5db',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            fontSize: '0.875rem',
            color: '#9ca3af'
          }}>
            <span>© {currentYear} Weatherhaven. All rights reserved.</span>
            <Link href="/privacy">
              <span style={{
                color: '#9ca3af',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span style={{
                color: '#9ca3af',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Terms of Service
              </span>
            </Link>
            <Link href="/cookies">
              <span style={{
                color: '#9ca3af',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Cookie Policy
              </span>
            </Link>
          </div>
          
          <p style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            margin: 0
          }}>
            Made with ❤️ for rapid deployment solutions
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
