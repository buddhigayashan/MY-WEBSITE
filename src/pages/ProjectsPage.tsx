import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '../components/Layout/PageContainer';
import ProjectCard from '../components/UI/ProjectCard';
import { projects } from '../data/projects';
import { Github } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const allTools = Array.from(new Set(projects.flatMap(project => project.tools)));

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tools.includes(filter));

  return (
    <PageContainer
      title="Projects"
      description="Browse through my UI/UX design and development projects"
    >
      <section className="py-20 bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white dark:text-white mb-4">My Projects</h1>
            <div className="w-28 h-1.5 bg-teal-300 dark:bg-teal-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-base sm:text-xl text-gray-200 dark:text-gray-300 font-medium leading-relaxed">
              Explore my portfolio of design and development work. Each project represents
              a unique challenge and showcases different skills and technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 sm:mb-16 flex justify-center"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2.5 rounded-3xl shadow-lg border border-gray-600 dark:border-gray-500 bg-gray-700 dark:bg-gray-800 max-w-full overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilter('all')}
                className={`relative px-4 py-2.5 rounded-full text-sm sm:text-base font-semibold text-center transition-colors duration-300 whitespace-nowrap ${
                  filter === 'all'
                    ? 'text-white'
                    : 'text-gray-200 dark:text-gray-300 hover:text-teal-300 dark:hover:text-teal-400'
                }`}
              >
                {filter === 'all' && (
                  <motion.span
                    layoutId="projectFilterPill"
                    className="absolute inset-0 bg-teal-300 dark:bg-teal-400 rounded-3xl -z-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">All Projects</span>
              </button>

              {allTools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => setFilter(tool)}
                  className={`relative px-4 py-2.5 rounded-full text-sm sm:text-base font-semibold text-center transition-colors duration-300 whitespace-nowrap ${
                    filter === tool
                      ? 'text-white'
                      : 'text-gray-200 dark:text-gray-300 hover:text-teal-300 dark:hover:text-teal-400'
                  }`}
                >
                  {filter === tool && (
                    <motion.span
                      layoutId="projectFilterPill"
                      className="absolute inset-0 bg-teal-300 dark:bg-teal-400 rounded-3xl -z-1"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tool}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg text-gray-200 dark:text-gray-300">
                No projects found matching the selected filter.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-teal-300 dark:text-teal-400 hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center mt-20"
          >
            <a
              href="https://github.com/buddhigayashan?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gray-700 dark:bg-gray-800 text-white rounded-full text-sm sm:text-lg font-semibold shadow-xl
                         hover:bg-gray-800 dark:hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-400"
              aria-label="See my projects on GitHub"
            >
              <Github className="w-6 h-6 mr-3" />
              See All My Projects on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </PageContainer>
  );
};

export default ProjectsPage;