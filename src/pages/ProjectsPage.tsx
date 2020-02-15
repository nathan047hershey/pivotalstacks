import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, X, Code, Calendar, Maximize2, Grid3X3, LayoutGrid, Search, Star, ExternalLink } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

const projectsData = [
  {
    id: '1',
    title: 'TechFlow Dashboard',
    category: 'webapp',
    location: 'San Francisco, CA',
    year: '2024',
    image: '/images/techflow-dashboard.svg',
    featured: true,
    description: 'Real-time analytics dashboard for monitoring business metrics with AI-powered insights.',
    highlights: ['AI Analytics', 'Real-time Data', 'Predictive Insights'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TensorFlow'],
    site_url: 'https://techflow-dashboard-demo.vercel.app'
  },
  {
    id: '2',
    title: 'CloudSync Platform',
    category: 'saas',
    location: 'Seattle, WA',
    year: '2024',
    image: '/images/cloudsync-platform.svg',
    featured: true,
    description: 'Enterprise cloud management platform for seamless multi-cloud infrastructure orchestration.',
    highlights: ['Multi-cloud', 'Auto-scaling', '99.99% Uptime'],
    tech: ['React', 'Go', 'Kubernetes', 'AWS', 'Terraform'],
    site_url: 'https://cloudsync-demo.io'
  },
  {
    id: '3',
    title: 'EduLearn Platform',
    category: 'edtech',
    location: 'Austin, TX',
    year: '2023',
    image: '/images/edulearn-platform.svg',
    featured: true,
    description: 'Interactive e-learning platform with AI-powered personalized learning paths.',
    highlights: ['AI Learning Paths', 'Live Classes', 'Certifications'],
    tech: ['Next.js', 'Python', 'PostgreSQL', 'OpenAI'],
    site_url: 'https://edulearn-demo.com'
  },
  {
    id: '4',
    title: 'HealthTrack Pro',
    category: 'healthcare',
    location: 'Boston, MA',
    year: '2024',
    image: '/images/healthtrack-pro.svg',
    featured: false,
    description: 'HIPAA-compliant healthcare management system with telemedicine integration.',
    highlights: ['HIPAA Compliant', 'Telemedicine', 'E-prescriptions'],
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebRTC'],
    site_url: 'https://healthtrack-demo.com'
  },
  {
    id: '5',
    title: 'RetailAI Assistant',
    category: 'retail',
    location: 'New York, NY',
    year: '2023',
    image: '/images/retailai-assistant.svg',
    featured: false,
    description: 'AI-powered retail management system with inventory prediction.',
    highlights: ['Inventory AI', 'Sales Forecasting', 'CRM Integration'],
    tech: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    site_url: 'https://retailai-demo.com'
  },
  {
    id: '6',
    title: 'FinSecure Banking',
    category: 'fintech',
    location: 'Chicago, IL',
    year: '2024',
    image: '/images/finsecure-banking.svg',
    featured: false,
    description: 'Modern digital banking platform with biometric security.',
    highlights: ['Biometric Auth', 'Fraud Detection', 'Multi-currency'],
    tech: ['React', 'Java', 'PostgreSQL', 'AWS', 'Kafka'],
    site_url: 'https://finsecure-demo.com'
  },
];

const categories = [
  { id: 'all', label: 'All', count: projectsData.length },
  { id: 'webapp', label: 'Web Apps', count: projectsData.filter(p => p.category === 'webapp').length },
  { id: 'saas', label: 'SaaS', count: projectsData.filter(p => p.category === 'saas').length },
  { id: 'edtech', label: 'EdTech', count: projectsData.filter(p => p.category === 'edtech').length },
  { id: 'healthcare', label: 'Healthcare', count: projectsData.filter(p => p.category === 'healthcare').length },
  { id: 'retail', label: 'Retail', count: projectsData.filter(p => p.category === 'retail').length },
  { id: 'fintech', label: 'FinTech', count: projectsData.filter(p => p.category === 'fintech').length },
];

export function ProjectsPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');

  const filteredProjects = useMemo(() => {
    let result = selectedCategory === 'all' ? [...projectsData] : projectsData.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query) || p.tech.some(t => t.toLowerCase().includes(query)));
    }
    if (sortBy === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <div className="container-main relative z-10 py-32">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider mb-6 bg-primary-500/10 border-primary-500/30 text-primary-400 border">OUR PORTFOLIO</span>
          <h1 className="heading-xl max-w-3xl mb-6 text-white">Projects That <span className="text-gradient">Define Excellence</span></h1>
          <p className="text-lg max-w-xl text-dark-300">Explore our comprehensive portfolio spanning diverse sectors and continents.</p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase flex items-center gap-2 text-primary-400"><Star className="w-4 h-4 fill-current" /> Featured</span>
              <h2 className="text-3xl font-bold mt-2 text-white">Highlighted Projects</h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400 hover:text-white'}`}><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-400 hover:text-white'}`}><LayoutGrid className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <a key={project.id} href={project.site_url} target="_blank" rel="noopener noreferrer" className="relative group aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-3 bg-primary-500/20 text-primary-400">{project.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <p className="text-sm flex items-center mt-1 text-dark-400"><MapPin className="w-3 h-3 mr-1" />{project.location}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded text-xs bg-dark-800/80 text-dark-300">{t}</span>)}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center"><ExternalLink className="w-5 h-5 text-white" /></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 gap-6">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-primary-400">Portfolio</span>
              <h2 className="text-3xl font-bold mt-2 text-white">All Projects ({filteredProjects.length})</h2>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input type="text" placeholder="Search projects..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-dark-800 border-dark-700 text-white placeholder:text-dark-500 focus:border-primary-500 border focus:outline-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${selectedCategory === cat.id ? 'bg-primary-500 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700 border border-dark-700'}`}>
                  {cat.label}<span className={`text-xs px-1.5 py-0.5 rounded ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-dark-700'}`}>{cat.count}</span>
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'recent' | 'name')} className="px-4 py-2 rounded-lg text-sm bg-dark-800 border-dark-700 text-white border focus:outline-none focus:border-primary-500">
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {filteredProjects.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProjects.map(project => (
                <a key={project.id} href={project.site_url} target="_blank" rel="noopener noreferrer" className={`card overflow-hidden group transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''} hover:border-primary-500/30`}>
                  <div className={`overflow-hidden ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium uppercase bg-primary-500/10 text-primary-400">{project.category}</span>
                      <span className="text-xs flex items-center gap-1 text-dark-500"><Calendar className="w-3 h-3" />{project.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors text-white">{project.title}</h3>
                    <p className="text-sm flex items-center mb-4 text-dark-400"><MapPin className="w-3 h-3 mr-1" />{project.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(t => <span key={t} className="px-2 py-1 rounded-lg text-xs border bg-dark-800 text-dark-400 border-dark-700">{t}</span>)}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-800">
                      <span className="text-xs flex items-center gap-1 text-dark-500"><ExternalLink className="w-3 h-3" />Visit Site</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-dark-900 border-dark-800 border">
              <Search className="w-16 h-16 mx-auto mb-4 text-dark-600" />
              <h3 className="text-xl font-semibold mb-2 text-white">No projects found</h3>
              <p className="mb-4 text-dark-400">Try adjusting your search or filters</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600">Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-900">
        <div className="container-main text-center rounded-3xl p-12 bg-dark-950 border-dark-800 border">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Have a Project in Mind?</h2>
          <p className="max-w-xl mx-auto mb-10 text-dark-300">Let us bring your vision to life. Our team is ready to collaborate on your next masterpiece.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center">Start Your Project <ArrowUpRight className="w-5 h-5 ml-2" /></Link>
        </div>
      </section>
    </div>
  );
}
