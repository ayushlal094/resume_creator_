import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { resetPassword } from '../supabase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await resetPassword(email);
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-1)] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <span className="font-display font-semibold text-[var(--text-primary)]">ResumeForge AI</span>
        </Link>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-green-500" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">Check your email</h2>
            <p className="text-[var(--text-muted)] text-sm mb-6">
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login" className="btn-primary justify-center">Back to sign in</Link>
          </motion.div>
        ) : (
          <>
            <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">Forgot password?</h1>
            <p className="text-[var(--text-muted)] mb-8">Enter your email and we'll send you a reset link.</p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="input-field pl-9"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Send reset link'}
              </button>
            </form>

            <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;