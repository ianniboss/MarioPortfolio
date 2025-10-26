import React, { useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t.projects.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => {
            const translatedProject = t.projects.items[index];
            
            return (
              <Card 
                key={project.id} 
                className="project-card"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={translatedProject.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <Button className="view-project-btn">
                      <ExternalLink size={20} />
                      {t.projects.viewDetails}
                    </Button>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{translatedProject.title}</h3>
                    <span className="project-category">{translatedProject.category}</span>
                  </div>
                  <p className="project-description">{translatedProject.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <Button variant="outline" size="sm" className="project-btn">
                      <ExternalLink size={16} />
                      {t.projects.liveDemo}
                    </Button>
                    <Button variant="outline" size="sm" className="project-btn">
                      <Code size={16} />
                      {t.projects.source}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;