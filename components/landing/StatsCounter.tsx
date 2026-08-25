"use client"

import React from "react"
import { motion } from "framer-motion"
import { Palette, Download, ShieldCheck, DollarSign } from "lucide-react"
import landingData from "@/content/landing.json"

const iconMap: Record<string, { icon: React.ComponentType<any>; color: string; bg: string }> = {
  templates: { icon: Palette, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
  formats: { icon: Download, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  privacy: { icon: ShieldCheck, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
  cost: { icon: DollarSign, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
}

export default function StatsCounter() {
  const statsList = landingData.stats || [
    { id: "templates", value: "10+", label: "ATS-Ready Templates", sublabel: "Industry & Academic" },
    { id: "cost", value: "$0", label: "Free Forever", sublabel: "No paywalls ever" },
    { id: "privacy", value: "100%", label: "Private by Design", sublabel: "Zero data collection" },
    { id: "formats", value: "3", label: "Export Formats", sublabel: "PDF, DOCX, Print" },
  ]

  return (
    <section className="relative z-10 w-full py-12 md:py-16 border-t border-b border-slate-200 dark:border-slate-900/60 bg-white/60 dark:bg-slate-950/30 transition-colors duration-200" id="stats">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsList.map((stat: any, index: number) => {
            const meta = iconMap[stat.id] || { icon: Palette, color: "text-blue-500", bg: "bg-blue-500/10" }
            const Icon = meta.icon

            return (
              <motion.div
                key={stat.id || stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${meta.bg} border border-slate-200 dark:border-slate-800 mb-3 ${meta.color}`}>
                  <Icon size={18} />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight tabular-nums text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {stat.sublabel}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
