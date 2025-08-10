'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const sectors = [
  {
    title: 'Military & Defense',
    description: 'Rapid setup, modular expansion, rugged performance.',
    href: '/solutions/military-defense',
    icon: '🛡️',
    color: 'from-red-600 to-red-800',
  },
  {
    title: 'Governments & NGOs',
    description: 'Scalable disaster relief and emergency sheltering.',
    href: '/solutions/governments-ngos',
    icon: '🏛️',
    color: 'from-blue-600 to-blue-800',
  },
  {
    title: 'Industrial',
    description: 'Remote camps for mining, energy, and infrastructure.',
    href: '/solutions/industrial',
    icon: '🏭',
    color: 'from-orange-600 to-orange-800',
  },
  {
    title: 'Commercial/Research',
    description: 'Expeditionary labs, clinics, and basecamps.',
    href: '/solutions/commercial',
    icon: '🔬',
    color: 'from-green-600 to-green-800',
  },
];

export default function SectorCards() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Solutions for Every Sector
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From military operations to humanitarian aid, our shelter systems adapt to your specific needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={sector.href}
                className="block group"
              >
                <div className={`bg-gradient-to-br ${sector.color} p-6 rounded-lg h-full transition-transform duration-300 group-hover:scale-105`}>
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {sector.description}
                  </p>
                  <div className="mt-4 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    Learn more →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
