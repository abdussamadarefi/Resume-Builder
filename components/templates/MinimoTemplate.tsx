"use client"
// MINIMO — Ultra minimalist, massive whitespace, clean typography

import { ResumeData } from "@/types/resume"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function MinimoTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  return (
    <div className="bg-white font-sans text-slate-800 min-h-full" style={{ padding: `${margin * 1.5}px ${margin * 1.8}px`, fontSize: `${fontSize}px`, lineHeight }}>

      {/* Header — name super large, minimal */}
      <header className="mb-12">
        <h1 className="font-light tracking-[-0.02em] text-slate-900 leading-none mb-1" style={{ fontSize: `${fontSize * 3.5}px` }}>
          <span className="font-black">{personal.firstName}</span> {personal.lastName}
        </h1>
        <p className="text-xs font-medium tracking-[0.4em] uppercase text-slate-400 mt-2">{personal.title}</p>

        {/* Thin accent rule */}
        <div className="mt-6 mb-5 h-px" style={{ backgroundColor: accentColor, width: "3rem" }} />

        <div className="text-xs text-slate-400 space-y-0.5">
          {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((v, i) => (
            <div key={i}>{v}</div>
          ))}
        </div>
      </header>

      {/* Single-column layout, extremely clean */}
      <div className="space-y-10">
        {data.sectionVisibility?.summary !== false && summary && (
          <section>
            <p className="text-sm text-slate-500 leading-loose max-w-lg">{summary}</p>
          </section>
        )}

        {data.sectionVisibility?.experience !== false && experience.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-light text-slate-400">{exp.startDate}</p>
                    <p className="text-[10px] font-light text-slate-300">–</p>
                    <p className="text-[10px] font-light text-slate-400">{exp.endDate}</p>
                    <p className="text-[10px] font-semibold mt-2" style={{ color: accentColor }}>{exp.company}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">{exp.role}</h3>
                    <ul className="space-y-2">
                      {exp.bullets.filter(b => b).map((b, i) => (
                        <li key={i} className="text-xs text-slate-500 leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.education !== false && education.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-light text-slate-400">{edu.startYear} – {edu.endYear}</p>
                    <p className="text-[10px] font-semibold mt-1" style={{ color: accentColor }}>{edu.school}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{edu.degree}{edu.field ? ` — ${edu.field}` : ""}</h3>
                    {edu.thesisTitle && <p className="text-xs text-slate-400 mt-1 italic">{edu.thesisTitle}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.skills !== false && skills.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Expertise</h2>
            <div className="space-y-3">
              {skills.map((g) => (
                <div key={g.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <p className="text-right text-[10px] font-medium text-slate-400">{g.category}</p>
                  <p className="text-xs text-slate-600">{g.skills.join("  ·  ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-slate-400">{proj.startDate}</p>
                    {proj.url && <p className="text-[9px] text-slate-300 mt-1 truncate">{proj.url}</p>}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{proj.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                    {proj.techStack?.length > 0 && (
                      <p className="text-[9px] text-slate-300 mt-2">{proj.techStack.join("  ·  ")}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Publications</h2>
            <div className="space-y-4">
              {data.publications.map((pub, i) => (
                <div key={pub.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-light text-slate-400">{pub.date}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <span className="font-semibold text-slate-700">{pub.title}.</span> {pub.publisher}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Certifications</h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <p className="text-right text-[10px] font-light text-slate-400">{cert.date}</p>
                  <div>
                    <span className="text-xs font-semibold text-slate-700">{cert.name}</span>
                    <span className="text-xs text-slate-400"> · {cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-4">Languages</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {data.languages.map((lang) => (
                <span key={lang.id} className="text-xs">
                  <span className="font-semibold text-slate-700">{lang.name}</span>
                  <span className="text-slate-400"> · {lang.proficiency}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Grants</h2>
            <div className="space-y-4">
              {data.grants.map((g) => (
                <div key={g.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-light text-slate-400">{g.date}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: accentColor }}>{g.amount}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900">{g.title}</h3>
                    <p className="text-[10px] text-slate-400">{g.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-6">Additional</h2>
            <div className="space-y-6">
              {data.custom.map((c) => (
                <div key={c.id} className="grid grid-cols-[1fr_2fr] gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-light text-slate-400">{c.date}</p>
                    {c.subtitle && <p className="text-[9px] font-semibold mt-1" style={{ color: accentColor }}>{c.subtitle}</p>}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <section>
            <h2 className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 mb-4">References</h2>
            <p className="text-xs text-slate-400 italic leading-relaxed">{data.references}</p>
          </section>
        )}
      </div>
    </div>
  )
}
