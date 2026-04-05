"use client"

import { ResumeData } from "@/types/resume"

interface TemplateProps {
  data: ResumeData
  accentColor: string
  fontSize: number
  lineHeight: number
  margin: number
}

export function ScholarTemplate({ data, accentColor, fontSize, lineHeight, margin }: TemplateProps) {
  const { personal, summary, experience, education, skills } = data

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-4 text-slate-800">
      <span>{children}</span>
      <span className="flex-1 h-px bg-slate-200" />
    </h2>
  )

  return (
    <div
      className="bg-white text-slate-900 min-h-full"
      style={{ padding: `${margin}px`, fontSize: `${fontSize}px`, lineHeight, fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* Header */}
      <header className="text-center mb-10 pb-8">
        {personal.photoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={personal.photoUrl}
              alt={`${personal.firstName} ${personal.lastName}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-slate-200"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
          {personal.firstName} {personal.lastName}
        </h1>
        <p className="text-base font-normal italic text-slate-500 mb-4" style={{ color: accentColor }}>{personal.title}</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-slate-500 font-sans">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.orcid && <span>ORCID: {personal.orcid}</span>}
        </div>
        <hr className="mt-6 border-t-2 border-slate-800" />
      </header>

      {/* Single column with sections */}
      <div className="space-y-8">
        {data.sectionVisibility?.summary !== false && summary && (
          <section>
            <SectionTitle>Research Interests</SectionTitle>
            <p className="text-sm leading-relaxed text-slate-700 italic">{summary}</p>
          </section>
        )}

        {data.sectionVisibility?.experience !== false && experience.length > 0 && (
          <section>
            <SectionTitle>Academic Positions</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-sans text-slate-500">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="italic text-sm mb-3" style={{ color: accentColor }}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                  <ul className="list-disc ml-5 space-y-1">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i} className="text-sm text-slate-700 leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
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
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <p className="italic text-sm" style={{ color: accentColor }}>{edu.school}</p>
                    {edu.thesisTitle && <p className="text-xs text-slate-500 mt-1">Thesis: <span className="italic">{edu.thesisTitle}</span></p>}
                    {edu.supervisor && <p className="text-xs text-slate-500">Supervisor: {edu.supervisor}</p>}
                  </div>
                  <span className="text-xs font-sans text-slate-500 ml-4 flex-shrink-0">{edu.startYear} – {edu.endYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.publications !== false && data.publications && data.publications.length > 0 && (
          <section>
            <SectionTitle>Publications</SectionTitle>
            <ol className="space-y-4 list-decimal ml-5">
              {data.publications.map((pub) => (
                <li key={pub.id} className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">{pub.title}.</span>{" "}
                  <span className="italic" style={{ color: accentColor }}>{pub.publisher}</span>
                  {pub.date && <span className="font-sans text-slate-500">, {pub.date}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {data.sectionVisibility?.grants !== false && data.grants && data.grants.length > 0 && (
          <section>
            <SectionTitle>Grants & Funding</SectionTitle>
            <div className="space-y-4">
              {data.grants.map((grant) => (
                <div key={grant.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{grant.title}</h3>
                    <p className="italic text-xs" style={{ color: accentColor }}>{grant.organization}</p>
                  </div>
                  <span className="text-sm font-bold font-sans ml-4 flex-shrink-0" style={{ color: accentColor }}>{grant.amount}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.teaching !== false && data.teaching && data.teaching.length > 0 && (
          <section>
            <SectionTitle>Teaching Experience</SectionTitle>
            <div className="space-y-4">
              {data.teaching.map((t) => (
                <div key={t.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.course}</h3>
                    <p className="italic text-xs" style={{ color: accentColor }}>{t.institution}</p>
                    {t.description && <p className="text-xs text-slate-500 mt-1">{t.description}</p>}
                  </div>
                  <span className="text-xs font-sans text-slate-500 ml-4 flex-shrink-0">{t.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.skills !== false && skills.length > 0 && (
          <section>
            <SectionTitle>Skills & Expertise</SectionTitle>
            <div className="space-y-2 font-sans">
              {skills.map((group) => (
                <div key={group.id} className="flex gap-3 text-sm">
                  <span className="font-bold text-slate-700 flex-shrink-0 min-w-[120px]">{group.category}:</span>
                  <span className="text-slate-600">{group.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-3 font-sans">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{cert.name}</span>
                    <span className="text-slate-500 text-sm"> · {cert.issuer}</span>
                  </div>
                  <span className="text-xs text-slate-400 ml-4">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0 && (
          <section>
            <SectionTitle>Languages</SectionTitle>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-sans">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <span className="font-bold text-slate-900">{lang.name}</span>
                  <span className="text-slate-500"> ({lang.proficiency})</span>
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
                <div key={cust.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-slate-900">{cust.title}</h3>
                    <span className="text-xs font-sans text-slate-500">{cust.date}</span>
                  </div>
                  <p className="italic text-sm mb-1" style={{ color: accentColor }}>{cust.subtitle}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{cust.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.sectionVisibility?.references !== false && data.references && (
          <section>
            <SectionTitle>References</SectionTitle>
            <p className="text-sm text-slate-600 italic whitespace-pre-wrap leading-relaxed">{data.references}</p>
          </section>
        )}
      </div>
    </div>
  )
}
