'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Solutions', 
    href: '/solutions',
    children: [
      { name: 'Military & Defense', href: '/solutions/military-defense' },
      { name: 'Governments & NGOs', href: '/solutions/governments-ngos' },
      { name: 'Industrial', href: '/solutions/industrial' },
      { name: 'Commercial', href: '/solutions/commercial' },
    ]
  },
  { 
    name: 'Products', 
    href: '/products',
    children: [
      { name: 'Deployable Shelters', href: '/products/deployable-shelters' },
      { name: 'Mobile Command Centers', href: '/products/mobile-command-centers' },
      { name: 'Medical Clinics', href: '/products/medical-clinics' },
      { name: 'Remote Camps', href: '/products/remote-camps' },
    ]
  },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
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
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-300"
            >
              <span className="text-white font-bold text-lg">W</span>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            <span className="text-white font-bold text-xl lg:text-2xl group-hover:text-green-400 transition-colors duration-300">
              Weatherhaven
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
                    <button className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/5 relative group">
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
                        className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden"
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
                                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 group"
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
                    className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/5"
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg text-sm transition-all duration-300 overflow-hidden shadow-lg hover:shadow-green-500/25"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Configurator
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
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
            className="lg:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
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
                          className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
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
                className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Configurator
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
