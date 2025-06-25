import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Typed from "typed.js";
import Button from "../UI/Button";
import hero from "../../asset/hero2.jpg";

const SpaceBackground3D: React.FC<{ onPhotoReveal: () => void }> = ({ onPhotoReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const [meteorActive, setMeteorActive] = useState(true);
  const [explosionActive, setExplosionActive] = useState(false);
  const meteorRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    tail: Array<{ x: number; y: number; opacity: number }>;
  }>({
    x: -100,
    y: -100,
    vx: 0,
    vy: 0,
    tail: [],
  });
  const explosionParticlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    life: number;
  }>>([]);
  const explosionStartTime = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];
    const nebulaParticles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      drift: { x: number; y: number };
    }> = [];

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

    for (let i = 0; i < 80; i++) {
      nebulaParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 60 + 15,
        opacity: Math.random() * 0.06 + 0.01,
        color: ['#4338ca', '#1e40af', '#0f172a', '#374151'][Math.floor(Math.random() * 4)], // Darker, more masculine colors
        drift: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
      });
    }

    let time = 0;

    // Initialize meteorite
    setTimeout(() => {
      const targetX = canvas.width * 0.75; // Approximate photo center
      const targetY = canvas.height / 2;
      meteorRef.current = {
        x: -100,
        y: -100,
        vx: (targetX - (-100)) / 100,
        vy: (targetY - (-100)) / 100,
        tail: Array.from({ length: 20 }, () => ({ x: -100, y: -100, opacity: 0 })),
      };
    }, 1000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      nebulaParticles.forEach((particle) => {
        particle.x += particle.drift.x;
        particle.y += particle.drift.y;

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
        
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.2 + 0.8;
        const opacity = star.opacity * twinkle * (200 / star.z);

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(radius, 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const dustCount = 50;
      for (let i = 0; i < dustCount; i++) {
        const dustX = (Math.sin(time * 0.4 + i) * canvas.width / 5) + canvas.width / 2;
        const dustY = (Math.cos(time * 0.25 + i * 0.08) * canvas.height / 8) + canvas.height / 2;
        const dustOpacity = (Math.sin(time * 1.5 + i) + 1) * 0.05;

        ctx.fillStyle = `rgba(67, 56, 202, ${dustOpacity})`; // Darker blue dust
        ctx.beginPath();
        ctx.arc(dustX, dustY, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw meteorite
      if (meteorActive) {
        const meteor = meteorRef.current;
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        // Update tail
        meteor.tail.unshift({ x: meteor.x, y: meteor.y, opacity: 1 });
        meteor.tail.pop();
        meteor.tail = meteor.tail.map((point, index) => ({
          ...point,
          opacity: 1 - (index / meteor.tail.length) * 0.9,
        }));

        // Draw tail
        ctx.beginPath();
        meteor.tail.forEach((point, index) => {
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${point.opacity * 0.8})`; // Blue meteor tail
          ctx.lineWidth = 2 - (index / meteor.tail.length) * 1.5;
          if (index === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Draw meteor core
        const gradient = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 5);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Check if meteor reached target
        const targetX = canvas.width * 0.75;
        const targetY = canvas.height / 2;
        if (Math.hypot(meteor.x - targetX, meteor.y - targetY) < 10) {
          setMeteorActive(false);
          setExplosionActive(true);
          explosionStartTime.current = performance.now();

          // Initialize explosion particles
          for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            explosionParticlesRef.current.push({
              x: meteor.x,
              y: meteor.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: Math.random() * 3 + 1,
              opacity: 1,
              life: Math.random() * 0.5 + 0.5,
            });
          }
        }
      }

      // Draw explosion
      if (explosionActive) {
        const currentTime = performance.now();
        const elapsed = explosionStartTime.current ? (currentTime - explosionStartTime.current) / 1000 : 0;

        explosionParticlesRef.current = explosionParticlesRef.current.filter((particle) => particle.life > 0);
        explosionParticlesRef.current.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= 0.02;
          particle.opacity = particle.life;

          const colors = ['#3b82f6', '#1e40af', '#4338ca']; // Blue explosion colors
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        if (elapsed > 1.5) {
          setExplosionActive(false);
          onPhotoReveal();
        }
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
  }, [meteorActive, explosionActive, onPhotoReveal]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3 + 2.5, // Delay text to appear after photo
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const HeroSection: React.FC = () => {
  const typedElement = useRef<HTMLSpanElement | null>(null);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const typed = new Typed(typedElement.current!, {
      strings: [
        "Full-Stack Engineer | Crafting Scalable, Modern Web Architectures",
        "Creative Technologist | Bridging UI Elegance with Backend Power",
        "Innovation-Driven Developer | Engineering Seamless Digital Experiences"
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
          }
          .animate-gradient-x {
            background-size: 200% auto;
            animation: gradient-x 4s ease infinite;
          }
        `}
      </style>
      
      <section
        className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 overflow-hidden py-16 sm:py-20 md:py-0"
        aria-label="Hero Section"
      >
        <SpaceBackground3D onPhotoReveal={() => setShowPhoto(true)} />
        
        {/* Modern gradient overlay - darker, more masculine */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-transparent to-blue-900/20" style={{ zIndex: 2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" style={{ zIndex: 2 }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-y-12 md:gap-x-20">
            <div className="w-full md:w-1/2 text-center md:text-left max-w-3xl">
              <motion.div
                className="inline-block mb-5"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={textVariants}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 backdrop-blur-sm">
                  👋 Hello, I'm Buddhi
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x mb-8"
                initial="hidden"
                animate="visible"
                custom={2}
                variants={textVariants}
              >
                <span ref={typedElement} aria-live="polite" />
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl mx-auto md:mx-0 tracking-wide font-light"
                initial="hidden"
                animate="visible"
                custom={3}
                variants={textVariants}
              >
                I design and engineer{" "}
                <span className="text-blue-400 font-semibold bg-blue-400/10 px-2 py-1 rounded">
                  scalable
                </span>
                ,{" "}
                <span className="text-indigo-400 font-semibold bg-indigo-400/10 px-2 py-1 rounded">
                  performance-driven
                </span>{" "}
                digital solutions – combining architectural precision with user-centric interfaces to create products that scale, engage, and lead.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center md:justify-start gap-5 mt-10"
                initial="hidden"
                animate="visible"
                custom={4}
                variants={textVariants}
              >
                <Button
                  variant="primary"
                  size="lg"
                  to="/projects"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 border-0 font-semibold"
                >
                  View Projects
                </Button>
                <a
                  href="/Buddhi_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg shadow-sm transition-all duration-300 hover:bg-slate-800/50 hover:shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <Download className="w-6 h-6 mr-2" />
                  Download Resume
                </a>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center order-first md:order-last">
              <motion.div
                className="relative group"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: showPhoto ? 1 : 0, scale: showPhoto ? 1 : 0.75 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: showPhoto ? 1.05 : 1 }}
                aria-label="Buddhi's Profile Picture"
                role="img"
              >
                {/* Animated background elements - more masculine colors */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-40 group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Main photo container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-500/30 group-hover:border-blue-400/40 transition-all duration-300 shadow-2xl">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-indigo-400/20 rounded-full" />
                  
                  <img
                    src={hero}
                    alt="Buddhi - Full-Stack Developer"
                    className="relative w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent rounded-full" />
                </div>
                
                {/* Floating elements - masculine blue tones */}
                <div className="absolute -top-6 -right-6 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;