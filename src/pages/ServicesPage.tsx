import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Smartphone, Cloud, Brain, FileText, Shield, ArrowRight, Check, Zap, Clock, Users, BarChart3 } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies. From simple websites to complex enterprise solutions.',
    features: ['React, Vue, Angular', 'Node.js, Python, Go', 'REST & GraphQL APIs', 'Database Design'],
    startingPrice: '$5,000',
    timeline: '2-8 weeks',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['React Native', 'Flutter', 'Swift & Kotlin', 'App Store Deployment'],
    startingPrice: '$10,000',
    timeline: '3-12 weeks',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Cloud infrastructure, migration, and DevOps solutions for scalable operations.',
    features: ['AWS, Azure, GCP', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code'],
    startingPrice: '$3,000/mo',
    timeline: 'Ongoing',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Artificial intelligence and machine learning solutions to automate and enhance your business.',
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
    startingPrice: '$15,000',
    timeline: '4-16 weeks',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'AI-powered resume builder with professional templates to help you land your dream job.',
    features: ['Multiple Templates', 'AI Optimization', 'Cover Letter Generator', 'ATS Friendly'],
    startingPrice: 'Free',
    timeline: 'Instant',
    link: '/services/resume-builder',
    highlighted: true,
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and vulnerability assessments.',
    features: ['Penetration Testing', 'Security Audits', 'Compliance', 'Monitoring'],
    startingPrice: '$2,500',
    timeline: '1-4 weeks',
  },
];

const process = [
  { icon: Clock, title: 'Discovery', description: 'We analyze your requirements and goals', step: '01' },
  { icon: BarChart3, title: 'Planning', description: 'Detailed roadmap and architecture design', step: '02' },
  { icon: Code2, title: 'Development', description: 'Agile sprints with regular updates', step: '03' },
  { icon: Zap, title: 'Delivery', description: 'Testing, deployment, and support', step: '04' },
];

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Kubernetes', category: 'DevOps' },
];

export function ServicesPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-dark-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-500/10 border-primary-500/30 text-primary-400 border rounded-full text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Transform Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Cutting-Edge</span> Solutions
            </h1>
            <p className="animate-fade-in-up text-lg text-dark-300" style={{ animationDelay: '100ms' }}>
              From concept to deployment, we deliver innovative technology solutions that drive growth, efficiency, and competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block text-primary-400">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Our Process</h2>
            <p className="max-w-xl mx-auto text-dark-400">A streamlined approach to deliver exceptional results on time and within budget.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((p, index) => (
              <div key={p.title} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="rounded-2xl p-6 transition-colors bg-dark-800 border-dark-700 border hover:border-primary-500/50">
                  <span className="text-5xl font-bold text-primary-500/20 absolute top-4 right-4">{p.step}</span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary-500/10">
                    <p.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{p.title}</h3>
                  <p className="text-sm text-dark-400">{p.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-dark-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid with Pricing */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block text-primary-400">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Our Services</h2>
            <p className="max-w-xl mx-auto text-dark-400">Comprehensive technology solutions tailored to your specific needs and goals.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative animate-fade-in-up rounded-2xl p-8 transition-all duration-300 ${
                  service.highlighted
                    ? 'bg-dark-800 border-primary-500/50 shadow-lg'
                    : 'bg-dark-900 border-dark-800'
                } border hover:shadow-xl ${service.highlighted ? '' : 'hover:border-primary-500/30'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.highlighted
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500'
                    : 'bg-primary-500/10'
                }`}>
                  <service.icon className={`w-7 h-7 ${service.highlighted ? 'text-white' : 'text-primary-400'}`} />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="mb-6 text-dark-400">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-dark-300">
                      <Check className="w-4 h-4 mr-3 flex-shrink-0 text-success-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-dark-700">
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1 text-dark-500">Starting at</p>
                    <p className="text-xl font-bold text-white">{service.startingPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider mb-1 text-dark-500">Timeline</p>
                    <p className="text-sm text-dark-300">{service.timeline}</p>
                  </div>
                </div>

                <div className="mt-6">
                  {service.link ? (
                    <Link
                      to={service.link}
                      className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                        service.highlighted
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90'
                          : 'bg-dark-700 text-white hover:bg-dark-600'
                      }`}
                    >
                      Try Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                        service.highlighted
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90'
                          : 'bg-dark-700 text-white hover:bg-dark-600'
                      }`}
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block text-primary-400">Our Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Technologies We Master</h2>
            <p className="max-w-xl mx-auto text-dark-400">Cutting-edge tools and frameworks to build robust, scalable solutions.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="rounded-xl p-4 text-center transition-all animate-fade-in-up cursor-default bg-dark-800 border-dark-700 hover:border-primary-500/50 hover:bg-dark-700 border"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="block font-semibold mb-1 text-white group-hover:text-primary-400 transition-colors">{tech.name}</span>
                <span className="text-xs text-dark-500">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden bg-dark-900 border-dark-800 border">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-dark-300">
                Get a free consultation and let's discuss how we can help transform your business with custom technology solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary-500/25 inline-flex items-center">
                  Get Free Consultation <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/portfolio" className="bg-dark-800 border-dark-700 text-white hover:bg-dark-700 font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center gap-2 border">
                  <Users className="w-5 h-5" /> View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
