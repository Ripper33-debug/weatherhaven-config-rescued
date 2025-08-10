'use client';

import { motion } from 'framer-motion';

export default function GlobalDeploymentsStrip() {
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
            GLOBAL DEPLOYMENTS
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
            Weatherhaven shelters are deployed worldwide, providing reliable infrastructure in the most challenging environments.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="text-gray-400 font-medium tracking-wide">GLOBAL DEPLOYMENT MAP COMING SOON</div>
        </div>
      </div>
    </section>
  );
}
