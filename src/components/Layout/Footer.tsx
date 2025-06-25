import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Facebook, ArrowUp, Mail } from "lucide-react";

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

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/buddhigayashan",
      bgColor: "bg-gray-700 dark:bg-gray-600",
      hoverBgColor: "hover:bg-black dark:hover:bg-gray-900",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/buddhi-jayawickrama-a82007366/",
      bgColor: "bg-[#0A66C2]",
      hoverBgColor: "hover:bg-[#084D92]",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: 'https://www.instagram.com/_b_u_d_d_h_i___g_a_y_a_s_h_a_n/',
      bgColor: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600",
      hoverBgColor: "hover:from-yellow-600 hover:via-pink-600 hover:to-purple-700",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      href: 'https://www.facebook.com/buddhi.jayawickrama/',
      bgColor: "bg-[#1877F2]",
      hoverBgColor: "hover:bg-[#145CBF]",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:bg-gradient-to-br dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white py-12 sm:py-16 transition-colors duration-300">
      <SpaceBackground />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/3 to-transparent animate-pulse opacity-60" style={{ zIndex: 2 }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
          {/* Left section: Call to action */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">Let's Connect!</h3>
            <p className="text-gray-200 dark:text-gray-300 max-w-md text-base sm:text-lg mb-6">
              I'm currently open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-semibold bg-teal-500 dark:bg-teal-600 text-white rounded-full hover:bg-teal-400 dark:hover:bg-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#1A2A44] dark:focus:ring-offset-[#0D1B2A]"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Me
            </Link>
          </div>

          {/* Right section: Social links & Scroll to top */}
          <div className="flex flex-col items-center md:items-end gap-6 sm:gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-110 ${link.bgColor} ${link.hoverBgColor}`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center text-sm sm:text-base font-medium text-gray-200 dark:text-gray-300 hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-full px-3 py-1"
              aria-label="Scroll to top"
            >
              Back to top <ArrowUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Bottom section: Copyright and Footer Navigation */}
        <div className="pt-8 mt-8 border-t border-white/20 dark:border-white/20 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 sm:gap-0">
          <p className="text-gray-300 dark:text-gray-400 text-sm">
            © {currentYear} Buddhi Jayawickrama. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            <Link
              to="/"
              className="text-gray-300 dark:text-gray-400 text-sm hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="text-gray-300 dark:text-gray-400 text-sm hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              to="/resume"
              className="text-gray-300 dark:text-gray-400 text-sm hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Resume
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 dark:text-gray-400 text-sm hover:text-teal-300 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;