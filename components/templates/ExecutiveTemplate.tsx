"use client"
// EXECUTIVE — Premium executive with full-width dark header band, elegant typography

import { ResumeData } from "@/types/resume"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function ExecutiveTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-shrink-0 w-1 h-5 rounded-sm" style={{ backgroundColor: accentColor }} />
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-800">{title}</h2>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      {children}
    </section>
  )

  return (
    <div className="bg-white font-sans text-slate-800 min-h-full" style={{ fontSize: `${fontSize}px`, lineHeight }}>

      {/* Full-width premium header */}
      <header className="text-white relative overflow-hidden" style={{ backgroundColor: "#0f172a", padding: `${margin * 1.2}px ${margin}px` }}>
        {/* Accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: accentColor }} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-light tracking-tight text-white leading-none mb-2" style={{ fontSize: `${fontSize * 2.8}px` }}>
              <span className="font-black">{personal.firstName}</span> {personal.lastName}
            </h1>
            {personal.title && (
              <p className="font-light tracking-[0.3em] uppercase text-white/60 text-xs">{personal.title}</p>
            )}

            {/* Accent divider */}
            <div className="mt-4 mb-4 h-px w-16" style={{ backgroundColor: accentColor }} />

            {/* Contact inline */}
            <div className="flex flex-wrap gap-x-5 text-[10px] text-white/50">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
            </div>
          </div>
          {personal.photoUrl && (
            <img
              src={personal.photoUrl}
              alt=""
              className="w-24 h-24 rounded-lg object-cover border-2 flex-shrink-0 ml-8"
              style={{ borderColor: accentColor }}
            />
          )}
        </div>
      </header>

      <div className="flex gap-0" style={{ padding: `${margin}px` }}>
        {/* Main — 2/3 */}
        <div className="flex-[2] pr-10 min-w-0">
          {data.sectionVisibility?.summary !== false && summary && (
            <section className="mb-8">
              <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 pl-4" style={{ borderColor: accentColor }}>
                {summary}
              </p>
            </section>
          )}

          {data.sectionVisibility?.experience !== false && experience.length > 0 && (
            <Section title="Professional Experience">
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                        <p className="text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: accentColor }}>{exp.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{exp.startDate} – {exp.endDate}</span>
                        {exp.location && <p className="text-[9px] text-slate-300 mt-0.5">{exp.location}</p>}
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {exp.bullets.filter(b => b).map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                          <span className="text-slate-300 flex-shrink-0 mt-0.5">◆</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <Section title="Key Projects">
              <div className="space-y-5">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="border-l-2 pl-4" style={{ borderColor: `${accentColor}30` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                      {proj.techStack?.length > 0 && (
                        <span className="text-[9px] text-slate-400 flex-shrink-0 ml-4">{proj.techStack.join(", ")}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <Section title="Publications">
              <ol className="space-y-3">
                {data.publications.map((pub, i) => (
                  <li key={pub.id} className="flex gap-3 text-xs text-slate-600">
                    <span className="font-bold text-slate-300 flex-shrink-0">{i + 1}.</span>
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
                      <h3 className="font-bold text-slate-900 text-sm">{g.title}</h3>
                      <p className="text-xs text-slate-500">{g.organization}</p>
                    </div>
                    <span className="font-black ml-6 flex-shrink-0" style={{ color: accentColor }}>{g.amount}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
            <Section title="Teaching Experience">
              <div className="space-y-3">
                {data.teaching.map((t) => (
                  <div key={t.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{t.course}</h3>
                      <p className="text-xs" style={{ color: accentColor }}>{t.institution}</p>
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
                      <span className="text-[10px] text-slate-400 ml-4 flex-shrink-0">{c.date}</span>
                    </div>
                    {c.subtitle && <p className="text-xs font-bold mb-1" style={{ color: accentColor }}>{c.subtitle}</p>}
                    <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Right sidebar — 1/3 */}
        <div className="w-52 flex-shrink-0 border-l border-slate-100 pl-8 space-y-7">
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-4">Core Competencies</h3>
              <div className="space-y-4">
                {skills.map((g) => (
                  <div key={g.id}>
                    <p className="text-[9px] font-black uppercase tracking-wider mb-2" style={{ color: accentColor }}>{g.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {g.skills.map(s => (
                        <span key={s} className="text-[9px] px-2 py-0.5 rounded-sm bg-slate-50 text-slate-600 border border-slate-100">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-4">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{edu.degree}</h4>
                    {edu.field && <p className="text-[10px] text-slate-500">{edu.field}</p>}
                    <p className="text-[10px] font-bold mt-0.5" style={{ color: accentColor }}>{edu.school}</p>
                    <p className="text-[9px] text-slate-400">{edu.startYear} – {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-4">Certifications</h3>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[10px] font-bold text-slate-800 leading-snug">{cert.name}</p>
                    <p className="text-[9px] text-slate-400">{cert.issuer}</p>
                    <p className="text-[9px] uppercase font-bold tracking-wider" style={{ color: accentColor }}>{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-4">Languages</h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800">{lang.name}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-medium">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.references !== false && data.references && (
            <section>
              <h3 className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 mb-3">References</h3>
              <p className="text-[10px] text-slate-400 italic leading-relaxed whitespace-pre-wrap">{data.references}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
