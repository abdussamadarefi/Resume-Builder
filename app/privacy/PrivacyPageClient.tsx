"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Database, Cookie, Eye, Trash2, Mail, Globe, Server } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: `ResumeForge is a fully client-side application. Your resume and CV data is stored exclusively in your browser's \`localStorage\` and is **never transmitted to any external server**.

**What we collect via Google Analytics 4:**
We use Google Analytics 4 (GA4) to understand aggregate site usage. GA4 may collect:
- Page views and navigation patterns
- General geographic region (country/city level, derived from IP)
- Device type, browser, and operating system
- Anonymized interaction events (e.g., template selected, resume exported)

**What we do NOT collect:**
- No names, email addresses, or personal identifiers
- No resume content, text, or document data
- No login credentials (we have no accounts)
- Google Analytics does not have access to your localStorage data`,
  },
  {
    icon: Cookie,
    title: "2. Cookies & Tracking",
    content: `ResumeForge uses **Google Analytics 4 (GA4)** for anonymous site usage analytics. GA4 may set first-party cookies (such as \`_ga\` and \`_ga_*\`) to distinguish unique visitors and track sessions.

**These cookies:**
- Do NOT contain any personal information or resume data
- Are used solely for aggregate traffic analysis
- Can be blocked via your browser's cookie settings or ad-blockers
- Are NOT used for advertising, retargeting, or cross-site tracking

**We do NOT use:**
- Social media tracking pixels
- Advertising networks or remarketing services
- Fingerprinting or invasive tracking techniques

You can opt out of Google Analytics tracking by installing the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).`,
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
    content: `ResumeForge integrates with the following third-party services:

**Google Analytics 4 (by Google LLC):**
- Purpose: Anonymous aggregate usage analytics
- Data collected: Page views, session duration, device/browser info, general location (country level)
- Privacy policy: [Google Privacy Policy](https://policies.google.com/privacy)
- Opt out: [Google Analytics Opt-out Add-on](https://tools.google.com/dlpage/gaoptout)

**Vercel (Hosting):**
- Purpose: Web hosting and content delivery
- Vercel may collect standard server logs (IP addresses, request timestamps)

**We do NOT use third-party services for:**
- Advertising or retargeting
- User authentication
- Data processing of resume content
- Payment processing (the service is free)`,
  },
  {
    icon: Eye,
    title: "5. GDPR & International Privacy",
    content: `We are committed to complying with GDPR and international privacy regulations:

- **Right to Access:** All your resume data is in your browser — you have full access at all times. Analytics data is anonymized and aggregated by Google.
- **Right to Deletion:** Clear your browser's localStorage to delete all resume data instantly. You can also clear GA cookies via browser settings.
- **Right to Portability:** Export your resume as PDF or DOCX at any time.
- **Data Minimization:** We collect only anonymous aggregate analytics. No personal identifiers are stored.
- **Consent:** By using our site, you acknowledge the use of Google Analytics for usage insights. You can opt out at any time using the GA Opt-out Add-on or browser cookie settings.
- **Right to Object:** You can block all analytics tracking via browser settings, ad-blockers, or the Google Analytics Opt-out Add-on.

Your resume data never leaves your device. Analytics data is processed by Google in accordance with their privacy policy.`,
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
            ResumeForge is built on a fundamental principle: your resume data belongs to you and only you.
            We use minimal, anonymous analytics to improve the service — but your content never leaves your browser.
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Last updated: August 16, 2026
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
            Your resume data stays <strong className="text-white">100% in your browser&apos;s localStorage</strong> and is never transmitted anywhere. 
            We use <strong className="text-white">Google Analytics 4</strong> for anonymous aggregate traffic insights (page views, device type) — but GA has zero access to your resume content. You can opt out of analytics anytime.
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
