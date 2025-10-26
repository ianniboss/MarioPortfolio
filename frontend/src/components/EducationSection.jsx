import React from 'react';
import { Card } from './ui/card';
import { Trophy, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EducationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="education-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.education.title}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="education-timeline">
          {t.education.items.map((edu, index) => (
            <div key={index} className="education-level" data-float data-float-speed="1.3">
              <div className="level-badge">
                <Trophy className="trophy-icon" />
                <span className="level-text">{edu.level}</span>
              </div>

              <Card className="education-card">
                <div className="card-header">
                  <div className="stars">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="star-icon" fill="currentColor" />
                    ))}
                  </div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                </div>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-year">{edu.year}</p>
                <p className="edu-description">{edu.description}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;