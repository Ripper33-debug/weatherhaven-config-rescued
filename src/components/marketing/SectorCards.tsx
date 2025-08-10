'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SectorCards() {
  const sectors = [
    {
      icon: '🛡️',
      title: 'MILITARY & DEFENSE',
      description: 'Rapid setup, modular expansion, rugged performance for critical operations.',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: '🏛️',
      title: 'GOVERNMENTS & NGOS',
      description: 'Scalable disaster relief and emergency sheltering solutions.',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: '🏭',
      title: 'INDUSTRIAL',
      description: 'Remote camp solutions for mining, oil & gas, and construction.',
      color: 'from-orange-500/20 to-orange-600/20'
    },
    {
      icon: '🔬',
      title: 'COMMERCIAL/RESEARCH',
      description: 'Flexible research stations and commercial applications.',
      color: 'from-emerald-500/20 to-emerald-600/20'
    }
  ];

  return (
    <section className="py-24 bg-white/5 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            SOLUTIONS FOR EVERY SECTOR
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
            From military operations to humanitarian aid, our shelter systems adapt to your specific needs with unmatched flexibility and reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-4xl mb-6">{sector.icon}</div>
                <h3 className="text-xl font-medium text-white mb-4">
                  {sector.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {sector.description}
                </p>
                <div className="text-white/60 text-sm font-medium tracking-wide">
                  LEARN MORE →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/solutions">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black font-medium text-lg tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              VIEW ALL SOLUTIONS
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
