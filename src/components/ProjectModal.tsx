import React, { useEffect } from 'react';
import { X, ExternalLink, Database, Cpu, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-blue-400 font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Case Study</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Header & Title */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-base text-slate-300 mt-1">
              {project.subtitle}
            </p>

            {/* Links and Metadata */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md border border-slate-700 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
              <span className="text-slate-400">Timeline: {project.duration}</span>
            </div>
          </div>

          {/* Project Screenshot Cover */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-80 object-contain sm:object-cover mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* 1. Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 font-mono">
              01. Executive Overview
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* 2. Problem & Solution Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
                The Problem
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                The Engineering Solution
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* 3. System Architecture & Tech Stack */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm font-mono uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>02. System Architecture & Design</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono">Architectural Pattern:</span>
                <p className="text-slate-200 font-medium">{project.architecture.pattern}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono">Database & Data Integrity:</span>
                <p className="text-slate-200 font-medium">{project.architecture.database}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono">Security & Access Control:</span>
                <p className="text-slate-200 font-medium">{project.architecture.authentication}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono">Stack Pipeline:</span>
                <p className="text-slate-200 font-medium">
                  {project.architecture.frontendStack} · {project.architecture.backendStack}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {project.architecture.summary}
            </p>

            {/* Tech stack inline */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 block mb-2">Technologies Used:</span>
              <div className="flex flex-wrap items-center gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Key Engineering Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 font-mono">
              03. Core Capabilities & Implemented Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Engineering Challenges & Solutions */}
          {project.challenges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 font-mono">
                04. Technical Obstacles & Engineering Solutions
              </h3>
              <div className="space-y-3">
                {project.challenges.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-start gap-2 text-amber-300 font-medium">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>Challenge: {c.challenge}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300 pl-6">
                      <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                      <span>Resolution: {c.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Measurable Outcomes & Results */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 font-mono">
              05. Operational Results & Impact
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Future Roadmap */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-2 text-xs">
              <span className="font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Planned Future Iterations
              </span>
              <ul className="space-y-1.5 text-slate-400">
                {project.futureImprovements.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-blue-400 font-mono">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
