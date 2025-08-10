'use client';

import { motion } from 'framer-motion';

export default function VideoBlock() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Crate to Ready
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Watch how our shelter systems transform from compact storage to fully operational facilities in hours.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="aspect-video bg-slate-800 rounded-lg max-w-4xl mx-auto flex items-center justify-center">
            <div className="text-slate-400">Video placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
