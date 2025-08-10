'use client';

import { motion } from 'framer-motion';

export default function ProofBar() {
  const stats = [
    { icon: '🌍', value: '50+', label: 'COUNTRIES', description: 'Global deployments' },
    { icon: '⚡', value: '<6', label: 'HOURS', description: 'Setup time' },
    { icon: '💨', value: '120', label: 'KM/H', description: 'Wind rating' },
    { icon: '🛠️', value: '24/7', label: 'SUPPORT', description: 'Global field support' },
  ];

  return (
    <section className="py-20 bg-white/5 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            PROVEN PERFORMANCE
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
            Trusted by governments and organizations worldwide for rapid, reliable deployment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-light text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-300 mb-1 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400 font-light">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
