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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              My Projects
            </h1>
            <div className="w-28 h-1.5 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
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
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2.5 rounded-3xl shadow-blue-500/20 border border-blue-500/30 bg-slate-900/80 max-w-full overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setFilter('all')}
                className={`relative px-4 py-2.5 rounded-full text-sm sm:text-base font-semibold text-center transition-colors duration-300 whitespace-nowrap ${
                  filter === 'all'
                    ? 'text-white'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                {filter === 'all' && (
                  <motion.span
                    layoutId="projectFilterPill"
                    className="absolute inset-0 bg-blue-500 rounded-3xl -z-1"
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
                      : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  {filter === tool && (
                    <motion.span
                      layoutId="projectFilterPill"
                      className="absolute inset-0 bg-blue-500 rounded-3xl -z-1"
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
              <p className="text-lg text-slate-300">
                No projects found matching the selected filter.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-blue-400 hover:underline"
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
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm sm:text-lg font-semibold shadow-sm hover:shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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