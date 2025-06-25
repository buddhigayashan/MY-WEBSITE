import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Skill } from "../../types";

type SkillCategory = "design" | "development" | "other";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const LucideIcon =
    (LucideIcons[skill.icon as keyof typeof LucideIcons] as React.ElementType) ||
    (LucideIcons.Code as React.ElementType);

  const categoryStyles: Record<SkillCategory, string> = {
    design: "group-hover:bg-gradient-to-br group-hover:from-blue-400/10 group-hover:to-indigo-400/10",
    development: "group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-blue-600/10",
    other: "group-hover:bg-gradient-to-br group-hover:from-indigo-500/10 group-hover:to-indigo-600/10",
  };

  const iconColors: Record<SkillCategory, string> = {
    design: "text-blue-400",
    development: "text-blue-500",
    other: "text-indigo-400",
  };

  const iconBgColors: Record<SkillCategory, string> = {
    design: "bg-gradient-to-br from-blue-400/20 to-indigo-400/20",
    development: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
    other: "bg-gradient-to-br from-indigo-500/20 to-indigo-600/20",
  };

  const glowColors: Record<SkillCategory, string> = {
    design: "rgba(96, 165, 250, 0.12)",
    development: "rgba(59, 130, 246, 0.12)",
    other: "rgba(99, 102, 241, 0.12)",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        opacity: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.4, ease: "easeOut" },
        scale: { duration: 0.4, ease: "easeOut" },
        delay: index * 0.03,
      }}
      className={`
        relative rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-gray-900/80
        border border-blue-500/30
        shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-2 transition-all duration-300 ease-out
        flex flex-col items-center justify-center text-center group cursor-pointer
        backdrop-blur-sm hover:backdrop-blur-md
        ${categoryStyles[skill.category]}
      `}
    >
      <div
        className={`
          mb-4 p-3.5 rounded-full shadow-lg ring-1 ring-white/20
          transition-all duration-300 ${iconColors[skill.category]} ${iconBgColors[skill.category]}
          group-hover:scale-110 group-hover:shadow-xl
        `}
      >
        <LucideIcon className="w-7 h-7" />
      </div>
      <span className="text-base sm:text-lg font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>

      {/* Enhanced hover glow with category-specific colors */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${glowColors[skill.category]} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle border highlight on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-white/20" />
    </motion.div>
  );
};

export default SkillCard;