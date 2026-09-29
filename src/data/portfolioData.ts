import {
  ProfileInfo,
  Project,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from '../types/portfolio';

export const initialProfile: ProfileInfo = {
  name: 'Ahmed Liban Mohamed',
  title: 'Software Engineer',
  statusBadge: 'Software Engineering Graduate · Available for Engineering Roles',
  email: 'ahmedlibanmohamed89@gmail.com',
  phone: '+252 63 717 0860',
  location: 'Hargeisa, Somaliland',
  avatarUrl: '/pic.jpg',
  resumeDownloadUrl: '#resume',
  githubUrl: 'https://github.com/liban770',
  linkedinUrl: 'https://www.linkedin.com/in/ahmed-liban-1448b6283',
  shortBio:
    'Software Engineer with a degree in Software Engineering, specialized in designing and engineering scalable, secure, and user-centric web applications and operational management systems. Committed to clean architecture, robust relational data modeling, and modern developer tooling.',
  engineeringPhilosophy: [
    'Design for durability and clarity: Prioritize readable code, explicit data schemas, and domain-driven design before layering abstractions.',
    'Focus on tangible business workflows: Software exists to eliminate operational bottlenecks, reduce administrative overhead, and deliver reliable data.',
    'Continuous learning and modern practices: Actively integrate AI engineering tools (Copilot, Cursor), containerization, and modern TypeScript workflows into daily problem-solving.',
  ],
  whatIBuild: [
    'Multi-role institutional management systems with granular RBAC permissions.',
    'Full-stack operational platforms spanning relational database design to responsive frontend interfaces.',
    'Process automation tooling for academic defense tracking, corporate idea management, and attendance auditing.',
  ],
  currentlyMastering: [
    'PostgreSQL relational optimization & Supabase Row Level Security (RLS)',
    'Advanced TypeScript & Modern React server/client paradigms',
    'AI-assisted development pipelines and automated test suites',
  ],
};

export const initialProjects: Project[] = [
  {
    id: 'proj_1',
    slug: 'school-management-system',
    title: 'School Management System',
    subtitle: 'Comprehensive institutional operations, academic tracking, and student record platform',
    category: 'Enterprise Systems',
    coverImage: '/s.png',
    featured: true,
    githubUrl: 'https://github.com/liban770',
    liveUrl: '',
    duration: 'Multi-month development',
    role: 'Lead Full-Stack Software Engineer',
    overview:
      'An end-to-end institutional management platform designed to replace fragmented spreadsheets and manual record-keeping with a unified, relational database-driven operations center for educational institutions.',
    problem:
      'Educational institutions struggled with fragmented student archives, error-prone manual fee tracking, dislocated attendance records, and delayed report generation for parents and administrators.',
    solution:
      'Architected a centralized multi-role portal supporting administrators, teachers, and registrars. Developed relational schemas for enrollment, course scheduling, grading ledgers, and attendance aggregation.',
    architecture: {
      pattern: 'Modular MVC Web Architecture with strict database normalization',
      database: 'MySQL / Relational Database with indexed foreign keys and integrity constraints',
      authentication: 'Session-based role authentication with scoped permission gates',
      frontendStack: 'Responsive HTML5, Tailwind CSS, JavaScript',
      backendStack: 'PHP / Node.js backend controllers with RESTful service routes',
      summary:
        'Separates administrative data mutations from reporting views, guaranteeing acid compliance during grade input and batch student enrollment.',
    },
    techStack: ['JavaScript', 'PHP', 'MySQL', 'Tailwind CSS', 'HTML5', 'REST APIs'],
    keyFeatures: [
      'Comprehensive student profile & archival ledger with historical academic records',
      'Classroom scheduling, teacher assignments, and course registry',
      'Automated grade report calculation with cumulative GPA tabulation',
      'Daily attendance tracking module with anomaly flags',
      'Role-based access control preventing unauthorized grade alterations',
    ],
    challenges: [
      {
        challenge: 'Maintaining relational integrity across thousands of student grades and semester enrollments.',
        solution: 'Implemented cascading foreign key constraints, database transactions, and validation rules at both application and schema layers.',
      },
      {
        challenge: 'Designing a responsive UI accessible to administrative staff on standard office computers and mobile devices.',
        solution: 'Utilized mobile-first Tailwind utility grids and semantic tabular layouts with horizontal scroll affordances.',
      },
    ],
    results: [
      'Successfully consolidated enrollment, grading, and attendance workflows into a single administrative portal.',
      'Reduced student report generation time from days to instantaneous on-demand queries.',
      'Eliminated grade ledger discrepancy errors through server-enforced validation routines.',
    ],
    futureImprovements: [
      'Integration with SMS gateway for real-time parent notification on unexcused absences',
      'Export to standardized government academic data formats (PDF / CSV / XLSX)',
    ],
    published: true,
    order: 1,
  },
  {
    id: 'proj_2',
    slug: 'fyp-defense-management-system',
    title: 'Final Year Project Defense System',
    subtitle: 'Academic thesis workflow, supervisor assignment, and defense evaluation engine',
    category: 'Academic Tech',
    coverImage: '/fyp.png',
    featured: true,
    githubUrl: 'https://github.com/liban770',
    liveUrl: '',
    duration: 'Capstone & Production Deployment',
    role: 'Software Engineer & System Architect',
    overview:
      'An academic governance platform that streamlines the university degree thesis lifecycle: proposal submission, faculty supervisor allocation, defense scheduling, panel rubrics, and automated score consolidation.',
    problem:
      'Final year project management traditionally involved chaotic manual paperwork, schedule conflicts among external defense juries, mismatched supervisor workloads, and delayed thesis sign-offs.',
    solution:
      'Built a dedicated workflow portal where students submit proposals, committee heads assign faculty advisors based on research domain, and defense panels submit standardized electronic rubric evaluations in real time.',
    architecture: {
      pattern: 'State-Machine Workflow Architecture with event-driven status transitions',
      database: 'Relational database schema with strict audit trail logging',
      authentication: 'Multi-tiered access control (Student, Supervisor, Jury Member, Academic Dean)',
      frontendStack: 'Modern responsive interface, dynamic rubric calculators',
      backendStack: 'Structured API controllers with stage validation middleware',
      summary:
        'Enforces state machine progression: Proposal Submitted -> Under Review -> Approved -> Defense Scheduled -> Evaluated -> Archived.',
    },
    techStack: ['JavaScript', 'Tailwind CSS', 'PHP / Node.js', 'MySQL', 'Relational Modeling'],
    keyFeatures: [
      'Structured proposal submission portal with abstract, methodology, and team member tracking',
      'Dean / Administrator panel for supervisor workload balancing and panel jury assignment',
      'Live defense evaluation rubric scoring with automatic weighted average calculation',
      'Comprehensive defense scheduling calendar preventing venue and faculty time conflicts',
      'Permanent digital archive of approved thesis abstracts and final defense verdicts',
    ],
    challenges: [
      {
        challenge: 'Preventing grade tampering while allowing multiple jury members to evaluate simultaneously.',
        solution: 'Built immutable per-evaluator submission records that lock once committed, aggregating only on the coordinator dashboard.',
      },
      {
        challenge: 'Handling complex stage prerequisites (e.g. students cannot defend without supervisor clearance).',
        solution: 'Implemented strict middleware guard clauses verifying milestone approval flags before unlocking defense scheduling.',
      },
    ],
    results: [
      'Served as major university capstone project demonstrating software engineering rigor.',
      'Eliminated defense scheduling overlaps and manual tally errors across graduating cohorts.',
      'Provided transparent audit trails for academic faculty committees.',
    ],
    futureImprovements: [
      'Automated plagiarism pre-check integration via API',
      'Automated digital credential generation upon successful defense sign-off',
    ],
    published: true,
    order: 2,
  },
  {
    id: 'proj_3',
    slug: 'student-attendance-management-system',
    title: 'Student Attendance Management System',
    subtitle: 'High-efficiency daily attendance logging and institutional compliance reporting',
    category: 'Web Applications',
    coverImage: '/school.png',
    featured: false,
    githubUrl: 'https://github.com/liban770',
    liveUrl: '',
    duration: 'Production System',
    role: 'Full-Stack Developer',
    overview:
      'A dedicated attendance recording and verification engine built for educational institutes to capture student presence with minimal classroom friction and generate instant absentee alerts.',
    problem:
      'Paper roll calls wasted 10–15 minutes per lecture, led to lost physical sheets, and delayed absence tracking until end of term.',
    solution:
      'Constructed a lightweight, mobile-responsive attendance logging interface enabling instructors to record class rosters in under 30 seconds with instant database persistence and status aggregation.',
    architecture: {
      pattern: 'Lightweight Client-Server Architecture optimized for low-latency batch writes',
      database: 'Relational table with composite unique index on (student_id, course_id, date)',
      authentication: 'Instructor session authentication with course authorization checks',
      frontendStack: 'Tailwind CSS, Vanilla JavaScript with optimistic UI toggles',
      backendStack: 'Secure REST endpoints validating course enrollment rosters',
      summary:
        'Batches attendance state submissions into single atomic SQL transactions to handle intermittent classroom network connectivity.',
    },
    techStack: ['JavaScript', 'HTML5', 'Tailwind CSS', 'PHP', 'MySQL', 'Relational Design'],
    keyFeatures: [
      'One-tap toggle for Present, Absent, Excused, and Tardy statuses',
      'Batch roster submission with optimistic local UI response',
      'Daily, weekly, and monthly attendance percentages calculated automatically',
      'Warning thresholds for students falling below mandatory 75% attendance limits',
      'Clean printable report generation for faculty deans',
    ],
    challenges: [
      {
        challenge: 'Instructors taking attendance on weak mobile networks causing dropped updates.',
        solution: 'Engineered client-side state caching with retry queue and visual confirmation cues.',
      },
      {
        challenge: 'Duplicate record creation on rapid successive clicks.',
        solution: 'Applied database-level composite unique constraints and button debounce mechanisms.',
      },
    ],
    results: [
      'Cut attendance logging overhead from 15 minutes to under 45 seconds per classroom.',
      'Provided administrative deans with real-time visibility into student attendance health.',
    ],
    published: true,
    order: 3,
  },
  {
    id: 'proj_4',
    slug: 'soltaco-staff-report-system',
    title: 'Soltaco Staff Report & Innovation Portal',
    subtitle: 'Internal corporate feedback, employee proposal collection, and approval workflows',
    category: 'Internal Tools',
    coverImage: '/sol.png',
    featured: false,
    githubUrl: 'https://github.com/liban770',
    liveUrl: '',
    duration: 'Internal Tooling',
    role: 'Systems Developer',
    overview:
      'An internal workplace collaboration platform engineered for Soltaco staff to submit daily operational reports, suggest workflow innovations, and receive tracked managerial feedback.',
    problem:
      'Employee daily operational feedback and process suggestions were lost in informal messaging channels, leading to unaddressed issues and unacknowledged employee ideas.',
    solution:
      'Designed a structured communication hub with category-tagged submissions, manager approval/rejection queues, prioritized status boards, and action-item tracking.',
    architecture: {
      pattern: 'Role-Based Workflow Engine with audit trail',
      database: 'Relational structure linking reports, status logs, and reviewer remarks',
      authentication: 'Secure departmental authentication',
      frontendStack: 'Tailwind CSS, JavaScript component views',
      backendStack: 'API server validating status mutations',
      summary:
        'Enforces accountability by timestamping managerial reviews and logging reason codes for rejected or accepted suggestions.',
    },
    techStack: ['JavaScript', 'PHP', 'MySQL', 'Tailwind CSS', 'HTML5', 'Workflow Modeling'],
    keyFeatures: [
      'Categorized suggestion & incident reporting form with file attachment capability',
      'Managerial triage queue with Approve, Reject, and Request Clarification actions',
      'Staff dashboard showing live review progression and manager feedback',
      'Departmental metrics on submission volume and resolution rates',
    ],
    challenges: [
      {
        challenge: 'Encouraging employee engagement through a clear, transparent status feedback loop.',
        solution: 'Designed an intuitive status timeline showing exactly where each proposal stands in the review pipeline.',
      },
    ],
    results: [
      'Replaced ad-hoc messaging with a clear, auditable operational ledger.',
      'Empowered cross-departmental idea sharing and accelerated management response times.',
    ],
    published: true,
    order: 4,
  },
  {
    id: 'proj_5',
    slug: 'business-technology-blog',
    title: 'Business & Technology Publishing Platform',
    subtitle: 'Dynamic content publishing platform with rich editorial layout and category indexing',
    category: 'Web Applications',
    coverImage: '/b.png',
    featured: false,
    githubUrl: 'https://github.com/liban770',
    liveUrl: '',
    duration: 'Content Platform',
    role: 'Frontend & Full-Stack Developer',
    overview:
      'A responsive publishing engine designed for sharing technical articles, corporate updates, and industry insights with fast page loads, readable typography, and SEO metadata.',
    problem:
      'Traditional CMS platforms suffered from heavy asset bloat, slow page load times, and poor mobile readability for long-form technical prose.',
    solution:
      'Built a clean, minimalist publishing platform with optimized asset delivery, semantic HTML5 structure, structured category navigation, and responsive typography.',
    architecture: {
      pattern: 'Content Management Architecture with caching headers and semantic routing',
      database: 'Normalized articles and taxonomy database',
      authentication: 'Author and Editor administrative login',
      frontendStack: 'Tailwind typography, responsive layout system',
      backendStack: 'RESTful API with slug generation and metadata generation',
      summary: 'Focused on editorial legibility, fast time-to-first-byte, and structured OpenGraph sharing tags.',
    },
    techStack: ['JavaScript', 'Tailwind CSS', 'PHP / Node.js', 'MySQL', 'SEO Architecture'],
    keyFeatures: [
      'Semantic article reader with clean typographical scale and line-length constraints',
      'Category and tag navigation for structured content discovery',
      'OpenGraph and social metadata rendering for rich preview cards',
      'Author editorial management dashboard for drafting and publishing',
    ],
    challenges: [
      {
        challenge: 'Maintaining reading comfort across varied screen sizes and ambient lighting.',
        solution: 'Implemented optimal 65–75 character measure with balanced line-heights and high-contrast color tokens.',
      },
    ],
    results: [
      'Achieved sub-second page loads and high editorial usability scores.',
      'Demonstrated full-lifecycle content publishing and search-optimized semantic structuring.',
    ],
    published: true,
    order: 5,
  },
];

export const initialSkills: SkillItem[] = [
  // Languages
  { id: 'sk_1', name: 'JavaScript (ES6+)', category: 'Languages', level: 'Proficient', highlighted: true },
  { id: 'sk_2', name: 'TypeScript', category: 'Languages', level: 'Advanced', highlighted: true },
  { id: 'sk_3', name: 'PHP', category: 'Languages', level: 'Proficient', highlighted: true },
  { id: 'sk_4', name: 'Python', category: 'Languages', level: 'Working Knowledge' },
  { id: 'sk_5', name: 'SQL', category: 'Languages', level: 'Proficient', highlighted: true },
  { id: 'sk_6', name: 'HTML5 & Semantic Markup', category: 'Languages', level: 'Proficient' },
  { id: 'sk_7', name: 'CSS3 & Modern Layouts', category: 'Languages', level: 'Proficient' },

  // Frontend
  { id: 'sk_8', name: 'React', category: 'Frontend', level: 'Proficient', highlighted: true },
  { id: 'sk_9', name: 'Tailwind CSS', category: 'Frontend', level: 'Proficient', highlighted: true },
  { id: 'sk_10', name: 'Responsive Web Design', category: 'Frontend', level: 'Proficient' },
  { id: 'sk_11', name: 'DOM Manipulation & Web APIs', category: 'Frontend', level: 'Proficient' },
  { id: 'sk_12', name: 'Component-Driven Architecture', category: 'Frontend', level: 'Advanced', highlighted: true },

  // Backend
  { id: 'sk_13', name: 'Node.js & Express', category: 'Backend', level: 'Proficient', highlighted: true },
  { id: 'sk_14', name: 'RESTful API Engineering', category: 'Backend', level: 'Proficient', highlighted: true },
  { id: 'sk_15', name: 'PHP MVC Systems', category: 'Backend', level: 'Proficient' },
  { id: 'sk_16', name: 'Authentication (Sessions & Tokens)', category: 'Backend', level: 'Proficient' },
  { id: 'sk_17', name: 'Role-Based Access Control (RBAC)', category: 'Backend', level: 'Advanced', highlighted: true },

  // Databases & Cloud
  { id: 'sk_18', name: 'PostgreSQL', category: 'Databases & Cloud', level: 'Proficient', highlighted: true },
  { id: 'sk_19', name: 'MySQL', category: 'Databases & Cloud', level: 'Proficient', highlighted: true },
  { id: 'sk_20', name: 'Supabase (DB, Auth, Storage, RLS)', category: 'Databases & Cloud', level: 'Working Knowledge', highlighted: true },
  { id: 'sk_21', name: 'Relational Schema Design & Normalization', category: 'Databases & Cloud', level: 'Advanced' },

  // AI & Developer Tools
  { id: 'sk_22', name: 'GitHub Copilot & Cursor AI Workflows', category: 'AI & Developer Tools', level: 'Advanced', highlighted: true },
  { id: 'sk_23', name: 'Git & Version Control', category: 'AI & Developer Tools', level: 'Proficient', highlighted: true },
  { id: 'sk_24', name: 'Vite & Build Tooling', category: 'AI & Developer Tools', level: 'Proficient' },
  { id: 'sk_25', name: 'Linux Command Line', category: 'AI & Developer Tools', level: 'Working Knowledge' },

  // Architecture & Methodologies
  { id: 'sk_26', name: 'Clean Architecture Principles', category: 'Architecture & Methodologies', level: 'Proficient' },
  { id: 'sk_27', name: 'Database Query Optimization', category: 'Architecture & Methodologies', level: 'Working Knowledge' },
  { id: 'sk_28', name: 'Agile & Iterative Development', category: 'Architecture & Methodologies', level: 'Proficient' },
  { id: 'sk_29', name: 'Technical Documentation & Architecture Review', category: 'Architecture & Methodologies', level: 'Proficient' },
];

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert_1',
    title: 'Bachelor Degree in Software Engineering',
    issuer: 'University Faculty of Computing & Engineering',
    issueDate: 'Graduated',
    category: 'Software Engineering',
    verified: true,
  },
  {
    id: 'cert_2',
    title: 'AI Coding Agents with GitHub Copilot and Cursor',
    issuer: 'LinkedIn Learning',
    issueDate: 'Professional Credential',
    category: 'AI & Developer Tools',
    credentialUrl: 'https://www.linkedin.com/in/ahmed-liban-1448b6283',
    verified: true,
  },
  {
    id: 'cert_3',
    title: 'Diploma of ICT & Computer Science',
    issuer: 'Tisqaad Computer Science',
    issueDate: 'Diploma Certification',
    category: 'Software Engineering',
    verified: true,
  },
  {
    id: 'cert_4',
    title: 'Network Career Growth',
    issuer: 'HP LIFE',
    issueDate: 'Credential Verification',
    category: 'Networking & Systems',
    verified: true,
  },
  {
    id: 'cert_5',
    title: 'Data Science & Analytics',
    issuer: 'Technical Training Program',
    issueDate: 'Professional Specialization',
    category: 'Data & Analytics',
    verified: true,
  },
  {
    id: 'cert_6',
    title: 'Interpersonal Communication',
    issuer: 'LinkedIn Learning',
    issueDate: 'Professional Credential',
    category: 'Professional & Soft Skills',
    credentialUrl: 'https://www.linkedin.com/in/ahmed-liban-1448b6283',
    verified: true,
  },
  {
    id: 'cert_7',
    title: 'Active Listening: The Secret to Effective Communication',
    issuer: 'Professional Development Credential',
    issueDate: 'Professional Development',
    category: 'Professional & Soft Skills',
    verified: true,
  },
  {
    id: 'cert_8',
    title: 'Teacher Training & Technical Instruction',
    issuer: 'Mandeeq',
    issueDate: 'Instructional Certificate',
    category: 'Professional & Soft Skills',
    verified: true,
  },
  {
    id: 'cert_9',
    title: 'Diploma in English Language',
    issuer: 'Iqra College',
    issueDate: 'Academic Diploma',
    category: 'Professional & Soft Skills',
    verified: true,
  },
  {
    id: 'cert_10',
    title: 'Social Media Marketing & Digital Strategy',
    issuer: 'Professional Certification',
    issueDate: 'Digital Strategy',
    category: 'Professional & Soft Skills',
    verified: true,
  },
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu_1',
    institution: 'University Computing & Engineering Faculty',
    degree: 'Bachelor of Science in Software Engineering',
    fieldOfStudy: 'Software Engineering & Computer Systems',
    location: 'Somaliland',
    startDate: '2020',
    endDate: 'Graduated',
    summary:
      'Rigorous software engineering curriculum emphasizing algorithms, data structures, software architecture, relational database management systems, object-oriented design, web application development, and software testing.',
    highlights: [
      'Advanced coursework: Relational Databases (MySQL/PostgreSQL), Web Engineering, Distributed Systems, Software Requirements & Architecture.',
      'Developed multiple production-style full stack applications addressing local enterprise and academic operational needs.',
    ],
    thesis: {
      title: 'Final Year Capstone: University Supervisor & Admin Thesis Defense Management Platform',
      description:
        'Architected a multi-role web platform that orchestrates the entire university defense cycle: submission vetting, supervisor quotas, defense scheduling, and electronic panel rubric evaluations.',
    },
  },
  {
    id: 'edu_2',
    institution: 'Tisqaad Computer Science Institute',
    degree: 'Diploma of ICT & Computer Science',
    fieldOfStudy: 'Information & Communications Technology',
    location: 'Somaliland',
    startDate: 'Foundation Period',
    endDate: 'Completed',
    summary:
      'Core foundation in computer systems, networking basics, programming fundamentals, and system troubleshooting.',
    highlights: [
      'Gained deep technical baseline in networking protocols, hardware architecture, and structured programming.',
    ],
  },
];

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp_1',
    company: 'Independent Software Engineering Projects',
    role: 'Full-Stack Software Engineer',
    location: 'Hargeisa, Somaliland',
    type: 'Engineering Project',
    startDate: '2023',
    endDate: 'Present',
    isCurrent: true,
    summary:
      'Architecting and building production-grade web systems for education, internal reporting, and business publishing with emphasis on clean schemas and modern interfaces.',
    contributions: [
      'Engineered an end-to-end School Management System managing student records, grade ledgers, and attendance tracking.',
      'Architected the Capstone Thesis Defense Management Platform with stage-gate validation and electronic jury rubric evaluations.',
      'Built high-speed attendance logging systems reducing classroom administration time by over 80%.',
      'Developed corporate idea collection and managerial approval workflows for Soltaco staff.',
    ],
    technologies: ['TypeScript', 'JavaScript', 'React', 'PHP', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'exp_2',
    company: 'Educational Instruction & Mentorship',
    role: 'Technical Instructor & Mentor',
    location: 'Somaliland',
    type: 'Academic / Teaching',
    startDate: '2023',
    endDate: '2024',
    isCurrent: false,
    summary:
      'Delivered structured instruction in computer science principles, web technologies, and software development fundamentals following Mandeeq Teacher Training accreditation.',
    contributions: [
      'Taught foundational computing, logic building, and introductory web development to students.',
      'Prepared practical lab assessments and guided students through real project-building sessions.',
      'Applied active listening and structured communication techniques to ensure concept retention.',
    ],
    technologies: ['Curriculum Design', 'Technical Instruction', 'Active Listening', 'Computer Fundamentals'],
  },
];
