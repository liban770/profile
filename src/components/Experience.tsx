import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            03. Career & Engineering Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Experience & Technical Track Record
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Practical application of software engineering principles across full-stack systems and technical education.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-0.5 before:bg-slate-800">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-10 sm:pl-16 group">
              {/* Timeline marker node */}
              <div className="absolute left-2.5 sm:left-6.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:scale-110 transition-transform" />

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-4">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-medium text-blue-400">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300 font-semibold">{exp.type}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Technical Contributions */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Key Engineering Contributions:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.contributions.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800/80 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
