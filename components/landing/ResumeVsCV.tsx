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
  if (typeof value === "string") return <span className="text-slate-300 text-xs font-medium">{value}</span>
  return value ? (
    <CheckCircle2 size={16} className="text-emerald-400 mx-auto" />
  ) : (
    <XCircle size={16} className="text-slate-600 mx-auto" />
  )
}

export default function ResumeVsCV() {
  const [highlight, setHighlight] = useState<DocType>("resume")

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-900/60" id="resume-vs-cv">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
            Know the Difference
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
            Resume vs. CV:{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400">
              Which Do You Need?
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Understanding the difference helps you apply with the right document every time.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => setHighlight("resume")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                highlight === "resume"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <FileText size={14} /> Resume
            </button>
            <button
              onClick={() => setHighlight("cv")}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                highlight === "cv"
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              <GraduationCap size={14} /> CV
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Feature
                  </th>
                  <th className={cn(
                    "text-center px-6 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors",
                    highlight === "resume" ? "text-emerald-400" : "text-slate-500"
                  )}>
                    Resume
                  </th>
                  <th className={cn(
                    "text-center px-6 py-4 text-[11px] font-bold uppercase tracking-widest transition-colors",
                    highlight === "cv" ? "text-indigo-400" : "text-slate-500"
                  )}>
                    CV
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={cn(
                    "border-b border-slate-800/30 last:border-b-0 transition-colors",
                    index % 2 === 0 ? "bg-slate-950/20" : ""
                  )}>
                    <td className="px-6 py-3.5 text-sm text-slate-300 font-medium">{row.feature}</td>
                    <td className={cn(
                      "px-6 py-3.5 text-center transition-colors",
                      highlight === "resume" ? "bg-emerald-500/[0.03]" : ""
                    )}>
                      <CellValue value={row.resume} />
                    </td>
                    <td className={cn(
                      "px-6 py-3.5 text-center transition-colors",
                      highlight === "cv" ? "bg-indigo-500/[0.03]" : ""
                    )}>
                      <CellValue value={row.cv} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
