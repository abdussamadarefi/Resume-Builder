"use client"
// CASCADE — Clean professional, timeline-style dates, right sidebar

import { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Code } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function CascadeTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-7">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">{title}</h2>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      {children}
    </section>
  )

  return (
    <div className="bg-white font-sans text-slate-800 min-h-full" style={{ padding: `${margin}px`, fontSize: `${fontSize}px`, lineHeight }}>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-end justify-between border-b-2 pb-5" style={{ borderColor: accentColor }}>
          <div>
            <h1 className="font-black text-slate-900 leading-none tracking-tight" style={{ fontSize: `${fontSize * 3}px` }}>
              {personal.firstName}&nbsp;
              <span style={{ color: accentColor }}>{personal.lastName}</span>
            </h1>
            {personal.title && <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] mt-2">{personal.title}</p>}
          </div>
          {personal.photoUrl && (
            <img src={personal.photoUrl} alt="" className="w-20 h-20 rounded-xl object-cover border-2" style={{ borderColor: accentColor }} />
          )}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-slate-500">
          {personal.email && <span className="flex items-center gap-1.5"><Mail size={11} style={{ color: accentColor }} />{personal.email}</span>}
          {personal.phone && <span className="flex items-center gap-1.5"><Phone size={11} style={{ color: accentColor }} />{personal.phone}</span>}
          {personal.location && <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color: accentColor }} />{personal.location}</span>}
          {personal.website && <span className="flex items-center gap-1.5"><Globe size={11} style={{ color: accentColor }} />{personal.website}</span>}
          {personal.linkedin && <span className="flex items-center gap-1.5"><LinkIcon size={11} style={{ color: accentColor }} />{personal.linkedin}</span>}
          {personal.github && <span className="flex items-center gap-1.5"><Code size={11} style={{ color: accentColor }} />{personal.github}</span>}
        </div>
      </header>

      <div className="flex gap-10">
        {/* Main (2/3) */}
        <div className="flex-[2] min-w-0">
          {data.sectionVisibility?.summary !== false && summary && (
            <Section title="Profile">
              <p className="text-sm text-slate-600 leading-relaxed border-l-[3px] pl-3" style={{ borderColor: accentColor }}>{summary}</p>
            </Section>
          )}

          {data.sectionVisibility?.experience !== false && experience.length > 0 && (
            <Section title="Experience">
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div className="absolute left-[2.5px] top-3 bottom-0 w-px" style={{ backgroundColor: `${accentColor}30` }} />

                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.role}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide" style={{ color: accentColor }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 ml-4 flex-shrink-0 mt-0.5 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {exp.bullets.filter(b => b).map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-1.5">
                          <span style={{ color: accentColor }} className="flex-shrink-0">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <Section title="Projects">
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                      {proj.url && <span className="text-[9px] text-slate-300 truncate ml-2">↗</span>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{proj.description}</p>
                    {proj.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.techStack.map(t => (
                          <span key={t} className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <Section title="Publications">
              <ol className="space-y-3">
                {data.publications.map((pub, i) => (
                  <li key={pub.id} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                    <span className="font-bold text-slate-300 flex-shrink-0 mt-0.5">[{i + 1}]</span>
                    <span><span className="font-bold text-slate-800">{pub.title}.</span> <em className="text-slate-500">{pub.publisher}</em>, {pub.date}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
            <Section title="Grants & Funding">
              <div className="space-y-3">
                {data.grants.map((g) => (
                  <div key={g.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
                      <p className="text-xs text-slate-500">{g.organization}</p>
                    </div>
                    <span className="text-sm font-black ml-4 flex-shrink-0" style={{ color: accentColor }}>{g.amount}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
            <Section title="Teaching">
              <div className="space-y-3">
                {data.teaching.map((t) => (
                  <div key={t.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{t.course}</h3>
                      <p className="text-xs text-slate-400" style={{ color: accentColor }}>{t.institution}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0 ml-4">{t.date}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <Section title="Additional">
              <div className="space-y-4">
                {data.custom.map((c) => (
                  <div key={c.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                      <span className="text-[10px] text-slate-400 ml-4">{c.date}</span>
                    </div>
                    {c.subtitle && <p className="text-xs font-semibold mb-1" style={{ color: accentColor }}>{c.subtitle}</p>}
                    <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar (1/3) */}
        <div className="w-48 flex-shrink-0 space-y-6">
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Skills</h2>
              <div className="space-y-4">
                {skills.map((g) => (
                  <div key={g.id}>
                    <p className="text-[9px] font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>{g.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {g.skills.map(s => (
                        <span key={s} className="text-[10px] text-slate-600 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{edu.degree}</h3>
                    {edu.field && <p className="text-[10px] text-slate-500">{edu.field}</p>}
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: accentColor }}>{edu.school}</p>
                    <p className="text-[9px] text-slate-400 font-medium">{edu.startYear} – {edu.endYear}</p>
                    {edu.grade && <p className="text-[9px] text-slate-400">Grade: {edu.grade}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[11px] font-bold text-slate-800 leading-snug">{cert.name}</p>
                    <p className="text-[10px] text-slate-400">{cert.issuer}</p>
                    <p className="text-[9px] font-bold uppercase" style={{ color: accentColor }}>{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">{lang.name}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-medium">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.references !== false && data.references && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">References</h2>
              <p className="text-[10px] text-slate-500 italic leading-relaxed whitespace-pre-wrap">{data.references}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
