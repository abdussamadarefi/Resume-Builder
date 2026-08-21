"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cookie, FileText } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"
import cookiesData from "@/content/legal/cookies.json"

export default function CookiesPageClient() {
  const { badge, title, subtitle, last_updated, tldr_headline, tldr_content, sections } = cookiesData

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <Cookie size={11} /> {badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="text-xs text-slate-500">Last updated: {last_updated}</div>
        </motion.div>

        {/* TL;DR Box */}
        {tldr_content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 md:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/40 border border-amber-500/30 dark:border-amber-500/20 mb-12 space-y-3 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Cookie size={18} />
              <span>{tldr_headline || "The Plain-English TL;DR"}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              {tldr_content}
            </p>
          </motion.div>
        )}

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section: any, index: number) => (
            <motion.div
              key={section.id || section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 space-y-3 shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <FileText size={16} />
                <h2 className="text-base md:text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-line font-normal">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </LandingLayout>
  )
}
