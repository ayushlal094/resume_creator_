import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, FileText, Loader2, Check } from 'lucide-react';
import { signUp, signInWithGoogle, signInWithGithub } from '../supabase/auth';

const PERKS = [
  'Unlimited resume storage',
  '5 professional templates',
  'ATS score analysis',
  'PDF download',
  'Cloud auto-save',
];

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const { error: err } = await signUp(form.email, form.password, form.name);
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess(true);
  };

  const oauthSignIn = async (provider) => {
    setOauthLoading(provider);
    if (provider === 'google') await signInWithGoogle();
    else await signInWithGithub();
    setOauthLoading(null);
  };

  const pwStrength = (pw) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = pwStrength(form.password);
  const strengthColor = strength <= 1 ? '#ef4444' : strength <= 3 ? '#f59e0b' : '#22c55e';
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'][strength];

  return (
    <div className="min-h-screen flex bg-[var(--surface-1)]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-[var(--smoky-black)] flex-col justify-between p-12 relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[var(--floral-white)] flex items-center justify-center">
            <FileText size={16} className="text-[var(--smoky-black)]" />
          </div>
          <span className="font-display font-semibold text-[var(--floral-white)]">ResumeForge AI</span>
        </Link>

        <div className="relative z-10">
          <h2 className="font-display font-bold text-2xl text-[var(--floral-white)] mb-6">
            Everything you need to get hired
          </h2>
          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-[var(--bone)] opacity-80">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-green-400" />
                </div>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-[var(--bone)] opacity-40 relative z-10">
          Join 10,000+ professionals. No credit card required.
        </p>

        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[var(--olive-drab)] opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 justify-center lg:hidden mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold text-[var(--text-primary)]">ResumeForge AI</span>
          </Link>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-500" />
              </div>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">Check your email</h2>
              <p className="text-[var(--text-muted)] text-sm mb-6">We sent a confirmation link to <strong>{form.email}</strong></p>
              <Link to="/login" className="btn-primary justify-center">Go to sign in</Link>
            </motion.div>
          ) : (
            <>
              <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">Create your account</h1>
              <p className="text-[var(--text-muted)] mb-8">Start building your professional resume today — it's free.</p>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600">{error}</div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button onClick={() => oauthSignIn('google')} disabled={!!oauthLoading} className="btn-secondary justify-center text-sm py-2.5">
                  {oauthLoading === 'google' ? <Loader2 size={14} className="animate-spin" /> : (
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  )}
                  Google
                </button>
                <button onClick={() => oauthSignIn('github')} disabled={!!oauthLoading} className="btn-secondary justify-center text-sm py-2.5">
                  {oauthLoading === 'github' ? <Loader2 size={14} className="animate-spin" /> : 
                  (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                 </svg>
                )}
                  GitHub
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[var(--border-light)]" />
                <span className="text-xs text-[var(--text-muted)]">or</span>
                <div className="flex-1 h-px bg-[var(--border-light)]" />
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="label">Full name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" name="name" value={form.name} onChange={handle} required placeholder="Alex Johnson" className="input-field pl-9" />
                  </div>
                </div>

                <div>
                  <label className="label">Email address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="email" name="email" value={form.email} onChange={handle} required placeholder="you@example.com" className="input-field pl-9" />
                  </div>
                </div>

                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handle} required placeholder="Min. 6 characters" className="input-field pl-9 pr-10" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ background: i <= strength ? strengthColor : 'var(--bone)' }} />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : 'Create account'}
                </button>
              </form>

              <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-[var(--text-primary)] font-medium hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
