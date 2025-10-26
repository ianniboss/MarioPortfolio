import React from 'react';
import { skillsData } from '../mock';
import { Card } from './ui/card';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="skills-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.skills.title}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, index) => {
            const IconComponent = Icons[skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)] || Icons.Star;
            const translatedSkill = t.skills.items[index];
            
            return (
              <Card key={skill.id} className="skill-card" data-float data-float-speed="1.4">
                <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}20` }}>
                  <IconComponent className="skill-icon" style={{ color: skill.color }} />
                </div>
                <h3 className="skill-name">{translatedSkill.name}</h3>
                <p className="skill-type">{translatedSkill.type}</p>
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