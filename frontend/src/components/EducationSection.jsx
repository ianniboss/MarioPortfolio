import React from 'react';
import { educationData } from '../mock';
import { Card } from './ui/card';
import { Trophy, Star } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Education Journey</h2>
          <div className="title-underline"></div>
        </div>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={edu.id} className="education-level">
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