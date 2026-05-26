import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Target, Eye, Download, Layers, Moon, Cloud,
  Zap, BarChart2, Star, Check, ChevronRight, Sparkles
} from 'lucide-react';
import { FEATURES, TEMPLATES } from '../utils/constants';

// Icon map
const ICONS = { Target, Eye, Download, Layers, Moon, Cloud, Zap, BarChart2 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

// ── Animated Resume Mockup ────────────────────────────────
const ResumeMockup = () => (
  <div className="relative">
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden w-64 md:w-80"
      style={{ boxShadow: '0 32px 80px rgba(17,18,13,0.2)' }}
    >
      {/* Header bar */}
      <div className="bg-[#11120D] px-5 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#565449] flex items-center justify-center text-white text-sm font-bold">AJ</div>
          <div>
            <div className="h-2.5 w-24 bg-white/80 rounded-full mb-1" />
            <div className="h-2 w-16 bg-white/40 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="h-1.5 w-20 bg-white/30 rounded-full" />
          <div className="h-1.5 w-14 bg-white/30 rounded-full" />
          <div className="h-1.5 w-10 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        <div>
          <div className="h-1.5 w-16 bg-gray-300 rounded mb-2" />
          <div className="space-y-1.5">
            {[60, 80, 55, 70].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-gray-100" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div>
          <div className="h-1.5 w-20 bg-gray-300 rounded mb-2" />
          <div className="space-y-2">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="h-2 w-28 bg-gray-200 rounded" />
                  <div className="h-1.5 w-20 bg-gray-100 rounded" />
                  <div className="h-1.5 w-36 bg-gray-100 rounded" />
                </div>
                <div className="h-1.5 w-12 bg-gray-100 rounded mt-0.5" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-1.5 w-12 bg-gray-300 rounded mb-2" />
          <div className="flex flex-wrap gap-1.5">
            {['React', 'Node.js', 'TypeScript', 'AWS', 'Python'].map((s) => (
              <span key={s} className="px-2 py-0.5 text-[9px] bg-gray-100 text-gray-600 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ATS badge */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute -right-4 top-8 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg"
      >
        ATS ✓ 92
      </motion.div>
    </motion.div>

    {/* Floating cards */}
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute -left-10 top-16 bg-[var(--floral-white)] dark:bg-[#1a1b16] border border-[var(--border-light)] rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
    >
      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px]">⚡</div>
      <span className="text-[11px] font-medium text-[var(--text-primary)]">Real-time preview</span>
    </motion.div>

    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute -left-6 bottom-16 bg-[var(--floral-white)] dark:bg-[#1a1b16] border border-[var(--border-light)] rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
    >
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
        <Download size={10} className="text-blue-600" />
      </div>
      <span className="text-[11px] font-medium text-[var(--text-primary)]">PDF ready</span>
    </motion.div>

    {/* Blurred background blobs */}
    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.2)] blur-3xl opacity-60 -z-10" />
    <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.15)] blur-2xl opacity-40 -z-10" />
  </div>
);

// ── Feature Card ──────────────────────────────────────────
const FeatureCard = ({ icon, title, description, delay }) => {
  const Icon = ICONS[icon] || Zap;
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 group cursor-default"
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--smoky-black)] dark:bg-[var(--floral-white)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon size={18} className="text-[var(--floral-white)] dark:text-[var(--smoky-black)]" />
      </div>
      <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
    </motion.div>
  );
};

// ── Template Card ─────────────────────────────────────────
const TemplateCard = ({ template, delay }) => (
  <motion.div
    {...fadeUp(delay)}
    whileHover={{ scale: 1.03 }}
    className="group relative rounded-2xl overflow-hidden border border-[var(--border-light)] cursor-pointer"
  >
    <div
      className="h-52 flex items-center justify-center relative"
      style={{ background: `linear-gradient(135deg, ${template.color}22, ${template.color}08)` }}
    >
      {/* Mini resume mockup */}
      <div className="w-28 h-36 bg-white rounded-lg shadow-lg p-2.5 transform group-hover:scale-105 transition-transform">
        <div className="h-2 w-16 rounded mb-1" style={{ background: template.color }} />
        <div className="h-1 w-10 bg-gray-200 rounded mb-2" />
        <div className="space-y-1">
          {[80, 60, 70, 50, 65].map((w, i) => (
            <div key={i} className="h-1 bg-gray-100 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-2 flex gap-1 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 w-6 rounded" style={{ background: `${template.color}40` }} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[var(--smoky-black)] opacity-0 group-hover:opacity-10 transition-opacity" />
    </div>
    <div className="p-4 bg-[var(--surface-1)]">
      <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-0.5">{template.name}</h3>
      <p className="text-xs text-[var(--text-muted)]">{template.description}</p>
    </div>
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[var(--smoky-black)] text-[var(--floral-white)]">Preview</span>
    </div>
  </motion.div>
);

// ── Home Page ─────────────────────────────────────────────
const Home = () => (
  <div className="bg-[var(--surface-1)] overflow-x-hidden">
    {/* Hero */}
    <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-24 left-1/4 w-72 h-72 rounded-full bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.15)] blur-3xl opacity-40 -z-10" />
      <div className="absolute top-40 right-1/4 w-56 h-56 rounded-full bg-[var(--bone)] dark:bg-[rgba(86,84,73,0.1)] blur-3xl opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-light)] bg-[var(--surface-2)] text-xs text-[var(--text-muted)] mb-6"
            >
              <Sparkles size={12} className="text-amber-500" />
              AI-Powered Resume Builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight mb-6"
            >
              Build Professional
              <br />
              <span className="gradient-text">ATS-Friendly</span>
              <br />
              Resumes in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg"
            >
              Create elegant modern resumes designed to impress recruiters and pass ATS systems — no design skills needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link to="/builder" className="btn-primary text-sm px-6 py-3.5 justify-center">
                Create Resume <ArrowRight size={16} />
              </Link>
              <Link to="/templates" className="btn-secondary text-sm px-6 py-3.5 justify-center">
                Explore Templates
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['#565449', '#8A8679', '#D8CFBC', '#11120D', '#4A4840'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--surface-1)] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)]">Trusted by <strong className="text-[var(--text-primary)]">10,000+</strong> job seekers</p>
              </div>
            </motion.div>
          </div>

          {/* Right — mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ResumeMockup />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-24 px-4 sm:px-6 bg-[var(--surface-2)]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--olive-drab)] mb-3 block">Features</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
            Everything you need to land the job
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Built for modern job seekers who want a polished, professional resume without the hassle.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>

    {/* Templates */}
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--olive-drab)] mb-3 block">Templates</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
            Professional templates for every career
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Choose from handcrafted ATS-optimized templates designed by professional resume writers.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {TEMPLATES.map((tmpl, i) => (
            <TemplateCard key={tmpl.id} template={tmpl} delay={i * 0.07} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/templates" className="btn-secondary">
            View all templates <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 px-4 sm:px-6 bg-[var(--smoky-black)] dark:bg-[var(--surface-2)]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--bone)] mb-4 block opacity-70">Get Started</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--floral-white)] mb-5">
            Your next opportunity starts with a great resume
          </h2>
          <p className="text-[var(--bone)] opacity-70 mb-8 text-lg">
            Join thousands of professionals who've landed interviews with ResumeForge AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm bg-[var(--floral-white)] text-[var(--smoky-black)] hover:bg-[var(--bone)] transition-all"
            >
              Start for free <ArrowRight size={16} />
            </Link>
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm border border-white/20 text-[var(--floral-white)] hover:bg-white/10 transition-all"
            >
              Try without signup
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            {['No credit card required', 'Free forever plan', 'ATS-optimized'].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-[var(--bone)] opacity-60">
                <Check size={12} className="text-green-400" /> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home;
