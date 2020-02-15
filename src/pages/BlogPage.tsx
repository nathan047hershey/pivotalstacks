import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Loader2, Filter, X, User, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author_name: string;
  read_time: string;
  published_at: string;
  is_published: boolean;
}

// Fallback blog posts when database is unavailable
const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Software Development',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we build and maintain software systems.',
    content: '<p>Artificial Intelligence is transforming software development...</p>',
    category: 'AI',
    image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    author_name: 'David Chen',
    read_time: '8 min read',
    published_at: '2024-01-15',
    is_published: true,
  },
  {
    id: '2',
    title: 'React vs Vue: A Comprehensive Comparison',
    excerpt: 'An in-depth look at two of the most popular JavaScript frameworks and when to use each.',
    content: '<p>Choosing between React and Vue can be challenging...</p>',
    category: 'Web Development',
    image_url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    author_name: 'Sarah Anderson',
    read_time: '12 min read',
    published_at: '2024-01-10',
    is_published: true,
  },
  {
    id: '3',
    title: 'Cloud Migration Best Practices',
    excerpt: 'Essential strategies for successfully migrating your infrastructure to the cloud.',
    content: '<p>Cloud migration requires careful planning...</p>',
    category: 'Cloud',
    image_url: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
    author_name: 'Michael Rodriguez',
    read_time: '10 min read',
    published_at: '2024-01-05',
    is_published: true,
  },
  {
    id: '4',
    title: 'Building Cross-Platform Apps with Flutter',
    excerpt: 'Why Flutter is becoming the go-to choice for mobile app development in 2024.',
    content: '<p>Flutter offers unmatched flexibility...</p>',
    category: 'Mobile',
    image_url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    author_name: 'Emily Thompson',
    read_time: '7 min read',
    published_at: '2023-12-28',
    is_published: true,
  },
];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      // Timeout race to handle connection issues
      const timeoutPromise = new Promise<'timeout'>((resolve) => {
        setTimeout(() => resolve('timeout'), 5000);
      });

      const fetchPromise = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      if (result === 'timeout') {
        console.warn('Blog fetch timeout - using fallback data');
        setPosts(fallbackBlogPosts);
        return;
      }

      const { data, error } = result;

      if (error) throw error;

      // Use fallback if no data
      if (!data || data.length === 0) {
        setPosts(fallbackBlogPosts);
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.warn('Blog fetch error - using fallback data:', err);
      setPosts(fallbackBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(posts.map(p => p.category))];
    return cats;
  }, [posts]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author_name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [posts, selectedCategory, searchQuery]);

  // Featured post (most recent)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-950 dark:to-dark-900">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Insights & <span className="text-gradient">Knowledge</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-300">
              Expert perspectives on technology, development, and innovation. Stay ahead with insights from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 border-b border-gray-200 dark:border-dark-800 bg-gray-50 dark:bg-dark-900/50 sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-dark-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Category Pills - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
                  }`}
                >
                  {category}
                  <span className={`text-xs px-1.5 py-0.5 rounded ${selectedCategory === category ? 'bg-white/20' : 'bg-gray-100 dark:bg-dark-700'}`}>
                    {categoryCounts[category] || 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg text-gray-700 dark:text-dark-300"
            >
              <Filter className="w-4 h-4" />
              Filters
              {selectedCategory !== 'All' && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-300'
                    }`}
                  >
                    {category} ({categoryCounts[category] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-dark-800 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-dark-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <article className="mb-12 animate-fade-in-up">
                  <Link to={`/blog/${featuredPost.id}`} className="group block">
                    <div className="grid lg:grid-cols-2 gap-8 bg-gray-50 dark:bg-dark-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-dark-800 hover:border-primary-500/30 transition-all duration-300">
                      <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                        <img
                          src={featuredPost.image_url || 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8 lg:py-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                            {featuredPost.category}
                          </span>
                          <span className="text-primary-500 text-sm font-medium">Featured</span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 dark:text-dark-300 text-lg mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-dark-400">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {featuredPost.author_name}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.read_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Post Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-500 dark:text-dark-400">
                  Showing {remainingPosts.length + (featuredPost ? 1 : 0)} articles
                  {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/blog/${post.id}`} className="block">
                      <div className="card overflow-hidden group-hover:border-primary-500/30 transition-all duration-300">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image_url || 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                            <span className="text-gray-400 dark:text-dark-500 text-xs flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.read_time}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-dark-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-400">
                              <span>{post.author_name}</span>
                              <span>•</span>
                              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <span className="text-primary-500 text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              Read <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-900 dark:to-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-dark-800 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-500 text-sm font-medium rounded-full mb-4">
              Newsletter
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-gray-600 dark:text-dark-300 mb-8 max-w-xl mx-auto">
              Get the latest insights, tutorials, and tech trends delivered directly to your inbox. No spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              <button type="submit" className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary-500/25 whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-dark-500 mt-4">
              Join 10,000+ developers and tech leaders
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}