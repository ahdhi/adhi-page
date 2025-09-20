import React from 'react';
import { PUBLICATIONS_DATA } from '../constants';
import { Link } from 'lucide-react';
// FIX: Imported Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

// FIX: Explicitly typed with Variants for consistency and to prevent potential type issues.
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  
// FIX: Explicitly typed with Variants to prevent TypeScript from widening the 'ease' property to a generic string.
const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

const Publications: React.FC = () => {
  return (
    <section id="publications" className="py-20 sm:py-32 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Publications
          </h2>
          <p className="mt-4 text-lg text-gray-400">My contributions to the research community.</p>
        </motion.div>
        <motion.div 
          className="space-y-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PUBLICATIONS_DATA.map((pub) => (
            <motion.div 
              key={pub.doi}
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
              <p className="text-sm text-gray-400 mb-1">
                {pub.authors.map((author, i) => (
                    <span key={i} className={author === "Adhithyan Ajith" ? "font-bold text-blue-300" : ""}>{author}{i < pub.authors.length - 1 ? ', ' : ''}</span>
                ))}
              </p>
              <p className="text-sm text-gray-500 mb-4">{pub.journal}, {pub.year}</p>
              <p className="text-gray-300 mb-4">{pub.abstract}</p>
              <a 
                href={pub.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                data-interactive
              >
                Read Publication <Link size={16} className="ml-2"/>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;