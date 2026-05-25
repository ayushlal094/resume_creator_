export const APP_NAME = 'ResumeForge AI';
export const APP_TAGLINE = 'Build ATS-Friendly Resumes in Minutes';

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Developer', description: 'Clean, tech-forward design', color: '#11120D' },
  { id: 'corporate', name: 'Executive Corporate', description: 'Traditional & professional', color: '#565449' },
  { id: 'minimal', name: 'Minimal Elegant', description: 'Refined & timeless', color: '#D8CFBC' },
  { id: 'creative', name: 'Creative Portfolio', description: 'Bold & expressive', color: '#8A8679' },
  { id: 'executive', name: 'Clean ATS', description: 'Optimized for ATS systems', color: '#4A4840' },
];

export const SKILL_CATEGORIES = [
  'Frontend', 'Backend', 'Database', 'Tools', 'Cloud', 'Languages', 'Frameworks', 'Other'
];

export const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

export const ATS_KEYWORDS = [
  'managed', 'developed', 'built', 'designed', 'led', 'implemented', 'created',
  'optimized', 'improved', 'increased', 'reduced', 'delivered', 'collaborated',
  'architected', 'deployed', 'maintained', 'analyzed', 'automated', 'mentored',
];

export const RESUME_SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: 'User' },
  { id: 'summary', label: 'Summary', icon: 'FileText' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'skills', label: 'Skills', icon: 'Code' },
  { id: 'projects', label: 'Projects', icon: 'Layers' },
  { id: 'certifications', label: 'Certifications', icon: 'Award' },
  { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
  { id: 'languages', label: 'Languages', icon: 'Globe' },
  { id: 'interests', label: 'Interests', icon: 'Heart' },
];

export const DEFAULT_RESUME_DATA = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photo: null,
  },
  summary: '',
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
};

export const FEATURES = [
  { icon: 'Target', title: 'ATS-Friendly Templates', description: 'Pass through applicant tracking systems with flying colors.' },
  { icon: 'Eye', title: 'Live Resume Preview', description: 'See changes in real-time as you type.' },
  { icon: 'Download', title: 'PDF Download', description: 'Export high-quality PDFs in one click.' },
  { icon: 'Layers', title: 'Multi Template Support', description: 'Switch between 5 professional templates.' },
  { icon: 'Moon', title: 'Dark Mode', description: 'Work comfortably day or night.' },
  { icon: 'Cloud', title: 'Cloud Saving', description: 'Your data is safe and synced automatically.' },
  { icon: 'Zap', title: 'Real-Time Editing', description: 'Instant updates with zero lag.' },
  { icon: 'BarChart2', title: 'ATS Score', description: 'Get instant feedback on your resume quality.' },
];
