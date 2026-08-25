"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, GraduationCap, Briefcase, BookOpen, Award, Target, TrendingUp, FileCheck, Rocket } from "lucide-react"

const studentFeatures = [
  { icon: GraduationCap, label: "First Resume Templates", description: "Templates designed for limited experience — highlight projects, coursework, and extracurriculars." },
  { icon: BookOpen, label: "Academic CV Support", description: "Formats for publications, research, and academic positions with proper citation structure." },
  { icon: Award, label: "Internship-Optimized", description: "ATS-friendly layouts that hiring managers at top companies actually prefer for entry-level roles." },
  { icon: Rocket, label: "Zero Cost Barrier", description: "No subscriptions or paywalls. Focus on your future, not your wallet." },
]

const professionalFeatures = [
  { icon: Briefcase, label: "Executive Templates", description: "Sophisticated layouts for senior professionals with multi-role career histories." },
  { icon: Target, label: "ATS Optimization", description: "Templates engineered to pass automated screening systems used by 98% of Fortune 500 companies." },
  { icon: TrendingUp, label: "Career Pivot Ready", description: "Highlight transferable skills and showcase your story when changing industries." },
  { icon: FileCheck, label: "Multi-Format Export", description: "Vector PDF and DOCX exports for recruiter portals, email attachments, and print." },
]

export default function StudentVsProfessional() {
  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-200 dark:border-slate-900/60" id="audience">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">
            Built for Everyone
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Whether You&apos;re Starting Out or Leveling Up
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            ResumeForge adapts to your career stage with tailored templates and features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl" />
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 hover:border-emerald-500/30 transition-all h-full shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Students &amp; Graduates</h3>
                  <p className="text-slate-500 text-xs">Launch your career with confidence</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {studentFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.label} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.label}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/builder?type=resume"
                id="audience-student-btn"
                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider group/link hover:underline"
              >
                Start Student Resume <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Professional Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl" />
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 hover:border-indigo-500/30 transition-all h-full shadow-sm dark:shadow-none">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Experienced Professionals</h3>
                  <p className="text-slate-500 text-xs">Stand out in competitive markets</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {professionalFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.label} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.label}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/builder?type=resume"
                id="audience-pro-btn"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider group/link hover:underline"
              >
                Start Pro Resume <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
