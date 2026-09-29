import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

import { PortfolioStore } from './lib/storage';
import {
  ProfileInfo,
  Project,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from './types/portfolio';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileInfo>(() => PortfolioStore.getProfile());
  const [projects, setProjects] = useState<Project[]>(() => PortfolioStore.getProjects());
  const [skills, setSkills] = useState<SkillItem[]>(() => PortfolioStore.getSkills());
  const [certifications, setCertifications] = useState<CertificationItem[]>(() =>
    PortfolioStore.getCertifications()
  );
  const [education, setEducation] = useState<EducationItem[]>(() =>
    PortfolioStore.getEducation()
  );
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() =>
    PortfolioStore.getExperiences()
  );

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('al_portfolio_theme');
    if (saved) return saved === 'dark';
    return true; // default dark for developer/technical aesthetic
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('al_portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('al_portfolio_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenThesisCaseStudy = () => {
    const thesisProj = projects.find((p) => p.slug === 'fyp-defense-management-system') || projects[1];
    if (thesisProj) {
      setSelectedProject(thesisProj);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          profile={profile}
          onOpenResume={() => setResumeOpen(true)}
        />

        <About
          profile={profile}
        />

        <Projects
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <Experience
          experiences={experiences}
        />

        <Education
          educationList={education}
          onExploreThesisProject={handleOpenThesisCaseStudy}
        />

        <Certifications
          certifications={certifications}
        />

        <Skills
          skills={skills}
        />

        <Contact
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        projects={projects}
        education={education}
        certifications={certifications}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        projects={projects}
        onProjectsUpdated={(updated) => setProjects(updated)}
        certifications={certifications}
        onCertificationsUpdated={(updated) => setCertifications(updated)}
        profile={profile}
        onProfileUpdated={(updated) => setProfile(updated)}
        skills={skills}
        onSkillsUpdated={(updated) => setSkills(updated)}
      />
    </div>
  );
};


export default App;
