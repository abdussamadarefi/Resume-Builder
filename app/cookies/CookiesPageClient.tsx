"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cookie, Database, XCircle, CheckCircle2, HardDrive, Info } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const sections = [
  {
    icon: XCircle,
    title: "1. Cookies We Use",
    content: `ResumeForge uses **Google Analytics 4 (GA4)** for anonymous traffic analysis. GA4 sets the following first-party cookies:

- **\`_ga\`** — Distinguishes unique visitors. Expires after 2 years.
- **\`_ga_*\`** — Maintains session state. Expires after 2 years.

**These cookies:**
- Contain only a randomly generated ID — no personal information
- Are NOT used for advertising or cross-site tracking
- Can be blocked via browser settings or ad-blockers without affecting the resume builder

**Cookies we do NOT use:**
- No session cookies (we have no user sessions)
- No advertising or retargeting cookies
- No social media cookies
- No consent-tracking cookies`,
  },
  {
    icon: Database,
    title: "2. localStorage Usage",
    content: `Instead of cookies, ResumeForge uses your browser's **localStorage** API to save your resume data between visits. This is fundamentally different from cookies:

**localStorage vs. Cookies:**
- localStorage data is **never sent to any server** with HTTP requests (cookies are)
- localStorage data stays **exclusively on your device** 
- localStorage has a much larger storage capacity (~5-10MB vs 4KB for cookies)
- localStorage does not have an expiration date — data persists until you clear it

**What we store in localStorage:**
- Your resume/CV content (work experience, education, skills, etc.)
- Your template and color preferences
- Your UI settings (zoom level, active section, etc.)

**What we don't store:**
- Any identifying information about you
- Usage statistics or behavioral data
- Any data that could be used for tracking`,
  },
  {
    icon: HardDrive,
    title: "3. How to Clear Your Data",
    content: `Since all data is stored locally, you have complete control over it:

**Method 1 — Browser Settings:**
1. Open your browser's Settings
2. Navigate to Privacy & Security
3. Click "Clear browsing data" or "Clear site data"
4. Select the ResumeForge domain
5. Clear localStorage/site data

**Method 2 — Developer Tools:**
1. Visit ResumeForge in your browser
2. Open Developer Tools (F12 or Ctrl+Shift+I)
3. Go to the Application tab
4. Find "Local Storage" in the sidebar
5. Select the ResumeForge entry
6. Click "Clear All" or delete individual entries

**Method 3 — Start Fresh:**
Simply using a different browser or an incognito/private window gives you a completely fresh experience with no saved data.`,
  },
  {
    icon: Info,
    title: "4. Third-Party Services & Cookies",
    content: `**Google Analytics 4 (by Google LLC):**
GA4 is the only third-party service that sets cookies on our site. It is used solely for understanding aggregate traffic patterns (e.g., which pages are popular, what devices visitors use). Google processes this data according to their [Privacy Policy](https://policies.google.com/privacy).

You can opt out of GA tracking entirely by:
- Installing the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)
- Using a browser ad-blocker (e.g., uBlock Origin)
- Disabling cookies for this site in your browser settings

**We do NOT use:**
- Facebook Pixel, Meta tracking, or social media widgets
- Hotjar, Mixpanel, Amplitude, or similar analytics
- Intercom, Drift, or chat widgets
- Any advertising networks or remarketing services

**Hosting provider (Vercel):** May set essential infrastructure cookies for load balancing. These contain no personal data.`,
  },
]

export default function CookiesPageClient() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <Cookie size={11} /> Minimal Cookies
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            We use only essential Google Analytics cookies for anonymous traffic insights.
            Your resume data is stored in localStorage and is never sent to any server.
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Last updated: August 16, 2026
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-center">
            <Cookie size={24} className="text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">GA4 Only</div>
            <div className="text-[11px] text-slate-500">Anonymous analytics cookies.</div>
          </div>
          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
            <XCircle size={24} className="text-red-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">0 Ad Trackers</div>
            <div className="text-[11px] text-slate-500">No ads. No retargeting.</div>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
            <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">localStorage</div>
            <div className="text-[11px] text-slate-500">Your device. Your data.</div>
          </div>
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
                            return <code key={k} className="px-1.5 py-0.5 bg-slate-800 rounded text-[11px] text-amber-400 font-mono">{codePart.slice(1, -1)}</code>
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
