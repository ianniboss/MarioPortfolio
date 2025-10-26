import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Portfolio = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="portfolio-container">
      {!gameStarted ? (
        <div className="start-screen">
          <div className="start-content">
            <h1 className="game-title">PORTFOLIO QUEST</h1>
            <button 
              className="start-button"
              onClick={() => setGameStarted(true)}
            >
              PRESS START
            </button>
            <p className="start-hint">Click to begin your adventure</p>
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