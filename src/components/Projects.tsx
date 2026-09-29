import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, BookOpen, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project, ProjectCategory } from '../types/portfolio';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Enterprise Systems',
    'Academic Tech',
    'Web Applications',
    'Internal Tools',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      if (!proj.published) return false;
      const matchesCategory =
        selectedCategory === 'All' || proj.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        proj.title.toLowerCase().includes(query) ||
        proj.subtitle.toLowerCase().includes(query) ||
        proj.overview.toLowerCase().includes(query) ||
        proj.techStack.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
              02. Engineered Systems & Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Software Projects
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Real platforms solving institutional bottlenecks with relational integrity, RBAC, and responsive interfaces.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Segmented Filter Tabs (functional button tabs compliant with design constitution) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">No engineering projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-slate-900/70 border border-slate-800 hover:border-slate-700/90 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Project Screenshot Cover with Zero-Broken-Image Policy */}
                <div
                  className="relative h-48 sm:h-52 bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.cover-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'cover-fallback w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-4 text-center';
                        fallback.innerHTML = `<span class="text-xs font-mono text-blue-400">${project.category}</span><span class="text-sm font-bold text-white mt-1">${project.title}</span>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Overlay Action */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-lg bg-slate-900/90 text-white backdrop-blur border border-slate-700 shadow flex items-center gap-1 text-[11px] font-mono">
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed metadata header */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="text-blue-400 font-semibold">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.role}</span>
                    </div>

                    <h3
                      className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tech Stack List - clean inline tags */}
                  <div className="space-y-3 pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-950/70 border border-slate-800/90 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[11px] font-mono text-slate-500">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Architecture & Case Study</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                            title="GitHub Repository"
                            aria-label={`GitHub repo for ${project.title}`}
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                            title="Live Demo"
                            aria-label={`Live demo for ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
