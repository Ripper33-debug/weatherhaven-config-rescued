'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'HOME', href: '/' },
  { 
    name: 'SOLUTIONS', 
    href: '/solutions',
    children: [
      { name: 'MILITARY & DEFENSE', href: '/solutions/military-defense' },
      { name: 'GOVERNMENTS & NGOS', href: '/solutions/governments-ngos' },
      { name: 'INDUSTRIAL', href: '/solutions/industrial' },
      { name: 'COMMERCIAL', href: '/solutions/commercial' },
    ]
  },
  { 
    name: 'PRODUCTS', 
    href: '/products',
    children: [
      { name: 'DEPLOYABLE SHELTERS', href: '/products/deployable-shelters' },
      { name: 'MOBILE COMMAND CENTERS', href: '/products/mobile-command-centers' },
      { name: 'MEDICAL CLINICS', href: '/products/medical-clinics' },
      { name: 'REMOTE CAMPS', href: '/products/remote-camps' },
    ]
  },
  { name: 'CASE STUDIES', href: '/case-studies' },
  { name: 'RESOURCES', href: '/resources' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative w-10 h-10 bg-green-400 rounded-sm flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300"
            >
              <span className="text-black font-black text-lg">W</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>
            </motion.div>
            <span className="text-white font-black text-xl lg:text-2xl group-hover:text-green-400 transition-colors duration-300 tracking-tight">
              WEATHERHAVEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <button className="text-gray-300 hover:text-white px-4 py-2 text-sm font-bold transition-all duration-300 hover:bg-gray-800/50 relative group tracking-wider">
                      {item.name}
                      <svg className="w-4 h-4 ml-1 inline-block group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-800 overflow-hidden"
                      >
                        <div className="py-2">
                          {item.children.map((child, index) => (
                            <motion.div
                              key={child.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group font-mono tracking-wide"
                              >
                                <span className="group-hover:text-green-400 transition-colors duration-200">
                                  {child.name}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white px-4 py-2 text-sm font-bold transition-all duration-300 hover:bg-gray-800/50 tracking-wider"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Configurator CTA */}
            <div className="ml-4">
              <Link href="/configurator">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-2 bg-green-400 text-black font-black text-sm transition-all duration-300 overflow-hidden border-2 border-green-400 hover:bg-transparent hover:text-green-400"
                >
                  <span className="relative z-10 flex items-center tracking-wider">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    CONFIGURATOR
                  </span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2 hover:bg-gray-800/50 transition-all duration-300"
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-current block transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-current block mt-1 transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-current block mt-1 transition-all duration-300"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-800 bg-black/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-bold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-500 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-mono tracking-wide"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/configurator"
                className="block px-3 py-2 text-base font-black bg-green-400 text-black mt-4 tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONFIGURATOR
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
