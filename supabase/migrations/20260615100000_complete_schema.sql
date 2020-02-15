-- PivotalStacks Database Schema and Sample Data
-- Run this in Supabase SQL Editor to create all tables and insert sample data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_suspended BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT DEFAULT 'PivotalStacks Team',
  read_time TEXT DEFAULT '5 min read',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- HERO SLIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cta_text TEXT DEFAULT 'Learn More',
  cta_link TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active hero slides are viewable by everyone" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage hero slides" ON hero_slides FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  category TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active services are viewable by everyone" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  year TEXT,
  size TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  highlights TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active projects are viewable by everyone" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_image TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active testimonials are viewable by everyone" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stats are viewable by everyone" ON stats FOR SELECT USING (true);
CREATE POLICY "Admins can manage stats" ON stats FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members are viewable by everyone" ON team_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage team members" ON team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  salary_range TEXT,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active jobs are viewable by everyone" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage jobs" ON jobs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  project_type TEXT,
  budget TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view all submissions" ON contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update submissions" ON contact_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- JOB APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id),
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'rejected', 'accepted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view all applications" ON job_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can apply for jobs" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update applications" ON job_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert Blog Posts
INSERT INTO blog_posts (title, excerpt, content, category, image_url, author_name, read_time, published_at) VALUES
('The Future of AI in Software Development', 'Explore how artificial intelligence is revolutionizing the way we build and maintain software systems.', '<p>Artificial Intelligence is transforming software development at an unprecedented pace...</p>', 'AI', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', 'David Chen', '8 min read', '2024-01-15'),
('React vs Vue: A Comprehensive Comparison', 'An in-depth look at two of the most popular JavaScript frameworks and when to use each.', '<p>Choosing between React and Vue can be challenging...</p>', 'Web Development', 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sarah Anderson', '12 min read', '2024-01-10'),
('Cloud Migration Best Practices', 'Essential strategies for successfully migrating your infrastructure to the cloud.', '<p>Cloud migration requires careful planning and execution...</p>', 'Cloud', 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800', 'Michael Rodriguez', '10 min read', '2024-01-05'),
('Building Cross-Platform Apps with Flutter', 'Why Flutter is becoming the go-to choice for mobile app development in 2024.', '<p>Flutter offers unmatched flexibility for cross-platform development...</p>', 'Mobile', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800', 'Emily Thompson', '7 min read', '2023-12-28'),
('How to Write a Resume That Gets Noticed', 'Tips and tricks for crafting a resume that stands out to recruiters and passes ATS systems.', '<p>A well-crafted resume is your ticket to your dream job...</p>', 'Career', 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800', 'PivotalStacks Team', '6 min read', '2023-12-20'),
('The Rise of Edge Computing', 'Understanding how edge computing is transforming data processing and IoT applications.', '<p>Edge computing is revolutionizing how we process data...</p>', 'Technology', 'https://images.pexels.com/photos/163064/pexels-photo-163064.jpeg?auto=compress&cs=tinysrgb&w=800', 'David Chen', '9 min read', '2023-12-15');

-- Insert Hero Slides
INSERT INTO hero_slides (title, subtitle, description, image_url, cta_text, cta_link, "order") VALUES
('Innovative Tech Solutions', 'DIGITAL TRANSFORMATION', 'Building cutting-edge web and mobile applications that drive business growth and deliver exceptional user experiences.', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Explore Services', '/services', 1),
('AI-Powered Resume Builder', 'CAREER ADVANCEMENT', 'Create professional resumes and cover letters in minutes with our AI-powered tools. Land your dream job faster.', 'https://images.pexels.com/photos/545068/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Try Resume Builder', '/services/resume-builder', 2),
('Expert Cloud Migration', 'ENTERPRISE SOLUTIONS', 'Seamlessly migrate your infrastructure to the cloud with our certified AWS, Azure, and GCP experts.', 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Get Started', '/services#cloud', 3),
('Custom Mobile Apps', 'MOBILE DEVELOPMENT', 'Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1920', 'View Portfolio', '/portfolio', 4),
('Machine Learning Solutions', 'AI & DATA SCIENCE', 'Leverage the power of AI with custom machine learning models, NLP, and predictive analytics.', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920', 'Learn More', '/services#ai', 5);

-- Insert Services
INSERT INTO services (title, description, icon, category, "order") VALUES
('Web Development', 'Full-stack web applications with React, Node.js, and modern frameworks delivering scalable solutions.', 'Code', 'Development', 1),
('Mobile Development', 'Native and cross-platform apps for iOS and Android using React Native and Flutter.', 'Smartphone', 'Development', 2),
('AI Solutions', 'Machine learning, NLP, and intelligent automation systems powered by latest AI tech.', 'Brain', 'Development', 3),
('Cloud Services', 'AWS, Azure, GCP migration and managed infrastructure with 24/7 support.', 'Cloud', 'Infrastructure', 4),
('UI/UX Design', 'User-centered design that combines aesthetics with functionality for exceptional experiences.', 'Palette', 'Design', 5),
('Resume Builder', 'AI-powered resume and cover letter generation with ATS-friendly templates.', 'FileText', 'Tools', 6);

-- Insert Projects
INSERT INTO projects (title, description, category, location, year, size, image_url, featured, highlights, tech) VALUES
('The Obsidian Tower', 'A striking 62-story commercial tower that redefines the Manhattan skyline with its distinctive black glass facade and innovative sustainability features.', 'commercial', 'New York, USA', '2023', '450,000 sq ft', 'https://images.pexels.com/photos/2199094/pexels-photo-2199094.jpeg?auto=compress&cs=tinysrgb&w=1260', true, ARRAY['LEED Platinum Certified', '62 Stories', 'Sky Garden', 'Panoramic Views'], ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS']),
('Meridian Residence', 'A luxurious private residence that seamlessly blends indoor and outdoor living against the backdrop of the Santa Monica mountains.', 'residential', 'Los Angeles, USA', '2022', '28,000 sq ft', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260', true, ARRAY['Infinity Pool', 'Wine Cellar', 'Home Theater'], ARRAY['Next.js', 'Prisma', 'MongoDB', 'Vercel']),
('Aurora Cultural Center', 'A state-of-the-art cultural complex featuring performance halls, galleries, and immersive art installations.', 'cultural', 'Tokyo, Japan', '2023', '180,000 sq ft', 'https://images.pexels.com/photos/954696/pexels-photo-954696.jpeg?auto=compress&cs=tinysrgb&w=1260', true, ARRAY['2,500-Seat Concert Hall', 'Interactive Galleries', 'Rooftop Garden'], ARRAY['React', 'GraphQL', 'Elasticsearch', 'Redis']),
('Stratford Office Campus', 'A modern office campus designed with biophilic principles, featuring extensive green spaces and natural light optimization.', 'commercial', 'London, UK', '2021', '350,000 sq ft', 'https://images.pexels.com/photos/1488230/pexels-photo-1488230.jpeg?auto=compress&cs=tinysrgb&w=1260', false, ARRAY['BREEAM Outstanding', 'Central Atrium', 'Green Terraces'], ARRAY['Vue.js', 'Python', 'Django', 'Azure']),
('Vista Resort & Spa', 'An exclusive retreat that harmonizes traditional Balinese architecture with contemporary luxury.', 'hospitality', 'Bali, Indonesia', '2022', '85,000 sq ft', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260', false, ARRAY['50 Private Villas', 'World-Class Spa', 'Beachfront'], ARRAY['React', 'Node.js', 'Stripe', 'Google Cloud']),
('Zenith Research Institute', 'A cutting-edge research facility designed to foster innovation and collaboration among scientists.', 'institutional', 'Singapore', '2023', '220,000 sq ft', 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260', false, ARRAY['Advanced Laboratories', 'Collaboration Spaces', 'Solar Power'], ARRAY['React', 'TypeScript', 'TensorFlow', 'AWS']);

-- Insert Testimonials
INSERT INTO testimonials (quote, author_name, author_role, author_image, "order") VALUES
('PivotalStacks transformed our entire digital infrastructure. Their expertise is unmatched.', 'Sarah Chen', 'CTO, TechFlow Inc', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', 1),
('The Resume Builder helped me land my dream job. The AI suggestions were incredibly helpful.', 'Michael Johnson', 'Software Engineer', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', 2),
('Their cloud migration was seamless. We were up and running in record time with zero downtime.', 'Emily Rodriguez', 'VP Engineering, DataCorp', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', 3);

-- Insert Stats
INSERT INTO stats (value, label, icon, "order") VALUES
('500+', 'Projects Delivered', 'Code', 1),
('98%', 'Client Satisfaction', 'Heart', 2),
('50+', 'Team Members', 'Users', 3),
('24/7', 'Support Available', 'Clock', 4);

-- Insert Team Members
INSERT INTO team_members (name, role, bio, image_url, "order") VALUES
('David Chen', 'CEO & Founder', 'Former Google engineer with 15+ years in software development. Passionate about building products that make a difference.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('Sarah Anderson', 'Chief Technology Officer', 'Architecture expert with experience at Microsoft and AWS. Leads our technical strategy and innovation.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
('Michael Rodriguez', 'Head of Design', 'Award-winning designer focused on creating exceptional user experiences and brand identities.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
('Emily Thompson', 'VP of Engineering', 'Full-stack expert leading our engineering teams to deliver scalable, high-performance solutions.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 4);

-- Insert Jobs
INSERT INTO jobs (title, department, location, type, description, requirements, salary_range) VALUES
('Senior Frontend Developer', 'Engineering', 'San Francisco, CA', 'Full-time', 'Lead frontend development for enterprise clients, mentoring junior developers, and building scalable web applications using React, TypeScript, and modern frameworks.', ARRAY['5+ years of professional frontend development experience', 'Expert knowledge of React, TypeScript, and state management', 'Experience with responsive design and performance optimization'], '$120,000 - $160,000'),
('Backend Engineer', 'Engineering', 'Remote', 'Full-time', 'Design and implement scalable backend systems, APIs, and microservices for our SaaS platform serving thousands of users.', ARRAY['4+ years of backend development experience', 'Proficiency in Node.js, Python, or Go', 'Experience with PostgreSQL, MongoDB, or similar databases'], '$100,000 - $140,000'),
('UI/UX Designer', 'Design', 'Los Angeles, CA', 'Full-time', 'Create stunning user interfaces and experiences for web and mobile applications, working closely with product and engineering teams.', ARRAY['3+ years of UI/UX design experience', 'Strong portfolio demonstrating design versatility', 'Proficiency in Figma, Sketch, or Adobe XD'], '$85,000 - $115,000'),
('DevOps Engineer', 'Engineering', 'New York, NY', 'Full-time', 'Manage and improve our cloud infrastructure, implement CI/CD pipelines, and ensure high availability and security.', ARRAY['4+ years of DevOps or SRE experience', 'Expert knowledge of AWS or GCP', 'Experience with Docker, Kubernetes, and Terraform'], '$110,000 - $150,000'),
('AI/ML Engineer', 'Engineering', 'Remote', 'Full-time', 'Develop and deploy machine learning models, natural language processing systems, and AI-powered features for our products.', ARRAY['3+ years of ML/AI development experience', 'Proficiency in Python, TensorFlow, or PyTorch', 'Experience with LLM integration and fine-tuning'], '$130,000 - $180,000'),
('Product Manager', 'Product', 'San Francisco, CA', 'Full-time', 'Lead product strategy, define roadmap priorities, and work with engineering and design to deliver exceptional SaaS products.', ARRAY['4+ years of product management experience', 'Experience with B2B SaaS products', 'Strong analytical and data-driven mindset'], '$100,000 - $140,000');

-- ============================================
-- FUNCTION TO AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FUNCTION TO UPDATE UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();