import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.fullName,
          role: 'user',
        });

        if (profileError) console.error('Profile creation error:', profileError);
      }

      setSuccess(true);
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex bg-charcoal-900 items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-gold-500" />
          </div>
          <h1 className="font-display text-3xl text-white mb-4">Account Created</h1>
          <p className="text-charcoal-400 mb-6">
            Your account has been created successfully. Redirecting to dashboard...
          </p>
          <Loader className="w-6 h-6 text-gold-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-charcoal-900">
      {/* Left Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/60 to-charcoal-900/30" />
        </div>
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-white text-xl font-light italic leading-relaxed mb-4">
            "The creation of a thousand forests is in one acorn."
          </blockquote>
          <cite className="text-gold-400 text-sm">Ralph Waldo Emerson</cite>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex items-center mb-8 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm transform rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]" />
              <span className="absolute inset-0 flex items-center justify-center text-charcoal-900 font-display font-bold text-lg">
                A
              </span>
            </div>
            <span className="font-display text-2xl font-semibold text-white tracking-tight ml-2">
              PivotalStacks
            </span>
          </Link>

          <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-charcoal-400 mb-8">
            Join PivotalStacks and start building amazing projects
          </p>

          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-sm mb-6">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-charcoal-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-charcoal-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-charcoal-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 pr-12"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-charcoal-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 rounded border-charcoal-700 bg-charcoal-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-charcoal-900"
              />
              <label htmlFor="terms" className="ml-3 text-charcoal-400 text-sm leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-gold-500 hover:text-gold-400 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-gold-500 hover:text-gold-400 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-charcoal-500">Already have an account? </span>
            <Link to="/auth/login" className="text-gold-500 hover:text-gold-400 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
