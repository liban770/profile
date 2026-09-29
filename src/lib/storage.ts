import {
  ProfileInfo,
  Project,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ContactMessage,
} from '../types/portfolio';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialCertifications,
  initialEducation,
  initialExperiences,
} from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PROFILE: 'al_portfolio_profile',
  PROJECTS: 'al_portfolio_projects',
  SKILLS: 'al_portfolio_skills',
  CERTIFICATIONS: 'al_portfolio_certifications',
  EDUCATION: 'al_portfolio_education',
  EXPERIENCES: 'al_portfolio_experiences',
  MESSAGES: 'al_portfolio_messages',
};

// In-browser cache loader
function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

export const PortfolioStore = {
  getProfile(): ProfileInfo {
    return loadLocal(STORAGE_KEYS.PROFILE, initialProfile);
  },

  setProfile(profile: ProfileInfo): void {
    saveLocal(STORAGE_KEYS.PROFILE, profile);
  },

  getProjects(): Project[] {
    const cached = loadLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    return cached.sort((a, b) => a.order - b.order);
  },

  saveProjects(projects: Project[]): void {
    saveLocal(STORAGE_KEYS.PROJECTS, projects);
  },

  getSkills(): SkillItem[] {
    return loadLocal(STORAGE_KEYS.SKILLS, initialSkills);
  },

  saveSkills(skills: SkillItem[]): void {
    saveLocal(STORAGE_KEYS.SKILLS, skills);
  },

  getCertifications(): CertificationItem[] {
    return loadLocal(STORAGE_KEYS.CERTIFICATIONS, initialCertifications);
  },

  saveCertifications(certs: CertificationItem[]): void {
    saveLocal(STORAGE_KEYS.CERTIFICATIONS, certs);
  },

  getEducation(): EducationItem[] {
    return loadLocal(STORAGE_KEYS.EDUCATION, initialEducation);
  },

  saveEducation(edu: EducationItem[]): void {
    saveLocal(STORAGE_KEYS.EDUCATION, edu);
  },

  getExperiences(): ExperienceItem[] {
    return loadLocal(STORAGE_KEYS.EXPERIENCES, initialExperiences);
  },

  saveExperiences(exp: ExperienceItem[]): void {
    saveLocal(STORAGE_KEYS.EXPERIENCES, exp);
  },

  getContactMessages(): ContactMessage[] {
    return loadLocal(STORAGE_KEYS.MESSAGES, []);
  },

  async sendContactMessage(payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    // 1. Try sending to server proxy endpoint /api/contact
    let serverSuccess = false;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        serverSuccess = true;
      }
    } catch {
      // Local fallback continues
    }

    // 2. If Supabase is configured, write to supabase contact_messages table
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_messages').insert([
          {
            name: payload.name,
            email: payload.email,
            subject: payload.subject || 'Portfolio Inquiry',
            message: payload.message,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.warn('Supabase contact insert error:', err);
      }
    }

    // 3. Keep local copy in messages for the admin view
    const existing = this.getContactMessages();
    const newMsg: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject || 'Portfolio Inquiry',
      message: payload.message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    saveLocal(STORAGE_KEYS.MESSAGES, [newMsg, ...existing]);

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    };
  },

  exportAllData(): string {
    const data = {
      profile: this.getProfile(),
      projects: this.getProjects(),
      skills: this.getSkills(),
      certifications: this.getCertifications(),
      education: this.getEducation(),
      experiences: this.getExperiences(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.setProfile(parsed.profile);
      if (parsed.projects) this.saveProjects(parsed.projects);
      if (parsed.skills) this.saveSkills(parsed.skills);
      if (parsed.certifications) this.saveCertifications(parsed.certifications);
      if (parsed.education) this.saveEducation(parsed.education);
      if (parsed.experiences) this.saveExperiences(parsed.experiences);
      return true;
    } catch {
      return false;
    }
  },

  resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
  },

  // --- CRUD Helpers ---
  saveCertificationItem(item: CertificationItem): CertificationItem[] {
    const certs = this.getCertifications();
    const existingIndex = certs.findIndex((c) => c.id === item.id);
    let updated: CertificationItem[];
    if (existingIndex >= 0) {
      updated = certs.map((c) => (c.id === item.id ? item : c));
    } else {
      updated = [item, ...certs];
    }
    this.saveCertifications(updated);
    return updated;
  },

  deleteCertificationItem(id: string): CertificationItem[] {
    const certs = this.getCertifications();
    const updated = certs.filter((c) => c.id !== id);
    this.saveCertifications(updated);
    return updated;
  },

  saveProjectItem(item: Project): Project[] {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === item.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = projects.map((p) => (p.id === item.id ? item : p));
    } else {
      updated = [...projects, item];
    }
    this.saveProjects(updated);
    return updated;
  },

  deleteProjectItem(id: string): Project[] {
    const projects = this.getProjects();
    const updated = projects.filter((p) => p.id !== id);
    this.saveProjects(updated);
    return updated;
  },

  saveSkillItem(item: SkillItem): SkillItem[] {
    const skills = this.getSkills();
    const existingIndex = skills.findIndex((s) => s.id === item.id);
    let updated: SkillItem[];
    if (existingIndex >= 0) {
      updated = skills.map((s) => (s.id === item.id ? item : s));
    } else {
      updated = [...skills, item];
    }
    this.saveSkills(updated);
    return updated;
  },

  deleteSkillItem(id: string): SkillItem[] {
    const skills = this.getSkills();
    const updated = skills.filter((s) => s.id !== id);
    this.saveSkills(updated);
    return updated;
  },
};

