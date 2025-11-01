import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Flag } from 'lucide-react';
import MushroomIcon from './icons/MushroomIcon';
import { useLanguage } from '../context/LanguageContext';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const initialAvatar = `/img/profile.jpg`;
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  // PDFs are now served from public to keep bundles small
  const resumeHref = '/cv-resume/Resume_IanHafizBinSyahrulAzlan.pdf';
  const cvHref = '/cv-resume/CVIanHafizBinSyahrulAzlan.pdf';

  return (
    <section id="about" className="about-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div 
            className={`about-card-3d ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            data-float
            data-float-speed="1.4"
          >
            <Card className="about-card-front">
              <div className="card-inner">
                <div className="avatar-container">
                  <img 
                    src={avatarUrl} 
                    alt={t.hero.name}
                    className="avatar-image"
                    loading="lazy"
                    decoding="async"
                    width="130"
                    height="130"
                    onError={() => setAvatarUrl('https://images.unsplash.com/photo-1633466876697-1eb9c820028d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxuaW50ZW5kbyUyMGF2YXRhcnxlbnwwfHx8fDE3NjE0NjM1NzB8MA&ixlib=rb-4.1.0&q=85')}
                  />
                  <div className="avatar-border"></div>
                </div>
                <div className="dialogue-box">
                  <div className="dialogue-arrow"></div>
                  <p className="dialogue-text">{t.about.description}</p>
                </div>
                <div className="about-actions">
                  <Button className="retro-btn" variant="outline" asChild>
                    <a
                      href={resumeHref}
                      download
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <MushroomIcon size={18} variant="red" className="mushroom-icon" />
                      <span>Resume (EN)</span>
                    </a>
                  </Button>
                  <Button className="retro-btn" variant="outline" asChild>
                    <a
                      href={cvHref}
                      download
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <MushroomIcon size={18} variant="green" className="mushroom-icon" />
                      <span>CV (FR)</span>
                    </a>
                  </Button>
                </div>
                <p className="flip-hint">{t.about.flipHint}</p>
              </div>
            </Card>

            <Card className="about-card-back">
              <div className="card-inner">
                <h3 className="contact-title">{t.about.contactTitle}</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>{t.about.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <div className="phone-numbers">
                      <div>🇫🇷 {t.about.phoneFrance}</div>
                      <div>🇲🇾 {t.about.phoneMalaysia}</div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <span>{t.about.location}</span>
                  </div>
                  <div className="contact-item">
                    <Flag className="contact-icon" />
                    <span>{t.about.nationality}</span>
                  </div>
                </div>
                <p className="flip-hint">{t.about.flipBackHint}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;