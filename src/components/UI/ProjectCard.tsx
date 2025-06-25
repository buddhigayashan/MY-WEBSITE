import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 transform hover:-translate-y-2 group backdrop-blur-sm h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        {/* Changed from <video> to <img> */}
        <img
          src={project.poster} // Use the poster image for the card
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            to={`/projects/${project.slug}`}
            className="text-white font-semibold flex items-center text-sm sm:text-base hover:text-cyan-300 transition-colors duration-300 transform hover:scale-105"
            aria-label={`View details for ${project.title}`}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tech Badge Overlay */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          IT PROJECT
        </div>
      </div>

      <div className="p-5 sm:p-6 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tools.map((tool, index) => {
            // Add relevant colors for different technologies
            const getToolColor = (toolName: string) => {
              const tool = toolName.toLowerCase();
              if (tool.includes('react') || tool.includes('js') || tool.includes('javascript')) {
                return 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50';
              } else if (tool.includes('node') || tool.includes('express')) {
                return 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-800/50';
              } else if (tool.includes('mongo') || tool.includes('database') || tool.includes('sql')) {
                return 'bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50';
              } else if (tool.includes('kotlin') || tool.includes('android')) {
                return 'bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 text-orange-700 dark:text-orange-300 border-orange-200/50 dark:border-orange-800/50';
              } else if (tool.includes('figma') || tool.includes('design') || tool.includes('ui')) {
                return 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/50';
              } else if (tool.includes('tailwind') || tool.includes('css')) {
                return 'bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-950/50 dark:to-sky-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/50';
              }
              // Default color
              return 'bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-950/50 dark:to-gray-950/50 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/50';
            };

            return (
              <span
                key={index}
                className={`px-3 py-1.5 text-xs font-semibold ${getToolColor(tool)} rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
              >
                {tool}
              </span>
            );
          })}
        </div>

        <div className="mt-auto">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center bg-teal-500 dark:bg-teal-600 text-white hover:bg-teal-400 dark:hover:bg-teal-500 font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 group/button w-full justify-center"
            aria-label={`View project ${project.title}`}
          >
            <span className="mr-2">Explore Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;