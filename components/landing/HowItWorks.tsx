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
    glow: "bg-indigo-500",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Fill Your Details",
    description: "Use our intuitive form builder to add experience, education, skills, and more. Real-time preview updates as you type.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-500",
  },
  {
    icon: Download,
    step: "03",
    title: "Export & Apply",
    description: "Download pixel-perfect PDFs with selectable text or edit-ready DOCX files. Optimized to pass automated ATS filters.",
    gradient: "from-purple-500 to-pink-600",
    glow: "bg-purple-500",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
          Simple Process
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
          Three Steps to Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">Dream Resume</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          No signup, no learning curve. Just pick, fill, and download — all in your browser.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative group"
          >
            {/* Connecting line (hidden on mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-slate-800 to-transparent z-0" />
            )}

            <div className="relative p-8 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all hover:bg-slate-900/50">
              {/* Glow */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 ${step.glow} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full`} />

              {/* Step Number */}
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">
                Step {step.step}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <step.icon size={24} />
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
