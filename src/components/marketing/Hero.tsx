'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Military grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Scanning line effect */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: ['-100%', '100vh'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"
        />
      </div>

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-green-400"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-green-400"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-green-400"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-green-400"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-mono tracking-wider">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            SYSTEM ONLINE - MILITARY GRADE
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight"
        >
          <span className="block text-green-400">DEPLOYABLE</span>
          <span className="block">SHELTERS</span>
          <span className="block text-2xl md:text-3xl text-gray-400 font-light mt-4 tracking-widest">
            READY IN HOURS — NOT WEEKS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
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
              className="group relative px-12 py-4 bg-green-400 text-black font-bold text-lg tracking-wider border-2 border-green-400 hover:bg-transparent hover:text-green-400 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">REQUEST QUOTE</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>

          <Link href="/configurator">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-4 bg-transparent border-2 border-white text-white font-bold text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
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
            className="flex flex-col items-center text-green-400"
          >
            <span className="text-xs font-mono tracking-widest mb-2">SCROLL</span>
            <div className="w-px h-8 bg-green-400"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
