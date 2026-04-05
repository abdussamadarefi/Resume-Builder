"use client"

import { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Code } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function MeridianTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div 
      className="bg-white text-slate-900 min-h-full font-serif"
      style={{ 
        padding: `${margin}px`,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight
      }}
    >
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-8 mb-10">
        <h1 className="text-5xl font-bold tracking-tight mb-4" style={{ color: accentColor }}>
          {personal.firstName} {personal.lastName}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans font-medium text-slate-600">
          <span className="uppercase tracking-widest border-r border-slate-300 pr-6">{personal.title}</span>
          {personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} />
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              {personal.phone}
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              {personal.location}
            </div>
          )}
        </div>
      </header>

      <div className="space-y-12">
        {/* Summary */}
        {data.sectionVisibility?.summary !== false && summary && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-4 border-b border-slate-200">
              Professional Profile
            </h2>
            <p className="text-[15px] italic text-slate-700">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.sectionVisibility?.experience !== false && experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Professional Experience
            </h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <span className="text-sm font-sans font-bold text-slate-400">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-md font-sans font-bold uppercase tracking-wider mb-4" style={{ color: accentColor }}>
                    {exp.company}
                  </p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-[14px] text-slate-800 leading-snug pl-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-16">
          {/* Education */}
          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-md font-bold">{edu.degree}</h3>
                    <p className="text-sm font-sans font-medium text-slate-600 mt-1 uppercase tracking-tighter">
                      {edu.school}
                    </p>
                    <p className="text-xs font-sans text-slate-400 mt-1">
                      {edu.startYear} — {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
                Expertise
              </h2>
              <div className="space-y-6">
                {skills.map((group) => (
                  <div key={group.id}>
                    <h3 className="text-xs font-sans font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {group.category}
                    </h3>
                    <p className="text-[13px] font-sans font-medium text-slate-700 leading-relaxed">
                      {group.skills.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
                Languages
              </h2>
              <div className="space-y-4">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-sans font-bold text-slate-800">{lang.name}</h3>
                    <span className="text-[11px] font-sans uppercase tracking-widest text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
                Certifications
              </h2>
              <div className="space-y-5">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-[14px] font-sans font-bold text-slate-800 mb-1">{cert.name}</h3>
                    <div className="flex justify-between items-baseline text-xs font-sans text-slate-500">
                      <span>{cert.issuer}</span>
                      <span className="font-bold tracking-widest uppercase">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Selected Projects
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="p-6 bg-slate-50 border border-slate-100 rounded-lg">
                  <h3 className="font-bold mb-2">{project.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex gap-2 font-sans font-bold text-[9px] uppercase tracking-tighter text-slate-400">
                    {project.techStack?.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic Sections */}
        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Publications
            </h2>
            <div className="space-y-6">
              {data.publications.map((pub) => (
                <div key={pub.id}>
                  <h3 className="text-md font-bold">{pub.title}</h3>
                  <p className="text-sm font-sans text-slate-500">{pub.publisher} • {pub.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Grants & Funding
            </h2>
            <div className="space-y-6">
              {data.grants.map((grant) => (
                <div key={grant.id}>
                  <h3 className="text-md font-bold">{grant.title}</h3>
                  <p className="text-sm font-sans text-slate-500">{grant.organization} | <span className="font-bold text-primary">{grant.amount}</span></p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Teaching Experience
            </h2>
            <div className="space-y-6">
              {data.teaching.map((t) => (
                <div key={t.id}>
                  <h3 className="text-md font-bold">{t.course}</h3>
                  <p className="text-sm font-sans text-slate-500">{t.institution} • {t.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Input */}
        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              Additional Details
            </h2>
            <div className="space-y-8">
              {data.custom.map((cust) => (
                <div key={cust.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold">{cust.title}</h3>
                    <span className="text-sm font-sans font-bold text-slate-400">
                      {cust.date}
                    </span>
                  </div>
                  <p className="text-md font-sans font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                    {cust.subtitle}
                  </p>
                  <p className="text-[14px] text-slate-800 leading-snug">
                    {cust.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.sectionVisibility?.references !== false && data.references && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-6 border-b border-slate-200">
              References
            </h2>
            <p className="text-[14px] text-slate-800 leading-relaxed italic whitespace-pre-wrap">
              {data.references}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
