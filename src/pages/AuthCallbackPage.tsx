import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      // Get the OAuth callback params from URL
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get('error');
      const errorDescription = params.get('error_description');

      if (errorParam) {
        throw new Error(errorDescription || errorParam);
      }

      // Check if there's a code or provider in the URL
      const provider = params.get('provider');

      // Let Supabase handle the callback
      const { data, error: authError } = await supabase.auth.getSession();

      if (authError) {
        throw authError;
      }

      // If we have a session, redirect to admin or home
      if (data.session) {
        // Fetch or create profile
        const user = data.session.user;
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
            role: 'user',
          });
        }

        // Check if admin
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (adminProfile?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        // No session, redirect to login
        navigate('/auth/login?error=no_session');
      }
    } catch (err) {
      console.error('OAuth callback error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-dark-900 border border-dark-700 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-error-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Authentication Failed</h1>
          <p className="text-dark-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="btn-primary w-full"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin mx-auto mb-4" />
        <p className="text-dark-400">Completing sign in...</p>
      </div>
    </div>
  );
}