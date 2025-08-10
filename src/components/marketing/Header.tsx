'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'SOLUTIONS', href: '/solutions' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'CASE STUDIES', href: '/case-studies' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                letterSpacing: '0.025em'
              }}
            >
              WEATHERHAVEN
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px'
          }} className="md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '500',
                  fontSize: '14px',
                  letterSpacing: '0.025em',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Configurator CTA */}
            <Link href="/configurator">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '8px 24px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '500',
                  fontSize: '14px',
                  letterSpacing: '0.025em',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                CONFIGURATOR
              </motion.button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'block',
              padding: '8px',
              color: 'rgba(255, 255, 255, 0.8)',
              transition: 'color 0.2s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="md:hidden"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)'}
          >
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            display: 'block',
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          className="md:hidden"
        >
          <div style={{
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '500',
                  fontSize: '14px',
                  letterSpacing: '0.025em',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                {item.name}
              </Link>
            ))}
            
            <Link href="/configurator">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '500',
                  fontSize: '14px',
                  letterSpacing: '0.025em',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONFIGURATOR
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
