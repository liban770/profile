import React, { useState, useMemo } from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { CertificationItem, CertificationCategory } from '../types/portfolio';

interface CertificationsProps {
  certifications: CertificationItem[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const [selectedCategory, setSelectedCategory] = useState<CertificationCategory>('All');

  const categories: CertificationCategory[] = [
    'All',
    'Software Engineering',
    'AI & Developer Tools',
    'Networking & Systems',
    'Data & Analytics',
    'Professional & Soft Skills',
  ];

  const filteredCerts = useMemo(() => {
    if (selectedCategory === 'All') return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [certifications, selectedCategory]);

  return (
    <section id="certifications" className="py-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
            05. Verified Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Certifications & Professional Development
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Accredited credentials across software engineering, modern AI coding workflows, systems networking, and instructional methodology.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-blue-400 font-semibold">{cert.category}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {cert.title}
                </h3>

                <div className="text-xs text-slate-300 font-medium">
                  {cert.issuer}
                </div>
              </div>

              {/* Bottom metadata */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{cert.issueDate}</span>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-500">Institutional Record</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
