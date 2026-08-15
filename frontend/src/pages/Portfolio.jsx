import React, { useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { initScrollFloat } from '@/hooks/useScrollFloat';

const AboutSection = lazy(() => import('../components/AboutSection'));
const EducationSection = lazy(() => import('../components/EducationSection'));
const SkillsSection = lazy(() => import('../components/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));

const Portfolio = () => {
  useEffect(() => {
    const cleanup = initScrollFloat();
    return cleanup;
  }, []);

  return (
    <div className="portfolio-container">
      <Header />
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Portfolio;
