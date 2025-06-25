import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/10 border border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2 group backdrop-blur-sm h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.poster}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/20 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            to={`/projects/${project.slug}`}
            className="text-slate-300 font-semibold flex items-center text-sm sm:text-base hover:text-blue-300 transition-colors duration-300 transform hover:scale-105"
            aria-label={`View details for ${project.title}`}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          IT PROJECT
        </div>
      </div>

      <div className="p-5 sm:p-6 bg-gradient-to-b from-transparent to-slate-900/80 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-br from-blue-400 via-indigo-400 to-cyan-600 bg-clip-text text-transparent mb-3 leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tools.map((tool: string, index: number) => {
            const getToolColor = (toolName: string) => {
              const toolLower = toolName.toLowerCase();
              if (toolLower.includes("react") || toolLower.includes("js") || toolLower.includes("javascript")) {
                return "bg-gradient-to-br from-blue-400/20 to-indigo-400/20 text-blue-400 border-blue-500/30";
              } else if (toolLower.includes("node") || toolLower.includes("express")) {
                return "bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-500 border-blue-500/30";
              } else if (toolLower.includes("mongo") || toolLower.includes("database") || toolLower.includes("sql")) {
                return "bg-gradient-to-br from-indigo-400/20 to-indigo-500/20 text-indigo-400 border-blue-500/30";
              } else if (toolLower.includes("kotlin") || toolLower.includes("android")) {
                return "bg-gradient-to-br from-blue-600/20 to-blue-700/20 text-blue-600 border-blue-500/30";
              } else if (toolLower.includes("figma") || toolLower.includes("design") || toolLower.includes("ui")) {
                return "bg-gradient-to-br from-blue-400/20 to-blue-500/20 text-blue-400 border-blue-500/30";
              } else if (toolLower.includes("tailwind") || toolLower.includes("css")) {
                return "bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-500 border-blue-500/30";
              }
              return "bg-gradient-to-br from-slate-900/20 to-gray-900/20 text-slate-300 border-blue-500/30";
            };

            return (
              <span
                key={index}
                className={`px-3 py-1.5 text-xs font-semibold border ${getToolColor(tool)} rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
              >
                {tool}
              </span>
            );
          })}
        </div>

        <div className="mt-auto">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base transition-all duration-300 transform hover:scale-105 group/button w-full justify-center"
            aria-label={`View project ${project.title}`}
          >
            <span className="mr-2">Explore Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;