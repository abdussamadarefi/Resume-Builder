"use client"
// ARYA — Bold full-height colored sidebar, sleek white body

import { ResumeData } from "@/types/resume"
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Code } from "lucide-react"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 59, g: 130, b: 246 }
}

function darken(hex: string, amount = 40) {
  const { r, g, b } = hexToRgb(hex)
  const d = (v: number) => Math.max(0, v - amount).toString(16).padStart(2, "0")
  return `#${d(r)}${d(g)}${d(b)}`
}

export function AryaTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data
  const darkAccent = darken(accentColor, 30)

  const Contact = ({ icon: Icon, text }: { icon: any; text?: string }) =>
    text ? (
      <div className="flex items-start gap-2 text-white/80">
        <Icon size={12} className="mt-0.5 flex-shrink-0 text-white/60" />
        <span className="text-[10px] leading-snug break-all">{text}</span>
      </div>
    ) : null

  const SectionBold = ({ title }: { title: string }) => (
    <h2 className="text-[9px] font-black uppercase tracking-[0.35em] text-white/50 mb-4 mt-6 first:mt-0">{title}</h2>
  )

  const MainSection = ({ title }: { title: string }) => (
    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 mt-8 first:mt-0 flex items-center gap-3">
      {title}
      <span className="flex-1 h-px bg-slate-100" />
    </h2>
  )

  return (
    <div className="bg-white font-sans text-slate-800 min-h-full flex" style={{ fontSize: `${fontSize}px`, lineHeight }}>

      {/* Full-height sidebar */}
      <aside
        className="w-44 flex-shrink-0 flex flex-col text-white"
        style={{ backgroundColor: accentColor, padding: `${margin}px ${margin * 0.7}px` }}
      >
        {/* Photo */}
        {personal.photoUrl && (
          <div className="mb-5">
            <img
              src={personal.photoUrl}
              alt=""
              className="w-full aspect-square rounded-xl object-cover border-2 border-white/20"
            />
          </div>
        )}

        {/* Name */}
        <div className="mb-6">
          <h1 className="font-black text-white leading-tight text-lg">{personal.firstName}<br />{personal.lastName}</h1>
          {personal.title && (
            <p className="text-[10px] font-medium text-white/70 uppercase tracking-widest mt-2 leading-snug">{personal.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6">
          <SectionBold title="Contact" />
          <Contact icon={Mail} text={personal.email} />
          <Contact icon={Phone} text={personal.phone} />
          <Contact icon={MapPin} text={personal.location} />
          <Contact icon={Globe} text={personal.website} />
          <Contact icon={LinkIcon} text={personal.linkedin} />
          <Contact icon={Code} text={personal.github} />
        </div>

        {/* Skills */}
        {data.sectionVisibility?.skills !== false && skills.length > 0 && (
          <div className="mb-6">
            <SectionBold title="Skills" />
            <div className="space-y-4">
              {skills.map((g) => (
                <div key={g.id}>
                  <p className="text-[8px] font-black uppercase tracking-wider text-white/40 mb-1">{g.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {g.skills.map(s => (
                      <span key={s} className="text-[9px] font-medium px-1.5 py-0.5 rounded text-white/90" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <SectionBold title="Languages" />
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id}>
                  <div className="text-[10px] font-bold text-white">{lang.name}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wide">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
          <div>
            <SectionBold title="Certifications" />
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-[10px] font-bold text-white leading-snug">{cert.name}</p>
                  <p className="text-[9px] text-white/50">{cert.issuer}</p>
                  <p className="text-[9px] text-white/40">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main body */}
      <main className="flex-1 min-w-0" style={{ padding: `${margin}px` }}>

        {data.sectionVisibility?.summary !== false && summary && (
          <section className="mb-6">
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {data.sectionVisibility?.experience !== false && experience.length > 0 && (
          <section>
            <MainSection title="Experience" />
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.role}</h3>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0 ml-4 mt-0.5">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.filter(b => b).map((b, i) => (
                      <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.education !== false && education.length > 0 && (
          <section>
            <MainSection title="Education" />
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <p className="text-xs font-semibold" style={{ color: accentColor }}>{edu.school}</p>
                    {edu.thesisTitle && <p className="text-xs text-slate-400 italic mt-0.5">{edu.thesisTitle}</p>}
                  </div>
                  <span className="text-[10px] text-slate-400 flex-shrink-0 ml-4">{edu.startYear} – {edu.endYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
          <section>
            <MainSection title="Projects" />
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    <span className="text-[10px] text-slate-400 flex-shrink-0 ml-4">{proj.startDate}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                  {proj.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.techStack.map(t => (
                        <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${accentColor}18`, color: accentColor }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <section>
            <MainSection title="Publications" />
            <ol className="space-y-3">
              {data.publications.map((pub, i) => (
                <li key={pub.id} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="text-slate-300 flex-shrink-0">[{i + 1}]</span>
                  <span><strong className="text-slate-800">{pub.title}.</strong> <em>{pub.publisher}</em>, {pub.date}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <section>
            <MainSection title="Grants & Funding" />
            <div className="space-y-3">
              {data.grants.map((g) => (
                <div key={g.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{g.title}</h3>
                    <p className="text-xs text-slate-400">{g.organization}</p>
                  </div>
                  <span className="font-black text-sm ml-4 flex-shrink-0" style={{ color: accentColor }}>{g.amount}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <section>
            <MainSection title="Teaching" />
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
          </section>
        )}

        {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
          <section>
            <MainSection title="Additional" />
            <div className="space-y-4">
              {data.custom.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <span className="text-[10px] text-slate-400 ml-4 flex-shrink-0">{c.date}</span>
                  </div>
                  {c.subtitle && <p className="text-xs font-semibold mb-1" style={{ color: accentColor }}>{c.subtitle}</p>}
                  <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <section>
            <MainSection title="References" />
            <p className="text-xs text-slate-500 italic whitespace-pre-wrap leading-relaxed">{data.references}</p>
          </section>
        )}
      </main>
    </div>
  )
}
