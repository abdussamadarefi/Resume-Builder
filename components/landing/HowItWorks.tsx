"use client"

import React from "react"
import { motion } from "framer-motion"
import { MousePointerClick, PenLine, Download } from "lucide-react"

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Pick a Template",
    description: "Choose from 10 professionally designed templates crafted for resumes and academic CVs. Each template is ATS-tested and print-ready.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Fill Your Details",
    description: "Use our intuitive form builder to add experience, education, skills, and more. Real-time preview updates as you type.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Download,
    step: "03",
    title: "Export & Apply",
    description: "Download pixel-perfect PDFs with selectable text or edit-ready DOCX files. Optimized to pass automated ATS filters.",
    gradient: "from-indigo-500 to-blue-600",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32" id="how-it-works">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-4"
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-widest">
          How It Works
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
          Three Steps to Your Professional Resume
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          From a blank canvas to an ATS-ready, recruiter-approved document in minutes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 p-8 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900/60 shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>Step {item.step} of 03</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
