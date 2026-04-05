"use client"

import { ResumeData } from "@/types/resume"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function PrismTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
      <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900">{children}</h2>
    </div>
  )

  return (
    <div
      className="bg-white text-slate-900 font-sans min-h-full"
      style={{ padding: `${margin}px`, fontSize: `${fontSize}px`, lineHeight }}
    >
      {/* Header */}
      <header className="mb-10 flex items-end gap-6 pb-8 border-b-4" style={{ borderColor: accentColor }}>
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={`${personal.firstName} ${personal.lastName}`}
            className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-4"
            style={{ borderColor: accentColor }}
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-none mb-1">
            {personal.firstName}
            <span className="block font-light" style={{ color: accentColor }}>{personal.lastName}</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mt-3">{personal.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="space-y-8">
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-5">
                {skills.map((group) => (
                  <div key={group.id}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{group.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((s) => (
                        <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded border" style={{ borderColor: accentColor, color: accentColor }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{edu.degree}</h3>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">{edu.school}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: accentColor }}>{edu.startYear} — {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <SectionTitle>Languages</SectionTitle>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{lang.name}</span>
                    <span className="font-medium text-slate-400 text-[10px] uppercase">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <SectionTitle>Certifications</SectionTitle>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[11px] font-bold text-slate-800 leading-snug">{cert.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main */}
        <div className="col-span-2 space-y-8">
          {data.sectionVisibility?.summary !== false && summary && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
            </section>
          )}

          {data.sectionVisibility?.experience !== false && experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-7">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 leading-relaxed pl-3 relative before:absolute before:left-0 before:content-['▸'] before:text-slate-300">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border-2 border-slate-100 hover:border-opacity-50 transition-colors" style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{proj.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{proj.description}</p>
                    {proj.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.techStack.map(t => <span key={t} className="text-[9px] font-bold uppercase tracking-wider text-slate-400">#{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <section>
              <SectionTitle>Publications</SectionTitle>
              <div className="space-y-4">
                {data.publications.map((pub) => (
                  <div key={pub.id} className="pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <h3 className="text-sm font-bold text-slate-900">{pub.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{pub.publisher} · {pub.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <section>
              <SectionTitle>Additional</SectionTitle>
              <div className="space-y-5">
                {data.custom.map((cust) => (
                  <div key={cust.id} className="pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{cust.title}</h3>
                      <span className="text-[10px] text-slate-400">{cust.date}</span>
                    </div>
                    <p className="text-xs font-bold mb-1" style={{ color: accentColor }}>{cust.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{cust.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.references !== false && data.references && (
            <section>
              <SectionTitle>References</SectionTitle>
              <p className="text-sm text-slate-600 italic leading-relaxed">{data.references}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
