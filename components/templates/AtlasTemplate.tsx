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

export function AtlasTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills, projects } = data

  return (
    <div 
      className="flex min-h-full bg-white text-slate-800 font-sans"
      style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
    >
      {/* Narrow Sidebar (Gold/Dark Accent) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-shrink-0 flex-col" style={{ padding: `${margin}px` }}>
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tighter leading-none mb-2">
            {personal.firstName}<br />
            <span style={{ color: accentColor }}>{personal.lastName}</span>
          </h1>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            {personal.title}
          </p>
        </div>

        <div className="space-y-8 flex-1">
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-500">Contact</h2>
            <div className="space-y-4 text-xs font-medium text-slate-300">
              {personal.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span className="truncate">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} style={{ color: accentColor }} />
                  {personal.phone}
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={14} style={{ color: accentColor }} />
                  {personal.location}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-500">Skills</h2>
            <div className="space-y-6">
              {skills.map((group) => (
                <div key={group.id}>
                  <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-500">Languages</h2>
              <div className="space-y-3 font-medium text-xs text-slate-300">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-baseline border-b border-slate-800 pb-2">
                    <span>{lang.name}</span>
                    <span className="text-[9px] text-slate-500 uppercase">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-500">Certifications</h2>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <h3 className="font-bold text-slate-200 leading-tight">{cert.name}</h3>
                    <div className="text-[10px] font-medium text-slate-500 mt-1 flex justify-between">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Ref: RF-{personal.lastName.toUpperCase()}
        </div>
      </aside>

      {/* Main Content (White) */}
      <main className="flex-1 overflow-hidden" style={{ padding: `${margin}px` }}>
        <section className="mb-12">
          <p className="text-lg font-medium text-slate-600 leading-relaxed italic">
            &quot;{summary}&quot;
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Experience
          </h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l border-slate-100">
                <div className="absolute top-1 -left-[5px] w-[9px] h-[9px] rounded-full bg-white border-2 border-slate-300" />
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>{exp.company}</p>
                <ul className="space-y-2">
                   {exp.bullets.map((b, i) => (
                     <li key={i} className="text-sm text-slate-500 leading-snug">• {b}</li>
                   ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {projects && projects.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{project.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-2">
                    {project.startDate} {project.endDate ? `— ${project.endDate}` : ""}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{project.description}</p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(t => (
                        <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-slate-400" style={{ color: accentColor }}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Education
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                <p className="text-xs text-slate-500 mt-1">{edu.school}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">{edu.startYear} - {edu.endYear}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic CV Sections */}
        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Publications
            </h2>
            <div className="space-y-6">
              {data.publications.map((pub) => (
                <div key={pub.id}>
                  <h3 className="font-bold text-slate-900 text-sm">{pub.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pub.publisher} | {pub.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Grants & Funding
            </h2>
            <div className="space-y-6">
              {data.grants.map((grant) => (
                <div key={grant.id}>
                  <h3 className="font-bold text-slate-900 text-sm">{grant.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 text-primary italic">{grant.amount} — {grant.organization}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Teaching
            </h2>
            <div className="space-y-6">
              {data.teaching.map((t) => (
                <div key={t.id}>
                  <h3 className="font-bold text-slate-900 text-sm">{t.course}</h3>
                  <p className="text-xs text-slate-500 mt-1">{t.institution} • {t.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Additional Experience
            </h2>
            <div className="space-y-8">
              {data.custom.map((cust) => (
                <div key={cust.id} className="relative pl-6 border-l border-slate-100">
                  <div className="absolute top-1 -left-[5px] w-[9px] h-[9px] rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{cust.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{cust.date}</span>
                  </div>
                  <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>{cust.subtitle}</p>
                  <p className="text-sm text-slate-500 leading-snug">{cust.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
              References
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed italic whitespace-pre-wrap">
              {data.references}
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
