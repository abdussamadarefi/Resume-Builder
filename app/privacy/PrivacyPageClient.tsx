"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Database, Cookie, Eye, Trash2, Mail, Globe, Server } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: `**We collect absolutely no personal data.** ResumeForge is a fully client-side application. There are no servers, databases, or backend infrastructure that process or store your information.

All resume and CV data you enter is stored exclusively in your web browser's \`localStorage\`. This data never leaves your device and is never transmitted to any external server.

**What we don't collect:**
- No names, email addresses, or personal identifiers
- No usage analytics or behavioral data
- No IP addresses or geolocation data
- No device fingerprints or browser information
- No resume content or document data`,
  },
  {
    icon: Cookie,
    title: "2. Cookies & Tracking",
    content: `**ResumeForge uses zero cookies.** We do not use any cookies — not for tracking, not for analytics, not for functionality, and not for advertising.

We also do not use:
- Pixel trackers or web beacons
- Third-party analytics tools (no Google Analytics, no Hotjar, no Mixpanel)
- Social media tracking scripts
- Advertising networks or retargeting pixels
- Fingerprinting or any form of cross-site tracking

Your browsing activity on ResumeForge is completely invisible to us.`,
  },
  {
    icon: Server,
    title: "3. Data Storage & localStorage",
    content: `ResumeForge uses your browser's \`localStorage\` API to save your resume data between sessions. This is a browser-native feature that stores data on your local device only.

**Key facts about localStorage:**
- Data is stored on YOUR device, not on our servers
- Data persists until you manually clear it or clear your browser data
- Data is not accessible to other websites or applications
- Data is not shared, synced, or backed up by us

**To delete your data:** Clear your browser's storage for this site, or use your browser's "Clear browsing data" feature. Once deleted, the data cannot be recovered — because we never had a copy.`,
  },
  {
    icon: Globe,
    title: "4. Third-Party Services",
    content: `ResumeForge is hosted on **Vercel**, which provides standard web hosting infrastructure. Vercel may collect standard server logs (IP addresses, request timestamps) as part of their hosting service — this is outside our control.

**We do not integrate with any third-party services** for:
- Analytics or tracking
- Advertising
- User authentication
- Data processing
- Payment processing (the service is free)

The application is served as static files and runs entirely in your browser.`,
  },
  {
    icon: Eye,
    title: "5. GDPR & International Privacy",
    content: `Since we don't collect, process, or store any personal data on our servers, many GDPR requirements are automatically satisfied:

- **Right to Access:** All your data is already in your browser — you have full access at all times.
- **Right to Deletion:** Clear your browser's localStorage to delete all data instantly.
- **Right to Portability:** Export your resume as PDF or DOCX at any time.
- **Data Minimization:** We collect zero data — you can't minimize below zero.
- **Consent:** No data collection means no consent is needed.

We respect the privacy laws of all jurisdictions by simply not collecting data in the first place.`,
  },
  {
    icon: Trash2,
    title: "6. Data Deletion",
    content: `To delete all ResumeForge data from your device:

1. **Option A — Browser Settings:** Go to your browser settings → Privacy/Security → Clear browsing data → Select "Cookies and site data" or "Local storage" → Clear for this site.

2. **Option B — Developer Tools:** Open your browser's Developer Tools (F12) → Application tab → Local Storage → Select the ResumeForge domain → Click "Clear All."

Since we have no servers or databases, there is no server-side data to request deletion of. Your local data is the only copy that exists.`,
  },
  {
    icon: Mail,
    title: "7. Contact Information",
    content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us:

**Email:** abdussamadarefi@gmail.com
**GitHub:** [github.com/abdussamadarefi/Resume-Builder](https://github.com/abdussamadarefi/Resume-Builder)

We are committed to maintaining the strongest possible privacy protections for our users.`,
  },
]

export default function PrivacyPageClient() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck size={11} /> Your Data, Your Control
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            ResumeForge is built on a fundamental principle: your data belongs to you and only you. 
            We don&apos;t collect, store, or process any personal information.
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
          className="mb-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
        >
          <h2 className="text-sm font-bold text-emerald-400 mb-2">TL;DR — Privacy in One Sentence</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            ResumeForge has <strong className="text-white">no servers, no databases, no cookies, no tracking, and no analytics</strong>. 
            All your resume data stays in your browser&apos;s localStorage on your device. We literally cannot see your data.
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
              <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line prose-headings:text-white prose-strong:text-slate-200">
                {section.content.split('\n').map((line, i) => {
                  // Handle bold text
                  const parts = line.split(/(\*\*[^*]+\*\*)/g)
                  return (
                    <p key={i} className={line.startsWith('-') ? 'pl-4' : line.trim() === '' ? 'h-2' : ''}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>
                        }
                        // Handle inline code
                        const codeParts = part.split(/(`[^`]+`)/g)
                        return codeParts.map((codePart, k) => {
                          if (codePart.startsWith('`') && codePart.endsWith('`')) {
                            return <code key={k} className="px-1.5 py-0.5 bg-slate-800 rounded text-[11px] text-emerald-400 font-mono">{codePart.slice(1, -1)}</code>
                          }
                          // Handle links
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
