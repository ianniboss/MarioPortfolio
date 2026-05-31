import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const HeroScrollEngine = lazy(() => import('./ui/hero-scroll-engine'));

const HeroSection = () => {
  const { t } = useLanguage();
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    // Defer the heavy WebGL compilation/initialisation until after the main thread is fully free
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoad3D(true), 400);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        setTimeout(() => setLoad3D(true), 250);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Global MarioBackground is loaded in App.js */}

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

