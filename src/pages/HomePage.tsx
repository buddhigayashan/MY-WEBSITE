import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import SkillsSection from '../components/Home/SkillsSection';
import FeaturedProjects from '../components/Home/FeaturedProjects';

const HomePage: React.FC = () => {
  return (
    <PageContainer 
      title="Home" 
      description="UI/UX Designer & Full-Stack Developer Portfolio showcasing projects and skills"
      className="bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white transition-colors duration-300"
    >
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
    </PageContainer>
  );
};

export default HomePage;