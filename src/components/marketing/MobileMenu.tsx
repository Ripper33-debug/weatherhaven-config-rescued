'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'SOLUTIONS', href: '/solutions' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'CASE STUDIES', href: '/case-studies' },
    { name: 'RESOURCES', href: '/resources' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          zIndex: 1001
        }}
      >
        <motion.div
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            marginBottom: '4px',
            transition: 'all 0.3s ease'
          }}
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            marginBottom: '4px',
            transition: 'all 0.3s ease'
          }}
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          style={{
            width: '24px',
            height: '2px',
            background: 'white',
            transition: 'all 0.3s ease'
          }}
        />
      </motion.button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000
          }}
          onClick={closeMenu}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '80px 32px 32px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              WEATHERHAVEN
            </div>

            {/* Navigation Links */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '40px'
            }}>
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.href} onClick={closeMenu}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '16px 20px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500',
                        fontSize: '16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Configurator CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              style={{ marginTop: 'auto' }}
            >
              <Link href="/configurator" onClick={closeMenu}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'white',
                    color: 'black',
                    fontWeight: '500',
                    fontSize: '16px',
                    letterSpacing: '0.025em',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  CONFIGURATOR
                </motion.button>
              </Link>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              style={{
                marginTop: '32px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '12px'
              }}>
                CONTACT
              </h4>
              <div style={{
                fontSize: '12px',
                color: '#d1d5db',
                lineHeight: '1.5'
              }}>
                <p style={{ margin: '4px 0' }}>📧 info@weatherhaven.com</p>
                <p style={{ margin: '4px 0' }}>📞 +1 (604) 555-0123</p>
                <p style={{ margin: '4px 0' }}>🌍 24/7 Global Support</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
