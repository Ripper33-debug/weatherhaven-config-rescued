'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: '50+ countries', value: '50+', description: 'Global deployments' },
  { label: '<6 hr setup', value: '<6', description: 'Hours to operational' },
  { label: 'High wind/snow loads', value: '120', description: 'km/h wind rating' },
  { label: 'Global field support', value: '24/7', description: 'Support available' },
];

export default function ProofBar() {
  return (
    <section className="bg-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-slate-300 font-medium">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
