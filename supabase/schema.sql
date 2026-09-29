-- ====================================================================
-- Ahmed Liban Mohamed | Senior Software Engineer Portfolio Database
-- PostgreSQL & Supabase Production Schema with Row Level Security (RLS)
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Singleton or per-user)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    avatar_url TEXT,
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Technologies Table
CREATE TABLE IF NOT EXISTS public.technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'Language', 'Frontend', 'Backend', 'Database', 'DevOps', 'AI'
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Enterprise Systems', 'Academic Tech', 'Web Applications', 'Internal Tools'
    cover_image TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    github_url TEXT,
    live_url TEXT,
    duration TEXT,
    role TEXT NOT NULL,
    overview TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    architecture JSONB DEFAULT '{}'::jsonb, -- { pattern, database, authentication, frontendStack, backendStack, summary }
    tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
    key_features TEXT[] DEFAULT ARRAY[]::TEXT[],
    challenges JSONB DEFAULT '[]'::jsonb, -- [ { challenge, solution } ]
    results TEXT[] DEFAULT ARRAY[]::TEXT[],
    future_improvements TEXT[] DEFAULT ARRAY[]::TEXT[],
    published BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Project Technologies (Junction Table)
CREATE TABLE IF NOT EXISTS public.project_technologies (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    technology_id UUID REFERENCES public.technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

-- 6. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Languages', 'Frontend', 'Backend', 'Databases & Cloud', 'AI & Developer Tools', 'Architecture & Methodologies'
    proficiency_level TEXT DEFAULT 'Proficient', -- 'Proficient', 'Advanced', 'Working Knowledge'
    years_experience NUMERIC(3,1),
    highlighted BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT,
    type TEXT NOT NULL, -- 'Full-time', 'Contract', 'Academic / Teaching', 'Engineering Project'
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    summary TEXT NOT NULL,
    contributions TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    location TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    grade TEXT,
    summary TEXT NOT NULL,
    highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
    thesis_title TEXT,
    thesis_description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_id TEXT,
    credential_url TEXT,
    category TEXT NOT NULL, -- 'Software Engineering', 'AI & Developer Tools', 'Networking & Systems', 'Professional & Soft Skills', 'Data & Analytics'
    verified BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- Indexes for Performance
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_projects_published_order ON public.projects(published, sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_certifications_category ON public.certifications(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- ====================================================================
-- Row Level Security (RLS)
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Anonymous and Authenticated can read published portfolio data)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public technologies are viewable by everyone" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public education are viewable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public certifications are viewable by everyone" ON public.certifications FOR SELECT USING (true);

-- Contact Messages Policies:
-- 1. Anyone (public anonymous) can submit a contact message
CREATE POLICY "Anyone can insert contact message" ON public.contact_messages 
    FOR INSERT WITH CHECK (true);

-- 2. Only authenticated owner can read contact messages
CREATE POLICY "Only authenticated users can read messages" ON public.contact_messages 
    FOR SELECT TO authenticated USING (true);

-- Authenticated write/update policies for admin ownership
CREATE POLICY "Authenticated users can manage projects" ON public.projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage skills" ON public.skills
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage certs" ON public.certifications
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage experiences" ON public.experiences
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage education" ON public.education
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
