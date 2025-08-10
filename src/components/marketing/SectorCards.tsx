'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const sectors = [
  {
    name: 'MILITARY & DEFENSE',
    description: 'Rapid setup, modular expansion, rugged performance for critical operations.',
    icon: '🛡️',
    href: '/solutions/military-defense',
    color: 'border-red-500/30 hover:border-red-500/60'
  },
  {
    name: 'GOVERNMENTS & NGOS',
    description: 'Scalable disaster relief and emergency sheltering solutions.',
    icon: '🏛️',
    href: '/solutions/governments-ngos',
    color: 'border-blue-500/30 hover:border-blue-500/60'
  },
  {
    name: 'INDUSTRIAL',
    description: 'Remote camp solutions for mining, oil & gas, and construction.',
    icon: '🏭',
    href: '/solutions/industrial',
    color: 'border-yellow-500/30 hover:border-yellow-500/60'
  },
  {
    name: 'COMMERCIAL/RESEARCH',
    description: 'Flexible research stations and commercial applications.',
    icon: '🔬',
    href: '/solutions/commercial',
    color: 'border-purple-500/30 hover:border-purple-500/60'
  }
];

export default function SectorCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Military grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            SOLUTIONS FOR EVERY SECTOR
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light tracking-wide">
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
                <div className={`relative bg-gray-900/50 border ${sector.color} p-8 h-full transition-all duration-300 hover:bg-gray-900/80 overflow-hidden`}>
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-current opacity-30"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-current opacity-30"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-current opacity-30"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-current opacity-30"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {sector.icon}
                      </div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className="text-gray-600 group-hover:text-white transition-colors duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-6 tracking-tight group-hover:text-green-400 transition-colors duration-300">
                      {sector.name}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-8 font-light">
                      {sector.description}
                    </p>

                    <div className="flex items-center text-green-400 font-bold tracking-wider group-hover:text-green-300 transition-colors duration-300">
                      LEARN MORE
                      <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></div>
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
          className="text-center mt-20"
        >
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-4 bg-green-400 text-black font-black text-lg tracking-wider border-2 border-green-400 hover:bg-transparent hover:text-green-400 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">VIEW ALL SOLUTIONS</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
