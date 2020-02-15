// Local-only Supabase mock - all data stored locally, no external database needed

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      [key: string]: any;
    };
  };
}

// Mock query builder for local data
class LocalQueryBuilder<T> {
  private data: T[];
  private filters: ((row: T) => boolean)[] = [];
  private orderField?: keyof T;

  constructor(data: T[]) {
    this.data = data;
  }

  eq(field: keyof T, value: any): LocalQueryBuilder<T> {
    this.filters.push(row => row[field] === value);
    return this;
  }

  order(field: keyof T, _options?: { ascending?: boolean }): LocalQueryBuilder<T> {
    this.orderField = field;
    return this;
  }

  select(_columns?: string): LocalQueryBuilder<T> {
    return this;
  }

  then(callback: (result: { data: T[] | null; error: null }) => any) {
    let result = [...this.data];

    for (const filter of this.filters) {
      result = result.filter(filter);
    }

    if (this.orderField) {
      result.sort((a, b) => String(a[this.orderField!]).localeCompare(String(b[this.orderField!])));
    }

    callback({ data: result, error: null });
    return Promise.resolve({ data: result, error: null });
  }
}

// Local data storage - all app data stored here
const localData: Record<string, any[]> = {
  hero_slides: [
    {
      id: '1',
      title: 'Innovative Tech Solutions',
      subtitle: 'DIGITAL TRANSFORMATION',
      description: 'Building cutting-edge web and mobile applications that drive business growth and deliver exceptional user experiences.',
      image_url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta_text: 'Explore Services',
      cta_link: '/services',
      order: 1,
      is_active: true,
    },
    {
      id: '2',
      title: 'AI-Powered Resume Builder',
      subtitle: 'CAREER ADVANCEMENT',
      description: 'Create professional resumes and cover letters in minutes with our AI-powered tools. Land your dream job faster.',
      image_url: 'https://images.pexels.com/photos/545068/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta_text: 'Try Resume Builder',
      cta_link: '/services/resume-builder',
      order: 2,
      is_active: true,
    },
    {
      id: '3',
      title: 'Expert Cloud Migration',
      subtitle: 'ENTERPRISE SOLUTIONS',
      description: 'Seamlessly migrate your infrastructure to the cloud with our certified AWS, Azure, and GCP experts.',
      image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta_text: 'Get Started',
      cta_link: '/services#cloud',
      order: 3,
      is_active: true,
    },
    {
      id: '4',
      title: 'Custom Mobile Apps',
      subtitle: 'MOBILE DEVELOPMENT',
      description: 'Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.',
      image_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta_text: 'View Portfolio',
      cta_link: '/portfolio',
      order: 4,
      is_active: true,
    },
  ],
  services: [
    { id: '1', title: 'Web Development', description: 'Full-stack web applications with React, Node.js, and modern frameworks delivering scalable solutions.', icon: 'Code', category: 'Development', order: 1, is_active: true },
    { id: '2', title: 'Mobile Development', description: 'Native and cross-platform apps for iOS and Android using React Native and Flutter.', icon: 'Smartphone', category: 'Development', order: 2, is_active: true },
    { id: '3', title: 'AI Solutions', description: 'Machine learning, NLP, and intelligent automation systems powered by latest AI tech.', icon: 'Brain', category: 'Development', order: 3, is_active: true },
    { id: '4', title: 'Cloud Services', description: 'AWS, Azure, GCP migration and managed infrastructure with 24/7 support.', icon: 'Cloud', category: 'Infrastructure', order: 4, is_active: true },
    { id: '5', title: 'UI/UX Design', description: 'User-centered design that combines aesthetics with functionality for exceptional experiences.', icon: 'Palette', category: 'Design', order: 5, is_active: true },
    { id: '6', title: 'Resume Builder', description: 'AI-powered resume and cover letter generation with ATS-friendly templates.', icon: 'FileText', category: 'Tools', order: 6, is_active: true },
  ],
  stats: [
    { id: '1', value: '500+', label: 'Projects Delivered', icon: 'Code', order: 1 },
    { id: '2', value: '98%', label: 'Client Satisfaction', icon: 'Heart', order: 2 },
    { id: '3', value: '50+', label: 'Team Members', icon: 'Users', order: 3 },
    { id: '4', value: '24/7', label: 'Support Available', icon: 'Clock', order: 4 },
  ],
  testimonials: [
    { id: '1', quote: 'PivotalStacks transformed our entire digital infrastructure. Their expertise is unmatched.', author_name: 'Sarah Chen', author_role: 'CTO, TechFlow Inc', author_image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', order: 1, is_active: true },
    { id: '2', quote: 'The Resume Builder helped me land my dream job. The AI suggestions were incredibly helpful.', author_name: 'Michael Johnson', author_role: 'Software Engineer', author_image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', order: 2, is_active: true },
    { id: '3', quote: 'Their cloud migration was seamless. We were up and running in record time with zero downtime.', author_name: 'Emily Rodriguez', author_role: 'VP Engineering, DataCorp', author_image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', order: 3, is_active: true },
  ],
  projects: [
    {
      id: '1',
      title: 'TechFlow Dashboard',
      description: 'Real-time analytics dashboard for monitoring business metrics with AI-powered insights and predictive analytics.',
      category: 'webapp',
      location: 'San Francisco, CA',
      year: '2024',
      image_url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: true,
      highlights: ['AI Analytics', 'Real-time Data', 'Predictive Insights'],
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TensorFlow'],
      site_url: 'https://techflow.io',
      is_active: true,
    },
    {
      id: '2',
      title: 'CloudSync Platform',
      description: 'Enterprise cloud management platform for seamless multi-cloud infrastructure orchestration and monitoring.',
      category: 'saas',
      location: 'Seattle, WA',
      year: '2024',
      image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: true,
      highlights: ['Multi-cloud', 'Auto-scaling', '99.99% Uptime'],
      tech: ['React', 'Go', 'Kubernetes', 'AWS', 'Terraform'],
      site_url: 'https://cloudsync.tech',
      is_active: true,
    },
    {
      id: '3',
      title: 'EduLearn Platform',
      description: 'Interactive e-learning platform with AI-powered personalized learning paths and real-time collaboration.',
      category: 'edtech',
      location: 'Austin, TX',
      year: '2023',
      image_url: 'https://images.pexels.com/photos/545068/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: true,
      highlights: ['AI Learning Paths', 'Live Classes', 'Certifications'],
      tech: ['Next.js', 'Python', 'PostgreSQL', 'OpenAI'],
      site_url: 'https://edulearn.com',
      is_active: true,
    },
    {
      id: '4',
      title: 'HealthTrack Pro',
      description: 'HIPAA-compliant healthcare management system with telemedicine integration and patient portal.',
      category: 'healthcare',
      location: 'Boston, MA',
      year: '2024',
      image_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: false,
      highlights: ['HIPAA Compliant', 'Telemedicine', 'E-prescriptions'],
      tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebRTC'],
      site_url: 'https://healthtrackpro.com',
      is_active: true,
    },
    {
      id: '5',
      title: 'RetailAI Assistant',
      description: 'AI-powered retail management system with inventory prediction and customer behavior analytics.',
      category: 'retail',
      location: 'New York, NY',
      year: '2023',
      image_url: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: false,
      highlights: ['Inventory AI', 'Sales Forecasting', 'CRM Integration'],
      tech: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
      site_url: 'https://retailai.io',
      is_active: true,
    },
    {
      id: '6',
      title: 'FinSecure Banking',
      description: 'Modern digital banking platform with biometric security and real-time transaction monitoring.',
      category: 'fintech',
      location: 'Chicago, IL',
      year: '2024',
      image_url: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260',
      featured: false,
      highlights: ['Biometric Auth', 'Fraud Detection', 'Multi-currency'],
      tech: ['React', 'Java', 'PostgreSQL', 'AWS', 'Kafka'],
      site_url: 'https://finsecurebank.com',
      is_active: true,
    },
  ],
  blog_posts: [
    {
      id: '1',
      title: 'The Future of AI in Web Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build web applications.',
      content: 'Full article content here...',
      category: 'Technology',
      image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      author_name: 'Sarah Chen',
      read_time: '8 min read',
      published_at: '2024-01-15',
      is_published: true,
      created_at: '2024-01-15',
    },
    {
      id: '2',
      title: 'Building Scalable Cloud Architecture',
      excerpt: 'Best practices for designing cloud infrastructure that grows with your business.',
      content: 'Full article content here...',
      category: 'Cloud',
      image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
      author_name: 'Michael Rodriguez',
      read_time: '12 min read',
      published_at: '2024-01-10',
      is_published: true,
      created_at: '2024-01-10',
    },
    {
      id: '3',
      title: 'Resume Tips for Tech Professionals',
      excerpt: 'How to showcase your technical skills and land your dream job in tech.',
      content: 'Full article content here...',
      category: 'Career',
      image_url: 'https://images.pexels.com/photos/545068/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&w=800',
      author_name: 'Emily Thompson',
      read_time: '6 min read',
      published_at: '2024-01-05',
      is_published: true,
      created_at: '2024-01-05',
    },
  ],
  jobs: [
    {
      id: '1',
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      description: 'Join our team building cutting-edge web applications.',
      requirements: ['5+ years React', 'TypeScript', 'Node.js', 'AWS'],
      salary_range: '$150,000 - $200,000',
      posted_at: '2024-01-20',
      is_active: true,
    },
    {
      id: '2',
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create beautiful, user-centered designs for our clients.',
      requirements: ['3+ years UX', 'Figma', 'User Research', 'Prototyping'],
      salary_range: '$100,000 - $140,000',
      posted_at: '2024-01-18',
      is_active: true,
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Build and maintain cloud infrastructure for enterprise clients.',
      requirements: ['4+ years DevOps', 'Kubernetes', 'Terraform', 'AWS/Azure'],
      salary_range: '$140,000 - $180,000',
      posted_at: '2024-01-15',
      is_active: true,
    },
  ],
  contact_submissions: [],
  job_applications: [],
  profiles: [],
  team_members: [
    { id: '1', name: 'David Chen', role: 'CEO & Founder', bio: 'Former Google engineer with 15+ years in software development.', image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', order: 1 },
    { id: '2', name: 'Sarah Anderson', role: 'CTO', bio: 'Architecture expert with experience at Microsoft and AWS.', image_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', order: 2 },
    { id: '3', name: 'Michael Rodriguez', role: 'Head of Design', bio: 'Award-winning designer focused on creating exceptional user experiences.', image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', order: 3 },
    { id: '4', name: 'Emily Thompson', role: 'VP of Engineering', bio: 'Full-stack expert leading our engineering teams.', image_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', order: 4 },
  ],
};

// Local storage keys
const STORAGE_KEYS = {
  CONTACT: 'local_contact_submissions',
  JOB_APPLICATIONS: 'local_job_applications',
};

// Initialize local storage with data
function initializeLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify([]));
  }
}

initializeLocalStorage();

// Mock Supabase client
export const supabase = {
  from: (table: string) => {
    const tableData = localData[table] || [];

    return {
      select: (columns?: string) => {
        return new LocalQueryBuilder([...tableData]);
      },

      insert: (data: any) => {
        // Store contact submissions and job applications locally
        if (table === 'contact_submissions') {
          const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT) || '[]');
          const newItem = { ...data, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'unread' };
          current.push(newItem);
          localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(current));
          return Promise.resolve({ data: newItem, error: null });
        }
        if (table === 'job_applications') {
          const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS) || '[]');
          const newItem = { ...data, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'pending' };
          current.push(newItem);
          localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(current));
          return Promise.resolve({ data: newItem, error: null });
        }
        return Promise.resolve({ data: null, error: null });
      },

      update: (data: any) => {
        return {
          eq: (field: string, value: any) => {
            // For local storage updates
            return Promise.resolve({ data: null, error: null });
          }
        };
      },

      delete: () => {
        return {
          eq: (field: string, value: any) => {
            return Promise.resolve({ data: null, error: null });
          }
        };
      }
    };
  },

  // Mock auth object for local development
  auth: {
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      callback('INITIAL_SESSION', null);
      return {
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      };
    },
    signInWithPassword: async (_email: string, _password: string) => {
      return { data: { user: null, session: null }, error: { message: 'Auth not available in local mode' } };
    },
    signUp: async (_options: any) => {
      return { data: { user: null, session: null }, error: { message: 'Auth not available in local mode' } };
    },
    signOut: async () => {
      return { error: null };
    },
    signInWithOAuth: async (_options: any) => {
      return { data: { url: '' }, error: { message: 'Auth not available in local mode' } };
    },
    getUser: async () => {
      return { data: { user: null }, error: null };
    },
  }
};

export default supabase;
