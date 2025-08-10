'use client';

import { motion } from 'framer-motion';

export default function GlobalDeploymentsStrip() {
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
            GLOBAL DEPLOYMENTS
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide">
            Weatherhaven shelters are deployed worldwide, providing reliable infrastructure in the most challenging environments.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="text-gray-400 font-mono tracking-wider">GLOBAL DEPLOYMENT MAP COMING SOON</div>
        </div>
      </div>
    </section>
  );
}
