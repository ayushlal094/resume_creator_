import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

// ── Minimal Template ──────────────────────────────────────

export const MinimalTemplate = ({ data }) => {
  const { personal = {}, summary, education = [], skills = [], experience = [], projects = [], certifications = [], achievements = [], languages = [], interests = [] } = data || {};

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-['Georgia',serif] text-[11px] leading-relaxed w-full min-h-[297mm] px-10 py-10">
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-[22px] font-bold tracking-[0.08em] uppercase mb-1">{personal.fullName || 'Your Name'}</h1>
        {personal.jobTitle && <p className="text-[11px] tracking-widest text-gray-600 uppercase mb-2">{personal.jobTitle}</p>}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
          {personal.address && <span>· {personal.address}</span>}
          {personal.linkedin && <span>· {personal.linkedin}</span>}
          {personal.github && <span>· {personal.github}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <p className="text-[11px] text-gray-700 text-center italic leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-3">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold text-[11px]">{exp.role}</span>
                  {exp.company && <span className="text-gray-600"> — {exp.company}</span>}
                </div>
                <span className="text-[10px] text-gray-500">{exp.duration}</span>
              </div>
              {exp.responsibilities && <div className="mt-1 text-[10px] text-gray-600 whitespace-pre-line">{exp.responsibilities}</div>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-3">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <span className="font-bold text-[11px]">{edu.degree}</span>
                {edu.specialization && <span className="text-gray-600">, {edu.specialization}</span>}
                {edu.university && <div className="text-[10px] text-gray-500">{edu.university}{edu.cgpa ? ` · GPA: ${edu.cgpa}` : ''}</div>}
              </div>
              <span className="text-[10px] text-gray-500">{edu.endYear || edu.startYear}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-3">Skills</h2>
          <p className="text-[10px] text-gray-700">{skills.map((s) => s.name).join(' · ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-3">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between">
                <span className="font-bold text-[11px]">{proj.title}</span>
                {proj.technologies && <span className="text-[10px] text-gray-500 italic">{proj.technologies}</span>}
              </div>
              {proj.description && <div className="text-[10px] text-gray-600 mt-0.5 whitespace-pre-line">{proj.description}</div>}
            </div>
          ))}
        </div>
      )}

      {(languages.length > 0 || interests.length > 0) && (
        <div className="flex gap-8">
          {languages.length > 0 && (
            <div className="flex-1">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-2">Languages</h2>
              <p className="text-[10px] text-gray-600">{languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}</p>
            </div>
          )}
          {interests.length > 0 && (
            <div className="flex-1">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-2">Interests</h2>
              <p className="text-[10px] text-gray-600">{interests.join(' · ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Corporate Template ────────────────────────────────────

export const CorporateTemplate = ({ data }) => {
  const { personal = {}, summary, education = [], skills = [], experience = [], projects = [], certifications = [], achievements = [] } = data || {};

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-['Arial',sans-serif] text-[11px] w-full min-h-[297mm]">
      {/* Header bar */}
      <div className="bg-gray-900 text-white px-8 py-6 mb-0">
        <h1 className="text-[20px] font-bold mb-0.5">{personal.fullName || 'Your Name'}</h1>
        <p className="text-gray-300 text-[12px] mb-3">{personal.jobTitle || 'Professional Title'}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-0.5 text-[10px] text-gray-300">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      <div className="px-8 py-6">
        {summary && (
          <div className="mb-5 p-3 bg-gray-50 border-l-4 border-gray-900">
            <p className="text-[10px] text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-[11px] font-bold uppercase text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">Work Experience</h2>
                {experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <p className="font-bold text-[11px] text-gray-900">{exp.role}</p>
                      <p className="text-[10px] text-gray-500">{exp.duration}</p>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-600 mb-1">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    {exp.responsibilities && <div className="text-[10px] text-gray-600 whitespace-pre-line">{exp.responsibilities}</div>}
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div className="mb-5">
                <h2 className="text-[11px] font-bold uppercase text-gray-900 border-b-2 border-gray-900 pb-1 mb-3">Projects</h2>
                {projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-bold text-[10px]">{proj.title} {proj.technologies && <span className="font-normal text-gray-500">— {proj.technologies}</span>}</p>
                    {proj.description && <div className="text-[10px] text-gray-600 mt-0.5 whitespace-pre-line">{proj.description}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-44 shrink-0">
            {skills.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold uppercase text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">Skills</h2>
                {skills.map((s) => (
                  <p key={s.id} className="text-[10px] text-gray-700 mb-0.5">• {s.name}</p>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold uppercase text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">Education</h2>
                {education.map((edu, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold text-[10px]">{edu.degree}</p>
                    <p className="text-[10px] text-gray-600">{edu.university}</p>
                    <p className="text-[10px] text-gray-400">{edu.endYear}</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold uppercase text-gray-900 border-b-2 border-gray-900 pb-1 mb-2">Certifications</h2>
                {certifications.map((cert, i) => (
                  <div key={i} className="mb-1.5">
                    <p className="font-semibold text-[10px]">{cert.name}</p>
                    <p className="text-[10px] text-gray-500">{cert.organization}{cert.year ? ` · ${cert.year}` : ''}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Executive Template ────────────────────────────────────

export const ExecutiveTemplate = ({ data }) => {
  const { personal = {}, summary, education = [], skills = [], experience = [], projects = [], certifications = [] } = data || {};

  return (
    <div id="resume-preview" className="bg-white text-gray-900 font-['Georgia',serif] text-[11px] w-full min-h-[297mm] px-8 py-8">
      <div className="flex items-start gap-6 mb-6 pb-5 border-b-2 border-gray-800">
        {personal.photo && (
          <img src={personal.photo} alt="" className="w-20 h-20 rounded-full object-cover border-3 border-gray-200" />
        )}
        <div className="flex-1">
          <h1 className="text-[24px] font-bold text-gray-900 mb-0.5">{personal.fullName || 'Your Name'}</h1>
          <p className="text-[13px] text-gray-600 font-semibold mb-2">{personal.jobTitle}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-0.5 text-[10px] text-gray-500">
            {personal.email && <span>✉ {personal.email}</span>}
            {personal.phone && <span>☏ {personal.phone}</span>}
            {personal.address && <span>⌖ {personal.address}</span>}
            {personal.linkedin && <span>in {personal.linkedin}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Executive Summary</h2>
          <p className="text-[11px] text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Core Competencies</h2>
          <div className="grid grid-cols-3 gap-1">
            {skills.slice(0, 12).map((s) => (
              <div key={s.id} className="flex items-center gap-1 text-[10px] text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-700 rounded-full shrink-0" />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">Professional Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start border-l-3 border-gray-800 pl-3">
                <div>
                  <p className="font-bold text-[12px] text-gray-900">{exp.role}</p>
                  <p className="text-[10px] font-semibold text-gray-600">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                </div>
                <p className="text-[10px] text-gray-400 shrink-0">{exp.duration}</p>
              </div>
              {exp.responsibilities && <div className="mt-1.5 ml-3 text-[10px] text-gray-600 whitespace-pre-line">{exp.responsibilities}</div>}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {education.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[10px]">{edu.degree}{edu.specialization ? `, ${edu.specialization}` : ''}</p>
                <p className="text-[10px] text-gray-500">{edu.university} · {edu.endYear}</p>
                {edu.cgpa && <p className="text-[10px] text-gray-400">GPA: {edu.cgpa}</p>}
              </div>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Certifications</h2>
            {certifications.map((cert, i) => (
              <div key={i} className="mb-1.5">
                <p className="font-semibold text-[10px]">{cert.name}</p>
                <p className="text-[10px] text-gray-400">{cert.organization}{cert.year ? ` · ${cert.year}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
