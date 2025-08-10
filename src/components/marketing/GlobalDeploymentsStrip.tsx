'use client';

import { motion } from 'framer-motion';

export default function GlobalDeploymentsStrip() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Global Presence
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Deployed across all seven continents in more than 50 countries.
          </p>
          <div className="text-slate-400">World map coming soon</div>
        </motion.div>
      </div>
    </section>
  );
}
