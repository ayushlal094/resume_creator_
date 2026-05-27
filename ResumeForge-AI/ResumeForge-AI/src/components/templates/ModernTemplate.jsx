import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-5">
    <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 border-b border-gray-200 pb-1 mb-3">
      {title}
    </h2>
    {children}
  </div>
);

const ModernTemplate = ({ data }) => {
  const { personal = {}, summary, education = [], skills = [], experience = [], projects = [], certifications = [], achievements = [], languages = [], interests = [] } = data || {};

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-['Georgia',serif] text-[11px] leading-relaxed w-full min-h-[297mm] p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-bold text-[26px] text-gray-900 leading-tight mb-0.5">
              {personal.fullName || 'Your Name'}
            </h1>
            <p className="text-[13px] font-semibold text-gray-500 mb-3">
              {personal.jobTitle || 'Professional Title'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500">
              {personal.email && (
                <span className="flex items-center gap-1"><Mail size={9} />{personal.email}</span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1"><Phone size={9} />{personal.phone}</span>
              )}
              {personal.address && (
                <span className="flex items-center gap-1"><MapPin size={9} />{personal.address}</span>
              )}
              {personal.linkedin && (
                <span className="flex items-center gap-1"><Linkedin size={9} />{personal.linkedin}</span>
              )}
              {personal.github && (
                <span className="flex items-center gap-1"><Github size={9} />{personal.github}</span>
              )}
              {personal.portfolio && (
                <span className="flex items-center gap-1"><Globe size={9} />{personal.portfolio}</span>
              )}
            </div>
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          {summary && (
            <Section title="Professional Summary">
              <p className="text-[11px] text-gray-700 leading-relaxed">{summary}</p>
            </Section>
          )}

          {experience.length > 0 && (
            <Section title="Work Experience">
              {experience.map((exp, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[11px] text-gray-900">{exp.role}</p>
                      <p className="text-[10px] text-gray-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500">{exp.duration}</p>
                      {exp.location && <p className="text-[10px] text-gray-400">{exp.location}</p>}
                    </div>
                  </div>
                  {exp.responsibilities && (
                    <div className="mt-1.5 text-[10px] text-gray-600 whitespace-pre-line leading-relaxed">
                      {exp.responsibilities}
                    </div>
                  )}
                  {exp.achievements && (
                    <div className="mt-1 text-[10px] text-gray-600 whitespace-pre-line">{exp.achievements}</div>
                  )}
                </div>
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((proj, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[11px] text-gray-900">{proj.title}</p>
                    <div className="flex gap-2 text-[9px] text-blue-600">
                      {proj.github && <span>{proj.github}</span>}
                      {proj.demo && <span>{proj.demo}</span>}
                    </div>
                  </div>
                  {proj.technologies && (
                    <p className="text-[10px] text-gray-500 italic mb-1">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <div className="text-[10px] text-gray-600 whitespace-pre-line">{proj.description}</div>
                  )}
                </div>
              ))}
            </Section>
          )}

          {achievements.length > 0 && (
            <Section title="Achievements">
              {achievements.map((ach, i) => (
                <p key={i} className="text-[10px] text-gray-700 mb-1">• {ach.text}</p>
              ))}
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-48 shrink-0">
          {education.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="font-bold text-[10px] text-gray-900">{edu.degree}</p>
                  <p className="text-[10px] text-gray-600">{edu.university}</p>
                  {edu.specialization && <p className="text-[10px] text-gray-500">{edu.specialization}</p>}
                  {edu.cgpa && <p className="text-[10px] text-gray-500">CGPA: {edu.cgpa}</p>}
                  <p className="text-[10px] text-gray-400">{edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}</p>
                </div>
              ))}
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Skills">
              {['Frontend', 'Backend', 'Database', 'Tools', 'Cloud', 'Languages', 'Frameworks', 'Other'].map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                if (!catSkills.length) return null;
                return (
                  <div key={cat} className="mb-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{cat}</p>
                    <p className="text-[10px] text-gray-700">{catSkills.map((s) => s.name).join(', ')}</p>
                  </div>
                );
              })}
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications">
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="font-semibold text-[10px] text-gray-800">{cert.name}</p>
                  <p className="text-[10px] text-gray-500">{cert.organization} {cert.year && `· ${cert.year}`}</p>
                </div>
              ))}
            </Section>
          )}

          {languages.length > 0 && (
            <Section title="Languages">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between mb-1">
                  <span className="text-[10px] text-gray-700">{lang.name}</span>
                  <span className="text-[10px] text-gray-400">{lang.proficiency}</span>
                </div>
              ))}
            </Section>
          )}

          {interests.length > 0 && (
            <Section title="Interests">
              <p className="text-[10px] text-gray-600">{interests.join(' · ')}</p>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
