import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Clock, MapPin, Search, X, Users, Heart, Coffee, Plane, GraduationCap, DollarSign, Send, CheckCircle, Upload, User, Mail, Phone, Linkedin, Globe, FileText, ChevronRight, ChevronLeft, Check, AlertCircle, CheckSquare, Square, ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';

const jobsData = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salaryRange: '$120,000 - $160,000',
    experience: 'Senior Level',
    description: `We're looking for a Senior Frontend Developer to lead the development of enterprise-grade web applications. You'll work with React, TypeScript, and cutting-edge frameworks to build scalable, performant interfaces that delight users.

Key Responsibilities:
• Lead frontend architecture decisions and mentor junior developers
• Build and maintain complex React applications serving 100k+ users
• Collaborate with designers and product managers to implement pixel-perfect UIs
• Optimize application performance and Core Web Vitals
• Implement A/B tests and iterate based on data
• Contribute to our open-source component library

You'll thrive in this role if you have:
• 5+ years of professional frontend development experience
• Expert-level knowledge of React, TypeScript, and modern state management (Redux, Zustand, or similar)
• Experience with responsive design, accessibility (WCAG 2.1), and cross-browser compatibility
• Strong understanding of web performance optimization techniques
• Excellent communication skills for跨团队 collaboration`,
    requirements: [
      '5+ years of professional frontend development experience',
      'Expert knowledge of React, TypeScript, and state management',
      'Experience with responsive design and performance optimization',
      'Strong communication and leadership skills',
      'Experience with Next.js or similar SSR frameworks',
      'Familiarity with testing frameworks (Jest, Cypress)'
    ],
    benefits: [
      'Competitive salary + equity package',
      'Health, dental, and vision insurance',
      'Unlimited PTO policy',
      'Remote-first culture',
      '$5,000 annual learning budget',
      'Quarterly team retreats'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US without sponsorship?', type: 'select', options: ['Yes, I am authorized', 'No, I require visa sponsorship', 'I am a US citizen/permanent resident'], required: true },
      { question: 'What is your current notice period?', type: 'select', options: ['Immediately', '2 weeks', '1 month', '2 months', '3+ months'], required: true },
      { question: 'What is your expected salary range?', type: 'select', options: ['$100k-$120k', '$120k-$140k', '$140k-$160k', '$160k-$180k', '$180k+'], required: true },
      { question: 'Do you have experience with Next.js?', type: 'radio', options: ['Yes', 'No'], required: false },
      { question: 'Would you be willing to take a technical assessment?', type: 'radio', options: ['Yes', 'No'], required: false },
      { question: 'LinkedIn Profile URL', type: 'text', required: false },
      { question: 'Portfolio or GitHub URL', type: 'text', required: false },
    ],
    postedAt: '2024-01-15',
    isActive: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$100,000 - $140,000',
    experience: 'Mid Level',
    description: `Join our team as a Backend Engineer to design and build scalable microservices powering our SaaS platform. You'll work with Node.js, Python, and Go to handle millions of requests daily.

What You'll Do:
• Design and implement RESTful APIs and GraphQL schemas
• Build and maintain microservices architecture using Kubernetes
• Work with PostgreSQL, MongoDB, and Redis for data persistence
• Implement caching strategies and message queues for high traffic
• Participate in on-call rotation for production support
• Write comprehensive tests and documentation

Requirements:
• 4+ years of backend development experience
• Proficiency in at least one: Node.js, Python, Go, or Java
• Experience with PostgreSQL, MongoDB, or similar databases
• Understanding of RESTful API design principles
• Knowledge of cloud services (AWS, GCP, or Azure)
• Experience with Docker and container orchestration`,
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js, Python, or Go',
      'Experience with PostgreSQL, MongoDB, or similar databases',
      'Knowledge of RESTful API design and GraphQL',
      'Experience with cloud services (AWS, GCP, or Azure)',
      'Strong debugging and problem-solving skills'
    ],
    benefits: [
      'Competitive salary + equity',
      'Full health coverage',
      'Flexible working hours',
      'Home office stipend',
      'Learning & development budget',
      'Annual team retreats'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, require sponsorship', 'US Citizen/PR'], required: true },
      { question: 'Which programming language is your strongest?', type: 'select', options: ['Node.js', 'Python', 'Go', 'Java', 'Other'], required: true },
      { question: 'Do you have AWS experience?', type: 'radio', options: ['Yes', 'No'], required: false },
      { question: 'GitHub/Portfolio URL', type: 'text', required: false },
    ],
    postedAt: '2024-01-10',
    isActive: true,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salaryRange: '$85,000 - $115,000',
    experience: 'Mid Level',
    description: `We're seeking a talented UI/UX Designer to create beautiful, intuitive interfaces for our web and mobile applications. You'll collaborate closely with product and engineering teams.

Your Impact:
• Create wireframes, prototypes, and high-fidelity designs for new features
• Conduct user research and usability testing to validate designs
• Develop and maintain our design system in Figma
• Create animations and micro-interactions that enhance user experience
• Collaborate with engineers to ensure design implementation fidelity
• Stay up-to-date with design trends and competitive landscape

The Ideal Candidate:
• 3+ years of UI/UX design experience in a professional setting
• Strong portfolio demonstrating versatility across web and mobile
• Proficiency in Figma (required), Sketch, or Adobe XD
• Experience with design systems and component libraries
• Basic understanding of HTML/CSS is a plus
• Excellent presentation and communication skills`,
    requirements: [
      '3+ years of UI/UX design experience',
      'Strong portfolio demonstrating design versatility',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Experience with design systems and component libraries',
      'Understanding of frontend development principles',
      'Experience with user research and usability testing'
    ],
    benefits: [
      'Competitive compensation',
      'Health & wellness benefits',
      'Creative freedom',
      'Latest design tools provided',
      'Conference attendance budget',
      'Flexible work schedule'
    ],
    screeningQuestions: [
      { question: 'Portfolio URL (required)', type: 'text', required: true },
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, need sponsorship', 'US Citizen'], required: true },
      { question: 'Which design tools do you use?', type: 'checkbox', options: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle'], required: false },
      { question: 'Additional portfolio links', type: 'text', required: false },
    ],
    postedAt: '2024-01-08',
    isActive: true,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    salaryRange: '$110,000 - $150,000',
    experience: 'Senior Level',
    description: `As a DevOps Engineer, you'll manage and improve our cloud infrastructure, implement CI/CD pipelines, and ensure high availability and security across all environments.

What You'll Own:
• Design and maintain cloud infrastructure on AWS/GCP using Terraform
• Build and optimize CI/CD pipelines using GitHub Actions, Jenkins, or CircleCI
• Implement monitoring, alerting, and observability solutions
• Manage Kubernetes clusters for production workloads
• Conduct security audits and implement best practices
• Collaborate with development teams on deployment strategies

Requirements:
• 4+ years of DevOps or SRE experience
• Expert knowledge of AWS or GCP services
• Hands-on experience with Docker and Kubernetes
• Strong scripting skills in Bash, Python, or similar
• Understanding of security best practices and compliance (SOC2, HIPAA)
• Experience with infrastructure as code tools (Terraform, CloudFormation)`,
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Expert knowledge of AWS or GCP',
      'Experience with Docker, Kubernetes, and Terraform',
      'Strong scripting skills (Bash, Python)',
      'Knowledge of security best practices',
      'Experience with monitoring tools (Datadog, Prometheus, etc.)'
    ],
    benefits: [
      'Top-tier compensation',
      'Comprehensive healthcare',
      'Remote work options',
      'Certification reimbursement',
      'Conference budget',
      'Stock options'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, need sponsorship', 'US Citizen/PR'], required: true },
      { question: 'Which cloud platform is your strongest?', type: 'select', options: ['AWS', 'GCP', 'Azure', 'Multi-cloud'], required: true },
      { question: 'Do you have Terraform certification?', type: 'radio', options: ['Yes', 'No'], required: false },
      { question: 'GitHub/Blog URL', type: 'text', required: false },
    ],
    postedAt: '2024-01-05',
    isActive: true,
  },
  {
    id: '5',
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$130,000 - $180,000',
    experience: 'Senior Level',
    description: `Join our AI team to develop and deploy machine learning models and AI-powered features that enhance our products. You'll work on NLP, computer vision, and generative AI projects.

Exciting Projects:
• Build and fine-tune LLM-powered features for our SaaS platform
• Develop NLP models for document classification and summarization
• Create recommendation systems to personalize user experiences
• Implement computer vision solutions for image analysis
• Research and benchmark new AI/ML technologies

What We're Looking For:
• 3+ years of ML/AI development experience
• Proficiency in Python and ML frameworks (TensorFlow, PyTorch)
• Experience with LLM integration, fine-tuning, and RAG architectures
• Strong background in statistics and mathematics
• Publications, Kaggle rankings, or notable open-source contributions a plus
• PhD or equivalent practical experience preferred`,
    requirements: [
      '3+ years of ML/AI development experience',
      'Proficiency in Python, TensorFlow, or PyTorch',
      'Experience with LLM integration and fine-tuning',
      'Strong mathematics and statistics background',
      'Publications or notable projects a plus',
      'Experience with MLOps and model deployment'
    ],
    benefits: [
      'Very competitive salary + equity',
      'Premium health coverage',
      'Full remote work',
      'GPU computing budget',
      'Publication/presentation support',
      'Collaborate with research team'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, need sponsorship', 'US Citizen/PR'], required: true },
      { question: 'What type of AI projects excite you most?', type: 'select', options: ['LLMs/NLP', 'Computer Vision', 'Recommendation Systems', 'Generative AI', 'All of the above'], required: true },
      { question: 'Portfolio/GitHub with ML projects', type: 'text', required: false },
      { question: 'Published papers or blog posts?', type: 'text', required: false },
    ],
    postedAt: '2024-01-03',
    isActive: true,
  },
  {
    id: '6',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salaryRange: '$100,000 - $140,000',
    experience: 'Mid Level',
    description: `We're looking for a Product Manager to lead product strategy and roadmap prioritization. You'll work with engineering, design, and stakeholders to deliver exceptional SaaS products.

Your Role:
• Define product vision, strategy, and roadmap for key features
• Conduct market research and competitive analysis
• Gather and prioritize requirements from customers and stakeholders
• Work closely with engineering and design teams during development
• Analyze product metrics and user behavior to drive decisions
• Launch features and iterate based on user feedback

What You Bring:
• 4+ years of product management experience in B2B SaaS
• Strong analytical skills and data-driven decision making
• Experience with product analytics tools (Amplitude, Mixpanel, etc.)
• Excellent written and verbal communication skills
• Technical background or MBA preferred
• Track record of shipping successful products`,
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and data-driven mindset',
      'Excellent communication and stakeholder management',
      'Technical background or MBA preferred',
      'Experience with Agile development methodologies'
    ],
    benefits: [
      'Competitive salary + bonus',
      'Full benefits package',
      'Equity participation',
      'Flexible work arrangement',
      'Professional development budget',
      'Team building events'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, need sponsorship', 'US Citizen/PR'], required: true },
      { question: 'What is your current employment status?', type: 'select', options: ['Employed', 'Self-employed', 'Student', 'Unemployed', 'Other'], required: true },
      { question: 'LinkedIn Profile URL', type: 'text', required: false },
      { question: 'Portfolio/work samples', type: 'text', required: false },
    ],
    postedAt: '2023-12-20',
    isActive: true,
  },
  {
    id: '7',
    title: 'Junior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$60,000 - $80,000',
    experience: 'Entry Level',
    description: `Start your career as a Junior Frontend Developer! You'll work with our experienced team to build modern web applications using React and TypeScript.

What You'll Learn & Do:
• Build React components and features with guidance from senior developers
• Learn modern frontend development best practices
• Participate in code reviews and mentorship programs
• Collaborate with designers to implement pixel-perfect UIs
• Write unit tests and contribute to documentation
• Grow your skills through our learning budget and mentoring program

We're excited about you if you have:
• 0-2 years of professional development experience (or strong portfolio)
• Knowledge of HTML, CSS, and JavaScript fundamentals
• Familiarity with React or willingness to learn
• Understanding of Git and version control
• Passion for building great user experiences
• Strong problem-solving skills and curiosity`,
    requirements: [
      '0-2 years of professional development experience',
      'Knowledge of HTML, CSS, JavaScript fundamentals',
      'Familiarity with React or similar framework',
      'Understanding of Git and version control',
      'Strong problem-solving skills',
      'Passion for learning and growth'
    ],
    benefits: [
      'Mentorship program',
      'Learning budget',
      'Health insurance',
      'Flexible hours',
      'Remote work',
      'Career growth path'
    ],
    screeningQuestions: [
      { question: 'What is your expected start date?', type: 'text', required: true },
      { question: 'Are you authorized to work in the US?', type: 'select', options: ['Yes', 'No, need sponsorship', 'US Citizen/PR'], required: true },
      { question: 'What is your educational background?', type: 'select', options: ['Computer Science degree', 'Related degree', 'Self-taught', 'Bootcamp graduate', 'Other'], required: true },
      { question: 'Do you have a portfolio or GitHub?', type: 'text', required: true },
      { question: 'Are you willing to learn React?', type: 'radio', options: ['Yes', 'Already know it'], required: false },
    ],
    postedAt: '2024-01-20',
    isActive: true,
  },
];

const departments = [
  { id: 'all', label: 'All Departments' },
  { id: 'Engineering', label: 'Engineering' },
  { id: 'Design', label: 'Design' },
  { id: 'Product', label: 'Product' },
];

const locations = [
  { id: 'all', label: 'All Locations' },
  { id: 'Remote', label: 'Remote' },
  { id: 'San Francisco, CA', label: 'San Francisco' },
  { id: 'New York, NY', label: 'New York' },
  { id: 'Los Angeles, CA', label: 'Los Angeles' },
];

const jobTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'Full-time', label: 'Full-time' },
  { id: 'Part-time', label: 'Part-time' },
  { id: 'Contract', label: 'Contract' },
];

const experienceLevels = [
  { id: 'all', label: 'All Levels' },
  { id: 'Entry Level', label: 'Entry Level' },
  { id: 'Mid Level', label: 'Mid Level' },
  { id: 'Senior Level', label: 'Senior Level' },
];

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
  { icon: Coffee, title: 'Work-Life Balance', description: 'Flexible schedules, remote work options, and generous PTO policy.' },
  { icon: GraduationCap, title: 'Learning Budget', description: 'Annual $5,000 learning stipend for courses, certifications, and conferences.' },
  { icon: Plane, title: 'Remote First', description: 'Work from anywhere in the world with quarterly team retreats.' },
  { icon: Users, title: 'Team Culture', description: 'Regular team events, hackathons, and collaborative projects.' },
  { icon: DollarSign, title: 'Competitive Pay', description: 'Market-leading salaries, equity options, and performance bonuses.' },
];

export function CareersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesExperience = selectedExperience === 'all' || job.experience === selectedExperience;
    return matchesSearch && matchesDepartment && matchesLocation && matchesType && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <div className="container-main relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider mb-6">
              <Users className="w-4 h-4 mr-2" />
              JOIN OUR TEAM
            </span>
            <h1 className="heading-display text-gray-900 dark:text-white mb-6">
              Shape the Future of
              <br />
              <span className="text-gradient">Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dark-300 max-w-xl">
              Join a team of innovators building cutting-edge solutions. We value creativity, collaboration, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Why PivotalStacks
            </span>
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
              Benefits & Perks
            </h2>
            <div className="line-accent-center mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-8 group">
                <div className="w-14 h-14 bg-primary-500/10 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Opportunities
            </span>
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
              Open Positions
            </h2>
            <div className="line-accent-center mx-auto" />
          </div>

          {/* Search and Filters */}
          <div className="max-w-5xl mx-auto mb-10">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, department, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Filter Toggle + Active Filters */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-dark-400 hover:text-primary-500"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {(selectedDepartment !== 'all' || selectedLocation !== 'all' || selectedType !== 'all' || selectedExperience !== 'all') && (
                  <span className="w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </button>

              <span className="text-sm text-gray-500 dark:text-dark-400">
                {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6 mb-6 space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Department</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="input-field"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="input-field"
                    >
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Job Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="input-field"
                    >
                      {jobTypes.map((t) => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">Experience</label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="input-field"
                    >
                      {experienceLevels.map((e) => (
                        <option key={e.id} value={e.id}>{e.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {(selectedDepartment !== 'all' || selectedLocation !== 'all' || selectedType !== 'all' || selectedExperience !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedDepartment('all');
                      setSelectedLocation('all');
                      setSelectedType('all');
                      setSelectedExperience('all');
                    }}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Job Listings */}
          <div className="max-w-5xl mx-auto space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">No positions found</h3>
                <p className="text-gray-500 dark:text-dark-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="card p-6 hover:border-primary-500/30 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                          {job.type}
                        </span>
                        <span className="px-2.5 py-0.5 bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-medium rounded-full">
                          {job.experience}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-dark-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" />
                          {job.salaryRange}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {new Date(job.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-dark-400 text-sm line-clamp-2">
                        {job.description.split('\n')[0]}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/careers/${job.id}`)}
                      className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap flex items-center gap-2"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
                Our Culture
              </span>
              <h2 className="heading-section text-gray-900 dark:text-white mb-6">
                Where Innovation Meets Collaboration
              </h2>
              <div className="line-accent mb-8" />
              <p className="text-gray-600 dark:text-dark-400 mb-6 leading-relaxed">
                At PivotalStacks, we believe that exceptional products come from diverse perspectives, collaborative spirit, and an environment that nurtures creativity.
              </p>
              <p className="text-gray-600 dark:text-dark-400 mb-8 leading-relaxed">
                Our team works in an environment designed to inspire—modern offices with collaborative spaces, quiet corners for deep focus, and the tools you need to do your best work.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm rounded-lg">Remote Friendly</span>
                <span className="px-3 py-1.5 bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm rounded-lg">Flexible Hours</span>
                <span className="px-3 py-1.5 bg-success-500/10 text-success-600 dark:text-success-400 text-sm rounded-lg">Growth Focus</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Workshop" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-main text-center">
          <h2 className="heading-lg text-white mb-6">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-white/90 mb-10 max-w-xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and tell us how you could contribute to our team.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">
            Get in Touch
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Job Detail Page Component
export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    github: '',
    currentCompany: '',
    currentTitle: '',
    yearsOfExperience: '',
    coverLetter: '',
    workAuth: '',
    startDate: '',
    salaryExpectation: '',
    noticePeriod: '',
    willingToRelocate: '',
    additionalQuestions: {} as Record<string, string>,
    checkboxes: {} as Record<string, boolean>,
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const job = jobsData.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job not found</h1>
          <button onClick={() => navigate('/careers')} className="btn-primary">
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.from('job_applications').insert({
        job_id: job.id,
        job_title: job.title,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        linkedin_url: formData.linkedIn,
        portfolio_url: formData.portfolio,
        github_url: formData.github,
        current_company: formData.currentCompany,
        current_title: formData.currentTitle,
        years_experience: formData.yearsOfExperience,
        cover_letter: formData.coverLetter,
        work_authorization: formData.workAuth,
        expected_start_date: formData.startDate,
        salary_expectation: formData.salaryExpectation,
        notice_period: formData.noticePeriod,
        willing_to_relocate: formData.willingToRelocate,
        resume_name: resume?.name,
        additional_answers: formData.additionalQuestions,
        screening_checkboxes: formData.checkboxes,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted!</h1>
          <p className="text-gray-600 dark:text-dark-400 mb-8">
            Thank you for applying to {job.title}. We'll review your application and reach out if there's a match.
          </p>
          <button onClick={() => navigate('/careers')} className="btn-primary">
            View More Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 py-4">
        <div className="container-main">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center gap-2 text-gray-600 dark:text-dark-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all positions
          </button>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                  {job.department}
                </span>
                <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium rounded-full">
                  {job.experience}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-dark-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-5 h-5" />{job.location}</span>
                <span className="flex items-center gap-1.5"><DollarSign className="w-5 h-5" />{job.salaryRange}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-5 h-5" />Posted {new Date(job.postedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Role</h2>
              <div className="prose dark:prose-invert max-w-none">
                {job.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 dark:text-dark-400 mb-4 whitespace-pre-line">{para}</p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-dark-400">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-600 dark:text-dark-400">
                    <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Apply for this position</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input-field"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input-field"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    className="input-field"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Portfolio / GitHub</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="input-field"
                    placeholder="https://github.com/johndoe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Current Company</label>
                    <input
                      type="text"
                      value={formData.currentCompany}
                      onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Current Title</label>
                    <input
                      type="text"
                      value={formData.currentTitle}
                      onChange={(e) => setFormData({ ...formData, currentTitle: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Years of Experience *</label>
                  <select
                    required
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select...</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Resume *</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-xl p-4 text-center hover:border-primary-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      {resume ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-5 h-5 text-success-500" />
                          <span className="text-success-500 font-medium">{resume.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 dark:text-dark-400">Click to upload PDF, DOC, DOCX</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">Cover Letter</label>
                  <textarea
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Tell us why you're excited about this role..."
                  />
                </div>

                {/* Screening Questions */}
                {job.screeningQuestions.map((q, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-1.5">
                      {q.question} {q.required && <span className="text-red-500">*</span>}
                    </label>
                    {q.type === 'select' && (
                      <select
                        required={q.required}
                        value={formData.additionalQuestions[q.question] || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          additionalQuestions: { ...formData.additionalQuestions, [q.question]: e.target.value }
                        })}
                        className="input-field"
                      >
                        <option value="">Select...</option>
                        {q.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {q.type === 'text' && (
                      <input
                        type="text"
                        required={q.required}
                        value={formData.additionalQuestions[q.question] || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          additionalQuestions: { ...formData.additionalQuestions, [q.question]: e.target.value }
                        })}
                        className="input-field"
                        placeholder="Your answer..."
                      />
                    )}
                    {q.type === 'radio' && (
                      <div className="flex gap-4">
                        {q.options?.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`radio-${i}`}
                              value={opt}
                              checked={formData.additionalQuestions[q.question] === opt}
                              onChange={() => setFormData({
                                ...formData,
                                additionalQuestions: { ...formData.additionalQuestions, [q.question]: opt }
                              })}
                              className="w-4 h-4 text-primary-500"
                            />
                            <span className="text-gray-700 dark:text-dark-300 text-sm">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {q.type === 'checkbox' && (
                      <div className="space-y-2">
                        {q.options?.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.checkboxes[opt] || false}
                              onChange={(e) => setFormData({
                                ...formData,
                                checkboxes: { ...formData.checkboxes, [opt]: e.target.checked }
                              })}
                              className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                            />
                            <span className="text-gray-700 dark:text-dark-300 text-sm">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-dark-400">
                  By submitting, you agree to our privacy policy and consent to PivotalStacks contacting you about job opportunities.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
