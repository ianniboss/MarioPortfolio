import React, { lazy, Suspense, useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code, Play, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetailsDialog = lazy(() => import('./ProjectDetailsDialog'));

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
            const demoUrl = project.demo || project.link;
            const sourceUrl = project.source || project.link;

            return (
              <Card
                key={project.id}
                className="project-card"
                onClick={() => setSelectedIndex(index)}
                data-float
                data-float-speed="1.4"
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
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      className="project-btn retro-btn"
                      onClick={(e) => openDemo(e, demoUrl)}
                      disabled={!demoUrl}
                    >
                      {demoUrl ? <Play size={16} /> : <Lock size={16} />}
                      {demoUrl ? t.projects.liveDemo : t.projects.noDemo}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="project-btn retro-btn"
                      onClick={(e) => openSource(e, sourceUrl)}
                      disabled={!sourceUrl}
                    >
                      {sourceUrl ? <Code size={16} /> : <Lock size={16} />}
                      {sourceUrl ? t.projects.source : t.projects.sourceUnavailable}
                    </Button>
                  </div>
                </div>
              </Card>
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
