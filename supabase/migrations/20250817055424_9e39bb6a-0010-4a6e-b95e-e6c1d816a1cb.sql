-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.assets CASCADE;
DROP TABLE IF EXISTS public.bids CASCADE;
DROP TABLE IF EXISTS public.campaigns CASCADE;
DROP TABLE IF EXISTS public.dao_members CASCADE;
DROP TABLE IF EXISTS public.daos CASCADE;
DROP TABLE IF EXISTS public.proposal_votes CASCADE;
DROP TABLE IF EXISTS public.proposals CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Create comprehensive schema for DSA practice platform

-- User profiles table with mobile number support
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT, -- International format support
  country_code TEXT DEFAULT '+91',
  avatar_url TEXT,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'premium')),
  sheets_created INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- DSA Sheets table
CREATE TABLE public.dsa_sheets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  total_problems INTEGER DEFAULT 0,
  solved_problems INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'mixed' CHECK (difficulty IN ('easy', 'medium', 'hard', 'mixed')),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Companies table for 900+ companies
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  industry TEXT,
  company_size TEXT,
  headquarters TEXT,
  description TEXT,
  total_problems INTEGER DEFAULT 0,
  easy_problems INTEGER DEFAULT 0,
  medium_problems INTEGER DEFAULT 0,
  hard_problems INTEGER DEFAULT 0,
  is_hiring BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Problems table for 3600+ company problems
CREATE TABLE public.problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topics TEXT[] DEFAULT '{}',
  company_ids UUID[] DEFAULT '{}',
  leetcode_url TEXT,
  practice_url TEXT,
  video_url TEXT,
  solution_approach TEXT,
  hints TEXT[],
  time_complexity TEXT,
  space_complexity TEXT,
  acceptance_rate DECIMAL,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User problem solutions tracking
CREATE TABLE public.user_solutions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('attempted', 'solved', 'reviewed')),
  solution_code TEXT,
  language TEXT,
  time_taken INTEGER, -- in minutes
  notes TEXT,
  solved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Jobs table for job portal
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'internship', 'contract')),
  work_mode TEXT CHECK (work_mode IN ('remote', 'onsite', 'hybrid')),
  experience_level TEXT CHECK (experience_level IN ('fresher', 'junior', 'mid', 'senior', 'lead')),
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'INR',
  description TEXT,
  requirements TEXT[],
  skills TEXT[],
  apply_url TEXT,
  source TEXT,
  is_active BOOLEAN DEFAULT true,
  posted_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Job applications tracking
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'screening', 'interview', 'rejected', 'offer', 'accepted')),
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  author_name TEXT,
  author_avatar TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  read_time INTEGER, -- in minutes
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Career roadmaps table
CREATE TABLE public.roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  role_type TEXT NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration TEXT, -- e.g., "3-6 months"
  steps JSONB, -- Array of roadmap steps
  skills TEXT[],
  prerequisites TEXT[],
  is_published BOOLEAN DEFAULT true,
  is_coming_soon BOOLEAN DEFAULT false,
  icon_url TEXT,
  banner_url TEXT,
  completion_rate DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Platform statistics
CREATE TABLE public.platform_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_name TEXT NOT NULL UNIQUE,
  stat_value INTEGER NOT NULL,
  stat_label TEXT NOT NULL,
  stat_description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial platform statistics
INSERT INTO public.platform_stats (stat_name, stat_value, stat_label, stat_description, display_order) VALUES
('community_members', 37119, 'Active Community Members', 'Freshers helping freshers', 1),
('monthly_readers', 923117, 'Monthly Readers', 'Tech career content', 2),
('linkedin_followers', 42528, 'LinkedIn Followers', 'Professional network', 3),
('registered_users', 97058, 'Registered Users', 'Career focused freshers', 4);

-- Insert sample companies
INSERT INTO public.companies (name, logo_url, website_url, industry, total_problems, easy_problems, medium_problems, hard_problems, is_hiring) VALUES
('Google', '/company-logos/google.png', 'https://careers.google.com', 'Technology', 324, 98, 156, 70, true),
('Microsoft', '/company-logos/microsoft.png', 'https://careers.microsoft.com', 'Technology', 287, 89, 134, 64, true),
('Amazon', '/company-logos/amazon.png', 'https://amazon.jobs', 'E-commerce/Cloud', 412, 124, 198, 90, true),
('Apple', '/company-logos/apple.png', 'https://jobs.apple.com', 'Technology', 198, 67, 89, 42, true),
('Meta', '/company-logos/meta.png', 'https://careers.meta.com', 'Social Media', 245, 78, 112, 55, true),
('Netflix', '/company-logos/netflix.png', 'https://jobs.netflix.com', 'Streaming/Entertainment', 156, 45, 78, 33, true),
('Uber', '/company-logos/uber.png', 'https://careers.uber.com', 'Transportation', 189, 56, 89, 44, true),
('Airbnb', '/company-logos/airbnb.png', 'https://careers.airbnb.com', 'Travel/Hospitality', 134, 41, 67, 26, true);

-- Insert sample problems
INSERT INTO public.problems (title, slug, description, difficulty, topics, company_ids, leetcode_url, practice_url, time_complexity, space_complexity, acceptance_rate) VALUES
('Two Sum', 'two-sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'easy', '{"array", "hash-table"}', (SELECT ARRAY[id] FROM companies WHERE name = 'Google' LIMIT 1), 'https://leetcode.com/problems/two-sum/', 'https://leetcode.com/problems/two-sum/', 'O(n)', 'O(n)', 54.2),
('Add Two Numbers', 'add-two-numbers', 'You are given two non-empty linked lists representing two non-negative integers.', 'medium', '{"linked-list", "math", "recursion"}', (SELECT ARRAY[id] FROM companies WHERE name = 'Amazon' LIMIT 1), 'https://leetcode.com/problems/add-two-numbers/', 'https://leetcode.com/problems/add-two-numbers/', 'O(max(m,n))', 'O(max(m,n))', 39.8),
('Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 'Given a string s, find the length of the longest substring without repeating characters.', 'medium', '{"hash-table", "string", "sliding-window"}', (SELECT ARRAY[id] FROM companies WHERE name = 'Microsoft' LIMIT 1), 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'O(n)', 'O(min(m,n))', 33.9);

-- Insert sample articles
INSERT INTO public.articles (title, slug, excerpt, content, author_name, category, tags, is_featured, read_time, published_at) VALUES
('Complete Guide to System Design Interviews', 'system-design-interview-guide', 'Master system design interviews with this comprehensive guide covering all essential topics.', 'Content here...', 'Tech Expert', 'Interview Preparation', '{"system-design", "interviews", "backend"}', true, 15, now()),
('DSA Practice Roadmap for Beginners', 'dsa-practice-roadmap-beginners', 'Step-by-step guide to master Data Structures and Algorithms from scratch.', 'Content here...', 'DSA Master', 'Learning Path', '{"dsa", "algorithms", "beginner"}', true, 12, now()),
('Top 10 Companies Hiring Freshers in 2024', 'top-companies-hiring-freshers-2024', 'Discover the best companies actively recruiting fresh graduates this year.', 'Content here...', 'Career Guide', 'Career Advice', '{"jobs", "freshers", "hiring"}', true, 8, now());

-- Insert sample roadmaps
INSERT INTO public.roadmaps (title, slug, description, role_type, difficulty_level, estimated_duration, skills, is_coming_soon) VALUES
('Software Engineer Roadmap', 'software-engineer-roadmap', 'Complete roadmap to become a software engineer', 'Software Engineer', 'beginner', '6-12 months', '{"javascript", "react", "nodejs", "databases"}', false),
('Frontend Developer Path', 'frontend-developer-path', 'Master frontend development with modern tools', 'Frontend Developer', 'beginner', '4-8 months', '{"html", "css", "javascript", "react", "typescript"}', false),
('Data Analyst Roadmap', 'data-analyst-roadmap', 'Complete guide to becoming a data analyst', 'Data Analyst', 'intermediate', '8-12 months', '{"python", "sql", "excel", "tableau", "statistics"}', true);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dsa_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for dsa_sheets
CREATE POLICY "Users can view public sheets and own sheets" ON public.dsa_sheets FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can create their own sheets" ON public.dsa_sheets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sheets" ON public.dsa_sheets FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for companies and problems (public read)
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Problems are viewable by everyone" ON public.problems FOR SELECT USING (true);

-- RLS Policies for user solutions
CREATE POLICY "Users can view their own solutions" ON public.user_solutions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own solutions" ON public.user_solutions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own solutions" ON public.user_solutions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for jobs
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);

-- RLS Policies for job applications
CREATE POLICY "Users can view their own applications" ON public.job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own applications" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for articles and roadmaps (public read)
CREATE POLICY "Published articles are viewable by everyone" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Published roadmaps are viewable by everyone" ON public.roadmaps FOR SELECT USING (is_published = true);
CREATE POLICY "Platform stats are viewable by everyone" ON public.platform_stats FOR SELECT USING (is_active = true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, username, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data ->> 'full_name', 'User')
  );
  RETURN new;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dsa_sheets_updated_at BEFORE UPDATE ON public.dsa_sheets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_problems_updated_at BEFORE UPDATE ON public.problems FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_solutions_updated_at BEFORE UPDATE ON public.user_solutions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_roadmaps_updated_at BEFORE UPDATE ON public.roadmaps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_dsa_sheets_user_id ON public.dsa_sheets(user_id);
CREATE INDEX idx_dsa_sheets_public ON public.dsa_sheets(is_public) WHERE is_public = true;
CREATE INDEX idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX idx_problems_company_ids ON public.problems USING GIN(company_ids);
CREATE INDEX idx_user_solutions_user_id ON public.user_solutions(user_id);
CREATE INDEX idx_user_solutions_problem_id ON public.user_solutions(problem_id);
CREATE INDEX idx_jobs_active ON public.jobs(is_active) WHERE is_active = true;
CREATE INDEX idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX idx_articles_published ON public.articles(is_published) WHERE is_published = true;
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_roadmaps_published ON public.roadmaps(is_published) WHERE is_published = true;