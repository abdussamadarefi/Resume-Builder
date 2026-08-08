"use client"

import React from "react"
import { motion } from "framer-motion"
import { FileText, Scale, Shield, AlertTriangle, Code, RefreshCcw, Ban, Mail } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const sections = [
  {
    icon: FileText,
    title: "1. Service Description",
    content: `ResumeForge is a free, open-source, client-side resume and CV builder. The Service allows you to create, edit, preview, and export professional resumes and academic CVs directly in your web browser.

**Key characteristics:**
- The Service operates entirely within your browser — no server-side processing of your data
- No user account, registration, or authentication is required
- The Service is provided free of charge with no premium tiers or hidden costs
- All resume data is stored in your browser's localStorage`,
  },
  {
    icon: Scale,
    title: "2. Acceptance of Terms",
    content: `By accessing or using ResumeForge, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last Modified" date. Your continued use of the Service after changes constitutes acceptance of the modified terms.`,
  },
  {
    icon: Shield,
    title: "3. Intellectual Property & Your Data",
    content: `**Your Content:** You retain full ownership of all content you create using ResumeForge. Your resume data, text, formatting choices, and exported documents belong entirely to you. We claim no rights to your content.

**Our Software:** The ResumeForge application code is open source and licensed under the terms specified in our GitHub repository. You are free to use, modify, and distribute the code in accordance with the applicable open-source license.

**Templates:** The resume and CV templates provided by ResumeForge are part of the open-source project. You may use them freely for personal and commercial purposes (i.e., creating your own resumes for job applications).`,
  },
  {
    icon: Ban,
    title: "4. Acceptable Use",
    content: `You agree to use ResumeForge only for lawful purposes. You may not:

- Use the Service to create fraudulent, misleading, or deceptive documents
- Attempt to exploit, hack, or compromise the Service's infrastructure
- Use the Service for any purpose that violates applicable local, state, national, or international laws
- Redistribute the Service under a different name while claiming original authorship
- Use the Service to generate spam or mass-produced documents for malicious purposes

ResumeForge is designed for creating legitimate professional documents for career advancement.`,
  },
  {
    icon: AlertTriangle,
    title: "5. Disclaimers & Limitations",
    content: `**THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE"** without warranties of any kind, either express or implied, including but not limited to:

- Fitness for a particular purpose
- Accuracy or completeness of generated documents
- Uninterrupted or error-free operation
- Compatibility with all ATS (Applicant Tracking Systems)

**Limitation of Liability:** In no event shall ResumeForge, its creator, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.

**No Employment Guarantee:** ResumeForge is a document creation tool. We do not guarantee job interviews, job offers, or career outcomes based on resumes created with our Service.`,
  },
  {
    icon: Code,
    title: "6. Open Source License",
    content: `ResumeForge is an open-source project. The source code is available on GitHub at:
[github.com/abdussamadarefi/Resume-Builder](https://github.com/abdussamadarefi/Resume-Builder)

Contributions to the project are welcome and are subject to the project's contribution guidelines and code of conduct. By contributing to the project, you agree that your contributions will be licensed under the same license as the project.`,
  },
  {
    icon: RefreshCcw,
    title: "7. Modifications to the Service",
    content: `We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time, with or without notice. Since the Service is open source, the community may continue development independently.

We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.`,
  },
  {
    icon: Mail,
    title: "8. Contact",
    content: `If you have any questions about these Terms of Service, please contact us:

**Email:** abdussamadarefi@gmail.com
**GitHub:** [github.com/abdussamadarefi/Resume-Builder](https://github.com/abdussamadarefi/Resume-Builder)`,
  },
]

export default function TermsPageClient() {
  return (
    <LandingLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
            <Scale size={11} /> Legal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Please read these terms carefully before using ResumeForge. By using the Service, 
            you agree to be bound by these terms.
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Last updated: August 8, 2026
          </p>
        </motion.div>

        {/* TL;DR Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20"
        >
          <h2 className="text-sm font-bold text-indigo-400 mb-2">TL;DR — Terms in Plain English</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            ResumeForge is <strong className="text-white">free and open source</strong>. 
            You own everything you create. Use it for legitimate resume building. 
            We provide the tool &ldquo;as-is&rdquo; without guarantees about job outcomes. 
            Don&apos;t use it for fraud or illegal purposes.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 md:p-8 rounded-2xl bg-slate-900/30 border border-slate-800/60"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <section.icon size={16} />
                </div>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                {section.content.split('\n').map((line, i) => {
                  const parts = line.split(/(\*\*[^*]+\*\*)/g)
                  return (
                    <p key={i} className={line.startsWith('-') ? 'pl-4' : line.trim() === '' ? 'h-2' : ''}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>
                        }
                        const codeParts = part.split(/(`[^`]+`)/g)
                        return codeParts.map((codePart, k) => {
                          if (codePart.startsWith('`') && codePart.endsWith('`')) {
                            return <code key={k} className="px-1.5 py-0.5 bg-slate-800 rounded text-[11px] text-indigo-400 font-mono">{codePart.slice(1, -1)}</code>
                          }
                          const linkMatch = codePart.match(/\[([^\]]+)\]\(([^)]+)\)/)
                          if (linkMatch) {
                            return <a key={k} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-indigo-300 underline">{linkMatch[1]}</a>
                          }
                          return codePart
                        })
                      })}
                    </p>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LandingLayout>
  )
}
