'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ThreeDPlaceholder() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive 3D Configurator
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our shelter systems in 3D. Customize configurations and see real-time specifications.
          </p>
        </motion.div>

        <div className="text-center">
          <div className="aspect-video bg-slate-700 rounded-lg max-w-4xl mx-auto flex items-center justify-center border-2 border-dashed border-slate-600">
            <div className="text-slate-400">3D Model placeholder</div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/configurator"
            className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Launch Full Configurator
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
