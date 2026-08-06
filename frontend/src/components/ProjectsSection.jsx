import './ProjectsSection.css';
import React, { lazy, Suspense, useState } from 'react';
import { projectsData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Code, Play, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { use3dTilt } from '../hooks/use3dTilt';

const ProjectDetailsDialog = lazy(() => import('./ProjectDetailsDialog'));

// Multilingual database of concise recruiter signals (Role & Key Value/Result) for quick grid-scanning
const recruiterSignals = {
  en: {
    1: { role: "Database Lead", result: "Booking ACID Lock Secure" },
    2: { role: "SysAdmin Lead", result: "Production Server Hardened" },
    3: { role: "UX Developer", result: "Interactive Media Immersive" },
    4: { role: "HMI Architect", result: "UML Design CRUD Stable" },
    5: { role: "Data Analyst", result: "Riot API Queue Stable" },
    6: { role: "Algorithm Dev", result: "Graph Path Benchmarks" },
    7: { role: "Fullstack Creator", result: "500+ Community Connected" },
    8: { role: "AI Integrator", result: "Trilingual Debounced API" },
    9: { role: "AI Architect", result: "Context Content Generation" },
    10: { role: "Frontend Creator", result: "Forecast Weather App" },
    11: { role: "Backend Architect", result: "MVC Roster Stats Active" },
    12: { role: "Media Dev", result: "High-speed conversion" },
    13: { role: "Productivity Lead", result: "Notion Gamified workflow" }
  },
  fr: {
    1: { role: "Chef de BDD", result: "Réservation ACID Sécurisée" },
    2: { role: "Admin Système Lead", result: "Serveur Prod Durci" },
    3: { role: "Développeur UX", result: "Média Immersif Intégré" },
    4: { role: "Architecte IHM", result: "Conception UML CRUD Stable" },
    5: { role: "Analyste de Données", result: "API Riot File Stable" },
    6: { role: "Dév Algorithmique", result: "Benchmarks Graphes OK" },
    7: { role: "Créateur Fullstack", result: "Communauté 500+ Active" },
    8: { role: "Intégrateur IA", result: "API Trilingue Debounced" },
    9: { role: "Architecte IA", result: "Génération Contenu Contexte" },
    10: { role: "Créateur Frontend", result: "Météo Recherche Rapide" },
    11: { role: "Architecte Backend", result: "MVC Tableau Bord Roster" },
    12: { role: "Dév Média", result: "Conversion Vercel Rapide" },
    13: { role: "Productivité Lead", result: "Flux Gamifié Notion Actif" }
  }
};

// High-fidelity Project Card with physical 3D tilt tracking, sliding spec sheet, and retro console A/B pads
const ProjectCard = ({ project, index, translatedProject, t, language, setSelectedIndex, openDemo, openSource }) => {
  const tiltRef = use3dTilt();
  const demoUrl = project.demo || project.link;
  const sourceUrl = project.source || project.link;

  const currentLang = language === 'fr' ? 'fr' : 'en';
  const signals = recruiterSignals[currentLang][project.id] || { role: "Developer", result: "Project Completed" };

  return (
    <Card
      ref={tiltRef}
      className="project-card cartridge-card cartridge-project"
      onClick={() => setSelectedIndex(index)}
      data-float
      data-float-speed="1.4"
    >
      {/* Glossy glare reflection */}
      <div className="cartridge-glare" />

      {/* Retro LED Light wrapper */}
      <div className="cartridge-led-wrapper">
        <div className="cartridge-led" />
        <span className="cartridge-led-label">CART.{index < 9 ? `0${index + 1}` : index + 1}</span>
      </div>

      {/* Cartridge Grooves */}
      <div className="cartridge-grooves">
        <div className="cartridge-groove" />
        <div className="cartridge-groove" />
        <div className="cartridge-groove" />
        <div className="cartridge-groove" />
      </div>

      {/* Sliding Recruiter Spec Sheet (Slides up on Hover) */}
      <div className="cartridge-spec-sheet">
        <div className="spec-sheet-header">
          <span className="spec-label">SPECIFICATIONS</span>
          <span className="spec-system">SYS.v{project.year || "2025"}</span>
        </div>
        <div className="spec-divider"></div>
        <div className="spec-item">
          <span className="spec-key">ROLE:</span>
          <span className="spec-val highlight">{signals.role}</span>
        </div>
        <div className="spec-item">
          <span className="spec-key">RESULT:</span>
          <span className="spec-val highlight-glow">{signals.result}</span>
        </div>
        <div className="spec-item">
          <span className="spec-key">SCOPE:</span>
          <span className="spec-val">{project.duration || "N/A"}</span>
        </div>
      </div>

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

        {/* Technical Stack Chipsets */}
        <div className="project-tech">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span key={techIndex} className="tech-badge">{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-badge-more">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Console Controller Button Pad */}
        <div className="console-button-pad">
          <div className="console-btn-slot">
            <Button
              className="console-circle-btn btn-a"
              onClick={(e) => openDemo(e, demoUrl)}
              disabled={!demoUrl}
              title={demoUrl ? t.projects.liveDemo : t.projects.noDemo}
            >
              <span className="console-btn-letter">A</span>
            </Button>
            <span className="console-btn-label">{demoUrl ? "DEMO" : "LOCKED"}</span>
          </div>

          <div className="console-btn-slot">
            <Button
              className="console-circle-btn btn-b"
              onClick={(e) => openSource(e, sourceUrl)}
              disabled={!sourceUrl}
              title={sourceUrl ? t.projects.source : t.projects.sourceUnavailable}
            >
              <span className="console-btn-letter">B</span>
            </Button>
            <span className="console-btn-label">{sourceUrl ? "CODE" : "PRIVATE"}</span>
          </div>
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

