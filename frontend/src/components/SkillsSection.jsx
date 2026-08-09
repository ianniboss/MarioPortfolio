import './SkillsSection.css';
import React from 'react';
import { skillsData } from '../mock';
import { Card } from './ui/card';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { use3dTilt } from '../hooks/use3dTilt';

// Utility helper to convert hex to RGB for CSS box-shadow variable glow
const hexToRgb = (hex) => {
  if (!hex) return '4, 156, 216';
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '4, 156, 216';
};

const SkillCard = ({ skill, index, translatedSkill, starCount, IconComponent }) => {
  const tiltRef = use3dTilt();
  const ledRgb = hexToRgb(skill.color);

  return (
    <Card 
      ref={tiltRef} 
      className="skill-card"
      data-float 
      data-float-speed="1.4"
    >
      <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}15`, borderColor: `${skill.color}50` }}>
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
};

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
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                translatedSkill={translatedSkill}
                starCount={starCount}
                IconComponent={IconComponent}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
