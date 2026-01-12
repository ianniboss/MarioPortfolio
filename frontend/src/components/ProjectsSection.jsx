import React, { useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code, Play, Target, Wrench, Lightbulb, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

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

  // Tab labels based on language
  const tabLabels = {
    overview: language === 'fr' ? 'Aperçu' : 'Overview',
    tech: language === 'fr' ? 'Technique' : 'Tech',
    impact: language === 'fr' ? 'Impact' : 'Impact'
  };

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
                      <Play size={16} />
                      {t.projects.liveDemo}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="project-btn retro-btn"
                      onClick={(e) => openSource(e, sourceUrl)}
                      disabled={!sourceUrl}
                    >
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

      {/* Case Study Panel Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="retro-dialog case-study-panel max-w-3xl w-[95vw] max-h-[90vh] overflow-hidden p-0">
          {selectedProject && selectedTranslated && (
            <div className="case-study-wrapper">
              {/* Header with Title & Tags */}
              <DialogHeader className="case-study-header px-6 pt-6 pb-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="case-study-category">{selectedTranslated.category}</span>
                  <span className="case-study-year flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedProject.year || 'TBD'}
                  </span>
                  {selectedProject.duration && (
                    <span className="case-study-duration flex items-center gap-1">
                      <Clock size={14} />
                      {selectedProject.duration}
                    </span>
                  )}
                </div>
                <DialogTitle className="case-study-title">{selectedTranslated.title}</DialogTitle>
                <DialogDescription className="case-study-desc">
                  {selectedTranslated.description}
                </DialogDescription>
              </DialogHeader>

              {/* Hero Image Carousel - Full Width */}
              <div className="case-study-hero px-6">
                <Carousel className="w-full" opts={{ loop: false }}>
                  <CarouselContent>
                    {(selectedProject.screenshots || [selectedProject.image]).map((src, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={src}
                          alt={`${selectedTranslated.title} screenshot ${idx + 1}`}
                          className="case-study-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {(selectedProject.screenshots?.length > 1) && (
                    <>
                      <CarouselPrevious className="case-carousel-prev" />
                      <CarouselNext className="case-carousel-next" />
                    </>
                  )}
                </Carousel>
              </div>

              {/* Tabbed Content */}
              <div className="case-study-tabs px-6 py-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="case-tabs-list w-full grid grid-cols-3">
                    <TabsTrigger value="overview" className="case-tab">
                      <Target size={16} className="mr-2" />
                      {tabLabels.overview}
                    </TabsTrigger>
                    <TabsTrigger value="tech" className="case-tab">
                      <Wrench size={16} className="mr-2" />
                      {tabLabels.tech}
                    </TabsTrigger>
                    <TabsTrigger value="impact" className="case-tab">
                      <Lightbulb size={16} className="mr-2" />
                      {tabLabels.impact}
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="case-tab-content">
                    {(selectedTranslated.problemSolved || selectedProject.problemSolved) && (
                      <div className="case-section">
                        <h4 className="case-section-title">
                          🎯 {language === 'fr' ? 'Problème Résolu' : 'Problem Solved'}
                        </h4>
                        <p className="case-section-text">
                          {selectedTranslated.problemSolved || selectedProject.problemSolved}
                        </p>
                      </div>
                    )}
                    <div className="case-section">
                      <h4 className="case-section-title">
                        🏆 {language === 'fr' ? 'Objectifs' : 'Goals'}
                      </h4>
                      <p className="case-section-text">
                        {selectedTranslated.goals || selectedProject.goals || 'TBD'}
                      </p>
                    </div>
                  </TabsContent>

                  {/* Tech Tab */}
                  <TabsContent value="tech" className="case-tab-content">
                    {(selectedTranslated.role || selectedProject.role) && (
                      <div className="case-section">
                        <h4 className="case-section-title">
                          👤 {language === 'fr' ? 'Mon Rôle' : 'My Role'}
                        </h4>
                        <p className="case-section-text">
                          {selectedTranslated.role || selectedProject.role}
                        </p>
                      </div>
                    )}
                    <div className="case-section">
                      <h4 className="case-section-title">
                        ⚡ {language === 'fr' ? 'Défis Techniques' : 'Technical Challenges'}
                      </h4>
                      <p className="case-section-text">
                        {selectedTranslated.challenges || selectedProject.challenges || 'TBD'}
                      </p>
                    </div>
                    <div className="case-section">
                      <h4 className="case-section-title">
                        🛠️ {language === 'fr' ? 'Technologies' : 'Tech Stack'}
                      </h4>
                      <div className="case-tech-badges">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Impact Tab */}
                  <TabsContent value="impact" className="case-tab-content">
                    {(selectedTranslated.learnings || selectedProject.learnings) && (
                      <div className="case-section">
                        <h4 className="case-section-title">
                          📚 {language === 'fr' ? 'Apprentissages Clés' : 'Key Learnings'}
                        </h4>
                        <p className="case-section-text">
                          {selectedTranslated.learnings || selectedProject.learnings}
                        </p>
                      </div>
                    )}
                    <div className="case-section">
                      <h4 className="case-section-title">
                        ✨ {language === 'fr' ? 'Valeur Livrée' : 'Value Delivered'}
                      </h4>
                      <p className="case-section-text">
                        {selectedTranslated.problemSolved || selectedProject.problemSolved ||
                          (language === 'fr' ? 'Ce projet démontre des compétences pratiques en développement et en résolution de problèmes.' : 'This project demonstrates practical skills in development and problem-solving.')}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Action Buttons Footer */}
              <DialogFooter className="case-study-footer px-6 py-4 border-t">
                <Button
                  variant="outline"
                  className="retro-btn case-action-btn"
                  onClick={(e) => openDemo(e, selectedProject.demo || selectedProject.link)}
                  disabled={!(selectedProject.demo || selectedProject.link)}
                >
                  <Play size={16} /> {t.projects.liveDemo}
                </Button>
                <Button
                  variant="outline"
                  className="retro-btn case-action-btn"
                  onClick={(e) => openSource(e, selectedProject.source || selectedProject.link)}
                  disabled={!(selectedProject.source || selectedProject.link)}
                >
                  <Code size={16} /> {t.projects.source}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
