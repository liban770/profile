import React, { useEffect } from 'react';
import { X, Printer, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { ProfileInfo, Project, EducationItem, CertificationItem } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  projects: Project[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  education,
  certifications,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-900 sticky top-0 z-20 no-print">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-blue-400 font-semibold">Curriculum Vitae</span>
            <span aria-hidden="true">·</span>
            <span>ATS Engineering Format</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ATS Resume Body */}
        <div className="p-6 sm:p-10 space-y-6 overflow-y-auto bg-slate-950/80 font-sans print:bg-white print:text-black print:p-0">
          
          {/* Header */}
          <div className="border-b border-slate-800 print:border-black pb-4 text-center space-y-2">
            <h1 id="resume-title" className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-blue-400 print:text-black">
              Software Engineer · Full-Stack Systems & Relational Databases
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {profile.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {profile.phone}
              </span>
              <span>·</span>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="underline">
                github.com/liban770
              </a>
              <span>·</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {profile.shortBio}
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Technical Core Competencies
            </h2>
            <div className="text-xs text-slate-300 print:text-gray-800 space-y-1 font-mono">
              <div><strong className="text-white print:text-black font-sans">Languages:</strong> TypeScript, JavaScript (ES6+), PHP, SQL, Python, HTML5, CSS3</div>
              <div><strong className="text-white print:text-black font-sans">Full-Stack & Web:</strong> React, Node.js, Express, Tailwind CSS, REST APIs, Session/Token Auth, RBAC</div>
              <div><strong className="text-white print:text-black font-sans">Databases & Cloud:</strong> PostgreSQL, MySQL, Supabase, Relational Modeling, Schema Optimization</div>
              <div><strong className="text-white print:text-black font-sans">Tools & Workflows:</strong> GitHub Copilot, Cursor, Git, Linux CLI, Vite, Postman, CI/CD</div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs space-y-1">
                <div className="flex justify-between font-bold text-white print:text-black">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="font-mono text-slate-400 print:text-gray-600">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="text-slate-400 print:text-gray-700">{edu.fieldOfStudy} · {edu.location}</div>
                {edu.thesis && (
                  <div className="text-slate-300 print:text-gray-800 pl-2 border-l border-blue-500/40">
                    <span className="font-semibold text-blue-400 print:text-black">Degree Capstone:</span> {edu.thesis.title}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected Engineering Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Key Engineering Projects
            </h2>
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="text-xs space-y-1">
                <div className="flex justify-between font-bold text-white print:text-black">
                  <span>{proj.title} | {proj.role}</span>
                  <span className="font-mono text-slate-400 print:text-gray-600">{proj.duration}</span>
                </div>
                <p className="text-slate-300 print:text-gray-800 leading-snug">
                  {proj.subtitle}
                </p>
                <ul className="list-disc list-inside text-slate-400 print:text-gray-700 space-y-0.5">
                  {proj.keyFeatures.slice(0, 2).map((kf, i) => (
                    <li key={i}>{kf}</li>
                  ))}
                  {proj.results.slice(0, 1).map((r, i) => (
                    <li key={i}><strong className="text-slate-200 print:text-black">Result:</strong> {r}</li>
                  ))}
                </ul>
                <div className="text-[11px] font-mono text-slate-500 print:text-gray-600">
                  Stack: {proj.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Key Certifications */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 print:text-black border-b border-slate-800 print:border-black pb-1">
              Key Credentials & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300 print:text-gray-800">
              {certifications.slice(0, 6).map((c) => (
                <div key={c.id} className="flex items-center gap-1.5">
                  <span className="text-blue-400 print:text-black font-mono">·</span>
                  <span>{c.title} ({c.issuer})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
