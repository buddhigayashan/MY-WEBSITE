import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import logolight from "../../asset/logolight.png";
import logodark from "../../asset/logodark.png";

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
      style={{ zIndex: -1 }}
    />
  );
};

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Resume", to: "/resume" },
    { name: "Contact", to: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    scrollToTop();
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-br from-[#1A2A44]/95 to-[#4A5B7C]/95 dark:bg-gradient-to-br dark:from-[#0D1B2A]/95 dark:to-[#2A3B5A]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-gradient-to-br from-[#1A2A44]/80 to-[#4A5B7C]/80 dark:bg-gradient-to-br dark:from-[#0D1B2A]/80 dark:to-[#2A3B5A]/80 backdrop-blur-sm py-5"
      }`}
    >
      <SpaceBackground />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/3 to-transparent animate-pulse opacity-60" style={{ zIndex: 0 }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-2"
          >
            <img
              src={theme === "dark" ? logodark : logolight}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-display font-bold text-white/95 dark:text-white/95 tracking-wide">
              Buddhi Jayawickrama
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-base font-semibold tracking-wide transition-all duration-200 ${
                  location.pathname === item.to
                    ? "text-teal-200 dark:text-teal-300 drop-shadow-sm"
                    : "text-gray-100/90 dark:text-gray-200/90 hover:text-teal-200 dark:hover:text-teal-300 hover:drop-shadow-sm"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/10 dark:bg-white/10 text-gray-100/90 dark:text-gray-200/90 hover:bg-white/20 dark:hover:bg-white/20 hover:text-white dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300/60 focus:ring-offset-1 focus:ring-offset-transparent"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/10 dark:bg-white/10 text-gray-100/90 dark:text-gray-200/90 hover:bg-white/20 dark:hover:bg-white/20 hover:text-white dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300/60 focus:ring-offset-1 focus:ring-offset-transparent"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-lg text-gray-100/90 dark:text-gray-200/90 hover:bg-white/15 dark:hover:bg-white/15 hover:text-white dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300/60 focus:ring-offset-1 focus:ring-offset-transparent"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-[#1A2A44]/98 to-[#4A5B7C]/98 dark:bg-gradient-to-br dark:from-[#0D1B2A]/98 dark:to-[#2A3B5A]/98 backdrop-blur-md shadow-lg border-t border-white/10 dark:border-white/10"
          >
            <nav className="px-6 py-4 flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === item.to
                      ? "bg-teal-400/25 dark:bg-teal-400/25 text-teal-100 dark:text-teal-200 shadow-md backdrop-blur-sm"
                      : "text-gray-100/90 dark:text-gray-200/90 hover:bg-white/15 dark:hover:bg-white/15 hover:text-white dark:hover:text-white hover:shadow-sm"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;