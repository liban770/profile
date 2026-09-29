export type ProjectCategory = 
  | 'All'
  | 'Enterprise Systems'
  | 'Academic Tech'
  | 'Web Applications'
  | 'Internal Tools';

export interface ArchitectureDetail {
  pattern: string;
  database: string;
  authentication: string;
  frontendStack: string;
  backendStack: string;
  summary: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  coverImage: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  duration: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: ArchitectureDetail;
  techStack: string[];
  keyFeatures: string[];
  challenges: ChallengeSolution[];
  results: string[];
  futureImprovements?: string[];
  published: boolean;
  order: number;
}

export type SkillCategory = 
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases & Cloud'
  | 'AI & Developer Tools'
  | 'Architecture & Methodologies';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Proficient' | 'Advanced' | 'Working Knowledge';
  highlighted?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Academic / Teaching' | 'Engineering Project';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  contributions: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  summary: string;
  highlights: string[];
  thesis?: {
    title: string;
    description: string;
    systemUrl?: string;
  };
}

export type CertificationCategory = 
  | 'All'
  | 'Software Engineering'
  | 'AI & Developer Tools'
  | 'Networking & Systems'
  | 'Professional & Soft Skills'
  | 'Data & Analytics';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  category: CertificationCategory;
  verified: boolean;
}

export interface ProfileInfo {
  name: string;
  title: string;
  statusBadge: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  resumeDownloadUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  shortBio: string;
  engineeringPhilosophy: string[];
  whatIBuild: string[];
  currentlyMastering: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
