import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { initScrollFloat } from '@/hooks/useScrollFloat';

const Portfolio = () => {
  const { t } = useLanguage();
  const [gameStarted, setGameStarted] = useState(false);

  // Use public asset for the start screen background
  const startBgUrl = `${process.env.PUBLIC_URL}/img/mariowallpaper.avif`;
  const startStyle = {
    backgroundImage: `url('${startBgUrl}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  useEffect(() => {
    if (!gameStarted) return;
    const cleanup = initScrollFloat();
    return cleanup;
  }, [gameStarted]);

  return (
    <div className="portfolio-container">
      {!gameStarted ? (
        <div className="start-screen" style={startStyle}>
          <div className="start-content">
            <h1 className="game-title">{t.startScreen.title}</h1>
            <button 
              className="start-button"
              onClick={() => setGameStarted(true)}
            >
              {t.startScreen.button}
            </button>
            <p className="start-hint">{t.startScreen.hint}</p>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Portfolio;