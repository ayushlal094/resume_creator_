import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, FileText, Github, Loader2 } from 'lucide-react';
import { signIn, signInWithGoogle, signInWithGithub } from '../supabase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(form.email, form.password);
    setLoading(false);
    if (err) { setError(err.message); return; }
    navigate('/dashboard');
  };

  const oauthSignIn = async (provider) => {
    setOauthLoading(provider);
    if (provider === 'google') await signInWithGoogle();
    else await signInWithGithub();
    setOauthLoading(null);
  };

  return (
    <div className="min-h-screen flex bg-[var(--surface-1)]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--smoky-black)] flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--floral-white)] flex items-center justify-center">
              <FileText size={16} className="text-[var(--smoky-black)]" />
            </div>
            <span className="font-display font-semibold text-[var(--floral-white)]">ResumeForge AI</span>
          </Link>
        </div>

        {/* Resume mockup */}
        <div className="relative z-10 flex justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/95 rounded-2xl p-6 w-64 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#565449] flex items-center justify-center text-white font-bold text-lg mb-3">JS</div>
            <div className="h-3 w-32 bg-gray-800 rounded mb-1" />
            <div className="h-2 w-20 bg-gray-400 rounded mb-4" />
            {[70, 90, 60, 80, 50].map((w, i) => (
              <div key={i} className="h-1.5 bg-gray-100 rounded mb-1.5" style={{ width: `${w}%` }} />
            ))}
            <div className="mt-3 flex gap-1.5 flex-wrap">
              {['React', 'Node.js', 'AWS'].map((s) => (
                <span key={s} className="px-2 py-0.5 text-[9px] bg-gray-100 text-gray-600 rounded-full">{s}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <blockquote className="text-[var(--floral-white)] font-display text-xl leading-relaxed mb-3">
            "I landed 3 interviews in my first week using ResumeForge AI."
          </blockquote>
          <p className="text-[var(--bone)] opacity-70 text-sm">— Sarah K., Software Engineer</p>
        </div>

        {/* BG blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[var(--olive-drab)] opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[var(--olive-drab)] opacity-10 blur-2xl translate-y-1/2 -translate-x-1/4" />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 justify-center lg:hidden mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold text-[var(--text-primary)]">ResumeForge AI</span>
          </Link>

          <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">Welcome back</h1>
          <p className="text-[var(--text-muted)] mb-8">Sign in to access your resumes.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => oauthSignIn('google')}
              disabled={!!oauthLoading}
              className="btn-secondary justify-center text-sm py-2.5"
            >
              {oauthLoading === 'google' ? <Loader2 size={14} className="animate-spin" /> : (
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              )}
              Google
            </button>
            <button
              onClick={() => oauthSignIn('github')}
              disabled={!!oauthLoading}
              className="btn-secondary justify-center text-sm py-2.5"
            >
              {oauthLoading === 'github' ? <Loader2 size={14} className="animate-spin" /> : <Github size={16} />}
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--border-light)]" />
            <span className="text-xs text-[var(--text-muted)]">or continue with email</span>
            <div className="flex-1 h-px bg-[var(--border-light)]" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="email" name="email" value={form.email} onChange={handle} required
                  placeholder="you@example.com" className="input-field pl-9" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-[var(--olive-drab)] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handle} required
                  placeholder="Your password" className="input-field pl-9 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--text-primary)] font-medium hover:underline">Sign up free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
