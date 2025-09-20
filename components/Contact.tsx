import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
// FIX: Imported Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';

// FIX: Explicitly typed with Variants to prevent TypeScript from widening the 'ease' property to a generic string.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  }
};

// FIX: Explicitly typed with Variants for consistency and to prevent potential type issues.
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const Contact: React.FC = () => {
  return (
    <motion.section 
      id="contact" 
      className="py-20 sm:py-32 bg-gray-900"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Get In Touch
        </motion.h2>
        <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an innovative team.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex justify-center items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/adhithyan-a"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
            data-interactive
          >
            <Linkedin className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="font-medium">LinkedIn</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="mailto:connect.adhithyan@gmail.com"
            className="group inline-flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
            data-interactive
          >
            <Mail className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Email</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;