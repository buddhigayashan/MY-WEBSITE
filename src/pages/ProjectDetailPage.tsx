import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Tag, PlayCircle } from "lucide-react";
import PageContainer from "../components/Layout/PageContainer";
import Button from "../components/UI/Button";
import { projects } from "../data/projects";
import { Project } from "../types";
import { marked } from "marked";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

type Slide =
  | {
      type: "video";
      sources: { src: string; type: string }[];
      poster?: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const foundProject = projects.find((p) => p.slug === slug);
    setProject(foundProject || null);

    if (foundProject?.content) {
      const parseMarkdown = async () => {
        const html = await marked(foundProject.content);
        setHtmlContent(html);
      };
      parseMarkdown();
    } else {
      setHtmlContent("");
    }
  }, [slug]);

  const slides: Slide[] = useMemo(() => {
    if (!project) return [];

    const galleryImages: Slide[] = project.images.map((img) => ({
      type: "image",
      src: img,
      alt: project.title,
    }));

    const videoSlide: Slide | null = project.videoThumbnail
      ? {
          type: "video",
          sources: [{ src: project.videoThumbnail, type: "video/mp4" }],
          poster: project.poster || project.images[0],
        }
      : null;

    return videoSlide ? [videoSlide, ...galleryImages] : galleryImages;
  }, [project]);

  if (!project) {
    return (
      <PageContainer title="Project Not Found">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-6">
            Project Not Found
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg font-medium leading-relaxed">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button to="/projects" variant="primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={project.title} description={project.description}>
      <article>
        {/* HERO SECTION */}
        <div className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden bg-slate-900">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent flex items-end">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 pb-12 md:pb-16 pt-28 sm:pt-0 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center text-slate-200 hover:text-teal-300 transition-colors mb-4 sm:mb-6 text-base sm:text-lg font-medium"
                >
                  <ArrowLeft className="mr-3 h-5 w-5" /> Back to Projects
                </Link>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  {project.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-6 sm:mb-8 font-medium leading-relaxed max-w-4xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 rounded-full text-sm sm:text-base font-semibold backdrop-blur-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="py-20 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2 order-2 lg:order-1"
              >
                {/* VIDEO */}
                {project.videoThumbnail && (
                  <div className="mb-16 sm:mb-20">
                    <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-8">
                      Project Demonstration
                    </h3>
                    <div
                      className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-video bg-slate-900 cursor-pointer group border border-slate-200/20 dark:border-slate-700/20"
                      onClick={() => {
                        setLightboxIndex(0);
                        setLightboxOpen(true);
                      }}
                    >
                      <video
                        className="w-full h-full object-contain"
                        controls={false}
                        loop
                        playsInline
                        muted
                        poster={project.poster || project.images[0]}
                      >
                        <source src={project.videoThumbnail} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 group-hover:bg-slate-900/30 transition-all duration-300">
                        <PlayCircle className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                )}

                {/* MARKDOWN */}
                <div
                  className="prose prose-lg sm:prose-xl max-w-none prose-headings:font-bold prose-h1:text-slate-900 dark:prose-h1:text-white prose-h2:text-slate-800 dark:prose-h2:text-slate-100 prose-h3:text-slate-700 dark:prose-h3:text-slate-200 prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:font-semibold prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* GALLERY */}
                <div className="mt-16 sm:mt-20">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-8">
                    Visual Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="rounded-2xl overflow-hidden shadow-xl group transition duration-300 hover:scale-[1.02] cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
                        onClick={() => {
                          const imageIndex = project.videoThumbnail ? index + 1 : index;
                          setLightboxIndex(imageIndex);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-auto object-cover max-h-[450px] transition-transform duration-300 group-hover:scale-105"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* FEATURES */}
                {project.features && (
                  <div className="mt-16 sm:mt-20">
                    <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-8">
                      Key Features & Capabilities
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-lg sm:text-xl">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start group">
                          <span className="mr-4 mt-1 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-200">
                            <Tag className="h-6 w-6" />
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              {/* SIDEBAR */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-1 order-1 lg:order-2"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 sticky top-24 z-20 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                  <SidebarContent project={project} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </article>

      {/* LIGHTBOX */}
      {project && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
          plugins={[Video]}
        />
      )}
    </PageContainer>
  );
};

const SidebarContent: React.FC<{ project: Project }> = ({ project }) => (
  <>
    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-8">
      Project Overview
    </h3>
    <div className="mb-8">
      <h4 className="text-base sm:text-lg uppercase text-slate-600 dark:text-slate-400 mb-4 font-bold tracking-wider">
        Technology Stack
      </h4>
      <div className="flex flex-wrap gap-3">
        {project.tools.map((tool, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-xl text-sm font-semibold border border-teal-200/50 dark:border-teal-700/50"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
    <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mb-8">
      <h4 className="text-base sm:text-lg uppercase text-slate-600 dark:text-slate-400 mb-6 font-bold tracking-wider">
        External Resources
      </h4>
      <div className="space-y-4">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-lg font-semibold group"
          >
            <Github className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            View Source Code
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-lg font-semibold group"
          >
            <ExternalLink className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            Live Demonstration
          </a>
        )}
      </div>
    </div>
    <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
      <Link
        to="/contact"
        className="inline-flex items-center bg-teal-500 dark:bg-teal-600 text-white hover:bg-teal-400 dark:hover:bg-teal-500 transition-all duration-300 font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl w-full justify-center text-lg tracking-wide hover:scale-105 transform"
      >
        Get In Touch
      </Link>
    </div>
  </>
);

export default ProjectDetailPage;