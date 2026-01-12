import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import HeroScrollEngine from './ui/hero-scroll-engine';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const bgUrl = `${process.env.PUBLIC_URL}/img/mario-bg.webp`;
  const heroStyle = {
    backgroundImage: `url('${bgUrl}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
  };

  return (
    <section id="home" className="hero-section" style={heroStyle}>
      {/* Cinematic Scroll Engine - z-0, behind everything */}
      <HeroScrollEngine />

      {/* Mario Background Elements - z-10 */}
      <div className="hero-background" style={{ zIndex: 10 }}>
        <div className="pixel-cloud cloud-1"></div>
        <div className="pixel-cloud cloud-2"></div>
        <div className="pixel-cloud cloud-3"></div>
        <div className="mario-ground"></div>
      </div>

      {/* Hero Content - z-20 */}
      <div className="hero-content" data-float-children style={{ zIndex: 20 }}>
        <div className="hero-text-box" data-float data-float-speed="1.6">
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

        <button className="scroll-indicator" data-float data-float-speed="1.2" onClick={scrollToAbout}>
          <ArrowDown className="scroll-arrow" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;