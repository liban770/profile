import React, { useState } from 'react';
import { Code, Layout, Server, Database, Bot, GitBranch } from 'lucide-react';
import { SkillItem, SkillCategory } from '../types/portfolio';

interface SkillsProps {
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const categories: { name: SkillCategory | 'All'; icon: React.ReactNode }[] = [
    { name: 'All', icon: null },
    { name: 'Languages', icon: <Code className="w-3.5 h-3.5" /> },
    { name: 'Frontend', icon: <Layout className="w-3.5 h-3.5" /> },
    { name: 'Backend', icon: <Server className="w-3.5 h-3.5" /> },
    { name: 'Databases & Cloud', icon: <Database className="w-3.5 h-3.5" /> },
    { name: 'AI & Developer Tools', icon: <Bot className="w-3.5 h-3.5" /> },
    { name: 'Architecture & Methodologies', icon: <GitBranch className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            06. Technical Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Skills Matrix & Engineering Stack
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Structured taxonomy of programming languages, web systems, database design, and modern AI coding environments.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.name
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                skill.highlighted
                  ? 'bg-slate-900/80 border-blue-500/40 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{skill.category}</span>
                  {skill.highlighted && (
                    <span className="text-blue-400 font-semibold">Core Focus</span>
                  )}
                </div>
                <div className="text-sm font-bold text-white">
                  {skill.name}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Proficiency:</span>
                <span
                  className={
                    skill.level === 'Advanced'
                      ? 'text-cyan-400 font-medium'
                      : skill.level === 'Proficient'
                      ? 'text-blue-400 font-medium'
                      : 'text-slate-300'
                  }
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
