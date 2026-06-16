import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cloud, Smartphone, Brain, Palette, Users, Award, Shield, Loader2, Star, ChevronLeft, ChevronRight, Quote, FileText, TrendingUp, Clock, CheckCircle, Lightbulb, Heart, Zap, ChevronDown } from 'lucide-react';
import { HeroSlider } from '../components/ui/HeroSlider';
import { useSiteData } from '../hooks/useSiteData';

const iconMap: Record<string, typeof Code2> = {
  Code: Code2, Smartphone: Smartphone, Brain: Brain, Cloud: Cloud, Palette: Palette, FileText: FileText,
};

const defaultServices = [
  { id: '1', icon: 'Code', title: 'Web Development', description: 'Custom web applications built with modern technologies.', category: 'Development' },
  { id: '2', icon: 'Smartphone', title: 'Mobile Apps', description: 'Native and cross-platform mobile applications.', category: 'Development' },
  { id: '3', icon: 'Cloud', title: 'Cloud Services', description: 'Cloud infrastructure and DevOps solutions.', category: 'Infrastructure' },
  { id: '4', icon: 'Brain', title: 'AI Solutions', description: 'Artificial intelligence and machine learning solutions.', category: 'AI' },
];

const defaultTestimonials = [
  { id: '1', quote: 'PivotalStacks transformed our outdated systems into a modern, scalable platform.', author_name: 'Michael Torres', author_role: 'CTO, TechCorp Industries', author_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { id: '2', quote: 'The AI-powered analytics dashboard they built has helped us increase revenue by 40%.', author_name: 'Sarah Chen', author_role: 'VP Operations, FinanceHub', author_image: 'https://images.unsplash.com/photo-1494790108375-be5d0a2d1d9?w=200' },
  { id: '3', quote: 'From discovery to deployment, PivotalStacks exceeded every expectation.', author_name: 'David Kim', author_role: 'CEO, RetailMax', author_image: 'https://images.unsplash.com/photo-1507007211163-1c1b8e5e7e9?w=200' },
];

const processSteps = [
  { icon: Clock, title: 'Discovery', desc: 'We analyze your requirements and goals' },
  { icon: TrendingUp, title: 'Planning', desc: 'Detailed roadmap and architecture design' },
  { icon: Code2, title: 'Development', desc: 'Agile sprints with regular updates' },
  { icon: CheckCircle, title: 'Delivery', desc: 'Comprehensive testing and deployment' },
];

const companyValues = [
  { icon: Lightbulb, title: 'Innovation', desc: 'We push boundaries and embrace new technologies.' },
  { icon: Heart, title: 'Passion', desc: 'We love what we do, and it shows in every project.' },
  { icon: Shield, title: 'Integrity', desc: 'Transparency and honesty guide every decision.' },
  { icon: Users, title: 'Collaboration', desc: 'True partnership with our clients.' },
];

export function HomePage() {
  const { heroSlides, services, stats, testimonials, loading } = useSiteData();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const mapSlides = (slidesToMap: any[]) => slidesToMap.map(s => ({ id: s.id, title: s.title, subtitle: s.subtitle, description: s.description, image: s.image_url || s.image, ctaText: s.cta_text, ctaLink: s.cta_link }));
  const slides = heroSlides.length > 0 ? mapSlides(heroSlides) : undefined;
  const displayServices = services.length > 0 ? services : defaultServices;
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const defaultStats = [
    { id: '1', value: '500+', label: 'Projects Delivered' },
    { id: '2', value: '98%', label: 'Client Satisfaction' },
    { id: '3', value: '50+', label: 'Team Members' },
    { id: '4', value: '15', label: 'Countries Served' },
  ];
  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % displayTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
      <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-950 min-h-screen">
      <HeroSlider slides={slides} autoPlayInterval={6000} />

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50 dark:bg-dark-900 border-y border-gray-100 dark:border-dark-800">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <span className="block text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</span>
                <span className="text-gray-500 dark:text-dark-400 text-sm uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">About Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">Building Tomorrow's Technology Today</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-8" />
              <p className="text-gray-600 dark:text-dark-300 text-lg mb-6 leading-relaxed">
                Founded in 2024, PivotalStacks is a leading IT solutions provider dedicated to transforming businesses through innovative technology.
              </p>
              <p className="text-gray-500 dark:text-dark-400 mb-8">
                Our team of 50+ certified experts has delivered 500+ successful projects across 15 countries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn-primary">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                <Link to="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c9b7?w=800"
                alt="Team collaboration"
                className="rounded-2xl w-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Code2;
              return (
                <Link
                  key={service.id}
                  to={`/services${service.category === 'Tools' ? '/resume-builder' : ''}`}
                  className="card p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-dark-400 text-sm">{service.description}</p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">View All Services <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-dark-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="card p-8">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Clients Say</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-primary-500/30 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-700 dark:text-dark-200 italic mb-8 leading-relaxed">
              "{displayTestimonials[currentTestimonial]?.quote}"
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
            </div>
            <img
              src={displayTestimonials[currentTestimonial]?.author_image}
              alt={displayTestimonials[currentTestimonial]?.author_name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="font-semibold text-gray-900 dark:text-white">{displayTestimonials[currentTestimonial]?.author_name}</p>
            <p className="text-dark-500 text-sm">{displayTestimonials[currentTestimonial]?.author_role}</p>
            <div className="flex justify-center gap-2 mt-6">
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-8 bg-primary-500' : 'bg-dark-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">Schedule a free consultation today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all inline-flex items-center">
              Start a Project <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/services/resume-builder" className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all inline-flex items-center">
              Try Resume Builder
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
