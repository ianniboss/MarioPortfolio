import React, { useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code, Play } from 'lucide-react';
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

      {/* Project Modal with Tabs */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="retro-dialog max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
          {selectedProject && selectedTranslated && (
            <div className="project-dialog">
              {/* Header with Title + Tabs */}
              <DialogHeader className="dialog-header-with-tabs">
                <div className="dialog-title-row">
                  <div>
                    <DialogTitle>{selectedTranslated.title}</DialogTitle>
                    <DialogDescription>{selectedTranslated.category} • {selectedProject.year || 'TBD'} {selectedProject.duration && `• ${selectedProject.duration}`}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Two Column Layout: Image Left, Tabbed Content Right */}
              <div className="dialog-body flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Left: Image Carousel */}
                <div className="dialog-left md:w-1/2 w-full relative">
                  <Carousel className="w-full" opts={{ loop: false }}>
                    <CarouselContent>
                      {(selectedProject.screenshots || [selectedProject.image]).map((src, idx) => (
                        <CarouselItem key={idx}>
                          <img
                            src={src}
                            alt={`${selectedTranslated.title} screenshot ${idx + 1}`}
                            className="w-full h-auto min-h-[250px] max-h-[400px] rounded-md object-contain bg-gray-900/50"
                            loading="lazy"
                            decoding="async"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {(selectedProject.screenshots?.length > 1) && (
                      <>
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                      </>
                    )}
                  </Carousel>
                </div>

                {/* Right: Tabbed Content */}
                <div className="dialog-right md:w-1/2 w-full">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="dialog-tabs-list w-full grid grid-cols-3 mb-4">
                      <TabsTrigger value="overview" className="dialog-tab">
                        {tabLabels.overview}
                      </TabsTrigger>
                      <TabsTrigger value="tech" className="dialog-tab">
                        {tabLabels.tech}
                      </TabsTrigger>
                      <TabsTrigger value="impact" className="dialog-tab">
                        {tabLabels.impact}
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="dialog-tab-content space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedTranslated.description}
                      </p>
                      {(selectedTranslated.problemSolved || selectedProject.problemSolved) && (
                        <div className="dialog-section">
                          <h4 className="dialog-section-title">🎯 {language === 'fr' ? 'Problème Résolu' : 'Problem Solved'}</h4>
                          <p className="dialog-section-text">{selectedTranslated.problemSolved || selectedProject.problemSolved}</p>
                        </div>
                      )}
                      <div className="dialog-section">
                        <h4 className="dialog-section-title">🏆 {language === 'fr' ? 'Objectifs' : 'Goals'}</h4>
                        <p className="dialog-section-text">{selectedTranslated.goals || selectedProject.goals || 'TBD'}</p>
                      </div>
                    </TabsContent>

                    {/* Tech Tab */}
                    <TabsContent value="tech" className="dialog-tab-content space-y-4">
                      {(selectedTranslated.role || selectedProject.role) && (
                        <div className="dialog-section">
                          <h4 className="dialog-section-title">👤 {language === 'fr' ? 'Mon Rôle' : 'My Role'}</h4>
                          <p className="dialog-section-text">{selectedTranslated.role || selectedProject.role}</p>
                        </div>
                      )}
                      <div className="dialog-section">
                        <h4 className="dialog-section-title">⚡ {language === 'fr' ? 'Défis Techniques' : 'Technical Challenges'}</h4>
                        <p className="dialog-section-text">{selectedTranslated.challenges || selectedProject.challenges || 'TBD'}</p>
                      </div>
                      <div className="dialog-section">
                        <h4 className="dialog-section-title">🛠️ {language === 'fr' ? 'Technologies' : 'Tech Stack'}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedProject.technologies.map((tech, i) => (
                            <span key={i} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Impact Tab */}
                    <TabsContent value="impact" className="dialog-tab-content space-y-4">
                      {(selectedTranslated.learnings || selectedProject.learnings) && (
                        <div className="dialog-section">
                          <h4 className="dialog-section-title">📚 {language === 'fr' ? 'Apprentissages Clés' : 'Key Learnings'}</h4>
                          <p className="dialog-section-text">{selectedTranslated.learnings || selectedProject.learnings}</p>
                        </div>
                      )}
                      <div className="dialog-section">
                        <h4 className="dialog-section-title">✨ {language === 'fr' ? 'Valeur Livrée' : 'Value Delivered'}</h4>
                        <p className="dialog-section-text">
                          {selectedTranslated.problemSolved || selectedProject.problemSolved ||
                            (language === 'fr' ? 'Ce projet démontre des compétences pratiques en développement et en résolution de problèmes.' : 'This project demonstrates practical skills in development and problem-solving.')}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Footer Actions */}
              <DialogFooter className="dialog-footer flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  className="retro-btn"
                  onClick={(e) => openDemo(e, selectedProject.demo || selectedProject.link)}
                  disabled={!(selectedProject.demo || selectedProject.link)}
                >
                  <Play size={16} /> {t.projects.liveDemo}
                </Button>
                <Button
                  variant="outline"
                  className="retro-btn"
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
