"use client"

import { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Code } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function NexusTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div 
      className="bg-white text-slate-900 font-sans min-h-full"
      style={{ 
        padding: `${margin}px`,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight
      }}
    >
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase" style={{ color: accentColor }}>
          {personal.firstName} {personal.lastName}
        </h1>
        <p className="text-lg font-medium text-slate-500 mb-6 uppercase tracking-widest">
          {personal.title}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          {personal.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-slate-400" />
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" />
              {personal.phone}
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {personal.location}
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-1.5">
              <Code size={14} className="text-slate-400" />
              {personal.github.replace(/^https?:\/\/(www\.)?/, "")}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="col-span-2 space-y-10">
          {/* Summary */}
          {data.sectionVisibility?.summary !== false && summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Profile
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">
                {summary}
              </p>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{project.name}</h3>
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {project.startDate} — {project.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {project.description}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-[10px] text-slate-400 font-medium">#{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Publications */}
          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Publications
              </h2>
              <div className="space-y-4">
                {data.publications.map((pub) => (
                  <div key={pub.id}>
                    <h3 className="text-sm font-bold text-slate-900">{pub.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {pub.publisher} • {pub.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.sectionVisibility?.experience !== false && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    <ul className="list-disc list-outside ml-4 space-y-1.5">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Additional Experience
              </h2>
              <div className="space-y-8">
                {data.custom.map((cust) => (
                  <div key={cust.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900">{cust.title}</h3>
                      <span className="text-xs font-medium text-slate-500 uppercase">
                        {cust.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>
                      {cust.subtitle}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
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
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                References
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed italic whitespace-pre-wrap">
                {data.references}
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Skills */}
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Skills
              </h2>
              <div className="space-y-4">
                {skills.map((group) => (
                  <div key={group.id}>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-700 text-[11px] font-medium rounded border border-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {edu.school}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      {edu.startYear} — {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Certifications
              </h2>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-[11px] font-bold text-slate-900 leading-snug">{cert.name}</h3>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">{cert.issuer}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-baseline">
                    <h3 className="text-[11px] font-bold text-slate-900">{lang.name}</h3>
                    <span className="text-[10px] font-medium text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Grants */}
          {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Grants
              </h2>
              <div className="space-y-4">
                {data.grants.map((grant) => (
                  <div key={grant.id}>
                    <h3 className="text-[11px] font-bold text-slate-900">{grant.title}</h3>
                    <p className="text-[10px] text-slate-500">{grant.organization}</p>
                    <p className="text-[10px] font-bold text-primary mt-1">{grant.amount}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Teaching */}
          {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                Teaching
              </h2>
              <div className="space-y-4">
                {data.teaching.map((t) => (
                  <div key={t.id}>
                    <h3 className="text-[11px] font-bold text-slate-900">{t.course}</h3>
                    <p className="text-[10px] text-slate-500">{t.institution}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">{t.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
