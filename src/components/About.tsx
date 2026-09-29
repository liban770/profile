import React from 'react';
import { Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';

interface AboutProps {
  profile: ProfileInfo;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            01. Background & Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Engineering Perspective
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Left Column: Narrative */}
          <div className="md:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
            <p>
              I recently graduated with a <strong className="text-white">Bachelor of Science in Software Engineering</strong>. Over the course of my degree and subsequent engineering work, I focused intently on building functional, production-ready software systems rather than hypothetical prototypes.
            </p>
            <p>
              My hands-on experience covers end-to-end web architectures: from designing normalized MySQL and PostgreSQL schemas with cascade rules and role-based permissions, to building clean RESTful API services in Node.js and PHP, up to responsive frontend applications with modern React and Tailwind CSS.
            </p>
            <p>
              Whether engineering an institutional <span className="text-blue-300">School Management System</span>, streamlining university thesis defenses through a <span className="text-blue-300">Capstone Defense Platform</span>, or constructing <span className="text-blue-300">employee proposal workflows</span>, I approach engineering problems with an emphasis on data integrity, operational speed, and maintainability.
            </p>

            {/* Core Competencies highlights */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
                Primary Software Focus
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {profile.whatIBuild.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles & Learning Focus */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Principles Box */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Engineering Principles</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {profile.engineeringPhilosophy.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-mono text-xs font-bold mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Currently Mastering */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Current Technical Focus</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300 font-mono">
                {profile.currentlyMastering.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
