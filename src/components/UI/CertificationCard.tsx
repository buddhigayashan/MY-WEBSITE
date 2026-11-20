import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Certification } from "../../types";

interface CertificationCardProps {
  certification: Certification;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900/90 to-gray-900/90 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/60">
        <img
          src={certification.thumbnail}
          alt={`${certification.title} certificate`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
          {certification.organization}
        </p>
        <h3 className="mb-4 text-xl font-bold leading-tight text-white sm:text-2xl">
          {certification.title}
        </h3>

        <div className="mb-5 flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4 text-blue-400" aria-hidden="true" />
          <span>Issued {certification.issueDate}</span>
        </div>

        <a
          href={certification.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          View Certificate
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
};

export default CertificationCard;
