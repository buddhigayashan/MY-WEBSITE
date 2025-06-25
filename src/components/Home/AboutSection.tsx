import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

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

const AboutSection: React.FC = () => {
  const achievements = [
    {
      icon: <Briefcase className="h-7 w-7" />,
      title: 'Passionate Learner',
      description: 'Actively seeking real-world experience in UI/UX and web development.',
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: 'Academic Projects',
      description: 'Completed as part of university coursework and team initiatives.',
    },
    {
      icon: <GraduationCap className="h-7 w-7" />,
      title: 'BSc (Hons) in Information Technology – SLIIT',
      description: 'Currently an undergraduate specializing in Information Technology.',
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white transition-colors duration-300 overflow-hidden">
      <SpaceBackground />
      
      {/* Reduced cosmic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/3 to-transparent animate-pulse opacity-60" style={{ zIndex: 2 }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-4 leading-tight tracking-tight">
            About <span className="text-teal-300 dark:text-teal-400">Me</span>
          </h2>
          <div className="w-32 h-1.5 bg-teal-300 dark:bg-teal-400 mx-auto mb-6 rounded-full opacity-90"></div>
          <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-300 font-medium leading-relaxed">
            I am an undergraduate currently pursuing a BSc (Hons) in Information Technology 
            (Specializing in IT) at SLIIT, as well as a BSc (Hons) in Information Systems at 
            Sabaragamuwa University of Sri Lanka. I am actively seeking internship opportunities in 
            the IT field, particularly in areas such as web development, UI/UX design, UI/UX 
            engineering, programming, or database management. My goal is to gain hands-on 
            experience and develop into a skilled and respected IT professional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white dark:text-white mb-4">My Journey</h3>
            <p className="text-gray-200 dark:text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
              My academic journey at SLIIT has fueled my passion for UI/UX and full-stack development. 
              I enjoy designing interfaces that are both functional and visually appealing, and I'm eager to apply my creativity 
              and skills to real-world problems.
            </p>
            <p className="text-gray-200 dark:text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
              I have hands-on experience in tools like Figma and Adobe XD, and I bring designs to life using React.js, Tailwind CSS, 
              and modern JavaScript frameworks. I also explore backend development using Node.js and MongoDB.
            </p>
            <p className="text-gray-200 dark:text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
              Outside of tech, I enjoy exploring design trends, contributing to student communities, and continuously expanding my knowledge 
              to become a well-rounded IT professional.
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="flex items-start bg-gray-700/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 sm:p-6 rounded-lg shadow-lg border border-gray-600/50 dark:border-gray-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="w-14 h-14 bg-teal-300/30 dark:bg-teal-400/30 text-teal-300 dark:text-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-white dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-200 dark:text-gray-300 text-base sm:text-lg font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;