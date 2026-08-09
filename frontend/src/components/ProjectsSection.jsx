import './ProjectsSection.css';
import React, { lazy, Suspense, useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code, Play, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { use3dTilt } from '../hooks/use3dTilt';

const ProjectDetailsDialog = lazy(() => import('./ProjectDetailsDialog'));

const ProjectCard = ({ project, index, translatedProject, t, language, setSelectedIndex, openDemo, openSource }) => {
  const tiltRef = use3dTilt();
  const demoUrl = project.demo || project.link;
  const sourceUrl = project.source || project.link;

  return (
    <Card
      ref={tiltRef}
      className="project-card"
      onClick={() => setSelectedIndex(index)}
      data-float
      data-float-speed="1.2"
    >
      <div className="project-image-container">
        <img
          src={project.image}
          alt={translatedProject.title}
          className="project-image"
          loading="lazy"
          decoding="async"
        />
        <div className="project-overlay">
          <Button className="view-project-btn" onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}>
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
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span key={techIndex} className="tech-badge">{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-badge-more">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className="project-actions">
          <Button
            className="project-btn demo-btn"
            onClick={(e) => openDemo(e, demoUrl)}
            disabled={!demoUrl}
          >
            {demoUrl ? <Play size={16} /> : <Lock size={16} />}
            <span>{demoUrl ? t.projects.liveDemo : t.projects.noDemo}</span>
          </Button>
          
          <Button
            className="project-btn source-btn"
            variant="outline"
            onClick={(e) => openSource(e, sourceUrl)}
            disabled={!sourceUrl}
          >
            {sourceUrl ? <Code size={16} /> : <Lock size={16} />}
            <span>{sourceUrl ? t.projects.source : t.projects.sourceUnavailable}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const openDemo = (e, url) => {
    e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openSource = (e, url) => {
    e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const closeDialog = () => {
    setSelectedIndex(null);
    setActiveTab('overview');
  };

  const selectedProject =
    selectedIndex !== null ? projectsData[selectedIndex] : null;
  const selectedTranslated =
    selectedIndex !== null ? t.projects.items[selectedIndex] : null;

  return (
    <section id="projects" className="projects-section">
      <div className="section-container" data-float-children>
        <div className="section-header">
          <h2 className="section-title">{t.projects.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => {
            const translatedProject = t.projects.items[index];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                translatedProject={translatedProject}
                t={t}
                language={language}
                setSelectedIndex={setSelectedIndex}
                openDemo={openDemo}
                openSource={openSource}
              />
            );
          })}
        </div>
      </div>

      {selectedProject && selectedTranslated && (
        <Suspense fallback={null}>
          <ProjectDetailsDialog
            activeTab={activeTab}
            closeDialog={closeDialog}
            language={language}
            openDemo={openDemo}
            openSource={openSource}
            selectedProject={selectedProject}
            selectedTranslated={selectedTranslated}
            setActiveTab={setActiveTab}
            t={t}
          />
        </Suspense>
      )}
    </section>
  );
};

export default ProjectsSection;

