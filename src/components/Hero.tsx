import React from 'react';
import { ArrowDown, Mail, ExternalLink, Code2, Database, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ProfileInfo } from '../types/portfolio';

interface HeroProps {
  profile: ProfileInfo;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow - restraint applied (no neon rainbow) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="md:col-span-8 space-y-6 text-left">
            {/* Unboxed Metadata Header with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-blue-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Engineering Opportunities
              </span>
              <span aria-hidden="true">·</span>
              <span>Software Engineering Graduate</span>
              <span aria-hidden="true">·</span>
              <span>Hargeisa, Somaliland</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <div className="space-y-3">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{profile.name}</span>.
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-200">
                Software Engineer specializing in relational data systems & production web applications.
              </p>
            </div>

            {/* Positioning Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              I design and build end-to-end institutional management platforms, workflow engines, and modern full-stack systems. Driven by clean architecture, database integrity, and practical software engineering that solves operational friction.
            </p>

            {/* Quick architectural capability anchors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Full-Stack & APIs</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Relational Modeling</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>RBAC & Governance</span>
              </div>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors flex items-center gap-2"
              >
                <span>View Engineering Case Studies</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-lg text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                Get in Touch
              </a>

              <button
                onClick={onOpenResume}
                className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Social Links */}
            <div className="flex items-center gap-5 pt-2 text-slate-400 text-sm">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">Connect:</span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono text-xs">liban770</span>
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="font-mono text-xs">LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-white transition-colors flex items-center gap-1.5"
                aria-label="Email Ahmed Liban"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-xs">Email</span>
              </a>
            </div>
          </div>

          {/* Profile Photo / Visual Anchor with Zero-Broken-Image Policy */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative group">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-800 shadow-2xl relative">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized initial block if image cannot load
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.img-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'img-fallback w-full h-full flex flex-col items-center justify-center bg-slate-800 text-blue-400';
                      fallback.innerHTML = `<span class="text-4xl font-bold font-mono">AL</span><span class="text-xs text-slate-400 mt-2">Ahmed Liban</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              {/* Status pill replacement: clean unboxed caption */}
              <div className="mt-3 text-center md:text-right">
                <span className="text-xs font-mono text-slate-400">
                  Ahmed Liban Mohamed · B.S. Software Engineering
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
