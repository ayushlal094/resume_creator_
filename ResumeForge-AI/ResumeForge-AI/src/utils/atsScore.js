import { ATS_KEYWORDS } from './constants';

export const calculateATSScore = (resumeData) => {
  let score = 0;
  const feedback = [];
  const suggestions = [];

  // Personal info completeness (20 pts)
  const personal = resumeData.personal || {};
  const personalFields = ['fullName', 'email', 'phone', 'jobTitle', 'linkedin'];
  const filledPersonal = personalFields.filter((f) => personal[f]?.trim()).length;
  const personalScore = Math.round((filledPersonal / personalFields.length) * 20);
  score += personalScore;
  if (!personal.email) suggestions.push('Add your email address');
  if (!personal.phone) suggestions.push('Add your phone number');
  if (!personal.linkedin) suggestions.push('Add LinkedIn profile URL');
  if (!personal.jobTitle) suggestions.push('Add a professional title');

  // Summary (15 pts)
  const summary = resumeData.summary || '';
  if (summary.length > 100) {
    score += 15;
    feedback.push({ label: 'Professional Summary', status: 'good' });
  } else if (summary.length > 50) {
    score += 8;
    suggestions.push('Expand your professional summary to 100+ characters');
  } else {
    suggestions.push('Add a professional summary section');
    feedback.push({ label: 'Professional Summary', status: 'missing' });
  }

  // Experience (25 pts)
  const experience = resumeData.experience || [];
  if (experience.length >= 2) {
    score += 25;
    feedback.push({ label: 'Work Experience', status: 'good' });
  } else if (experience.length === 1) {
    score += 15;
    suggestions.push('Add more work experience entries');
  } else {
    suggestions.push('Add work experience to strengthen your resume');
    feedback.push({ label: 'Work Experience', status: 'missing' });
  }

  // Skills (20 pts)
  const skills = resumeData.skills || [];
  if (skills.length >= 8) {
    score += 20;
    feedback.push({ label: 'Skills', status: 'good' });
  } else if (skills.length >= 4) {
    score += 12;
    suggestions.push('Add more skills (aim for 8+)');
  } else {
    suggestions.push('Add relevant technical skills');
    feedback.push({ label: 'Skills', status: 'missing' });
  }

  // Education (10 pts)
  const education = resumeData.education || [];
  if (education.length >= 1) {
    score += 10;
    feedback.push({ label: 'Education', status: 'good' });
  } else {
    suggestions.push('Add your educational background');
    feedback.push({ label: 'Education', status: 'missing' });
  }

  // Projects (10 pts)
  const projects = resumeData.projects || [];
  if (projects.length >= 2) {
    score += 10;
    feedback.push({ label: 'Projects', status: 'good' });
  } else if (projects.length === 1) {
    score += 6;
    suggestions.push('Add more projects to showcase your work');
  } else {
    suggestions.push('Add project examples to demonstrate your skills');
  }

  // Keyword check in summary + experience
  const fullText = [
    summary,
    ...experience.map((e) => `${e.responsibilities || ''} ${e.achievements || ''}`),
    ...projects.map((p) => p.description || ''),
  ].join(' ').toLowerCase();

  const foundKeywords = ATS_KEYWORDS.filter((kw) => fullText.includes(kw));
  const keywordScore = Math.min(foundKeywords.length * 2, 10);

  return {
    score: Math.min(score, 100),
    feedback,
    suggestions,
    keywords: foundKeywords,
    breakdown: {
      personal: personalScore,
      summary: summary.length > 100 ? 15 : summary.length > 50 ? 8 : 0,
      experience: experience.length >= 2 ? 25 : experience.length === 1 ? 15 : 0,
      skills: skills.length >= 8 ? 20 : skills.length >= 4 ? 12 : 0,
      education: education.length >= 1 ? 10 : 0,
      projects: projects.length >= 2 ? 10 : projects.length === 1 ? 6 : 0,
    },
  };
};

export const getScoreColor = (score) => {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#f59e0b';
  if (score >= 40) return '#f97316';
  return '#ef4444';
};

export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
};
