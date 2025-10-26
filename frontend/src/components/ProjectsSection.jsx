import React, { useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code } from 'lucide-react';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Mystery Blocks</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Hit the blocks to reveal projects!</p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <Card 
              key={project.id} 
              className="project-card"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <Button className="view-project-btn">
                    <ExternalLink size={20} />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <Button variant="outline" size="sm" className="project-btn">
                    <ExternalLink size={16} />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="project-btn">
                    <Code size={16} />
                    Source
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;