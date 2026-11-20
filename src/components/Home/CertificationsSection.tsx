import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificationCard from "../UI/CertificationCard";
import { certificationCategories, certifications } from "../../data/certifications";

const CertificationsSection: React.FC = () => {
  const groupedCategories = certificationCategories
    .map((category) => ({
      ...category,
      certificates: certifications.filter(
        (certificate) => certificate.category === category.id
      ),
    }))
    .filter((category) => category.certificates.length > 0);

  const uncategorizedCategories = Array.from(
    new Set(
      certifications
        .map((certificate) => certificate.category)
        .filter(
          (category) =>
            !certificationCategories.some(
              (configuredCategory) => configuredCategory.id === category
            )
        )
    )
  ).map((category) => ({
    id: category,
    title: `${category} Certifications & Badges`,
    certificates: certifications.filter(
      (certificate) => certificate.category === category
    ),
  }));

  const categories = [...groupedCategories, ...uncategorizedCategories];

  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-16 text-white sm:py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-60" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          <h2 className="mb-3 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <div className="mb-5 h-1.5 w-32 rounded-full bg-blue-300" />
          <p className="text-lg font-medium leading-relaxed text-slate-300 sm:text-xl">
            Professional credentials and completed learning achievements.
          </p>
        </motion.div>

        {categories.length > 0 ? (
          <div className="space-y-14 sm:space-y-16">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-blue-500/20 pb-4">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {category.title}
                  </h3>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300">
                    {category.certificates.length}{" "}
                    {category.certificates.length === 1 ? "certificate" : "certificates"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {category.certificates.map((certification, index) => (
                    <CertificationCard
                      key={certification.id}
                      certification={certification}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-blue-500/30 bg-slate-900/40 px-6 text-center"
          >
            <div className="mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 p-4">
              <Award className="h-7 w-7 text-blue-400" aria-hidden="true" />
            </div>
            <p className="text-base text-slate-300">
              Verified certifications can be added to this section.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
