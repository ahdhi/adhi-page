import React from 'react';
import { Download } from 'lucide-react';
// FIX: Imported Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

interface HeroProps {
  onDownloadResume: () => void;
}

// FIX: Explicitly typed with Variants to prevent TypeScript from widening the 'ease' property to a generic string.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// FIX: Explicitly typed with Variants to prevent TypeScript from widening the 'ease' property to a generic string.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};


const Hero: React.FC<HeroProps> = ({ onDownloadResume }) => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center text-center relative overflow-hidden">
       {/* Reduced opacity overlay to let the neural network show through better */}
       <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-transparent z-0"></div>
       <motion.div 
         className="z-10 px-4"
         variants={containerVariants}
         initial="hidden"
         animate="visible"
       >
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-x mb-2">
            Data Scientist
          </span>
          <span className="block">&amp; ML Engineer</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          Crafting intelligence from data.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex justify-center">
          <button 
            onClick={onDownloadResume}
            data-interactive
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <Download className="w-6 h-6" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-blue-400 transition-all duration-300 transform group-hover:translate-x-full ease">
              Download Resume
            </span>
            <span className="relative invisible">Download Resume</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;