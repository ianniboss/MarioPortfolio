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
            const starCount = Math.round(skill.level / 20);

            return (
              <Card key={skill.id} className="skill-card" data-float data-float-speed="1.4">
                <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}20` }}>
                  <IconComponent className="skill-icon" style={{ color: skill.color }} />
                </div>
                <h3 className="skill-name">{translatedSkill.name}</h3>
                <p className="skill-type">{translatedSkill.type}</p>
                <div className="skill-stars">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star
                      key={i}
                      size={18}
                      className={i < starCount ? "star-filled" : "star-empty"}
                      fill={i < starCount ? skill.color : "transparent"}
                      color={i < starCount ? skill.color : "rgba(255,255,255,0.2)"}
                    />
                  ))}
                </div>
                <span className="skill-rank">Rank: {starCount}/5</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;