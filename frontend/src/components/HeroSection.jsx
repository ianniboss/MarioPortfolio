import React from 'react';
import { profileData } from '../mock';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
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
          <h1 className="hero-name">{profileData.name}</h1>
          <p className="hero-title">{profileData.title}</p>
          <p className="hero-tagline">{profileData.tagline}</p>
          
          <div className="hero-buttons">
            <Button 
              className="hero-button primary"
              onClick={scrollToAbout}
            >
              Start Adventure
            </Button>
            <Button 
              className="hero-button secondary"
              variant="outline"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
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