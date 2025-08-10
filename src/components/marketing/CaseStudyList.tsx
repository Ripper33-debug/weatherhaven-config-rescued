'use client';

import { motion } from 'framer-motion';

export default function CaseStudyList() {
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
            Recent Case Studies
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how our shelter systems are deployed in real-world scenarios.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="text-slate-400">Case studies coming soon</div>
        </div>
      </div>
    </section>
  );
}
