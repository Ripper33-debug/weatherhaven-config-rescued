'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThreeDPlaceholder() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-y border-gray-800">
      {/* Military grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            INTERACTIVE 3D CONFIGURATOR
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide">
            Explore our shelter systems in immersive 3D. Customize configurations and see real-time specifications.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="aspect-video bg-gray-900/50 border border-gray-800 rounded-lg max-w-4xl mx-auto flex items-center justify-center">
            <div className="text-gray-400 font-mono tracking-wider">3D CONFIGURATOR PLACEHOLDER</div>
          </div>
          
          <div className="mt-8">
            <Link href="/configurator">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-4 bg-green-400 text-black font-black text-lg tracking-wider border-2 border-green-400 hover:bg-transparent hover:text-green-400 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">LAUNCH CONFIGURATOR</span>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
