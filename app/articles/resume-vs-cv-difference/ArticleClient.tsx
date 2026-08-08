"use client"

import React from "react"
import ArticleLayout from "@/components/landing/ArticleLayout"

export default function ArticleClient() {
  return (
    <ArticleLayout
      title="Resume vs. CV: What's the Difference & When to Use Each"
      description="Understand the key differences between resumes and CVs, and learn which document to use for different career opportunities."
      readTime="8 min read"
      date="August 2026"
      category="Career Advice"
      categoryColor="#8b5cf6"
    >
      <h2>The Great Confusion</h2>
      <p>
        The terms &ldquo;resume&rdquo; and &ldquo;CV&rdquo; (Curriculum Vitae) are often used interchangeably, but they are <strong>fundamentally different documents</strong> designed for different purposes. Understanding the distinction is crucial — using the wrong one could cost you an opportunity.
      </p>
      <p>
        To make matters more confusing, the meaning varies by country. In the United States and Canada, resumes and CVs are distinct documents. In the UK, Ireland, Australia, and many other countries, &ldquo;CV&rdquo; is the standard term for what Americans would call a &ldquo;resume.&rdquo;
      </p>

      <h2>Resume: The Quick Pitch</h2>
      <p>
        A resume is a <strong>concise, targeted document</strong> — typically 1-2 pages — that summarizes your most relevant work experience, skills, and education for a specific job application.
      </p>

      <h3>Key Characteristics</h3>
      <ul>
        <li><strong>Length:</strong> 1-2 pages (strict limit)</li>
        <li><strong>Target Audience:</strong> Corporate employers, industry recruiters</li>
        <li><strong>Content Focus:</strong> Work experience, achievements, and relevant skills</li>
        <li><strong>Customization:</strong> Should be tailored for each job application</li>
        <li><strong>Format:</strong> Bullet points, quantified achievements, action verbs</li>
      </ul>

      <h3>Standard Resume Sections</h3>
      <ol>
        <li>Contact Information</li>
        <li>Professional Summary or Objective</li>
        <li>Work Experience</li>
        <li>Education</li>
        <li>Skills</li>
        <li>Projects (optional)</li>
        <li>Certifications (optional)</li>
        <li>Awards (optional)</li>
        <li>Volunteer Work (optional)</li>
      </ol>

      <h2>CV: The Complete Academic Record</h2>
      <p>
        A CV (Curriculum Vitae, Latin for &ldquo;course of life&rdquo;) is a <strong>comprehensive document</strong> that provides a detailed account of your entire academic and professional career. There is no page limit — a CV grows throughout your career.
      </p>

      <h3>Key Characteristics</h3>
      <ul>
        <li><strong>Length:</strong> Unlimited (typically 2-10+ pages)</li>
        <li><strong>Target Audience:</strong> Academic institutions, research organizations, medical facilities</li>
        <li><strong>Content Focus:</strong> Complete academic history including publications, research, teaching, grants</li>
        <li><strong>Customization:</strong> Generally comprehensive rather than tailored per application</li>
        <li><strong>Format:</strong> Detailed descriptions, complete publication lists, chronological record</li>
      </ul>

      <h3>Standard CV Sections</h3>
      <ol>
        <li>Contact Information</li>
        <li>Research Interests / Academic Profile</li>
        <li>Education (detailed, including thesis titles)</li>
        <li>Academic Positions</li>
        <li>Publications (papers, books, chapters)</li>
        <li>Research Experience</li>
        <li>Teaching Experience</li>
        <li>Grants &amp; Funding</li>
        <li>Presentations &amp; Conferences</li>
        <li>Awards &amp; Fellowships</li>
        <li>Professional Memberships</li>
        <li>Service &amp; Committee Work</li>
        <li>Languages</li>
        <li>References</li>
      </ol>

      <h2>When to Use Which</h2>

      <h3>Use a Resume When:</h3>
      <ul>
        <li>Applying for corporate or industry jobs</li>
        <li>The job posting says &ldquo;submit a resume&rdquo;</li>
        <li>You&apos;re in the US or Canada and applying to non-academic positions</li>
        <li>The role is in tech, business, marketing, engineering, or other industry sectors</li>
        <li>You want to emphasize specific relevant experience over a comprehensive history</li>
      </ul>

      <h3>Use a CV When:</h3>
      <ul>
        <li>Applying for academic positions (professor, researcher, lecturer)</li>
        <li>Applying for research grants or fellowships</li>
        <li>The job posting specifically requests a CV</li>
        <li>Applying to positions in medicine, science, or academia</li>
        <li>Applying for international positions (in many countries, &ldquo;CV&rdquo; = &ldquo;resume&rdquo;)</li>
        <li>Applying to graduate school or postdoctoral positions</li>
      </ul>

      <blockquote>
        <p>
          <strong>Pro Tip:</strong> When in doubt, check the job posting carefully. If it says &ldquo;resume,&rdquo; send a resume. If it says &ldquo;CV,&rdquo; send a CV. If it says &ldquo;resume/CV,&rdquo; default to the format most common in the industry — typically a resume for corporate and a CV for academic.
        </p>
      </blockquote>

      <h2>The International Twist</h2>
      <p>
        If you&apos;re applying for jobs internationally, here&apos;s a quick guide:
      </p>
      <ul>
        <li><strong>US &amp; Canada:</strong> Resume (1-2 pages) for industry; CV for academia</li>
        <li><strong>UK, Ireland, Australia, NZ:</strong> &ldquo;CV&rdquo; typically means a 2-page resume</li>
        <li><strong>Continental Europe:</strong> CV often includes a photo, personal details, and can be longer</li>
        <li><strong>Middle East &amp; Asia:</strong> CV with photo is common, often includes personal details</li>
        <li><strong>South Africa:</strong> CV is standard for all applications</li>
      </ul>

      <h2>Building Both with ResumeForge</h2>
      <p>
        ResumeForge supports both document types with dedicated templates and section sets. When you launch the builder, you can choose between &ldquo;Resume&rdquo; mode (9 sections, optimized for 1-2 pages) and &ldquo;CV&rdquo; mode (14 sections, unlimited pages for comprehensive academic records).
      </p>
      <p>
        Both formats generate ATS-friendly, vector PDF files with selectable text — whether you&apos;re applying through a corporate portal or submitting to an academic journal.
      </p>
    </ArticleLayout>
  )
}
