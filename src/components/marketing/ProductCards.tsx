'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCards() {
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
            FEATURED PRODUCTS
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
            Our modular shelter systems are engineered for rapid deployment and exceptional performance in any environment.
          </p>
        </motion.div>

        <div className="text-center">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black font-medium text-lg tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              VIEW ALL PRODUCTS
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
