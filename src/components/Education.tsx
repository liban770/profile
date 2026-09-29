import React from 'react';
import { GraduationCap, Award, BookOpen, Layers } from 'lucide-react';
import { EducationItem } from '../types/portfolio';

interface EducationProps {
  educationList: EducationItem[];
  onExploreThesisProject: () => void;
}

export const Education: React.FC<EducationProps> = ({ educationList, onExploreThesisProject }) => {
  return (
    <section id="education" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            04. Academic Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Education & Thesis Research
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Formal engineering degree with focus on computer systems, software architecture, and academic governance.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Main Degree Cards */}
          <div className="md:col-span-7 space-y-6">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-blue-400 font-medium">
                      {edu.institution}
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      {edu.fieldOfStudy} · {edu.location}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-400 whitespace-nowrap bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {edu.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                    Curriculum Highlights:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 font-mono">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Spotlight: Major Academic Capstone / Thesis */}
          <div className="md:col-span-5">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-900/40 relative overflow-hidden space-y-4">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4" />
                <span>Major Degree Capstone</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                Supervisor & Admin Thesis Defense Platform
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than a theoretical thesis paper, my capstone produced an operational software platform resolving faculty bottlenecks in jury allocation, defense timeslots, and electronic rubric scoring.
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-400 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-300">Architecture:</span> State-Machine Workflow & Role Validation
                </div>
                <div>
                  <span className="text-slate-300">Core Feature:</span> Immutable Multi-Juror Rubric Scorer
                </div>
                <div>
                  <span className="text-slate-300">Impact:</span> Zero scheduling collisions across graduating cohorts
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onExploreThesisProject}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Capstone Architecture Case Study</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
