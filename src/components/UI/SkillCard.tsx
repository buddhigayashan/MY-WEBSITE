import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Skill } from '../../types'; // Assuming this path is correct

type SkillCategory = 'design' | 'development' | 'other';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const LucideIcon =
    (LucideIcons[skill.icon as keyof typeof LucideIcons] as React.ElementType) ||
    (LucideIcons.Code as React.ElementType);

  const categoryStyles: Record<SkillCategory, string> = {
    design: 'group-hover:bg-gradient-to-br group-hover:from-purple-500/10 group-hover:to-purple-600/10 dark:group-hover:from-purple-400/10 dark:group-hover:to-purple-500/10',
    development: 'group-hover:bg-gradient-to-br group-hover:from-teal-500/10 group-hover:to-cyan-500/10 dark:group-hover:from-teal-400/10 dark:group-hover:to-cyan-400/10',
    other: 'group-hover:bg-gradient-to-br group-hover:from-emerald-500/10 group-hover:to-green-500/10 dark:group-hover:from-emerald-400/10 dark:group-hover:to-green-400/10',
  };

  const iconColors: Record<SkillCategory, string> = {
    design: 'text-purple-600 dark:text-purple-400',
    development: 'text-teal-600 dark:text-teal-400',
    other: 'text-emerald-600 dark:text-emerald-400',
  };

  const iconBgColors: Record<SkillCategory, string> = {
    design: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    development: 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20',
    other: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
  };

  const glowColors: Record<SkillCategory, string> = {
    design: 'rgba(147, 51, 234, 0.12)',
    development: 'rgba(20, 184, 166, 0.12)',
    other: 'rgba(16, 185, 129, 0.12)',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        opacity: { duration: 0.3, ease: 'easeOut' },
        y: { duration: 0.4, ease: 'easeOut' },
        scale: { duration: 0.4, ease: 'easeOut' },
        delay: index * 0.03,
      }}
      className={`
        relative rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-[#1A2A44] dark:to-[#2A3B5A] 
        border border-gray-100/50 dark:border-white/10
        shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out
        flex flex-col items-center justify-center text-center group cursor-pointer
        backdrop-blur-sm hover:backdrop-blur-md
        ${categoryStyles[skill.category]}
      `}
    >
      <div
        className={`
          mb-4 p-3.5 rounded-full shadow-lg ring-1 ring-white/20 dark:ring-white/10
          transition-all duration-300 ${iconColors[skill.category]} ${iconBgColors[skill.category]}
          group-hover:scale-110 group-hover:shadow-xl
        `}
      >
        <LucideIcon className="w-7 h-7" />
      </div>
      <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mt-1 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
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
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-white/20 dark:ring-white/10" />
    </motion.div>
  );
};

export default SkillCard;