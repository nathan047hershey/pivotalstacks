import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

// PivotalStacks Logo
function PivotalStacksLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#loginLogoGradient)"/>
        <path d="M10 26V10h4l6 10 6-10h4v16h-4V17l-4 7h-4l-4-7v9h-4z" fill="white"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-white text-lg tracking-tight">Pivotal</span>
        <span className="font-semibold text-primary-400 text-[10px] tracking-widest">STACKS</span>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithGitHub } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Direct admin login bypass
    if (email === 'mdgiwksdbsj942@gmail.com' && password === 'sgr@2007') {
      localStorage.setItem('admin_session', 'true');
      navigate('/admin');
      setIsLoading(false);
      return;
    }

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    const { error } = await signInWithGitHub();
    if (error) setError(error.message);
  };

  const handleMicrosoftSignIn = async () => {
    setError(null);
    // Microsoft login would be configured similarly
    setError('Microsoft login coming soon. Please use Google or GitHub for now.');
  };

  return (
    <div className="min-h-screen flex bg-dark-950">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-block mb-8"><PivotalStacksLogo /></Link>

          <h1 className="font-bold text-3xl text-white mb-2">Welcome Back</h1>
          <p className="text-dark-400 mb-8">Sign in to access your dashboard and services</p>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-error-500/10 border border-error-500/20 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 text-error-400" />
              <span className="text-error-400 text-sm">{error}</span>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button type="button" onClick={handleGoogleSignIn} className="btn-social">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button type="button" onClick={handleGitHubSignIn} className="btn-social">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              Continue with GitHub
            </button>

            <button type="button" onClick={handleMicrosoftSignIn} className="btn-social">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba09" d="M12 12h10v10H12z"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-700" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-dark-950 text-dark-500">or continue with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-dark-300 text-sm font-medium mb-2">Email Address</label>
              <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-dark-300 text-sm font-medium">Password</label>
                <Link to="/auth/forgot-password" className="text-primary-400 text-sm hover:text-primary-300">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-field pr-12" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-dark-700 bg-dark-800 text-primary-500 focus:ring-primary-500" />
              <label htmlFor="remember" className="ml-3 text-dark-400 text-sm">Remember me for 30 days</label>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center">
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-dark-500">Don't have an account? </span>
            <Link to="/auth/register" className="text-primary-400 font-medium hover:text-primary-300">Create one</Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-accent-600/60" />
        </div>
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-white text-xl font-light italic leading-relaxed mb-4">"Technology is best when it brings people together."</blockquote>
          <cite className="text-white/80 text-sm">Matt Mullenweg</cite>
        </div>
      </div>
    </div>
  );
}
