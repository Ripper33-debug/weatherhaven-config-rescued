'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  {
    number: '50+',
    label: 'COUNTRIES',
    description: 'Global deployments',
    icon: '🌍'
  },
  {
    number: '<6',
    label: 'HOURS',
    description: 'Setup time',
    icon: '⚡'
  },
  {
    number: '120',
    label: 'KM/H',
    description: 'Wind rating',
    icon: '💨'
  },
  {
    number: '24/7',
    label: 'SUPPORT',
    description: 'Global field support',
    icon: '🛠️'
  }
];

export default function ProofBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-black relative overflow-hidden border-y border-gray-800">
      {/* Military grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            PROVEN PERFORMANCE
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide">
            Trusted by governments and organizations worldwide for rapid, reliable deployment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-gray-900/50 border border-gray-800 p-8 text-center hover:border-green-400/50 transition-all duration-300 hover:bg-gray-900/80">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  className="text-4xl md:text-5xl font-black text-green-400 mb-3 tracking-tight"
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-lg font-bold text-white mb-2 tracking-wider">
                  {stat.label}
                </div>
                
                <div className="text-sm text-gray-400 font-mono tracking-wide">
                  {stat.description}
                </div>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-400 group-hover:w-1/2 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
        ></motion.div>
      </div>
    </section>
  );
}
