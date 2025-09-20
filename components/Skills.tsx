import React from 'react';
import { SKILLS_DATA } from '../constants';
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-32 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Technical Skills
          </h2>
          <p className="mt-4 text-lg text-gray-400">My toolbox for building intelligent solutions.</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {SKILLS_DATA.map((category) => (
            <motion.div 
              key={category.title}
              variants={itemVariants}
              className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <category.icon className="w-10 h-10 text-blue-400 mr-4" />
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map(skill => (
                  <li key={skill} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-3 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;