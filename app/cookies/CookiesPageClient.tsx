"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cookie, Database, XCircle, CheckCircle2, HardDrive, Info } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const sections = [
  {
    icon: XCircle,
    title: "1. We Use Zero Cookies",
    content: `ResumeForge does not use any cookies whatsoever. This includes:

- **No session cookies** — We don't have user sessions
- **No persistent cookies** — We don't track return visits  
- **No third-party cookies** — We don't integrate with ad networks or analytics
- **No functional cookies** — We use localStorage instead
- **No consent cookies** — There's no cookie to track your cookie preferences (ironic, right?)

Since we use zero cookies, you will never see a "cookie consent" banner on our site.`,
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
    title: "4. Third-Party Cookies",
    content: `ResumeForge does not load any third-party scripts, widgets, or services that might set their own cookies. We do not use:

- Google Analytics, Google Tag Manager, or any Google tracking services
- Facebook Pixel, Meta tracking, or social media widgets
- Hotjar, Mixpanel, Amplitude, or any analytics platforms
- Intercom, Drift, or any chat widgets
- Any advertising networks or remarketing services
- Any CDN that sets cookies (our fonts are loaded via Next.js optimization)

**Hosting provider (Vercel):** Our hosting provider may use essential cookies for infrastructure purposes (e.g., load balancing). This is standard for all web hosting and is outside our control. These cookies, if any, contain no personal data and are not used for tracking.`,
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
            <Cookie size={11} /> Zero Cookies
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            The shortest cookie policy you&apos;ll ever read: we don&apos;t use cookies. 
            Here&apos;s what we use instead and how to manage your data.
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Last updated: August 8, 2026
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
            <XCircle size={24} className="text-red-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">0 Cookies</div>
            <div className="text-[11px] text-slate-500">None. Zero. Zilch.</div>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center">
            <XCircle size={24} className="text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">0 Trackers</div>
            <div className="text-[11px] text-slate-500">No analytics. No pixels.</div>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
            <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">localStorage Only</div>
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
