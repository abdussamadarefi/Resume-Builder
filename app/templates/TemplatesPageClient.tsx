"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import LandingLayout from "@/components/landing/LandingLayout"
import templatesData from "@/content/templates.json"
import templatesPageData from "@/content/templates-page.json"

type FilterType = "all" | "resume" | "cv" | "both"

function MiniPreview({ template }: { template: any }) {
  const accent = template.accent_color || template.accent || "#3b82f6"
  const isSidebar = template.id === "arya" || template.id === "meridian"

  return (
    <div className="w-full aspect-[1/1.35] bg-white rounded-xl p-4 text-slate-800 flex flex-col select-none overflow-hidden shadow-inner border border-slate-100">
      {isSidebar ? (
        <div className="flex flex-1 gap-2.5 overflow-hidden">
          <div className="w-[30%] rounded-lg p-2 text-white flex flex-col gap-2.5" style={{ backgroundColor: accent }}>
            <div className="w-8 h-8 rounded-full bg-white/30 mx-auto" />
            <div className="h-1.5 w-12 bg-white/40 rounded mx-auto" />
            <div className="h-1 w-10 bg-white/20 rounded mx-auto" />
            <div className="mt-3 space-y-1.5">
              <div className="h-1 w-full bg-white/20 rounded" />
              <div className="h-1 w-3/4 bg-white/20 rounded" />
              <div className="h-1 w-full bg-white/20 rounded" />
            </div>
          </div>
          <div className="flex-1 space-y-3 p-1">
            <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: accent + "40" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded" />
              <div className="h-1 w-5/6 bg-slate-200 rounded" />
              <div className="h-1 w-4/5 bg-slate-200 rounded" />
            </div>
            <div className="h-1 w-1/2 rounded mt-3" style={{ backgroundColor: accent + "40" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-100 rounded" />
              <div className="h-1 w-3/4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-center pb-2 border-b border-slate-200">
            <div className="h-2 w-28 mx-auto rounded mb-1" style={{ backgroundColor: accent }} />
            <div className="h-1 w-36 mx-auto bg-slate-300 rounded" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-1.5 w-16 rounded" style={{ backgroundColor: accent + "60" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded" />
              <div className="h-1 w-11/12 bg-slate-200 rounded" />
              <div className="h-1 w-4/5 bg-slate-200 rounded" />
            </div>
            <div className="h-1.5 w-20 rounded mt-2" style={{ backgroundColor: accent + "60" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded" />
              <div className="h-1 w-3/4 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TemplatesPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const { badge_text, title, subtitle, filter_tabs } = templatesPageData

  const activeTemplates = templatesData.filter((t: any) => t.enabled !== false)

  const filtered = activeTemplates.filter((t: any) => {
    if (activeFilter === "all") return true
    if (activeFilter === "resume") return t.doc_type === "resume" || t.type === "resume" || t.doc_type === "both" || t.type === "both"
    if (activeFilter === "cv") return t.doc_type === "cv" || t.type === "cv" || t.doc_type === "both" || t.type === "both"
    if (activeFilter === "both") return t.doc_type === "both" || t.type === "both"
    return true
  })

  return (
    <LandingLayout>
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> {badge_text || "Template Gallery"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            {title || "Choose Your Perfect Template"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {subtitle || "10 professionally designed templates for resumes and academic CVs. All templates are ATS-friendly, print-ready, and free."}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 gap-1">
            {(filter_tabs || [
              { id: "all", label: "All Templates" },
              { id: "resume", label: "Resume" },
              { id: "cv", label: "CV" },
              { id: "both", label: "Both" },
            ]).map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterType)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  activeFilter === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t: any, index: number) => {
            const accent = t.accent_color || t.accent || "#3b82f6"
            const tags = t.tags || t.features || ["ATS-Friendly", "Print-Ready"]
            const type = t.doc_type || t.type || "both"

            return (
              <motion.div
                key={t.id || t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-3xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all duration-300 overflow-hidden flex flex-col shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-slate-900/50"
              >
                {/* Preview Thumbnail */}
                <div className="p-6 pb-0">
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <MiniPreview template={t} />

                    {/* ATS Badge */}
                    {t.ats_score && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                        {t.ats_score}% ATS
                      </div>
                    )}

                    {/* Featured Pill */}
                    {t.featured && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-amber-500/15 dark:bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-amber-700 dark:text-amber-300 shadow-sm">
                        Featured
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {t.name}
                      </h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: accent + "20", color: accent }}
                      >
                        {t.category || t.tag}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {t.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/40 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {type === "both" ? "Resume & CV" : type === "cv" ? "Academic CV" : "Resume"}
                    </span>
                    <Link
                      href={`/builder?template=${(t.id || t.name).toLowerCase()}&type=${type === "cv" ? "cv" : "resume"}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
                    >
                      Use Template <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </LandingLayout>
  )
}
