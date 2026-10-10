import React from 'react';
import { Code, Play, Lock } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const ProjectDetailsDialog = ({
  activeTab,
  closeDialog,
  language,
  openDemo,
  openSource,
  selectedProject,
  selectedTranslated,
  setActiveTab,
  t,
}) => {
  const tabLabels = {
    overview: language === 'fr' ? 'Aperçu' : 'Overview',
    tech: language === 'fr' ? 'Technique' : 'Tech',
    impact: language === 'fr' ? 'Impact' : 'Impact',
  };

  return (
    <Dialog open onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="bg-[#0f0f12]/90 backdrop-blur-xl border border-white/10 text-white max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl">
        <div className="project-dialog">
          <DialogHeader className="dialog-header-with-tabs">
            <div className="dialog-title-row">
              <div>
                <DialogTitle>{selectedTranslated.title}</DialogTitle>
                <DialogDescription>
                  {selectedTranslated.category} • {selectedProject.year || 'TBD'}{' '}
                  {selectedProject.duration && `• ${selectedProject.duration}`}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="dialog-body flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="dialog-left md:w-1/2 w-full relative">
              <Carousel className="w-full" opts={{ loop: false }}>
                <CarouselContent>
                  {(selectedProject.screenshots || [selectedProject.image]).map((src, idx) => (
                    <CarouselItem key={src}>
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
                {selectedProject.screenshots?.length > 1 && (
                  <>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                  </>
                )}
              </Carousel>
            </div>

            <div className="dialog-right md:w-1/2 w-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-4 bg-white/5 rounded-lg p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 hover:text-white rounded-md transition-all">
                    {tabLabels.overview}
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 hover:text-white rounded-md transition-all">
                    {tabLabels.tech}
                  </TabsTrigger>
                  <TabsTrigger value="impact" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60 hover:text-white rounded-md transition-all">
                    {tabLabels.impact}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="dialog-tab-content space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedTranslated.description}
                  </p>
                  {(selectedTranslated.problemSolved || selectedProject.problemSolved) && (
                    <div className="dialog-section">
                      <h4 className="dialog-section-title">
                        {language === 'fr' ? 'Problème Résolu' : 'Problem Solved'}
                      </h4>
                      <p className="dialog-section-text">
                        {selectedTranslated.problemSolved || selectedProject.problemSolved}
                      </p>
                    </div>
                  )}
                  <div className="dialog-section">
                    <h4 className="dialog-section-title">
                      {language === 'fr' ? 'Objectifs' : 'Goals'}
                    </h4>
                    <p className="dialog-section-text">
                      {selectedTranslated.goals || selectedProject.goals || 'TBD'}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="dialog-tab-content space-y-4">
                  {(selectedTranslated.role || selectedProject.role) && (
                    <div className="dialog-section">
                      <h4 className="dialog-section-title">
                        {language === 'fr' ? 'Mon Rôle' : 'My Role'}
                      </h4>
                      <p className="dialog-section-text">
                        {selectedTranslated.role || selectedProject.role}
                      </p>
                    </div>
                  )}
                  <div className="dialog-section">
                    <h4 className="dialog-section-title">
                      {language === 'fr' ? 'Défis Techniques' : 'Technical Challenges'}
                    </h4>
                    <p className="dialog-section-text">
                      {selectedTranslated.challenges || selectedProject.challenges || 'TBD'}
                    </p>
                  </div>
                  <div className="dialog-section">
                    <h4 className="dialog-section-title">
                      {language === 'fr' ? 'Technologies' : 'Tech Stack'}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.competencies && selectedProject.competencies.length > 0 && (
                    <div className="dialog-section">
                      <h4 className="dialog-section-title">
                        {language === 'fr' ? 'Compétences mobilisées' : 'Skills used'}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProject.competencies.map((compId) => {
                          const comp = t.skills.items[compId - 1];
                          return comp ? (
                            <a 
                              key={compId} 
                              href={`#skill-${compId}`} 
                              onClick={(e) => { 
                                closeDialog();
                                setTimeout(() => document.querySelector(`#skill-${compId}`)?.scrollIntoView({ behavior: 'smooth' }), 100);
                              }} 
                              className="text-xs font-bold tracking-wider bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/20 transition-colors"
                            >
                              {comp.name}
                            </a>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="impact" className="dialog-tab-content space-y-4">
                  {(selectedTranslated.learnings || selectedProject.learnings) && (
                    <div className="dialog-section">
                      <h4 className="dialog-section-title">
                        {language === 'fr' ? 'Apprentissages Clés' : 'Key Learnings'}
                      </h4>
                      <p className="dialog-section-text">
                        {selectedTranslated.learnings || selectedProject.learnings}
                      </p>
                    </div>
                  )}
                  <div className="dialog-section">
                    <h4 className="dialog-section-title">
                      {language === 'fr' ? 'Valeur Livrée' : 'Value Delivered'}
                    </h4>
                    <p className="dialog-section-text">
                      {selectedTranslated.problemSolved ||
                        selectedProject.problemSolved ||
                        (language === 'fr'
                          ? 'Ce projet démontre des compétences pratiques en développement et en résolution de problèmes.'
                          : 'This project demonstrates practical skills in development and problem-solving.')}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter className="dialog-footer flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-200 border-none transition-transform hover:scale-105 rounded-lg px-4"
              onClick={(e) => openDemo(e, selectedProject.demo || selectedProject.link)}
              disabled={!(selectedProject.demo || selectedProject.link)}
            >
              {(selectedProject.demo || selectedProject.link) ? <Play size={16} /> : <Lock size={16} />}
              {' '}{(selectedProject.demo || selectedProject.link) ? t.projects.liveDemo : t.projects.noDemo}
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border border-white/20 hover:bg-white/10 transition-transform hover:scale-105 rounded-lg px-4"
              onClick={(e) => openSource(e, selectedProject.source || selectedProject.link)}
              disabled={!(selectedProject.source || selectedProject.link)}
            >
              {(selectedProject.source || selectedProject.link) ? <Code size={16} /> : <Lock size={16} />}
              {' '}{(selectedProject.source || selectedProject.link) ? t.projects.source : t.projects.sourceUnavailable}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
