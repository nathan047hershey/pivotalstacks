-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  salary_range TEXT,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied'))
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  "order" INTEGER DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Projects policies (public read, authenticated write)
CREATE POLICY "select_projects" ON projects FOR SELECT
  TO public USING (true);

CREATE POLICY "insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- Jobs policies (public read, authenticated write)
CREATE POLICY "select_jobs" ON jobs FOR SELECT
  TO public USING (true);

CREATE POLICY "insert_jobs" ON jobs FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_jobs" ON jobs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_jobs" ON jobs FOR DELETE
  TO authenticated USING (true);

-- Contact submissions policies
CREATE POLICY "insert_contact_submissions" ON contact_submissions FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "select_contact_submissions" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "update_contact_submissions" ON contact_submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Team members policies (public read, authenticated write)
CREATE POLICY "select_team_members" ON team_members FOR SELECT
  TO public USING (true);

CREATE POLICY "insert_team_members" ON team_members FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_team_members" ON team_members FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_team_members" ON team_members FOR DELETE
  TO authenticated USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO projects (title, description, category, image_url, featured) VALUES
('The Obsidian Tower', 'A striking 62-story commercial tower that redefines the Manhattan skyline with its distinctive black glass facade and innovative sustainability features.', 'commercial', 'https://images.pexels.com/photos/2199094/pexels-photo-2199094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true),
('Meridian Residence', 'A luxurious private residence that seamlessly blends indoor and outdoor living against the backdrop of the Santa Monica mountains.', 'residential', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true),
('Aurora Cultural Center', 'A state-of-the-art cultural complex featuring performance halls, galleries, and immersive art installations.', 'cultural', 'https://images.pexels.com/photos/954696/pexels-photo-954696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true),
('Stratford Office Campus', 'A modern office campus designed with biophilic principles, featuring extensive green spaces and natural light optimization.', 'commercial', 'https://images.pexels.com/photos/1488230/pexels-photo-1488230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', false),
('Vista Resort & Spa', 'An exclusive retreat that harmonizes traditional Balinese architecture with contemporary luxury.', 'hospitality', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', false);

INSERT INTO jobs (title, department, location, type, description, requirements, salary_range) VALUES
('Senior Architect', 'Design', 'New York, NY', 'Full-time', 'Lead design initiatives for high-profile projects, mentoring junior architects, and collaborating with clients to bring their visions to life.', ARRAY['10+ years of professional architectural experience', 'Licensed Architect (AIA preferred)', 'Experience with large-scale commercial projects', 'Strong leadership and communication skills', 'Proficiency in AutoCAD, Revit, and Rhino'], '$120,000 - $165,000'),
('Interior Designer', 'Interior Architecture', 'Los Angeles, CA', 'Full-time', 'Create stunning interior spaces that blend aesthetics with functionality, working on residential and commercial projects.', ARRAY['5+ years of interior design experience', 'NCIDQ certification preferred', 'Strong portfolio demonstrating design versatility', 'Experience with sustainable design practices', 'Proficiency in SketchUp, V-Ray, and Adobe Creative Suite'], '$75,000 - $95,000'),
('Project Manager', 'Project Management', 'London, UK', 'Full-time', 'Oversee project timelines, budgets, and stakeholder communications for multiple concurrent architectural projects.', ARRAY['7+ years of project management experience in architecture', 'PMP certification preferred', 'Experience managing projects over $50M', 'Excellent negotiation and communication skills', 'International project experience a plus'], '£70,000 - £95,000');

INSERT INTO team_members (name, role, bio, image_url, "order") VALUES
('Alexander Sterling', 'Founding Principal', 'With over 30 years of experience, Alexander leads Aurelius with visionary leadership and unwavering commitment to excellence.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('Victoria Chen', 'Design Director', 'Victoria brings a unique blend of Eastern and Western design philosophies, creating spaces that bridge cultures.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
('Marcus Blackwell', 'Technical Director', 'Marcus ensures every Aurelius project integrates cutting-edge technology with sustainable practices.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
('Elena Rodriguez', 'Interior Architecture Lead', 'Elena transforms interior spaces into immersive experiences that reflect the identity of each client.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 4);
