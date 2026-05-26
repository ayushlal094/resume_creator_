import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-[var(--border-light)] bg-[var(--surface-2)] py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--smoky-black)] dark:bg-[var(--floral-white)] flex items-center justify-center">
              <FileText size={16} className="text-[var(--floral-white)] dark:text-[var(--smoky-black)]" />
            </div>
            <span className="font-display font-semibold text-[var(--text-primary)]">
              ResumeForge <span className="text-[var(--olive-drab)]">AI</span>
            </span>
          </Link>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Build professional ATS-friendly resumes in minutes. Designed for modern job seekers.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Product</h4>
          <ul className="space-y-2.5">
            {['Templates', 'Builder', 'Dashboard', 'Pricing'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Resources</h4>
          <ul className="space-y-2.5">
            {['Resume Tips', 'ATS Guide', 'Career Blog', 'Examples'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Legal</h4>
          <ul className="space-y-2.5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[var(--border-light)]">
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} ResumeForge AI. All rights reserved.
        </p>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
  <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-light)]">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  </a>
  <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-light)]">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  </a>
</div>
      </div>
    </div>
  </footer>
);

export default Footer;
