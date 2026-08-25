"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import templatesData from "@/content/templates.json"

function MiniPreview({ template }: { template: any }) {
  const accent = template.accent_color || template.accent || "#3b82f6"
  const isSidebar = template.id === "arya" || template.id === "meridian"

  return (
    <div className="w-full aspect-[1/1.3] bg-white rounded-xl p-3 text-slate-800 flex flex-col select-none overflow-hidden shadow-inner border border-slate-100">
      {isSidebar ? (
        <div className="flex flex-1 gap-2 overflow-hidden">
          <div className="w-[30%] rounded-lg p-1.5 text-white flex flex-col gap-2" style={{ backgroundColor: accent }}>
            <div className="w-6 h-6 rounded-full bg-white/30 mx-auto" />
            <div className="h-1 w-8 bg-white/40 rounded mx-auto" />
            <div className="h-0.5 w-6 bg-white/20 rounded mx-auto" />
            <div className="mt-2 space-y-1">
              <div className="h-0.5 w-full bg-white/20 rounded" />
              <div className="h-0.5 w-3/4 bg-white/20 rounded" />
            </div>
          </div>
          <div className="flex-1 space-y-2 p-1">
            <div className="h-1 w-3/4 rounded" style={{ backgroundColor: accent + "40" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-200 rounded" />
              <div className="h-0.5 w-5/6 bg-slate-200 rounded" />
            </div>
            <div className="h-1 w-1/2 rounded mt-2" style={{ backgroundColor: accent + "40" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-100 rounded" />
              <div className="h-0.5 w-3/4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-center pb-1.5 border-b border-slate-200">
            <div className="h-1.5 w-20 mx-auto rounded mb-0.5" style={{ backgroundColor: accent }} />
            <div className="h-0.5 w-24 mx-auto bg-slate-300 rounded" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="h-1 w-12 rounded" style={{ backgroundColor: accent + "60" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-200 rounded" />
              <div className="h-0.5 w-11/12 bg-slate-200 rounded" />
            </div>
            <div className="h-1 w-14 rounded mt-1" style={{ backgroundColor: accent + "60" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-200 rounded" />
              <div className="h-0.5 w-3/4 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TemplateShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeTemplates = templatesData.filter((t: any) => t.enabled !== false)

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-200 dark:border-slate-900/60" id="templates">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              10 Free Templates
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pick Your Template
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg">
              ATS-optimized, print-ready designs for every industry, career stage, and document type.
            </p>
          </motion.div>

          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-bold group transition-colors flex-shrink-0"
          >
            Browse All 10 Templates{" "}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Templates Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTemplates.slice(0, 6).map((template: any, index: number) => {
            const accent = template.accent_color || template.accent || "#3b82f6"
            const docType = template.doc_type || template.type || "both"

            return (
              <motion.div
                key={template.id || template.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:bg-white dark:hover:bg-slate-900/60 shadow-sm dark:shadow-none"
              >
                {/* Preview Thumbnail */}
                <div className="p-6 pb-0">
                  <div className="relative group-hover:scale-[1.02] transition-transform duration-300">
                    <MiniPreview template={template} />

                    {/* Tag badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                      {template.category || template.tag}
                    </div>

                    {template.ats_score && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[10px] font-bold tabular-nums text-emerald-700 dark:text-emerald-300 shadow-sm">
                        {template.ats_score}% ATS
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: accent + "20", color: accent }}
                      >
                        {template.category || template.tag}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {docType === "both" ? "Resume & CV" : docType === "cv" ? "Academic CV" : "Resume"}
                    </span>
                    <Link
                      href={`/builder?template=${(template.id || template.name).toLowerCase()}&type=${docType === "cv" ? "cv" : "resume"}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
                    >
                      Use Template <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
