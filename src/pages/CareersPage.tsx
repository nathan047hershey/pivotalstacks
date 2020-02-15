import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Clock, MapPin, Search, X, Users, Heart, Coffee, Plane, GraduationCap, DollarSign, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const jobsData = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Lead frontend development for enterprise clients, mentoring junior developers, and building scalable web applications using React, TypeScript, and modern frameworks.',
    requirements: [
      '5+ years of professional frontend development experience',
      'Expert knowledge of React, TypeScript, and state management',
      'Experience with responsive design and performance optimization',
      'Strong communication and leadership skills',
      'Experience with Next.js or similar SSR frameworks',
    ],
    salaryRange: '$120,000 - $160,000',
    postedAt: '2024-01-15',
    isActive: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and implement scalable backend systems, APIs, and microservices for our SaaS platform serving thousands of users.',
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js, Python, or Go',
      'Experience with PostgreSQL, MongoDB, or similar databases',
      'Knowledge of RESTful API design and GraphQL',
      'Experience with cloud services (AWS, GCP, or Azure)',
    ],
    salaryRange: '$100,000 - $140,000',
    postedAt: '2024-01-10',
    isActive: true,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    description: 'Create stunning user interfaces and experiences for web and mobile applications, working closely with product and engineering teams.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Strong portfolio demonstrating design versatility',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Experience with design systems and component libraries',
      'Understanding of frontend development principles',
    ],
    salaryRange: '$85,000 - $115,000',
    postedAt: '2024-01-08',
    isActive: true,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Manage and improve our cloud infrastructure, implement CI/CD pipelines, and ensure high availability and security.',
    requirements: [
      '4+ years of DevOps or SRE experience',
      'Expert knowledge of AWS or GCP',
      'Experience with Docker, Kubernetes, and Terraform',
      'Strong scripting skills (Bash, Python)',
      'Knowledge of security best practices',
    ],
    salaryRange: '$110,000 - $150,000',
    postedAt: '2024-01-05',
    isActive: true,
  },
  {
    id: '5',
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Develop and deploy machine learning models, natural language processing systems, and AI-powered features for our products.',
    requirements: [
      '3+ years of ML/AI development experience',
      'Proficiency in Python, TensorFlow, or PyTorch',
      'Experience with LLM integration and fine-tuning',
      'Strong mathematics and statistics background',
      'Publications or notable projects a plus',
    ],
    salaryRange: '$130,000 - $180,000',
    postedAt: '2024-01-03',
    isActive: true,
  },
  {
    id: '6',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Lead product strategy, define roadmap priorities, and work with engineering and design to deliver exceptional SaaS products.',
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and data-driven mindset',
      'Excellent communication and stakeholder management',
      'Technical background or MBA preferred',
    ],
    salaryRange: '$100,000 - $140,000',
    postedAt: '2023-12-20',
    isActive: true,
  },
];

const departments = [
  { id: 'all', label: 'All Departments' },
  { id: 'Engineering', label: 'Engineering' },
  { id: 'Design', label: 'Design' },
  { id: 'Product', label: 'Product' },
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
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationForm, setApplicationForm] = useState({ name: '', email: '', message: '' });
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);

  const filteredJobs = jobsData.filter((job) => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const selectedJobData = jobsData.find((j) => j.id === selectedJob);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobData) return;

    setIsApplying(true);
    try {
      const { error } = await supabase.from('job_applications').insert({
        job_id: selectedJobData.id,
        job_title: selectedJobData.title,
        name: applicationForm.name,
        email: applicationForm.email,
        message: applicationForm.message,
      });

      if (error) throw error;
      setApplicationSent(true);
      setApplicationForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error applying:', err);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-950 dark:to-dark-900 overflow-hidden">
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
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-900">
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
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions by title, location, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    selectedDepartment === dept.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="max-w-3xl mx-auto space-y-4">
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
                  className="card p-6 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-dark-400">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {new Date(job.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(job.id)}
                      className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-900">
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
                  <img
                    src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Creative workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Office space"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Team event"
                    className="w-full h-full object-cover"
                  />
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

      {/* Job Detail Modal */}
      {selectedJob && selectedJobData && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-dark-900 rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 px-6 py-5 flex items-start justify-between">
              <div>
                <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
                  {selectedJobData.department}
                </span>
                <h2 className="font-bold text-2xl text-gray-900 dark:text-white mt-1">
                  {selectedJobData.title}
                </h2>
              </div>
              <button
                onClick={() => { setSelectedJob(null); setApplicationSent(false); }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {applicationSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Application Sent!</h3>
                  <p className="text-gray-600 dark:text-dark-400 mb-6">We'll review your application and get back to you soon.</p>
                  <button
                    onClick={() => { setSelectedJob(null); setApplicationSent(false); }}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-dark-400">
                      <MapPin className="w-4 h-4" />
                      {selectedJobData.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-dark-400">
                      <Briefcase className="w-4 h-4" />
                      {selectedJobData.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-dark-400">
                      <DollarSign className="w-4 h-4" />
                      {selectedJobData.salaryRange}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    About This Role
                  </h3>
                  <p className="text-gray-600 dark:text-dark-400 mb-6 leading-relaxed">
                    {selectedJobData.description}
                  </p>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2 mb-8">
                    {selectedJobData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-gray-600 dark:text-dark-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    Apply for this position
                  </h3>
                  <form onSubmit={handleApply} className="space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                      className="input-field"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                      className="input-field"
                    />
                    <textarea
                      placeholder="Tell us why you're a great fit..."
                      rows={4}
                      value={applicationForm.message}
                      onChange={(e) => setApplicationForm({ ...applicationForm, message: e.target.value })}
                      className="input-field resize-none"
                    />
                    <button type="submit" disabled={isApplying} className="btn-primary w-full">
                      {isApplying ? 'Sending...' : (
                        <>
                          Submit Application
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}