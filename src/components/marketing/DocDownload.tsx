'use client';

import { motion } from 'framer-motion';

export default function DocDownload() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Download: Rapid Shelter Deployment Guide
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Get our comprehensive guide to rapid shelter deployment best practices.
          </p>
          <div className="text-slate-400">Download form coming soon</div>
        </motion.div>
      </div>
    </section>
  );
}
