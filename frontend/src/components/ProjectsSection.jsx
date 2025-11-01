import React, { useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  const closeDialog = () => setSelectedIndex(null);

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

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="retro-dialog max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
          {selectedProject && selectedTranslated && (
            <div className="project-dialog">
              <DialogHeader>
                <DialogTitle>{selectedTranslated.title}</DialogTitle>
                <DialogDescription>{selectedTranslated.category}</DialogDescription>
              </DialogHeader>
              <div className="dialog-body flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="dialog-left md:w-1/2 w-full relative">
                  <Carousel className="w-full" opts={{ loop: false }}>
                    <CarouselContent>
                      {(selectedProject.screenshots || [selectedProject.image]).map((src, idx) => (
                        <CarouselItem key={idx}>
                          <img
                            src={src}
                            alt={`${selectedTranslated.title} screenshot ${idx + 1}`}
                            className="w-full h-auto min-h-[300px] max-h-[500px] rounded-md object-contain bg-gray-50"
                            loading="lazy"
                            decoding="async"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-6" />
                    <CarouselNext className="-right-6" />
                  </Carousel>
                </div>
                <div className="dialog-right md:w-1/2 w-full space-y-3">
                  <p className="text-sm text-muted-foreground">{selectedTranslated.description}</p>
                  <div className="detail-grid grid grid-cols-1 gap-2">
                    <div className="detail-row">
                      <span className="detail-label font-medium">Category: </span>
                      <span className="detail-value">{selectedTranslated.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label font-medium">Year: </span>
                      <span className="detail-value">{selectedProject.year || 'TBD'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label font-medium block">Goals</span>
                      <span className="detail-value block">{selectedTranslated.goals || selectedProject.goals || 'TBD'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label font-medium block">Duration</span>
                      <span className="detail-value block">{selectedProject.duration ? selectedProject.duration : 'TBD'}</span>
                    </div>
                  </div>
                  <div className="dialog-tech flex flex-wrap gap-2 pt-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="dialog-footer flex justify-end gap-2">
                <Button 
                  variant="outline"
                  className="retro-btn"
                  onClick={(e) => openSource(e, selectedProject.source || selectedProject.link)}
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