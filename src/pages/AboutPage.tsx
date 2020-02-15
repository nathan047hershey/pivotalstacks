import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Lightbulb, Users, Globe, Zap, Shield, Award, ArrowRight, Clock, TrendingUp, Code, Rocket } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

const leadershipTeam = [
  { name: 'David Chen', role: 'CEO & Founder', bio: 'Former Google engineer with 15+ years in software development. Passionate about building products that make a difference.', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', linkedin: '#' },
  { name: 'Sarah Anderson', role: 'Chief Technology Officer', bio: 'Architecture expert with experience at Microsoft and AWS. Leads our technical strategy and innovation.', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', linkedin: '#' },
  { name: 'Michael Rodriguez', role: 'Head of Design', bio: 'Award-winning designer focused on creating exceptional user experiences and brand identities.', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', linkedin: '#' },
  { name: 'Emily Thompson', role: 'VP of Engineering', bio: 'Full-stack expert leading our engineering teams to deliver scalable, high-performance solutions.', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', linkedin: '#' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions that give our clients competitive advantages.' },
  { icon: Shield, title: 'Integrity', description: 'Transparency and honesty guide every decision we make. We build lasting relationships based on trust and mutual respect.' },
  { icon: Heart, title: 'Passion', description: 'We love what we do, and it shows in every project we deliver. Our enthusiasm drives us to exceed expectations.' },
  { icon: Users, title: 'Collaboration', description: 'We work closely with our clients and each other, believing that the best results come from true partnership.' },
];

const milestones = [
  { year: '2024 Q1', title: 'Company Founded', description: 'PivotalStacks was founded in San Francisco by a team of experienced engineers with a vision to transform businesses through technology.', icon: Rocket },
  { year: '2024 Q2', title: 'Resume Builder Launch', description: 'Launched our AI-powered Resume Builder, helping thousands of job seekers create professional resumes and land their dream jobs.', icon: Lightbulb },
  { year: '2024 Q3', title: 'Enterprise Clients', description: 'Secured our first Fortune 500 clients, expanding our enterprise solutions to serve major corporations.', icon: Globe },
  { year: '2024 Q4', title: '50 Projects Milestone', description: 'Celebrated delivering 50 successful projects, establishing ourselves as a trusted technology partner.', icon: TrendingUp },
  { year: '2025 Q1', title: 'Global Expansion', description: 'Opened offices in London and Singapore to better serve our growing international client base.', icon: Globe },
  { year: '2025 Q2', title: 'AI Solutions Division', description: 'Launched dedicated AI/ML division to help clients leverage cutting-edge artificial intelligence technology.', icon: Lightbulb },
  { year: '2025 Q3', title: '100+ Projects', description: 'Reached milestone of 100+ successful projects across various industries worldwide.', icon: Award },
  { year: '2025 Q4', title: 'Team Growth', description: 'Grew to 50+ team members across multiple offices, with plans to double by end of year.', icon: Users },
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
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'TensorFlow', 'PyTorch'
];

export function AboutPage() {
  const { setTheme } = useTheme();

  // Force dark theme on this page
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-dark-950">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
        <div className="container-main relative z-10 py-32">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wider mb-6 bg-primary-500/10 border-primary-500/30 text-primary-400 border">OUR STORY</span>
          <h1 className="heading-xl max-w-3xl mb-6 text-white">
            About <span className="text-gradient">PivotalStacks</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8 text-dark-300">
            Founded in 2024, we're on a mission to transform businesses through innovative technology solutions. Our team of 50+ experts combines technical excellence with creative problem-solving.
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
      <section className="py-16 bg-dark-900 border-y border-dark-800">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-primary-500/10">
                  <stat.icon className="w-7 h-7 text-primary-400" />
                </div>
                <span className="block font-bold text-3xl mb-2 text-primary-400">{stat.value}</span>
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
                To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage. We transform complex challenges into elegant digital experiences.
              </p>
              <ul className="space-y-3 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400" />
                  Deliver exceptional value through technology
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400" />
                  Build lasting partnerships with clients
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400" />
                  Foster innovation in everything we do
                </li>
              </ul>
            </div>

            <div className="card p-10 bg-gradient-to-br from-accent-500/10 to-transparent border-accent-500/20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-accent-500">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-2xl mb-4 text-white">Our Vision</h2>
              <p className="leading-relaxed mb-6 text-dark-300">
                To be the global leader in digital transformation, recognized for our technical excellence, innovative solutions, and positive impact on businesses worldwide.
              </p>
              <ul className="space-y-3 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-accent-400" />
                  Lead in AI-powered development
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-accent-400" />
                  Enable global digital transformation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-accent-400" />
                  Set industry standards for quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Advantages */}
      <section className="py-20 bg-dark-900">
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
                description: 'With offices in San Francisco, London, and Singapore, we provide round-the-clock support and understand regional market nuances.',
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

      {/* Company Story */}
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Our Story</span>
              <h2 className="heading-lg mb-6 text-white">From Vision to Reality</h2>
              <div className="h-1 w-20 mb-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              <div className="space-y-6 text-dark-300">
                <p>
                  PivotalStacks began as a small team of passionate engineers who believed technology should empower, not complicate. Founded in San Francisco in early 2024, we set out to build a company that puts client success first.
                </p>
                <p>
                  What started as a focused team of five has grown into a diverse group of 50+ professionals across multiple continents. Our growth reflects our commitment to delivering exceptional results on every project.
                </p>
                <p>
                  Today, we serve clients ranging from ambitious startups to Fortune 500 enterprises, helping them navigate the complex landscape of modern technology and emerge as leaders in their industries.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl -z-10 bg-primary-500/20" />
              <div className="absolute -top-6 -right-6 w-48 h-48 border rounded-2xl -z-10 border-accent-500/20" />
            </div>
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
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full border-4 lg:-translate-x-1/2 z-10 bg-primary-500 border-dark-950" />
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

      {/* Goals Progress */}
      <section className="py-20 bg-dark-950">
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
      <section className="py-20 bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Tech Stack</span>
            <h2 className="heading-lg mb-6 text-white">Technologies We Master</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <span key={index} className="px-4 py-2 rounded-lg text-sm transition-colors bg-dark-800 border-dark-700 hover:border-primary-500/50 hover:text-primary-400 border text-dark-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="py-20 bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block text-primary-400">Leadership</span>
            <h2 className="heading-lg mb-6 text-white">Meet Our Team</h2>
            <div className="h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mb-8" />
            <p className="max-w-2xl mx-auto text-dark-400">Our leadership team brings decades of combined experience from top tech companies.</p>
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
                  <p className="text-sm leading-relaxed text-dark-400">{member.bio}</p>
                </div>
              </div>
            ))}
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
