"use client"

import { ResumeData } from "@/types/resume"
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType,
  convertInchesToTwip, Header
} from "docx"

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 59, g: 130, b: 246 }
}

function accentRun(text: string, accentColor: string): TextRun {
  const { r, g, b } = hexToRgb(accentColor)
  return new TextRun({
    text,
    color: `${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
    bold: true,
    size: 18,
  })
}

function sectionTitle(text: string, accentColor: string): Paragraph {
  const { r, g, b } = hexToRgb(accentColor)
  const colorHex = `${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, color: colorHex })],
    spacing: { before: 200, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: colorHex, space: 4 }
    }
  })
}

function bulletParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 18 })],
    bullet: { level: 0 },
    spacing: { after: 30 },
  })
}

export async function generateDOCX(data: ResumeData, accentColor: string): Promise<void> {
  const children: Paragraph[] = []

  // Header
  children.push(new Paragraph({
    children: [
      new TextRun({
        text: `${data.personal.firstName} ${data.personal.lastName}`,
        bold: true,
        size: 56,
        color: hexToRgb(accentColor).r.toString(16).padStart(2, "0") +
               hexToRgb(accentColor).g.toString(16).padStart(2, "0") +
               hexToRgb(accentColor).b.toString(16).padStart(2, "0"),
      })
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 }
  }))

  if (data.personal.title) {
    children.push(new Paragraph({
      children: [new TextRun({ text: data.personal.title, size: 22, italics: true, color: "64748B" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }))
  }

  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.website,
    data.personal.linkedin,
  ].filter(Boolean)

  if (contactParts.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: contactParts.join("  |  "), size: 16, color: "64748B" })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }))
  }

  // Summary
  if (data.sectionVisibility?.summary !== false && data.summary) {
    children.push(sectionTitle("Profile", accentColor))
    children.push(new Paragraph({
      children: [new TextRun({ text: data.summary, size: 18 })],
      spacing: { after: 120 }
    }))
  }

  // Experience
  if (data.experience.length > 0) {
    children.push(sectionTitle("Experience", accentColor))
    for (const exp of data.experience) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.role, bold: true, size: 20 }),
          new TextRun({ text: `  ·  ${exp.company}`, size: 18, color: "64748B" }),
        ],
        spacing: { before: 120, after: 40 }
      }))
      if (exp.startDate || exp.endDate) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `${exp.startDate} – ${exp.endDate}`, size: 16, color: "94A3B8" })],
          spacing: { after: 60 }
        }))
      }
      for (const bullet of exp.bullets.filter(b => b)) {
        children.push(bulletParagraph(bullet))
      }
    }
  }

  // Education
  if (data.education.length > 0) {
    children.push(sectionTitle("Education", accentColor))
    for (const edu of data.education) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, bold: true, size: 20 }),
        ],
        spacing: { before: 100, after: 40 }
      }))
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.school, size: 18, color: "64748B" }),
          new TextRun({ text: `  ·  ${edu.startYear} – ${edu.endYear}`, size: 16, color: "94A3B8" })
        ],
        spacing: { after: 80 }
      }))
      if (edu.thesisTitle) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `Thesis: ${edu.thesisTitle}`, size: 16, italics: true, color: "64748B" })],
          spacing: { after: 40 }
        }))
      }
    }
  }

  // Skills
  if (data.skills.length > 0) {
    children.push(sectionTitle("Skills", accentColor))
    for (const group of data.skills) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `${group.category}: `, bold: true, size: 18 }),
          new TextRun({ text: group.skills.join(", "), size: 18 })
        ],
        spacing: { after: 60 }
      }))
    }
  }

  // Projects
  if (data.sectionVisibility?.projects !== false && data.projects && data.projects.length > 0) {
    children.push(sectionTitle("Projects", accentColor))
    for (const proj of data.projects) {
      children.push(new Paragraph({
        children: [new TextRun({ text: proj.name, bold: true, size: 20 })],
        spacing: { before: 100, after: 40 }
      }))
      if (proj.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: proj.description, size: 18 })],
          spacing: { after: 40 }
        }))
      }
      if (proj.techStack?.length > 0) {
        children.push(new Paragraph({
          children: [new TextRun({ text: proj.techStack.join("  ·  "), size: 16, color: "94A3B8" })],
          spacing: { after: 80 }
        }))
      }
    }
  }

  // Certifications
  if (data.sectionVisibility?.certifications !== false && data.certifications && data.certifications.length > 0) {
    children.push(sectionTitle("Certifications", accentColor))
    for (const cert of data.certifications) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: cert.name, bold: true, size: 18 }),
          new TextRun({ text: `  ·  ${cert.issuer}  ·  ${cert.date}`, size: 16, color: "94A3B8" })
        ],
        spacing: { after: 60 }
      }))
    }
  }

  // Languages
  if (data.sectionVisibility?.languages !== false && data.languages && data.languages.length > 0) {
    children.push(sectionTitle("Languages", accentColor))
    for (const lang of data.languages) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `${lang.name}: `, bold: true, size: 18 }),
          new TextRun({ text: lang.proficiency, size: 18 })
        ],
        spacing: { after: 40 }
      }))
    }
  }

  // Publications (CV)
  if (data.publications && data.publications.length > 0) {
    children.push(sectionTitle("Publications", accentColor))
    data.publications.forEach((pub, i) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `[${i + 1}] `, bold: true, size: 18, color: "94A3B8" }),
          new TextRun({ text: pub.title, bold: true, size: 18 }),
          new TextRun({ text: `. ${pub.publisher}, ${pub.date}`, size: 18 })
        ],
        spacing: { after: 60 }
      }))
    })
  }

  // Grants (CV)
  if (data.grants && data.grants.length > 0) {
    children.push(sectionTitle("Grants & Funding", accentColor))
    for (const grant of data.grants) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: grant.title, bold: true, size: 18 }),
          new TextRun({ text: `  ·  ${grant.organization}`, size: 18, color: "64748B" }),
          new TextRun({ text: `  ·  ${grant.amount}`, bold: true, size: 18 }),
        ],
        spacing: { after: 60 }
      }))
    }
  }

  // Teaching (CV)
  if (data.teaching && data.teaching.length > 0) {
    children.push(sectionTitle("Teaching Experience", accentColor))
    for (const t of data.teaching) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: t.course, bold: true, size: 18 }),
          new TextRun({ text: `  ·  ${t.institution}`, size: 18, color: "64748B" }),
          new TextRun({ text: `  ·  ${t.date}`, size: 16, color: "94A3B8" }),
        ],
        spacing: { after: 60 }
      }))
    }
  }

  // Custom
  if (data.sectionVisibility?.custom !== false && data.custom && data.custom.length > 0) {
    children.push(sectionTitle("Additional", accentColor))
    for (const cust of data.custom) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: cust.title, bold: true, size: 20 }),
          new TextRun({ text: `  ·  ${cust.date}`, size: 16, color: "94A3B8" }),
        ],
        spacing: { before: 100, after: 40 }
      }))
      if (cust.subtitle) {
        children.push(new Paragraph({
          children: [new TextRun({ text: cust.subtitle, size: 18, italics: true, color: "64748B" })],
          spacing: { after: 40 }
        }))
      }
      if (cust.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: cust.description, size: 18 })],
          spacing: { after: 80 }
        }))
      }
    }
  }

  // References
  if (data.references) {
    children.push(sectionTitle("References", accentColor))
    children.push(new Paragraph({
      children: [new TextRun({ text: data.references, size: 18, italics: true })],
      spacing: { after: 120 }
    }))
  }

  const doc = new Document({
    sections: [{
      properties: { page: { margin: { top: convertInchesToTwip(0.75), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } },
      children
    }]
  })

  const buffer = await Packer.toBlob(doc)
  const url = URL.createObjectURL(buffer)
  const a = document.createElement("a")
  a.href = url
  a.download = `${data.personal.firstName || "Resume"}_${data.personal.lastName || ""}.docx`.trim()
  a.click()
  URL.revokeObjectURL(url)
}
