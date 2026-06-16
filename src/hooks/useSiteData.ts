import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteData() {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // If still loading after 5 seconds, use fallback
      setLoading(false);
      setUsingFallback(true);
    }, 5000);

    fetchAllData().finally(() => {
      clearTimeout(timeoutId);
    });
  }, []);

  const fetchAllData = async () => {
    try {
      const results = await Promise.all([
        Promise.race([
          supabase.from('hero_slides').select('*'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]),
        Promise.race([
          supabase.from('services').select('*'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]),
        Promise.race([
          supabase.from('stats').select('*'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]),
        Promise.race([
          supabase.from('testimonials').select('*'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]),
        Promise.race([
          supabase.from('projects').select('*'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]),
      ]);

      const [slidesResult, servicesResult, statsResult, testimonialsResult, projectsResult] = results;

      if (slidesResult.data?.length) setHeroSlides(slidesResult.data);
      if (servicesResult.data?.length) setServices(servicesResult.data);
      if (statsResult.data?.length) setStats(statsResult.data);
      if (testimonialsResult.data?.length) setTestimonials(testimonialsResult.data);
      if (projectsResult.data?.length) setProjects(projectsResult.data);

      const hasData = slidesResult.data?.length || servicesResult.data?.length ||
                     statsResult.data?.length || testimonialsResult.data?.length ||
                     projectsResult.data?.length;

      if (!hasData) {
        setUsingFallback(true);
      }
    } catch (err) {
      console.warn('Error loading site data:', err);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    heroSlides,
    services,
    stats,
    testimonials,
    projects,
    loading,
    usingFallback,
    refetch: fetchAllData,
  };
}
