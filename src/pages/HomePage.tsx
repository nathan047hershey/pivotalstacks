import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cloud, Smartphone, Brain, Palette, Users, Award, Zap, Shield, Loader2, Star, ChevronLeft, ChevronRight, Quote, FileText } from 'lucide-react';
import { HeroSlider } from '../components/ui/HeroSlider';
import { useSiteData } from '../hooks/useSiteData';
import { useTheme } from '../lib/ThemeContext';

const iconMap: Record<string, typeof Code2> = {
  Code: Code2,
  Smartphone: Smartphone,
  Brain: Brain,
  Cloud: Cloud,
  Palette: Palette,
  FileText: FileText,
};

// Animated counter component
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numValue = parseInt(value.replace(/[^0-9]/g, ''));
          const suffix = value.replace(/[0-9]/g, '');
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * numValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  return <span ref={ref}>{count}{suffix}</span>;
}

// Testimonials slider
function TestimonialsSlider({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Quote className="w-12 h-12 text-primary-500/30 mx-auto mb-6" />
                <p className="text-xl md:text-2xl text-gray-700 dark:text-dark-200 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                </div>
                <img src={t.author_image} alt={t.author_name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                <p className="font-semibold text-gray-900 dark:text-white">{t.author_name}</p>
                <p className="text-dark-500 text-sm">{t.author_role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-dark-800/80 hover:bg-dark-700 rounded-full transition-colors">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-dark-800/80 hover:bg-dark-700 rounded-full transition-colors">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary-500' : 'bg-dark-600'}`} />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const { heroSlides, services, stats, testimonials, loading } = useSiteData();

  // Map hero slides to the format expected by HeroSlider
  const mapSlides = (slidesToMap: any[]) => slidesToMap.map(s => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    description: s.description,
    image: s.image_url || s.image,
    ctaText: s.cta_text,
    ctaLink: s.cta_link,
  }));

  const slides = heroSlides.length > 0 ? mapSlides(heroSlides) : [];
  const displayServices = services;
  const displayStats = stats;
  const displayTestimonials = testimonials;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
      {/* Hero Slider */}
      <HeroSlider slides={slides} autoPlayInterval={6000} />

      {/* Stats with animated counters */}
      <section className="py-20 bg-gray-50 dark:bg-dark-900 border-y border-gray-200 dark:border-dark-800">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div key={stat.id || index} className="text-center group">
                <span className="block font-bold text-4xl md:text-5xl text-primary-600 dark:text-primary-400 mb-2 transition-transform group-hover:scale-110">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-gray-600 dark:text-dark-400 text-sm tracking-wide uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">About PivotalStacks</span>
              <h2 className="heading-xl text-gray-900 dark:text-white mb-6">Building Tomorrow's Technology Today</h2>
              <div className="line-accent mb-8" />
              <p className="text-gray-600 dark:text-dark-300 text-lg mb-6 leading-relaxed">
                Founded in 2024, PivotalStacks is a leading IT solutions provider dedicated to transforming businesses through innovative technology.
              </p>
              <p className="text-gray-500 dark:text-dark-400 mb-8">
                Our team of 50+ certified experts combines technical excellence with creative problem-solving to deliver exceptional digital products.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn-primary">
                  Learn Our Story <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/portfolio" className="btn-secondary">
                  View Portfolio
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-500/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 border border-primary-500/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-gray-50 dark:bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">What We Offer</span>
            <h2 className="heading-xl text-gray-900 dark:text-white mb-6">Our Services</h2>
            <div className="line-accent-center mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code2;
              return (
                <Link key={service.id || index} to={`/services${service.category === 'Tools' ? '/resume-builder' : ''}`} className="card p-8 group animate-fade-in-up hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-14 h-14 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 dark:text-dark-400 text-sm leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">
              View All Services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Why Choose Us</span>
              <h2 className="heading-xl text-gray-900 dark:text-white mb-6">Excellence in Every Project</h2>
              <div className="line-accent mb-8" />

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-900 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors group">
                  <div className="w-16 h-16 bg-primary-500/10 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
                    <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise Security</h3>
                  <p className="text-gray-500 dark:text-dark-400 text-sm">Bank-grade encryption and compliance.</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-900 hover:bg-accent-50 dark:hover:bg-accent-500/10 transition-colors group">
                  <div className="w-16 h-16 bg-accent-500/10 dark:bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500 transition-colors">
                    <Users className="w-8 h-8 text-accent-500 dark:text-accent-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dedicated Support</h3>
                  <p className="text-gray-500 dark:text-dark-400 text-sm">24/7 expert support team.</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-900 hover:bg-success-50 dark:hover:bg-success-500/10 transition-colors group">
                  <div className="w-16 h-16 bg-success-500/10 dark:bg-success-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-success-500 transition-colors">
                    <Award className="w-8 h-8 text-success-500 dark:text-success-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Certified Experts</h3>
                  <p className="text-gray-500 dark:text-dark-400 text-sm">AWS, Azure, GCP certified.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative">
                <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Innovation" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Fast Delivery</p>
                        <p className="text-white/70 text-sm">Agile methodology</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="section-padding bg-gray-50 dark:bg-dark-900">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
            <h2 className="heading-xl text-gray-900 dark:text-white mb-6">What Clients Say</h2>
            <div className="line-accent-center mx-auto" />
          </div>

          <TestimonialsSlider testimonials={displayTestimonials} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white dark:bg-dark-950 border-y border-gray-200 dark:border-dark-800">
        <div className="container-main">
          <p className="text-center text-dark-500 text-sm mb-8 uppercase tracking-widest">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-dark-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-xl text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">Let's discuss how we can help you achieve your goals with innovative technology solutions. Schedule a free consultation today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl inline-flex items-center transform hover:scale-105">
                Start a Project <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/services/resume-builder" className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all hover:shadow-xl inline-flex items-center">
                Try Resume Builder
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}