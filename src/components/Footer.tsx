import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ProfileInfo } from '../types/portfolio';

interface FooterProps {
  profile: ProfileInfo;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Positioning */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-semibold text-white text-sm">
            Ahmed Liban Mohamed
          </div>
          <p className="text-slate-500 font-mono text-[11px]">
            Software Engineer · Full-Stack & Relational Data Systems
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-white transition-colors"
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 pt-6 border-t border-slate-900 text-center sm:text-left flex flex-col sm:flex-row justify-between text-slate-500 text-[11px] font-mono">
        <span>© {new Date().getFullYear()} Ahmed Liban Mohamed. All rights reserved.</span>
        <span>Built with TypeScript, React & Tailwind CSS</span>
      </div>
    </footer>
  );
};
