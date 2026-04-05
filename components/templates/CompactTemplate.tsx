"use client"

import { ResumeData } from "@/types/resume"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function CompactTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  return (
    <div
      className="bg-white text-slate-900 font-sans min-h-full"
      style={{ padding: `${margin}px`, fontSize: `${fontSize - 1}px`, lineHeight: lineHeight * 0.95 }}
    >
      {/* Tight Header */}
      <header className="mb-6 flex items-center gap-4">
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt={`${personal.firstName} ${personal.lastName}`}
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {personal.firstName} {personal.lastName}
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              {personal.title}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[10px] text-slate-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="h-0.5 mb-5" style={{ backgroundColor: accentColor }} />

      {data.sectionVisibility?.summary !== false && summary && (
        <p className="text-xs text-slate-600 leading-relaxed mb-5 italic border-l-2 pl-3" style={{ borderColor: accentColor }}>{summary}</p>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          {data.sectionVisibility?.experience !== false && experience.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[9px] text-slate-400 font-medium uppercase">{exp.startDate}–{exp.endDate}</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>{exp.company}</p>
                    <ul className="space-y-0.5">
                      {exp.bullets.filter(b => b).map((b, i) => (
                        <li key={i} className="text-[10px] text-slate-600 leading-relaxed pl-2 relative before:absolute before:left-0 before:text-slate-300 before:content-['•']">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                      {proj.techStack?.length > 0 && (
                        <span className="text-[9px] text-slate-400">{proj.techStack.slice(0, 3).join(", ")}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-600 leading-snug">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Publications</h2>
              <div className="space-y-2">
                {data.publications.map((pub, i) => (
                  <p key={pub.id} className="text-[10px] text-slate-700 leading-snug">
                    <span className="text-slate-400 mr-1">[{i + 1}]</span>
                    <span className="font-bold">{pub.title}</span>. <span className="italic">{pub.publisher}</span>, {pub.date}.
                  </p>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Additional</h2>
              <div className="space-y-3">
                {data.custom.map((cust) => (
                  <div key={cust.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{cust.title}</span>
                      <span className="text-[9px] text-slate-400">{cust.date}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: accentColor }}>{cust.subtitle}</p>
                    <p className="text-[10px] text-slate-600 leading-snug">{cust.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-5">
          {data.sectionVisibility?.skills !== false && skills.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Skills</h2>
              <div className="space-y-3">
                {skills.map((group) => (
                  <div key={group.id}>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">{group.category}</p>
                    <p className="text-[10px] text-slate-600 leading-snug">{group.skills.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.education !== false && education.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-bold text-slate-900 leading-snug">{edu.degree}</p>
                    <p className="text-[10px] text-slate-500">{edu.school}</p>
                    <p className="text-[9px] font-bold uppercase" style={{ color: accentColor }}>{edu.startYear}–{edu.endYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[10px] font-bold text-slate-900 leading-snug">{cert.name}</p>
                    <p className="text-[9px] text-slate-400">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Languages</h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-[10px]">
                    <span className="font-bold text-slate-800">{lang.name}</span>
                    <span className="text-slate-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-slate-400">Grants</h2>
              <div className="space-y-2">
                {data.grants.map((grant) => (
                  <div key={grant.id}>
                    <p className="text-[10px] font-bold text-slate-900 leading-snug">{grant.title}</p>
                    <div className="flex justify-between text-[9px]">
                      <span className="text-slate-400">{grant.organization}</span>
                      <span className="font-bold" style={{ color: accentColor }}>{grant.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.sectionVisibility?.references !== false && data.references && (
            <section>
              <h2 className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-slate-400">References</h2>
              <p className="text-[10px] text-slate-500 italic whitespace-pre-wrap">{data.references}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
