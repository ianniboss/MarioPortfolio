import './SkillsSection.css';
import React from 'react';
import { skillsData, projectsData } from '../mock';
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

const SkillsSection = () => {
  const { t, language } = useLanguage();

  const openProject = (projectId) => {
    window.dispatchEvent(new CustomEvent('openProjectDialog', { detail: projectId }));
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.skills.title}</h2>
          <div className="title-underline"></div>
        </div>

        <div className="skills-list flex flex-col gap-12">
          {skillsData.map((skill, index) => {
            const translatedSkill = t.skills.items[index];
            const IconComponent = Icons[skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)] || Icons.Star;
            
            // Find projects that match this skill
            const relatedProjects = projectsData.filter(p => p.competencies?.includes(skill.id));
            
            return (
              <div key={skill.id} id={`skill-${skill.id}`} className="skill-section-block">
                <div className="flex items-center gap-4 mb-6">
                  <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}15`, borderColor: `${skill.color}50` }}>
                    <IconComponent className="skill-icon" style={{ color: skill.color }} />
                  </div>
                  <h3 className="text-2xl font-bold">{translatedSkill.name}</h3>
                </div>
                
                <div className="timeline-container ml-4 pl-4 border-l-2 border-gray-700">
                  {translatedSkill.timeline?.map((step, stepIdx) => (
                    <div key={stepIdx} className="timeline-step relative mb-6">
                      <div className="timeline-dot absolute w-3 h-3 bg-red-500 rounded-full -left-[1.35rem] top-1.5"></div>
                      <h4 className="text-lg font-bold text-red-400 mb-2">{step.year}</h4>
                      <p className="text-gray-300 mb-2">{step.text}</p>
                      {step.proof && (() => {
                        const targetProject = projectsData.find(
                          (p, idx) => p.title === step.proof || t.projects?.items?.[idx]?.title === step.proof
                        );
                        return (
                          <p className="text-sm font-medium text-blue-400">
                            {language === 'fr' ? 'Preuve :' : 'Proof:'}{' '}
                            {targetProject ? (
                              <button
                                type="button"
                                onClick={() => openProject(targetProject.id)}
                                className="text-white underline hover:text-blue-300 transition-colors cursor-pointer text-left inline font-semibold"
                              >
                                {step.proof}
                              </button>
                            ) : (
                              <span className="text-white">{step.proof}</span>
                            )}
                          </p>
                        );
                      })()}
                    </div>
                  ))}
                </div>

                {relatedProjects.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-4">{language === 'fr' ? 'Projets associés' : 'Related Projects'}</h4>
                    <div className="flex flex-wrap gap-4">
                      {relatedProjects.map(project => {
                        const pIdx = projectsData.findIndex(p => p.id === project.id);
                        const pTitle = t.projects.items[pIdx]?.title || project.title;
                        return (
                          <Card 
                            key={project.id} 
                            className="cursor-pointer hover:border-red-500 transition-colors p-4 bg-gray-800/50 border border-gray-700 rounded-lg w-64"
                            onClick={() => openProject(project.id)}
                          >
                            <h5 className="font-bold truncate" title={pTitle}>{pTitle}</h5>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
