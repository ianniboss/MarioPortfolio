import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="pixel-cloud cloud-1"></div>
        <div className="pixel-cloud cloud-2"></div>
        <div className="pixel-cloud cloud-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text-box">
          <h1 className="hero-name">{t.hero.name}</h1>
          <p className="hero-title">{t.hero.title}</p>
          <p className="hero-tagline">{t.hero.tagline}</p>
          
          <div className="hero-buttons">
            <Button 
              className="hero-button primary"
              onClick={scrollToAbout}
            >
              {t.hero.startBtn}
            </Button>
            <Button 
              className="hero-button secondary"
              variant="outline"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.projectsBtn}
            </Button>
          </div>
        </div>

        <button className="scroll-indicator" onClick={scrollToAbout}>
          <ArrowDown className="scroll-arrow" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;