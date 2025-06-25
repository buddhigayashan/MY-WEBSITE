import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillCard from "../UI/SkillCard";
import { skills } from "../../data/skills";
import * as LucideIcons from "lucide-react";

type SkillCategory = "development" | "design" | "other";

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars configuration
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    // Nebula particles
    const nebulaParticles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      drift: { x: number; y: number };
    }> = [];

    // Initialize stars with reduced intensity
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Initialize nebula particles with reduced count and intensity
    for (let i = 0; i < 80; i++) {
      nebulaParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 60 + 15,
        opacity: Math.random() * 0.06 + 0.01,
        color: ['#1A2A44', '#4A5B7C', '#2dd4bf', '#0f172a'][Math.floor(Math.random() * 4)],
        drift: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      // Draw nebula particles with reduced opacity
      nebulaParticles.forEach((particle) => {
        particle.x += particle.drift.x;
        particle.y += particle.drift.y;

        // Wrap around screen
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars with reduced glow and teal color matching
      stars.forEach((star) => {
        star.z -= 1.5;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const x = (star.x - canvas.width / 2) * (200 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (200 / star.z) + canvas.height / 2;
        const radius = star.radius * (200 / star.z);
        
        // Twinkling effect with reduced intensity
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.2 + 0.8;
        const opacity = star.opacity * twinkle * (200 / star.z);

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Reduced glow effect with teal color
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
          gradient.addColorStop(0, `rgba(45, 212, 191, ${opacity * 0.4})`);
          gradient.addColorStop(0.5, `rgba(45, 212, 191, ${opacity * 0.15})`);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw star core with white/teal blend
          ctx.fillStyle = `rgba(220, 255, 250, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(radius, 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reduced cosmic dust with teal color
      const dustCount = 50;
      for (let i = 0; i < dustCount; i++) {
        const dustX = (Math.sin(time * 0.4 + i) * canvas.width / 5) + canvas.width / 2;
        const dustY = (Math.cos(time * 0.25 + i * 0.08) * canvas.height / 8) + canvas.height / 2;
        const dustOpacity = (Math.sin(time * 1.5 + i) + 1) * 0.05;

        ctx.fillStyle = `rgba(45, 212, 191, ${dustOpacity})`;
        ctx.beginPath();
        ctx.arc(dustX, dustY, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const categories = [
    { value: "all", label: "All Skills" },
    { value: "development", label: "Development" },
    { value: "design", label: "Design Tools" },
    { value: "other", label: "Other Tools" },
  ];

  const filteredSkills = useMemo(() => {
    return activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1280) setCardsPerPage(12);
      else if (window.innerWidth >= 1024) setCardsPerPage(10);
      else if (window.innerWidth >= 768) setCardsPerPage(8);
      else if (window.innerWidth >= 640) setCardsPerPage(6);
      else setCardsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredSkills.length / cardsPerPage);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const skillsOnCurrentPage = useMemo(() => {
    const start = currentPage * cardsPerPage;
    return filteredSkills.slice(start, start + cardsPerPage);
  }, [filteredSkills, currentPage, cardsPerPage]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextPage();
    } else if (isRightSwipe) {
      handlePrevPage();
    }
  };

  return (
    <section id="skills" className="relative py-24 bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white overflow-hidden">
      <SpaceBackground />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/3 to-transparent animate-pulse opacity-60" style={{ zIndex: 2 }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-4">
            My <span className="text-teal-300 dark:text-teal-400">Technical</span> Toolkit
          </h2>
          <div className="w-32 h-1.5 bg-teal-300 dark:bg-teal-400 mx-auto mb-6 rounded-full" />
          <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-300 font-medium">
            A comprehensive set of proficiencies, from core programming
            languages and robust frameworks to essential development tools and
            creative design platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div
            role="tablist"
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:overflow-x-auto scrollbar-hide
               bg-gray-700 dark:bg-gray-800 p-2.5 rounded-3xl shadow-lg border border-gray-600 dark:border-gray-500"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() =>
                  setActiveCategory(cat.value as SkillCategory | "all")
                }
                className={`relative px-4 py-2.5 rounded-3xl text-base sm:text-lg font-semibold text-center transition-colors duration-300 whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "text-white dark:text-white"
                    : "text-gray-200 dark:text-gray-300 hover:text-teal-300 dark:hover:text-teal-400"
                }`}
              >
                {activeCategory === cat.value && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-teal-500 dark:bg-teal-600 rounded-3xl -z-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {!isMobile && totalPages > 1 && (
            <>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-700/80 dark:bg-gray-800/80 shadow-lg border border-gray-600 dark:border-gray-500
                  transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                  ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                aria-label="Previous skills"
              >
                <LucideIcons.ChevronLeft className="w-7 h-7 text-gray-200 dark:text-gray-300" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gray-700/80 dark:bg-gray-800/80 shadow-lg border border-gray-600 dark:border-gray-500
                  transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400
                  ${currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                aria-label="Next skills"
              >
                <LucideIcons.ChevronRight className="w-7 h-7 text-gray-200 dark:text-gray-300" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            {skillsOnCurrentPage.length > 0 ? (
              <motion.div
                key={activeCategory + currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                ref={carouselRef}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8"
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
              >
                {skillsOnCurrentPage.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-gray-200 dark:text-gray-300 text-xl font-medium"
              >
                No skills found for this category.
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentPage === index
                      ? "bg-teal-300 dark:bg-teal-400"
                      : "bg-gray-600 dark:bg-gray-500 hover:bg-teal-400 dark:hover:bg-teal-500"
                  }`}
                  aria-label={`Go to skill page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;