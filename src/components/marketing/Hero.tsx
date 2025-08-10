'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Modern grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='1' fill='none'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            SYSTEM ACTIVE
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-none tracking-tight"
        >
          <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            DEPLOYABLE
          </span>
          <span className="block bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
            SHELTERS
          </span>
          <span className="block text-lg md:text-xl text-gray-400 font-light mt-6 tracking-widest">
            READY IN HOURS — NOT WEEKS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Weatherhaven delivers modular, field-proven shelter systems for defense, 
          disaster response, and remote industry with unmatched speed and reliability.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-4 bg-white text-black font-medium text-lg tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              REQUEST QUOTE
            </motion.button>
          </Link>

          <Link href="/configurator">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-4 bg-transparent border-2 border-white/20 text-white font-medium text-lg tracking-wide rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                OPEN CONFIGURATOR
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs font-medium tracking-widest mb-2">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
