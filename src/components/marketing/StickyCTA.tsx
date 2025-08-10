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
          className="group relative px-8 py-4 bg-green-400 text-black font-black text-lg tracking-wider border-2 border-green-400 hover:bg-transparent hover:text-green-400 transition-all duration-300 overflow-hidden shadow-2xl"
        >
          <span className="relative z-10">REQUEST QUOTE</span>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </Link>
    </div>
  );
}
