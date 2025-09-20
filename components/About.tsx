import React from 'react';
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
      ease: 'easeOut'
    }
  }
};

const About: React.FC = () => {
  return (
    <motion.section 
      id="about" 
      className="py-20 sm:py-32 bg-gray-900"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          About Me
        </h2>
        <div className="prose prose-invert lg:prose-xl mx-auto text-gray-300">
          <p>
            A recent Computer Science graduate from Deakin University (Data Science major), I earned my degree with Distinction. As an impact-driven Software and Data Specialist, I bring over two years of hands-on experience in delivering AI-powered solutions and full-stack web applications.

I am proficient in data analysis, machine learning, and web development, with strong skills in Python, React, Power BI, and NLP. Passionate about innovation, I thrive on solving complex problems and transforming data into intelligent, user-centric products.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;