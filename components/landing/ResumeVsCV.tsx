"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FileText, GraduationCap, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type DocType = "resume" | "cv"

const comparisonData = [
  { feature: "Typical Length", resume: "1–2 pages", cv: "Unlimited pages" },
  { feature: "Target Audience", resume: "Corporate & Industry", cv: "Academia & Research" },
  { feature: "Work Experience", resume: true, cv: true },
  { feature: "Education", resume: true, cv: true },
  { feature: "Skills", resume: true, cv: true },
  { feature: "Projects", resume: true, cv: true },
  { feature: "Summary / Objective", resume: true, cv: true },
  { feature: "Publications", resume: false, cv: true },
  { feature: "Teaching Experience", resume: false, cv: true },
  { feature: "Grants & Funding", resume: false, cv: true },
  { feature: "Conferences", resume: false, cv: true },
  { feature: "Awards & Honors", resume: true, cv: true },
  { feature: "Professional Photo", resume: "Optional", cv: "Common (intl.)" },
  { feature: "Tailored Per Job", resume: "Highly recommended", cv: "Comprehensive" },
]

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">{value}</span>
  return value ? (
    <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
  ) : (
    <XCircle size={16} className="text-slate-400 dark:text-slate-600 mx-auto" />
  )
}

export default function ResumeVsCV() {
  const [highlight, setHighlight] = useState<DocType>("resume")

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-200 dark:border-slate-900/60" id="resume-vs-cv">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">
            Know the Difference
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Resume vs. CV: Which Do You Need?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Understanding the difference helps you apply with the right document every time.
          </p>
        </motion.div>

        {/* Toggle Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 gap-1">
            <button
              onClick={() => setHighlight("resume")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all",
                highlight === "resume"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <FileText size={14} /> Resume (Industry)
            </button>
            <button
              onClick={() => setHighlight("cv")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all",
                highlight === "cv"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <GraduationCap size={14} /> CV (Academic)
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm dark:shadow-none">
          <div className="grid grid-cols-3 p-4 md:p-6 border-b border-slate-200 dark:border-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <div>Feature</div>
            <div className={cn("text-center transition-colors", highlight === "resume" && "text-primary font-black")}>
              Resume
            </div>
            <div className={cn("text-center transition-colors", highlight === "cv" && "text-primary font-black")}>
              Academic CV
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {comparisonData.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 p-3.5 md:p-4 text-xs items-center hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
              >
                <div className="font-semibold text-slate-800 dark:text-slate-300 pr-2">{row.feature}</div>
                <div className={cn(
                  "text-center py-1 rounded-lg transition-colors",
                  highlight === "resume" && "bg-primary/5 font-semibold text-slate-900 dark:text-white"
                )}>
                  <CellValue value={row.resume} />
                </div>
                <div className={cn(
                  "text-center py-1 rounded-lg transition-colors",
                  highlight === "cv" && "bg-primary/5 font-semibold text-slate-900 dark:text-white"
                )}>
                  <CellValue value={row.cv} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
