import React from 'react';
import { skillsData } from '../mock';
import { Card } from './ui/card';
import * as Icons from 'lucide-react';

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Power-Ups & Skills</h2>
          <div className="title-underline"></div>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill) => {
            const IconComponent = Icons[skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)] || Icons.Star;
            
            return (
              <Card key={skill.id} className="skill-card">
                <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}20` }}>
                  <IconComponent className="skill-icon" style={{ color: skill.color }} />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-type">{skill.type}</p>
                <div className="skill-progress">
                  <div 
                    className="skill-progress-bar" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
                <span className="skill-level">{skill.level}%</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;