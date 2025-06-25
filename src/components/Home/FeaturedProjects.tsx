import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import ProjectCard from '../UI/ProjectCard';
import { projects } from '../../data/projects';

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

const FeaturedProjects: React.FC = () => {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white overflow-hidden">
      <SpaceBackground />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/3 to-transparent animate-pulse opacity-60" style={{ zIndex: 2 }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-3">
              Featured <span className="text-teal-300 dark:text-teal-400">Projects</span>
            </h2>
            <div className="w-32 h-1.5 bg-teal-300 dark:bg-teal-400 mb-5 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-300 font-medium leading-relaxed">
              A selection of my recent work in UI/UX design and full-stack development.
              Each project represents unique challenges and solutions.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-end">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full
                         bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700
                         shadow-md hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-[#0D1B2A]"
            >
              View All Projects <ArrowRight className="ml-2 h-6 w-6" />
            </Link>

            <a
              href="https://github.com/buddhigayashan?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full
                         border border-gray-600/50 dark:border-gray-500/50 text-white dark:text-gray-300 hover:bg-gray-600/50 dark:hover:bg-gray-700/50 backdrop-blur-sm
                         shadow-md hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-[#0D1B2A]"
              aria-label="See my projects on GitHub"
            >
              <Github className="w-6 h-6 mr-2 text-teal-300 dark:text-teal-400" />
              Projects on GitHub
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10"
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;