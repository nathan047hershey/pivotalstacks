import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Settings, X, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../lib/ThemeContext';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroSliderProps {
  slides?: Slide[];
  autoPlayInterval?: number;
  showAdminControls?: boolean;
  onSlidesChange?: (slides: Slide[]) => void;
}

const defaultSlides: Slide[] = [
  {
    id: '1',
    title: 'Innovative Tech Solutions',
    subtitle: 'DIGITAL TRANSFORMATION',
    description: 'Building cutting-edge web and mobile applications that drive business growth and deliver exceptional user experiences.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    ctaText: 'Explore Services',
    ctaLink: '/services',
  },
  {
    id: '2',
    title: 'AI-Powered Resume Builder',
    subtitle: 'CAREER ADVANCEMENT',
    description: 'Create professional resumes and cover letters in minutes with our AI-powered tools. Land your dream job faster.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80',
    ctaText: 'Try Resume Builder',
    ctaLink: '/services/resume-builder',
  },
  {
    id: '3',
    title: 'Expert Cloud Migration',
    subtitle: 'ENTERPRISE SOLUTIONS',
    description: 'Seamlessly migrate your infrastructure to the cloud with our certified AWS, Azure, and GCP experts.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    ctaText: 'Get Started',
    ctaLink: '/services#cloud',
  },
  {
    id: '4',
    title: 'Custom Mobile Apps',
    subtitle: 'MOBILE DEVELOPMENT',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=80',
    ctaText: 'View Portfolio',
    ctaLink: '/portfolio',
  },
  {
    id: '5',
    title: 'Machine Learning Solutions',
    subtitle: 'AI & DATA SCIENCE',
    description: 'Leverage the power of AI with custom machine learning models, NLP, and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1553877522-43269c4e7e3f?w=1920&q=80',
    ctaText: 'Learn More',
    ctaLink: '/services#ai',
  },
];

export function HeroSlider({
  slides: externalSlides,
  autoPlayInterval = 6000,
  showAdminControls = false,
  onSlidesChange,
}: HeroSliderProps) {
  const initialSlides = externalSlides || defaultSlides;
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeSlides = useMemo(() => externalSlides || slides, [externalSlides, slides]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % activeSlides.length);
  }, [currentSlide, goToSlide, activeSlides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + activeSlides.length) % activeSlides.length);
  }, [currentSlide, goToSlide, activeSlides.length]);

  // Auto-play with progress
  useEffect(() => {
    if (isPaused || !autoPlayInterval) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime + (progress * autoPlayInterval);
      const newProgress = (elapsed % autoPlayInterval) / autoPlayInterval;
      setProgress(newProgress);

      if (newProgress < 0.01) {
        nextSlide();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [autoPlayInterval, isPaused, nextSlide, progress]);

  const togglePause = () => setIsPaused(!isPaused);

  const handleSlideEdit = (index: number, field: keyof Slide, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
    onSlidesChange?.(newSlides);
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      subtitle: 'NEW',
      description: 'Slide description here',
      image: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1920',
    };
    const newSlides = [...slides, newSlide];
    setSlides(newSlides);
    onSlidesChange?.(newSlides);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    onSlidesChange?.(newSlides);
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1);
    }
  };

  const current = activeSlides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden group">
      {/* Background Slides */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[6000ms] ease-linear"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-main min-h-screen flex items-center">
        <div className="max-w-3xl">
          {activeSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ease-out ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
            >
              {index === currentSlide && (
                <>
                  <span
                    className="inline-block px-5 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-semibold tracking-wider mb-6"
                    style={{ animationDelay: '0.1s' }}
                  >
                    {slide.subtitle}
                  </span>
                  <h1
                    className="heading-xl text-white mb-6 leading-tight"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {slide.title.split(' ').map((word, i, arr) => (
                      <span key={i}>
                        {i === arr.length - 1 ? (
                          <span className="text-gradient">{word}</span>
                        ) : (
                          word + ' '
                        )}
                      </span>
                    ))}
                  </h1>
                  <p
                    className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl"
                    style={{ animationDelay: '0.3s' }}
                  >
                    {slide.description}
                  </p>
                  {slide.ctaText && slide.ctaLink && (
                    <div className="flex flex-wrap gap-4" style={{ animationDelay: '0.4s' }}>
                      <Link
                        to={slide.ctaLink}
                        className="btn-primary text-base"
                      >
                        {slide.ctaText}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-full text-white hover:bg-dark-800 hover:border-primary-500/50 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-full text-white hover:bg-dark-800 hover:border-primary-500/50 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
        <button
          onClick={togglePause}
          className="p-2 bg-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-full text-white hover:bg-dark-800 hover:border-primary-500/50 transition-all"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>

        {showAdminControls && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 backdrop-blur-sm border rounded-full transition-all ${
              isEditing
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'bg-dark-900/50 border-dark-700/50 text-white hover:bg-dark-800'
            }`}
            aria-label="Edit slides"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-primary-500'
                : 'w-2 h-2 bg-dark-600 hover:bg-dark-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800 z-20">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-100 ease-linear"
          style={{ width: `${(currentSlide / activeSlides.length) * 100 + (progress / activeSlides.length) * 100}%` }}
        />
      </div>

      {/* Admin Edit Panel */}
      {isEditing && showAdminControls && (
        <div className="absolute top-4 right-4 w-80 bg-dark-900/95 backdrop-blur-xl border border-dark-700 rounded-2xl shadow-xl z-30 overflow-hidden">
          <div className="p-4 border-b border-dark-700 flex items-center justify-between">
            <h3 className="font-semibold text-white">Edit Slides</h3>
            <button onClick={() => setIsEditing(false)} className="text-dark-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {slides.map((slide, index) => (
              <div key={slide.id} className="p-4 bg-dark-800/50 rounded-xl border border-dark-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-dark-500 flex items-center gap-1">
                    <GripVertical className="w-3 h-3" /> Slide {index + 1}
                  </span>
                  <button
                    onClick={() => handleDeleteSlide(index)}
                    className="text-dark-500 hover:text-error-400 text-xs"
                    disabled={slides.length <= 1}
                  >
                    Delete
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleSlideEdit(index, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-sm focus:outline-none focus:border-primary-500"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => handleSlideEdit(index, 'subtitle', e.target.value)}
                    className="w-full px-3 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-sm focus:outline-none focus:border-primary-500"
                    placeholder="Subtitle"
                  />
                  <input
                    type="url"
                    value={slide.image}
                    onChange={(e) => handleSlideEdit(index, 'image', e.target.value)}
                    className="w-full px-3 py-1.5 bg-dark-900 border border-dark-700 rounded text-white text-sm focus:outline-none focus:border-primary-500"
                    placeholder="Image URL"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-dark-700">
            <button
              onClick={handleAddSlide}
              className="w-full py-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 transition-colors text-sm font-medium"
            >
              + Add New Slide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}