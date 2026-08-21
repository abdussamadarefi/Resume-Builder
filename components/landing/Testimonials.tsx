"use client"

import React from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import defaultTestimonials from "@/content/testimonials.json"

export default function Testimonials() {
  const testimonials = defaultTestimonials.filter((t: any) => t.enabled);

  const getAccentColor = (tag: string) => {
    switch (tag) {
      case "Student": return "#3b82f6";
      case "Academic": return "#8b5cf6";
      case "Professional": return "#10b981";
      case "Career Changer": return "#e11d48";
      default: return "#3b82f6";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-200 dark:border-slate-900/60" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            User Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Loved by Job Seekers &amp; Academics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            From first-year students to senior engineers and PhD researchers — here&apos;s how ResumeForge helped them land opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: any, index: number) => {
            const accentColor = getAccentColor(t.tag);
            const initials = getInitials(t.author_name);

            return (
              <motion.div
                key={t.id || t.author_name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 p-8 transition-all duration-300 flex flex-col justify-between hover:bg-white dark:hover:bg-slate-900/60 shadow-sm dark:shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote size={24} className="text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors" />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: accentColor + "15", color: accentColor }}
                    >
                      {t.tag}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-6 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {t.author_name}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {t.role} • {t.company_or_school}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
