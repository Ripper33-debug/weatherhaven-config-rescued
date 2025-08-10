'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/contact">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-black font-medium text-lg tracking-wide rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl backdrop-blur-sm"
        >
          REQUEST QUOTE
        </motion.button>
      </Link>
    </div>
  );
}
