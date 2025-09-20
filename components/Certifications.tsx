import React from 'react';
import { CERTIFICATIONS_DATA } from '../constants';
// FIX: Imported Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

// FIX: Explicitly typed with Variants for consistency and to prevent potential type issues.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FIX: Explicitly typed with Variants to prevent TypeScript from widening the 'ease' property to a generic string.
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 sm:py-32 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Certifications
          </h2>
          <p className="mt-4 text-lg text-gray-400">My commitment to continuous learning and professional development.</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CERTIFICATIONS_DATA.map((cert) => {
            {/* FIX: Assigned the icon component to a capitalized variable `Icon` before rendering. This is a standard practice in JSX for dynamic components and can prevent subtle TypeScript typing issues. */}
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10 transform hover:-translate-y-1"
              >
                <Icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;