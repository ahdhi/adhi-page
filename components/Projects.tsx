import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { ExternalLink } from 'lucide-react';
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-32 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-gray-400">A selection of my work in AI and software development.</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS_DATA.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10 transform hover:-translate-y-1"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-gray-700 text-blue-300 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-6 right-6 text-gray-400 group-hover:text-blue-400 transition-colors"
                    aria-label={`View ${project.title}`}
                    data-interactive
                  >
                    <ExternalLink size={24} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;