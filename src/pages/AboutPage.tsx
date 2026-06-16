import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Lightbulb, Users, Globe, Zap, Shield, Award, ArrowRight, Clock, TrendingUp, Code, Rocket, MapPin, Phone, Mail, Calendar, Star, Quote, ExternalLink, CheckCircle, Building, Briefcase, Award as AwardIcon, Facebook, Twitter, Linkedin, Instagram, Youtube, Video, Coffee, Monitor, Wifi, Car, Train, Building2, DoorOpen, Armchair, Wind, Coffee as CoffeeIcon, Dumbbell, Utensils, Trees, Sunrise, Landmark, Warehouse, Home, Stethoscope, PawPrint } from 'lucide-react';

const leadershipTeam = [
  {
    name: 'David Chen',
    role: 'CEO & Founder',
    bio: 'Former Google Staff Engineer with 15+ years in software development. Led engineering teams building search infrastructure serving 2B+ users. Stanford CS Graduate.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Google Cloud Certified', 'AWS Solutions Architect']
  },
  {
    name: 'Sarah Anderson',
    role: 'Chief Technology Officer',
    bio: 'Former Microsoft Principal Engineer and AWS Technical Evangelist. 12+ years architecting enterprise cloud solutions. MIT Computer Science PhD.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Microsoft MVP', 'AWS Hero']
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Design',
    bio: 'Award-winning designer from IDEO and Frog Design. Created experiences for Apple, Nike, and Airbnb. Featured in Communication Arts and Awwwards.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Cannes Lions Winner', 'D&AD Pencil']
  },
  {
    name: 'Emily Thompson',
    role: 'VP of Engineering',
    bio: 'Ex-Facebook Senior Engineering Manager. Built and scaled teams from 5 to 50+ engineers. Expert in distributed systems and high-performance architectures.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Google Developer Expert', 'ACM Member']
  },
  {
    name: 'James Wilson',
    role: 'VP of Sales',
    bio: 'Former Salesforce VP of Enterprise Sales with 18+ years in tech sales. Closed $100M+ in enterprise deals. Harvard MBA.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1507007.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['President Club', 'Top Performer Award']
  },
  {
    name: 'Priya Patel',
    role: 'Head of AI/ML',
    bio: 'Former DeepMind Research Scientist. PhD in Machine Learning from Oxford. Published 15+ papers in NeurIPS, ICML, and Nature AI.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['NeurIPS Best Paper', 'Google Fellowship']
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Operations',
    bio: 'Former Amazon Operations Director. Expert in scaling startups from seed to Series C. Implemented processes serving 10M+ daily transactions.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Six Sigma Black Belt', 'PMP Certified']
  },
  {
    name: 'Lisa Wang',
    role: 'Head of Customer Success',
    bio: 'Former Zendesk Director of Customer Success. 10+ years building customer-centric organizations. Reduced churn by 40% at previous company.',
    image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3866925.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#',
    twitter: '#',
    achievements: ['Forbes 30 Under 30', 'CXPA Certified']
  },
];

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions that give our clients competitive advantages. Innovation is in our DNA.' },
  { icon: Shield, title: 'Integrity', description: 'Transparency and honesty guide every decision we make. We build lasting relationships based on trust and mutual respect. Our word is our bond.' },
  { icon: Heart, title: 'Passion', description: 'We love what we do, and it shows in every project we deliver. Our enthusiasm drives us to exceed expectations and delight our clients.' },
  { icon: Users, title: 'Collaboration', description: 'We work closely with our clients and each other, believing that the best results come from true partnership. Together, we achieve more.' },
];

const milestones = [
  { year: '2024 Q1', title: 'Company Founded', description: 'PivotalStacks was founded in San Francisco by a team of 5 experienced engineers with a vision to transform businesses through technology.', icon: Rocket },
  { year: '2024 Q2', title: 'Resume Builder Launch', description: 'Launched our AI-powered Resume Builder, helping 10,000+ job seekers create professional resumes and land their dream jobs within 3 months.', icon: Lightbulb },
  { year: '2024 Q3', title: 'First Enterprise Contract', description: 'Secured our first Fortune 500 client, a major healthcare provider, for a $2M digital transformation project.', icon: Building },
  { year: '2024 Q4', title: '50 Projects Milestone', description: 'Celebrated delivering 50 successful projects with 98% client satisfaction rate, establishing ourselves as a trusted technology partner.', icon: TrendingUp },
  { year: '2025 Q1', title: 'Global Expansion', description: 'Opened offices in London (UK) and Singapore to better serve our growing international client base across 8 countries.', icon: Globe },
  { year: '2025 Q2', title: 'AI Solutions Division', description: 'Launched dedicated AI/ML division with 12 researchers and launched our first AI product serving 50,000+ users.', icon: Lightbulb },
  { year: '2025 Q3', title: '100+ Projects', description: 'Reached milestone of 100+ successful projects. Raised $15M Series A funding led by Sequoia Capital.', icon: Award },
  { year: '2025 Q4', title: 'Team Growth', description: 'Grew to 50+ team members across 3 offices. Achieved SOC2 Type II compliance certification.', icon: Users },
  { year: '2026 Q1', title: '200+ Projects', description: 'Surpassed 200 projects milestone. Expanded to Tokyo and Sydney offices. Launched enterprise SaaS platform.', icon: TrendingUp },
  { year: '2026 Q2', title: 'Industry Recognition', description: 'Named Top IT Solutions Provider by Clutch. Featured in Forbes Cloud 100 list.', icon: Award },
];

const stats = [
  { value: '500+', label: 'Projects Delivered', icon: Code },
  { value: '98%', label: 'Client Satisfaction', icon: Heart },
  { value: '50+', label: 'Team Members', icon: Users },
  { value: '15', label: 'Countries Served', icon: Globe },
];

const goals = [
  { title: 'Global Reach', description: 'Expand to 50+ countries by 2027, bringing innovative solutions to businesses worldwide.', progress: 30 },
  { title: 'AI Leadership', description: 'Become a leader in AI-powered development tools and automation solutions.', progress: 45 },
  { title: '1000+ Projects', description: 'Deliver over 1000 successful projects by 2026.', progress: 50 },
  { title: 'Enterprise Focus', description: 'Partner with 100+ enterprise clients for digital transformation.', progress: 35 },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'TensorFlow', 'PyTorch', 'Vue.js', 'Go', 'Rust', 'Redis', 'Elasticsearch'
];

const offices = [
  { city: 'San Francisco', country: 'USA', address: '548 Market Street, Suite 300, San Francisco, CA 94104', phone: '+1 (415) 555-0123', email: 'sf@pivotalstacks.com', image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1449829.jpeg?auto=compress&cs=tinysrgb&w=800', isHQ: true, sqft: '25,000', employees: 25, type: 'Headquarters' },
  { city: 'London', country: 'UK', address: '25 Old Broad Street, EC2N 1HQ, London', phone: '+44 20 5555 0123', email: 'london@pivotalstacks.com', image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1480711.jpeg?auto=compress&cs=tinysrgb&w=800', isHQ: false, sqft: '12,000', employees: 12, type: 'European HQ' },
  { city: 'Singapore', country: 'Singapore', address: '1 Raffles Place, #20-61, One Raffles Place Tower 2', phone: '+65 6555 0123', email: 'singapore@pivotalstacks.com', image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1273729.jpeg?auto=compress&cs=tinysrgb&w=800', isHQ: false, sqft: '8,500', employees: 8, type: 'APAC Office' },
  { city: 'Tokyo', country: 'Japan', address: '2-7-2 Marunouchi, Chiyoda-ku, Tokyo 100-0005', phone: '+81 3 5555 0123', email: 'tokyo@pivotalstacks.com', image: 'https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-221286.jpeg?auto=compress&cs=tinysrgb&w=800', isHQ: false, sqft: '6,000', employees: 5, type: 'Japan Office' },
];

const buildingFeatures = [
  { icon: Wifi, title: 'High-Speed Internet', desc: '1Gbps dedicated fiber connections with redundancy' },
  { icon: Coffee, title: 'Free Coffee Bar', desc: 'Premium espresso, cold brew, and specialty drinks' },
  { icon: Armchair, title: 'Ergonomic Furniture', desc: 'Standing desks, Herman Miller chairs, and collaboration pods' },
  { icon: Video, title: 'Video Studios', desc: 'Professional recording and streaming facilities' },
  { icon: Monitor, title: 'Tech Labs', desc: 'Hardware labs for IoT, VR/AR, and prototype development' },
  { icon: Dumbbell, title: 'Fitness Center', desc: '24/7 gym with personal trainers and yoga classes' },
  { icon: Utensils, title: 'Chef Kitchen', desc: 'Daily catered meals and fully stocked kitchens' },
  { icon: Trees, title: 'Green Spaces', desc: 'Living walls, rooftop garden, and biophilic design' },
  { icon: Car, title: 'Parking', desc: 'Underground parking with EV charging stations' },
  { icon: Train, title: 'Transit Access', desc: 'Direct access to BART, Muni, and major bus routes' },
];

const roomTypes = [
  { icon: Building2, name: 'Private Offices', count: 30, desc: 'Soundproofed offices for focused work' },
  { icon: Users, name: 'Meeting Rooms', count: 15, desc: 'Equipped with video conferencing and whiteboards' },
  { icon: Coffee, name: 'Break Rooms', count: 8, desc: 'Kitchenettes, game rooms, and relaxation areas' },
  { icon: Monitor, name: 'Conference Centers', count: 3, desc: 'Large spaces for company-wide events' },
  { icon: DoorOpen, name: 'Phone Booths', count: 12, desc: 'Soundproof pods for private calls' },
  { icon: Landmark, name: 'Event Spaces', count: 2, desc: 'Rooftop venue and auditorium for 200+' },
];

const certifications = [
  { name: 'SOC 2 Type II', org: 'AICPA', year: '2025' },
  { name: 'ISO 27001', org: 'ISO', year: '2025' },
  { name: 'AWS Advanced Partner', org: 'Amazon Web Services', year: '2024' },
  { name: 'Microsoft Gold Partner', org: 'Microsoft', year: '2024' },
  { name: 'Google Cloud Partner', org: 'Google Cloud', year: '2024' },
];

const clientLogos = [
  { name: 'TechCorp Industries', sector: 'Technology' },
  { name: 'MedHealth Systems', sector: 'Healthcare' },
  { name: 'FinanceHub', sector: 'Fintech' },
  { name: 'RetailMax', sector: 'Retail' },
  { name: 'EduTech Global', sector: 'EdTech' },
  { name: 'CloudFirst Inc', sector: 'Cloud Services' },
];

const pressMentions = [
  { title: 'PivotalStacks Named Top Startup to Watch', publication: 'TechCrunch', date: 'March 2025', url: '#' },
  { title: 'How AI is Transforming Enterprise Software', publication: 'Forbes', date: 'January 2025', url: '#' },
  { title: 'The Future of Digital Transformation', publication: 'Wired', date: 'November 2024', url: '#' },
  { title: '10 Cloud Solutions Providers Leading Innovation', publication: 'Gartner', date: 'October 2024', url: '#' },
];

const teamCulture = [
  { title: 'Remote-First Culture', description: 'Work from anywhere. We trust our team to deliver excellence wherever they are.', icon: Globe },
  { title: 'Continuous Learning', description: '$5,000 annual learning budget per employee. Hackathons, conferences, and courses encouraged.', icon: Code },
  { title: 'Competitive Benefits', description: 'Health, dental, vision insurance. 401k matching. Unlimited PTO. Parental leave.', icon: Heart },
  { title: 'Equity for All', description: 'Every team member gets equity options. We believe in sharing success together.', icon: Award },
];

const nearbyAmenities = [
  { icon: Utensils, name: 'Restaurants', distance: '2 min' },
  { icon: Coffee, name: 'Coffee Shops', distance: '1 min' },
  { icon: Train, name: 'Transit Station', distance: '3 min' },
  { icon: PawPrint, name: 'Dog Park', distance: '5 min' },
  { icon: Stethoscope, name: 'Medical Center', distance: '4 min' },
  { icon: Sunrise, name: 'Fitness Center', distance: '2 min' },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <div className="container-main relative z-10 py-32">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider mb-6 bg-primary-500/10 border-primary-500/30 text-primary-400 border">OUR STORY</span>
          <h1 className="heading-xl max-w-4xl mb-6 text-white">
            About <span className="text-gradient">PivotalStacks</span>
          </h1>
          <p className="text-xl max-w-2xl mb-8 text-dark-300 leading-relaxed">
            Founded in 2024, we're on a mission to transform businesses through innovative technology solutions. Our team of 50+ experts combines technical excellence with creative problem-solving across 15 countries.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-900 border-y border-dark-800">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-primary-500/10">
                  <stat.icon className="w-7 h-7 text-primary-400" />
                </div>
                <span className="block font-bold text-4xl md:text-5xl mb-2 text-primary-400">{stat.value}</span>
                <span className="text-sm tracking-wide uppercase text-dark-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card p-10 bg-gradient-to-br from-primary-500/10 to-transparent border-primary-500/20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-primary-500">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-2xl mb-4 text-white">Our Mission</h2>
              <p className="leading-relaxed mb-6 text-dark-300">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage. We transform complex challenges into elegant digital experiences that deliver measurable results.
              </p>
              <ul className="space-y-3 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  Deliver exceptional value through technology
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  Build lasting partnerships with clients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  Foster innovation in everything we do
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  Democratize access to cutting-edge technology
                </li>
              </ul>
            </div>

            <div className="card p-10 bg-gradient-to-br from-accent-500/10 to-transparent border-accent-500/20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-accent-500">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-2xl mb-4 text-white">Our Vision</h2>
              <p className="leading-relaxed mb-6 text-dark-300">
                To be the global leader in digital transformation, recognized for our technical excellence, innovative solutions, and positive impact on businesses worldwide. We envision a future where every business can harness technology to reach its full potential.
              </p>
              <ul className="space-y-3 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Lead in AI-powered development
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Enable global digital transformation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Set industry standards for quality
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                  Build the future of work
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters Building */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">San Francisco HQ</span>
              <h2 className="heading-lg mb-6 text-white">Our Headquarters</h2>
              <div className="h-1 w-20 mb-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              <p className="text-dark-300 mb-6 leading-relaxed">
                Located in the heart of San Francisco's vibrant SOMA district, our 25,000 sq ft headquarters is more than just an office—it's a space designed to inspire creativity, collaboration, and innovation.
              </p>
              <p className="text-dark-300 mb-6 leading-relaxed">
                The building features a modern industrial design with exposed brick, floor-to-ceiling windows, and biophilic elements throughout. We've created an environment where our team can do their best work while enjoying world-class amenities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="card p-4 text-center">
                  <p className="text-3xl font-bold text-primary-400 mb-1">25,000</p>
                  <p className="text-sm text-dark-400">Square Feet</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-3xl font-bold text-primary-400 mb-1">25</p>
                  <p className="text-sm text-dark-400">Team Members</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-3xl font-bold text-primary-400 mb-1">4</p>
                  <p className="text-sm text-dark-400">Floors</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-3xl font-bold text-primary-400 mb-1">2024</p>
                  <p className="text-sm text-dark-400">Opened</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {nearbyAmenities.map((item, index) => (
                  <span key={index} className="flex items-center gap-2 px-3 py-2 rounded-full bg-dark-800 text-sm text-dark-400">
                    <item.icon className="w-4 h-4 text-primary-400" />
                    {item.name} • {item.distance}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1497365.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Headquarters building exterior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl -z-10 bg-primary-500/20" />
              <div className="absolute -top-6 -right-6 w-48 h-48 border rounded-2xl -z-10 border-accent-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Interior Spaces */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Our Spaces</span>
            <h2 className="heading-lg mb-6 text-white">Inside PivotalStacks</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Open workspace" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Collaboration area" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Meeting room" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Tech lab" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Break room" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Event space" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomTypes.map((room, index) => (
              <div key={index} className="card p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <room.icon className="w-7 h-7 text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{room.name}</h3>
                    <span className="px-2 py-0.5 text-xs font-medium bg-accent-500/10 text-accent-400 rounded-full">{room.count}</span>
                  </div>
                  <p className="text-sm text-dark-400">{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Amenities */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Comfort & Convenience</span>
            <h2 className="heading-lg mb-6 text-white">Building Amenities</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {buildingFeatures.map((feature, index) => (
              <div key={index} className="card p-6 text-center hover:border-primary-500/30 transition-all">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-dark-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Our Story</span>
              <h2 className="heading-lg mb-6 text-white">From Vision to Reality</h2>
              <div className="h-1 w-20 mb-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              <div className="space-y-6 text-dark-300">
                <p>
                  PivotalStacks began as a small team of passionate engineers who believed technology should empower, not complicate. Founded in San Francisco in January 2024 by David Chen and Sarah Anderson, we set out to build a company that puts client success first.
                </p>
                <p>
                  What started as a focused team of five working from a co-working space has grown into a diverse group of 50+ professionals across four continents. Our first project was a simple web app for a local bakery—today we serve Fortune 500 enterprises.
                </p>
                <p>
                  Our journey hasn't been without challenges. We pivoted twice, faced funding crunches, and learned hard lessons. But through it all, we never compromised on quality or our core values. Today, we serve clients ranging from ambitious startups to major corporations, helping them navigate the complex landscape of modern technology.
                </p>
                <p>
                  We've raised $15M in Series A funding, achieved SOC2 certification, and been recognized by industry leaders. But our greatest achievement is the lasting partnerships we've built with our clients—98% of them return for their next project.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.images.unsplash.com/photo-1542744173-8e7e53415bb0/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl -z-10 bg-primary-500/20" />
              <div className="absolute -top-6 -right-6 w-48 h-48 border rounded-2xl -z-10 border-accent-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Global Presence</span>
            <h2 className="heading-lg mb-6 text-white">Our Offices</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="card overflow-hidden group transition-all hover:border-primary-500/30">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={office.image} alt={office.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-white">{office.city}</h3>
                    {office.isHQ && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full">HQ</span>
                    )}
                  </div>
                  <p className="text-sm text-dark-400 mb-4">{office.country} • {office.type}</p>
                  <div className="space-y-2 text-sm text-dark-400 mb-4">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0 text-primary-400" />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0 text-primary-400" />
                      {office.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-dark-700">
                    <div className="text-center flex-1">
                      <p className="text-lg font-bold text-primary-400">{office.sqft}</p>
                      <p className="text-xs text-dark-400">Sq Ft</p>
                    </div>
                    <div className="text-center flex-1 border-l border-dark-700">
                      <p className="text-lg font-bold text-primary-400">{office.employees}</p>
                      <p className="text-xs text-dark-400">Team</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Why PivotalStacks</span>
            <h2 className="heading-lg mb-6 text-white">Our Competitive Advantages</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast Delivery',
                description: 'Our agile methodology and dedicated teams ensure your project is delivered on time, every time. Average project completion is 40% faster than industry standards.',
                highlight: '40% Faster'
              },
              {
                icon: Shield,
                title: 'Enterprise-Grade Security',
                description: 'Bank-level security protocols, SOC2 compliance, and end-to-end encryption protect your data. We prioritize security at every layer of development.',
                highlight: 'SOC2 Certified'
              },
              {
                icon: Lightbulb,
                title: 'AI-Powered Solutions',
                description: 'Leverage cutting-edge AI and machine learning to automate processes, gain insights, and stay ahead of the competition with intelligent solutions.',
                highlight: 'AI First'
              },
              {
                icon: Users,
                title: 'Dedicated Teams',
                description: 'Work with a stable, assigned team that knows your business inside out. No handoffs, no learning curves - just consistent expertise.',
                highlight: 'Stable Teams'
              },
              {
                icon: Globe,
                title: 'Global Reach, Local Touch',
                description: 'With offices in San Francisco, London, Singapore, and Tokyo, we provide round-the-clock support and understand regional market nuances.',
                highlight: '24/7 Support'
              },
              {
                icon: Code,
                title: 'Clean Code Guarantee',
                description: 'Every project includes comprehensive documentation, code reviews, and maintainability standards. Your codebase stays clean, scalable, and future-proof.',
                highlight: '100% Documented'
              },
              {
                icon: TrendingUp,
                title: 'Scalable Architecture',
                description: 'Built for growth from day one. Our solutions handle millions of users and can scale infinitely without requiring complete rewrites.',
                highlight: 'Infinite Scale'
              },
              {
                icon: Heart,
                title: '98% Client Satisfaction',
                description: 'Our commitment to excellence shows in our client retention rate. 98% of clients continue partnership after their first project.',
                highlight: '98% Retention'
              },
              {
                icon: Award,
                title: 'Award-Winning Team',
                description: 'Recognized by industry leaders for excellence in software development, UX design, and innovation. Our team includes certified experts from top tech companies.',
                highlight: 'Industry Recognized'
              },
            ].map((advantage, index) => (
              <div key={index} className="card p-8 hover:border-primary-500/30 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary-500/10 group-hover:bg-primary-500 transition-colors">
                    <advantage.icon className="w-7 h-7 text-primary-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-success-500/10 text-success-400 mb-2">
                      {advantage.highlight}
                    </span>
                    <h3 className="font-semibold text-lg text-white">{advantage.title}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-dark-400">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Certifications</span>
            <h2 className="heading-lg mb-6 text-white">Security & Partnerships</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="card p-6 text-center hover:border-primary-500/30 transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <AwardIcon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                <p className="text-sm text-dark-400">{cert.org}</p>
                <span className="text-xs text-primary-400 mt-2 block">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Our Journey</span>
            <h2 className="heading-lg mb-6 text-white">Company Timeline</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-1/2 bg-dark-700" />

            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex flex-col lg:flex-row items-start mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full border-4 lg:-translate-x-1/2 z-10 bg-primary-500 border-dark-900" />
                <div className={`ml-12 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className="card p-6 transition-colors hover:border-primary-500/30">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-primary-500/10 text-primary-400">
                      <Clock className="w-3 h-3" /> {milestone.year}
                    </span>
                    <h3 className="font-semibold text-lg mb-2 text-white">{milestone.title}</h3>
                    <p className="text-sm leading-relaxed text-dark-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">What Drives Us</span>
            <h2 className="heading-lg mb-6 text-white">Our Core Values</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card p-8 text-center group transition-colors hover:border-primary-500/30">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-primary-500/10 group-hover:bg-primary-500">
                  <value.icon className="w-8 h-8 text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-dark-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Life at PivotalStacks</span>
            <h2 className="heading-lg mb-6 text-white">Our Culture</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamCulture.map((item, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-accent-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-dark-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Progress */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Looking Ahead</span>
            <h2 className="heading-lg mb-6 text-white">Our Goals</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {goals.map((goal, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent-500/10">
                    <Zap className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-white">{goal.title}</h3>
                    <p className="text-sm text-dark-400">{goal.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2 text-dark-500">
                    <span className="text-xs">Progress</span>
                    <span className="text-xs font-medium text-accent-400">{goal.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-dark-800">
                    <div
                      className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full transition-all duration-1000"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Tech Stack</span>
            <h2 className="heading-lg mb-6 text-white">Technologies We Master</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <span key={index} className="px-4 py-2 rounded-lg text-sm transition-all bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 text-primary-300 hover:from-primary-500/30 hover:to-accent-500/30 hover:border-primary-500/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Trusted By</span>
            <h2 className="heading-lg mb-6 text-white">Our Clients</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <div key={index} className="card p-6 text-center hover:border-primary-500/30 transition-all">
                <Building className="w-10 h-10 mx-auto mb-3 text-dark-500" />
                <p className="font-semibold text-white text-sm">{client.name}</p>
                <p className="text-xs text-dark-400">{client.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">In The News</span>
            <h2 className="heading-lg mb-6 text-white">Press & Media</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pressMentions.map((press, index) => (
              <a key={index} href={press.url} className="card p-6 flex items-center gap-4 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">{press.title}</h3>
                  <p className="text-sm text-dark-400">{press.publication} • {press.date}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Leadership</span>
            <h2 className="heading-lg mb-6 text-white">Meet Our Team</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mb-8" />
            <p className="max-w-2xl mx-auto text-dark-400">Our leadership team brings decades of combined experience from top tech companies like Google, Microsoft, Amazon, and Facebook.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="card overflow-hidden group transition-colors hover:border-primary-500/30">
                <div className="aspect-[3/4] overflow-hidden bg-dark-800">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1 text-white">{member.name}</h3>
                  <span className="text-sm font-medium block mb-3 text-primary-400">{member.role}</span>
                  <p className="text-sm leading-relaxed text-dark-400 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.achievements.map((ach, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-primary-500/10 text-primary-400 rounded-full">{ach}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={member.linkedin} className="text-dark-400 hover:text-primary-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="text-dark-400 hover:text-primary-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-dark-900 border-y border-dark-800">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 hover:bg-primary-500/10 hover:text-primary-400 transition-colors text-dark-400">
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 hover:bg-primary-500/10 hover:text-primary-400 transition-colors text-dark-400">
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 hover:bg-primary-500/10 hover:text-primary-400 transition-colors text-dark-400">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 hover:bg-primary-500/10 hover:text-primary-400 transition-colors text-dark-400">
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800 hover:bg-primary-500/10 hover:text-primary-400 transition-colors text-dark-400">
              <Youtube className="w-5 h-5" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-main text-center">
          <h2 className="heading-lg text-white mb-6">Join Our Journey</h2>
          <p className="text-white/90 mb-10 max-w-xl mx-auto">Whether you're looking to collaborate on a project or join our team, we'd love to hear from you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/careers" className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors">
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
