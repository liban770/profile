import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Mail,
  FolderKanban,
  Award,
  User,
  Wrench,
  Database,
  Download,
  Upload,
  Check,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Edit,
  ShieldCheck,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  Project,
  ContactMessage,
  CertificationItem,
  CertificationCategory,
  ProfileInfo,
  SkillItem,
  SkillCategory,
} from '../types/portfolio';
import { PortfolioStore } from '../lib/storage';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onProjectsUpdated: (updated: Project[]) => void;
  certifications: CertificationItem[];
  onCertificationsUpdated: (updated: CertificationItem[]) => void;
  profile: ProfileInfo;
  onProfileUpdated: (updated: ProfileInfo) => void;
  skills: SkillItem[];
  onSkillsUpdated: (updated: SkillItem[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  onProjectsUpdated,
  certifications,
  onCertificationsUpdated,
  profile,
  onProfileUpdated,
  skills,
  onSkillsUpdated,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'messages' | 'certifications' | 'projects' | 'profile' | 'skills' | 'database' | 'backup'
  >('messages');

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // --- Certificate Edit Form State ---
  const [editingCert, setEditingCert] = useState<Partial<CertificationItem> | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // --- Project Edit Form State ---
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // --- Profile Edit Form State ---
  const [profileForm, setProfileForm] = useState<ProfileInfo>(profile);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // --- Skill Edit Form State ---
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages(PortfolioStore.getContactMessages());
      setProfileForm(profile);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'liban2026' || passcode.trim() === 'admin') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passkey. (Hint: liban2026)');
    }
  };

  // --- Project Handlers ---
  const togglePublishProject = (projectId: string) => {
    const updated = projects.map((p) =>
      p.id === projectId ? { ...p, published: !p.published } : p
    );
    PortfolioStore.saveProjects(updated);
    onProjectsUpdated(updated);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = PortfolioStore.deleteProjectItem(id);
      onProjectsUpdated(updated);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    const newProject: Project = {
      id: editingProject.id || 'proj_' + Date.now(),
      slug: editingProject.slug || (editingProject.title || '').toLowerCase().replace(/\s+/g, '-'),
      title: editingProject.title || '',
      subtitle: editingProject.subtitle || '',
      category: editingProject.category || 'Web Applications',
      coverImage: editingProject.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      featured: editingProject.featured ?? true,
      githubUrl: editingProject.githubUrl || '',
      liveUrl: editingProject.liveUrl || '',
      duration: editingProject.duration || '2026',
      role: editingProject.role || 'Full-Stack Lead Engineer',
      overview: editingProject.overview || '',
      problem: editingProject.problem || '',
      solution: editingProject.solution || '',
      architecture: editingProject.architecture || {
        pattern: 'Monolithic / Microservices',
        database: 'PostgreSQL / Supabase',
        authentication: 'JWT / OAuth',
        frontendStack: 'React / Vite / Tailwind',
        backendStack: 'Node.js / Express',
        summary: 'Modern dynamic web application architecture',
      },
      techStack: typeof editingProject.techStack === 'string'
        ? (editingProject.techStack as string).split(',').map((s) => s.trim())
        : editingProject.techStack || ['React', 'TypeScript', 'Node.js'],
      keyFeatures: editingProject.keyFeatures || ['Responsive UI', 'REST API', 'Secure Auth'],
      challenges: editingProject.challenges || [],
      results: editingProject.results || [],
      published: editingProject.published ?? true,
      order: editingProject.order || projects.length + 1,
    };

    const updated = PortfolioStore.saveProjectItem(newProject);
    onProjectsUpdated(updated);
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  // --- Certificate Handlers ---
  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert?.issuer) return;

    const item: CertificationItem = {
      id: editingCert.id || 'cert_' + Date.now(),
      title: editingCert.title,
      issuer: editingCert.issuer,
      issueDate: editingCert.issueDate || '2026',
      credentialId: editingCert.credentialId || '',
      credentialUrl: editingCert.credentialUrl || '',
      category: (editingCert.category as CertificationCategory) || 'Software Engineering',
      verified: editingCert.verified ?? true,
    };

    const updated = PortfolioStore.saveCertificationItem(item);
    onCertificationsUpdated(updated);
    setIsCertModalOpen(false);
    setEditingCert(null);
  };

  const handleDeleteCert = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      const updated = PortfolioStore.deleteCertificationItem(id);
      onCertificationsUpdated(updated);
    }
  };

  const toggleCertVerification = (id: string) => {
    const target = certifications.find((c) => c.id === id);
    if (!target) return;
    const updatedItem = { ...target, verified: !target.verified };
    const updatedList = PortfolioStore.saveCertificationItem(updatedItem);
    onCertificationsUpdated(updatedList);
  };

  // --- Profile Handler ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    PortfolioStore.setProfile(profileForm);
    onProfileUpdated(profileForm);
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // --- Skill Handlers ---
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    const item: SkillItem = {
      id: editingSkill.id || 'skill_' + Date.now(),
      name: editingSkill.name,
      category: (editingSkill.category as SkillCategory) || 'Languages',
      level: editingSkill.level || 'Proficient',
      highlighted: editingSkill.highlighted ?? true,
    };

    const updated = PortfolioStore.saveSkillItem(item);
    onSkillsUpdated(updated);
    setIsSkillModalOpen(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill tag?')) {
      const updated = PortfolioStore.deleteSkillItem(id);
      onSkillsUpdated(updated);
    }
  };

  // --- Backup & Restore Handlers ---
  const handleExport = () => {
    const jsonStr = PortfolioStore.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = PortfolioStore.importData(importText.trim());
    if (ok) {
      setImportStatus('✓ Data successfully imported and applied!');
      onProjectsUpdated(PortfolioStore.getProjects());
      onCertificationsUpdated(PortfolioStore.getCertifications());
      onProfileUpdated(PortfolioStore.getProfile());
      onSkillsUpdated(PortfolioStore.getSkills());
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('✗ Error: Invalid JSON format.');
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all portfolio data back to default template values?')) {
      PortfolioStore.resetToDefault();
      onProjectsUpdated(PortfolioStore.getProjects());
      onCertificationsUpdated(PortfolioStore.getCertifications());
      onProfileUpdated(PortfolioStore.getProfile());
      onSkillsUpdated(PortfolioStore.getSkills());
      alert('Portfolio reset to original seed data!');
    }
  };

  const certCategories: CertificationCategory[] = [
    'Software Engineering',
    'AI & Developer Tools',
    'Networking & Systems',
    'Data & Analytics',
    'Professional & Soft Skills',
  ];

  const skillCategories: SkillCategory[] = [
    'Languages',
    'Frontend',
    'Backend',
    'Databases & Cloud',
    'AI & Developer Tools',
    'Architecture & Methodologies',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <h2 id="admin-title" className="text-sm font-bold text-white font-mono">
              Engineering Console & Administration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!authenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-5">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Console Access</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter administrative passkey to manage certifications, projects, skills, profile, and inquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Enter passkey (default: liban2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 text-center"
              />
              {authError && <p className="text-xs text-rose-400">{authError}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Console</span>
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Admin Area */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Quick Metrics Bar (Tip #2) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-6 py-3 bg-slate-950/80 border-b border-slate-800 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Projects</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {projects.length} <span className="text-[11px] text-emerald-400 font-normal">({projects.filter(p => p.published).length} Pub)</span>
                  </div>
                </div>
                <FolderKanban className="w-4 h-4 text-blue-400" />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Certificates</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {certifications.length} <span className="text-[11px] text-emerald-400 font-normal">({certifications.filter(c => c.verified).length} Ver)</span>
                  </div>
                </div>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Inquiries</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {messages.length} <span className="text-[11px] text-cyan-400 font-normal">Messages</span>
                  </div>
                </div>
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Storage Mode</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5 truncate">
                    {isSupabaseConfigured ? 'Supabase Active' : 'Local Reactive'}
                  </div>
                </div>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Messages ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('certifications')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'certifications'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certificates ({certifications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile & Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Skills ({skills.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'database'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Database Status</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-blue-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup & Sync</span>
              </button>
            </div>

            {/* Tab Panes */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Tab 1: Messages */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Inbound inquiries submitted from the website contact form:
                    </span>
                    <button
                      onClick={() => setMessages(PortfolioStore.getContactMessages())}
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs">
                      No inbound messages received yet. Submit a message using the website contact form to test!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between text-slate-400">
                            <div>
                              <strong className="text-white text-sm">{m.name}</strong>
                              <span className="ml-2 font-mono text-blue-400">({m.email})</span>
                            </div>
                            <span className="font-mono text-[11px]">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="font-semibold text-slate-200">
                            Subject: {m.subject}
                          </div>
                          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/80 font-mono text-[11px]">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Certifications CRUD */}
              {activeTab === 'certifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Manage certifications, credentials, and verification links:
                    </span>
                    <button
                      onClick={() => {
                        setEditingCert({
                          title: '',
                          issuer: '',
                          issueDate: new Date().getFullYear().toString(),
                          category: 'Software Engineering',
                          verified: true,
                          credentialUrl: '',
                          credentialId: '',
                        });
                        setIsCertModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Certification</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{cert.title}</span>
                            <button
                              onClick={() => toggleCertVerification(cert.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 border ${
                                cert.verified
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>{cert.verified ? 'Verified' : 'Unverified'}</span>
                            </button>
                          </div>
                          <div className="text-slate-400 font-mono">
                            {cert.issuer} · <span className="text-blue-400">{cert.category}</span> · {cert.issueDate}
                          </div>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline text-[11px] font-mono block truncate max-w-md"
                            >
                              🔗 {cert.credentialUrl}
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingCert(cert);
                              setIsCertModalOpen(true);
                            }}
                            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors flex items-center gap-1 font-mono"
                          >
                            <Edit className="w-3 h-3 text-blue-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCert(cert.id)}
                            className="px-2.5 py-1 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded border border-rose-800/60 transition-colors flex items-center gap-1 font-mono"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Projects CRUD */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Manage portfolio project showcases and visibility:
                    </span>
                    <button
                      onClick={() => {
                        setEditingProject({
                          title: '',
                          subtitle: '',
                          category: 'Web Applications',
                          role: 'Full-Stack Lead Engineer',
                          duration: '2026',
                          coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
                          published: true,
                          featured: true,
                          techStack: ['React', 'TypeScript', 'Node.js'],
                          overview: '',
                          problem: '',
                          solution: '',
                        });
                        setIsProjectModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-white text-sm">{p.title}</div>
                          <div className="text-xs text-slate-400 font-mono">
                            {p.category} · {p.role} · {p.duration}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => togglePublishProject(p.id)}
                            className={`px-2.5 py-1 text-xs font-mono rounded border flex items-center gap-1 transition-colors ${
                              p.published
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{p.published ? 'Published' : 'Hidden'}</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingProject(p);
                              setIsProjectModalOpen(true);
                            }}
                            className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors flex items-center gap-1 font-mono"
                          >
                            <Edit className="w-3 h-3 text-blue-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="px-2.5 py-1 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded border border-rose-800/60 transition-colors flex items-center gap-1 font-mono"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Profile Editor */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Update personal info, job title, avatar, and biography:
                    </span>
                    {profileSaveSuccess && (
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Saved successfully!
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Professional Title</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Phone Number</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">Status Badge Text</label>
                      <input
                        type="text"
                        value={profileForm.statusBadge}
                        onChange={(e) => setProfileForm({ ...profileForm, statusBadge: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[11px] block">Biography / Short Summary</label>
                    <textarea
                      rows={3}
                      value={profileForm.shortBio}
                      onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">GitHub URL</label>
                      <input
                        type="text"
                        value={profileForm.githubUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-mono text-[11px] block">LinkedIn URL</label>
                      <input
                        type="text"
                        value={profileForm.linkedinUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              )}

              {/* Tab 5: Skills CRUD */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Manage skills and technical competencies:
                    </span>
                    <button
                      onClick={() => {
                        setEditingSkill({
                          name: '',
                          category: 'Languages',
                          level: 'Proficient',
                          highlighted: true,
                        });
                        setIsSkillModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Skill Tag</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                    {skills.map((skill) => (
                      <div key={skill.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-bold text-white">{skill.name}</span>
                          <span className="ml-2 font-mono text-blue-400 text-[11px]">({skill.category})</span>
                          <span className="ml-2 text-slate-400 text-[11px] font-mono">• {skill.level}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setIsSkillModalOpen(true);
                            }}
                            className="px-2 py-0.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors flex items-center gap-1 font-mono text-[11px]"
                          >
                            <Edit className="w-3 h-3 text-blue-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="px-2 py-0.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded border border-rose-800/60 transition-colors flex items-center gap-1 font-mono text-[11px]"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Supabase Status */}
              {activeTab === 'database' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono uppercase text-slate-400">Connection State:</span>
                      <span className={`px-2 py-0.5 rounded font-mono ${
                        isSupabaseConfigured ? 'bg-emerald-900 text-emerald-200' : 'bg-amber-900 text-amber-200'
                      }`}>
                        {isSupabaseConfigured ? 'Connected to Supabase' : 'Local Reactive Storage Active'}
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] text-slate-300">
                      <div><span className="text-slate-500">Target Endpoint:</span> https://lllrkmbpdjwhztvjbilr.supabase.co</div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={async () => {
                          const { testSupabaseConnection } = await import('../lib/supabase');
                          setImportStatus('Running live ping test against Supabase...');
                          const result = await testSupabaseConnection();
                          setImportStatus(
                            result.connected
                              ? `✓ ${result.message} (${result.tablesFound.join(', ')})`
                              : `✗ Connection test: ${result.message}`
                          );
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Run Live Connection Test</span>
                      </button>
                    </div>

                    {importStatus && (
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-blue-300 font-mono text-[11px]">
                        {importStatus}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 7: Backup & Import */}
              {activeTab === 'backup' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-sm block">Export Portfolio JSON</span>
                    <p className="text-slate-400">
                      Download a complete structured backup of profile, projects, skills, education, and certifications.
                    </p>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors inline-flex items-center gap-2 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-sm block">Import Data</span>
                    <textarea
                      rows={4}
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder="Paste exported portfolio JSON here..."
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                    />
                    {importStatus && <p className="text-emerald-400 font-mono">{importStatus}</p>}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleImport}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors inline-flex items-center gap-2 font-semibold"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import JSON</span>
                      </button>

                      <button
                        onClick={handleResetToDefaults}
                        className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Original Defaults</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Certificate Add/Edit Sub-Modal */}
      {isCertModalOpen && editingCert && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">
                {editingCert.id ? 'Edit Certificate' : 'Add New Certification'}
              </h3>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3">
              <div>
                <label className="text-slate-300 font-mono block mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Full-Stack Software Engineering"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Issuer Organization *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. Meta / Google / Jamhuriya University"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">Category</label>
                  <select
                    value={editingCert.category || 'Software Engineering'}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, category: e.target.value as CertificationCategory })
                    }
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  >
                    {certCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={editingCert.issueDate || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                    placeholder="e.g. 2025 or Jan 2026"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Credential URL (Verification Link)</label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="certVerified"
                  checked={editingCert.verified ?? true}
                  onChange={(e) => setEditingCert({ ...editingCert, verified: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="certVerified" className="text-slate-300 font-mono text-xs">
                  Mark Credential as Verified Badge
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Add/Edit Sub-Modal */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="text-slate-300 font-mono block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Nexus EduOS"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="e.g. AI-Powered Campus Operating System"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">Role</label>
                  <input
                    type="text"
                    value={editingProject.role || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    placeholder="e.g. Lead Architect"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">Category</label>
                  <select
                    value={editingProject.category || 'Web Applications'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option value="Enterprise Systems">Enterprise Systems</option>
                    <option value="Academic Tech">Academic Tech</option>
                    <option value="Web Applications">Web Applications</option>
                    <option value="Internal Tools">Internal Tools</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingProject.duration || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                    placeholder="e.g. Jan 2026 - Present"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingProject.coverImage || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingProject.techStack)
                      ? editingProject.techStack.join(', ')
                      : editingProject.techStack || ''
                  }
                  onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value as any })}
                  placeholder="React, TypeScript, Tailwind, Node.js"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">Live URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Overview</label>
                <textarea
                  rows={3}
                  value={editingProject.overview || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-700 text-blue-600"
                  />
                  Published on Website
                </label>

                <label className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingProject.featured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-700 text-blue-600"
                  />
                  Featured Card
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Add/Edit Sub-Modal */}
      {isSkillModalOpen && editingSkill && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">
                {editingSkill.id ? 'Edit Skill Tag' : 'Add New Skill Tag'}
              </h3>
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div>
                <label className="text-slate-300 font-mono block mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. React.js, Python, PostgreSQL"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Category</label>
                <select
                  value={editingSkill.category || 'Languages'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                >
                  {skillCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Proficiency Level</label>
                <select
                  value={editingSkill.level || 'Proficient'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Working Knowledge">Working Knowledge</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
