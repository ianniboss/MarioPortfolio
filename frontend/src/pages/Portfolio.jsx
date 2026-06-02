import React, { useEffect } from 'react';
import Hero3D from '../components/Hero3D';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initScrollFloat } from '@/hooks/useScrollFloat';

const Portfolio = () => {
  useEffect(() => {
    const cleanup = initScrollFloat();
    return cleanup;
  }, []);

  return (
    <div className="portfolio-container">
      <Header />
      <Hero3D />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Portfolio;
