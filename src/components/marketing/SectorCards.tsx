'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const sectors = [
  {
    name: 'Military & Defense',
    description: 'Rapid setup, modular expansion, rugged performance for critical operations.',
    icon: '🛡️',
    href: '/solutions/military-defense',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    hoverBorder: 'hover:border-red-500/50'
  },
  {
    name: 'Governments & NGOs',
    description: 'Scalable disaster relief and emergency sheltering solutions.',
    icon: '🏛️',
    href: '/solutions/governments-ngos',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/50'
  },
  {
    name: 'Industrial',
    description: 'Remote camp solutions for mining, oil & gas, and construction.',
    icon: '🏭',
    href: '/solutions/industrial',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    hoverBorder: 'hover:border-yellow-500/50'
  },
  {
    name: 'Commercial/Research',
    description: 'Flexible research stations and commercial applications.',
    icon: '🔬',
    href: '/solutions/commercial',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/50'
  }
];

export default function SectorCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Solutions for Every Sector
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From military operations to humanitarian aid, our shelter systems adapt to your specific needs with unmatched flexibility and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={sector.href}>
                <div className={`relative bg-gradient-to-br ${sector.gradient} backdrop-blur-sm border ${sector.borderColor} ${sector.hoverBorder} rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {sector.icon}
                      </div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className="text-slate-400 group-hover:text-white transition-colors duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                      {sector.name}
                    </h3>
                    
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {sector.description}
                    </p>

                    <div className="flex items-center text-green-400 font-semibold group-hover:text-green-300 transition-colors duration-300">
                      Learn more
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">View All Solutions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
