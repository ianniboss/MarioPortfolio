import './EducationSection.css';
import React from 'react';
import { Card } from './ui/card';
import { Trophy, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { use3dTilt } from '../hooks/use3dTilt';

// High-fidelity Education Card with physical 3D tilt tracking
const EducationCard = ({ edu, index, logoSrc }) => {
  const tiltRef = use3dTilt();

  return (
    <Card ref={tiltRef} className="education-card">
      <div className="card-header">
        <div className="degree-group">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${edu.institution} emblem`}
              className="edu-logo"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <div>
            <h3 className="degree-title">{edu.degree}</h3>
            <p className="school-name">{edu.institution} • {edu.year}</p>
          </div>
        </div>
        <div className="stars">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className="star-icon" fill="currentColor" />
          ))}
        </div>
      </div>
      <div className="card-body">
        <p>{edu.description}</p>
      </div>
    </Card>
  );
};

const EducationSection = () => {
  const { t } = useLanguage();

  const getAssetSrc = (path) => {
    if (!path) return null;
    if (/^https?:\/\//.test(path)) return path;
    return `${process.env.PUBLIC_URL}/img/${path}`;
  };

  return (
    <section id="education" className="education-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.education.title}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="education-timeline">
          {t.education.items.map((edu, index) => {
            const logoSrc = getAssetSrc(edu.logo);
            return (
              <div key={index} className="education-level" data-float data-float-speed="1.3">
                <div className="level-badge">
                  <Trophy className="trophy-icon" />
                  <span className="level-text">{edu.level}</span>
                </div>
                <EducationCard
                  edu={edu}
                  index={index}
                  logoSrc={logoSrc}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
