"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, ArrowRight, Code, 
  ShieldCheck, Sparkles, UserCheck, RefreshCcw, Eye, FileCode2
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import LandingLayout from "@/components/landing/LandingLayout"
import HowItWorks from "@/components/landing/HowItWorks"
import StatsCounter from "@/components/landing/StatsCounter"
import TemplateShowcase from "@/components/landing/TemplateShowcase"
import StudentVsProfessional from "@/components/landing/StudentVsProfessional"
import ResumeVsCV from "@/components/landing/ResumeVsCV"
import Testimonials from "@/components/landing/Testimonials"
import FAQ from "@/components/landing/FAQ"
import CTABanner from "@/components/landing/CTABanner"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}

type MockTemplate = "nexus" | "scholar" | "arya"
type MockColor = "blue" | "rose" | "emerald" | "gold"

const mockColors: Record<MockColor, { hex: string; bg: string; text: string }> = {
  blue: { hex: "#3b82f6", bg: "bg-blue-500/10", text: "text-blue-400" },
  rose: { hex: "#e11d48", bg: "bg-rose-500/10", text: "text-rose-400" },
  emerald: { hex: "#10b981", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  gold: { hex: "#deb887", bg: "bg-amber-500/10", text: "text-amber-400" },
}

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Privacy-First Architecture",
    description: "We track nothing. No databases, no accounts, and no trackers. All resume files reside on your local storage.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Sparkles,
    title: "ATS-Friendly Layouts",
    description: "Carefully formatted layouts designed to parse cleanly on automated applicant tracking system readers.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: FileText,
    title: "Multi-Format Exports",
    description: "Download native, vector PDF files with selectable text or edit-ready DOCX formats to match hiring queries.",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Code,
    title: "Open Source & Free",
    description: "Free forever with zero paywalls. Backed by the open-source community for collaborative development.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Eye,
    title: "Real-Time Preview",
    description: "See your resume update live as you type. No waiting, no refreshing — instant visual feedback on every change.",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: FileCode2,
    title: "Resume & CV Support",
    description: "Create concise 1-2 page resumes for industry or comprehensive multi-page academic CVs with dedicated sections.",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
]

export default function Home() {
  const [mockTemplate, setMockTemplate] = useState<MockTemplate>("nexus")
  const [mockColor, setMockColor] = useState<MockColor>("blue")

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 py-12 md:py-24">
        
        {/* Hero Pitch */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-left space-y-8 max-w-2xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> Next-Generation Resume Suite
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-[1.08] lg:leading-[1.05]"
          >
            Craft Professional Stories with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-emerald-400">Precision.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium"
          >
            A zero-auth, zero-cost, and privacy-first resume and CV workspace. 
            All data stays securely in your browser&apos;s storage. Generate vector PDF 
            and DOCX files optimized to pass automated ATS filters.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/builder?type=resume"
              id="landing-btn-resume"
              className="group flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-bold text-sm tracking-wide rounded-2xl shadow-xl shadow-emerald-500/10 transition-all active:scale-[0.98]"
            >
              Build Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/builder?type=cv"
              id="landing-btn-cv"
              className="group flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-95 text-white font-bold text-sm tracking-wide rounded-2xl shadow-xl shadow-indigo-500/10 border border-indigo-500/20 transition-all active:scale-[0.98]"
            >
              Create Academic CV <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-8 items-center text-xs text-slate-500 font-bold uppercase tracking-wider pt-4 border-t border-slate-900">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> 100% Privacy</span>
            <span className="flex items-center gap-1.5"><UserCheck size={14} className="text-blue-400" /> No signup</span>
            <span className="flex items-center gap-1.5"><Code size={14} className="text-purple-400" /> Open Source</span>
          </motion.div>
        </motion.div>

        {/* Interactive Mock Preview Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full max-w-[500px] relative z-10"
        >
          {/* Accent glow under widget */}
          <div className={cn(
            "absolute inset-0 blur-[50px] rounded-3xl opacity-25 transition-colors duration-500",
            mockColors[mockColor].hex === "#3b82f6" && "bg-blue-500",
            mockColors[mockColor].hex === "#e11d48" && "bg-rose-500",
            mockColors[mockColor].hex === "#10b981" && "bg-emerald-500",
            mockColors[mockColor].hex === "#deb887" && "bg-amber-500"
          )} />

          <div className="relative bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            {/* Widget Header Controls */}
            <div className="flex flex-col gap-4 mb-6 pb-4 border-b border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Interactive Preview</span>
                <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md font-bold uppercase">Dynamic Mock</span>
              </div>
              
              <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Template Selector */}
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850">
                  {(["nexus", "scholar", "arya"] as MockTemplate[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMockTemplate(t)}
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-all",
                        mockTemplate === t ? "bg-slate-800 text-white shadow" : "text-slate-500 hover:text-slate-300"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Color Selector */}
                <div className="flex gap-2">
                  {(Object.keys(mockColors) as MockColor[]).map((col) => (
                    <button
                      key={col}
                      onClick={() => setMockColor(col)}
                      className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all active:scale-90",
                        mockColor === col ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                      style={{ backgroundColor: mockColors[col].hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Sheet container */}
            <div className="bg-white rounded-xl shadow-inner p-5 aspect-[1/1.2] text-slate-800 transition-all duration-300 flex flex-col justify-between select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mockTemplate}-${mockColor}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col justify-between"
                >
                  {mockTemplate === "nexus" && (
                    <div className="flex-1 flex flex-col font-sans">
                      <div className="text-center mb-3">
                        <div className="text-[12px] font-black tracking-tight uppercase" style={{ color: mockColors[mockColor].hex }}>
                          Eleanor Vance, Ph.D.
                        </div>
                        <div className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                          Quantum Computing Researcher & Physicist
                        </div>
                        <div className="text-[6.5px] text-slate-400 mt-1 flex justify-center gap-1.5 font-medium">
                          <span>eleanor@research.edu</span>
                          <span>•</span>
                          <span>boston, ma</span>
                          <span>•</span>
                          <span>linkedin.com/in/evance</span>
                        </div>
                      </div>
                      
                      <div className="mb-2 text-[6.5px] text-slate-500 text-center italic leading-relaxed">
                        Physicist specializing in superconducting qubit systems and quantum algorithm design.
                      </div>

                      <div className="grid grid-cols-3 gap-3.5 flex-1">
                        <div className="col-span-2 space-y-2.5">
                          <div>
                            <div className="text-[7.5px] font-bold uppercase tracking-wider pb-0.5 border-b" style={{ borderColor: mockColors[mockColor].hex }}>
                              Professional Experience
                            </div>
                            <div className="mt-1.5 space-y-2">
                              <div>
                                <div className="text-[7px] font-bold text-slate-900 flex justify-between">
                                  <span>Senior Quantum Scientist</span>
                                  <span className="text-[6px] text-slate-400 font-semibold">2022 – PRES</span>
                                </div>
                                <div className="text-[6.5px] font-bold mt-0.5 flex justify-between" style={{ color: mockColors[mockColor].hex }}>
                                  <span>QuantumLabs Inc.</span>
                                  <span className="text-[6px] text-slate-400 font-normal">Boston, MA</span>
                                </div>
                                <div className="text-[6.5px] text-slate-500 leading-normal mt-0.5 space-y-0.5">
                                  <div>• Led development of superconducting qubits layout optimizer.</div>
                                  <div>• Improved error-mitigation algorithm efficiency by 34%.</div>
                                </div>
                              </div>

                              <div>
                                <div className="text-[7px] font-bold text-slate-900 flex justify-between">
                                  <span>Quantum Research Fellow</span>
                                  <span className="text-[6px] text-slate-400 font-semibold">2020 – 2022</span>
                                </div>
                                <div className="text-[6.5px] font-bold mt-0.5 flex justify-between" style={{ color: mockColors[mockColor].hex }}>
                                  <span>MIT Quantum Research Group</span>
                                  <span className="text-[6px] text-slate-400 font-normal">Cambridge, MA</span>
                                </div>
                                <div className="text-[6.5px] text-slate-500 leading-normal mt-0.5 space-y-0.5">
                                  <div>• Simulated chemical structures using hybrid quantum algorithms.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <div>
                            <div className="text-[7.5px] font-bold uppercase tracking-wider pb-0.5 border-b" style={{ borderColor: mockColors[mockColor].hex }}>
                              Education
                            </div>
                            <div className="mt-1.5 space-y-1.5">
                              <div>
                                <div className="text-[7px] font-bold text-slate-900">MIT</div>
                                <div className="text-[6px] text-slate-500 leading-tight">Ph.D. in Quantum Physics</div>
                                <div className="text-[5.5px] text-slate-400 font-bold uppercase mt-0.5">2018 – 2022</div>
                              </div>
                              <div>
                                <div className="text-[7px] font-bold text-slate-900">Caltech</div>
                                <div className="text-[6px] text-slate-500 leading-tight">B.S. in Applied Physics</div>
                                <div className="text-[5.5px] text-slate-400 font-bold uppercase mt-0.5">2014 – 2018</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-[7.5px] font-bold uppercase tracking-wider pb-0.5 border-b" style={{ borderColor: mockColors[mockColor].hex }}>
                              Core Skills
                            </div>
                            <div className="flex flex-wrap gap-0.5 mt-1.5">
                              {["Qiskit", "LaTeX", "Python", "Rust", "CUDA", "C++", "Quantum ML"].map((s) => (
                                <span key={s} className="text-[5.5px] px-1 py-0.2 bg-slate-100 rounded text-slate-600 font-bold">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockTemplate === "scholar" && (
                    <div className="flex-1 flex flex-col" style={{ fontFamily: "Georgia, serif" }}>
                      <div className="text-center mb-3 pb-1.5 border-b-2 border-slate-800">
                        <div className="text-sm font-bold text-slate-900">Eleanor Vance, Ph.D.</div>
                        <div className="text-[7.5px] italic text-slate-500 mt-0.5" style={{ color: mockColors[mockColor].hex }}>
                          Postdoctoral Researcher in Quantum Information Theory
                        </div>
                        <div className="text-[6.5px] text-slate-400 mt-1 flex justify-center gap-2">
                          <span>eleanor@research.edu</span>
                          <span>·</span>
                          <span>Boston, MA</span>
                          <span>·</span>
                          <span>orcid.org/0000-0002-1825-0097</span>
                        </div>
                      </div>

                      <div className="space-y-2.5 flex-1 justify-start">
                        <div>
                          <div className="text-[7.5px] font-bold uppercase tracking-[0.2em] text-slate-800 mb-1 border-b border-slate-200 pb-0.5">
                            Academic Positions
                          </div>
                          <div className="space-y-1.5">
                            <div>
                              <div className="text-[7px] text-slate-950 flex justify-between font-bold">
                                <span>Senior Scientist — QuantumLabs Inc.</span>
                                <span className="text-[6px]">2022 – Pres</span>
                              </div>
                              <div className="text-[6.5px] text-slate-600 leading-normal mt-0.5">
                                Research lead on superconducting qubit gate characterization. Optimized readout architectures for 50+ qubit chip designs.
                              </div>
                            </div>
                            <div>
                              <div className="text-[7px] text-slate-950 flex justify-between font-bold">
                                <span>Research Assistant — MIT Physics Department</span>
                                <span className="text-[6px]">2018 – 2022</span>
                              </div>
                              <div className="text-[6.5px] text-slate-600 leading-normal mt-0.5">
                                Designed and simulated noisy intermediate-scale quantum (NISQ) algorithms.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[7.5px] font-bold uppercase tracking-[0.2em] text-slate-800 mb-1 border-b border-slate-200 pb-0.5">
                            Education
                          </div>
                          <div className="text-[7.5px] text-slate-950 flex justify-between font-bold">
                            <span>Ph.D. in Physics — Massachusetts Institute of Technology</span>
                            <span>2018 – 2022</span>
                          </div>
                          <div className="text-[6.5px] text-slate-500 italic mt-0.5">
                            Dissertation: Benchmarking multi-state quantum simulation on superconducting devices.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockTemplate === "arya" && (
                    <div className="flex-1 flex font-sans overflow-hidden rounded-lg border border-slate-100">
                      <div className="w-[32%] p-2.5 text-white flex flex-col justify-between" style={{ backgroundColor: mockColors[mockColor].hex }}>
                        <div>
                          <div className="text-[9px] font-black uppercase leading-tight">Eleanor Vance</div>
                          <div className="text-[5.5px] opacity-80 mt-0.5 uppercase tracking-wider font-semibold">Quantum Scientist</div>
                          
                          <div className="mt-4 space-y-1.5">
                            <div>
                              <div className="text-[5px] font-bold uppercase tracking-wider opacity-60">Contact</div>
                              <div className="text-[5px] break-all leading-normal">eleanor@mit.edu<br />Boston, MA</div>
                            </div>
                            <div>
                              <div className="text-[5px] font-bold uppercase tracking-wider opacity-60">Competencies</div>
                              <div className="text-[5px] leading-normal">Qiskit, Pennylane<br />Python, C++, CUDA<br />Quantum Optics</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-[4.5px] opacity-40 uppercase tracking-widest font-bold">
                          ResumeForge
                        </div>
                      </div>

                      <div className="w-[68%] p-2.5 bg-white flex flex-col justify-start space-y-2.5">
                        <div>
                          <div className="text-[7px] font-bold uppercase tracking-wider pb-0.5 border-b text-slate-450" style={{ color: mockColors[mockColor].hex }}>
                            Professional Experience
                          </div>
                          <div className="mt-1.5 space-y-1.5">
                            <div>
                              <div className="text-[6.5px] font-bold text-slate-800 flex justify-between">
                                <span>Senior Scientist</span>
                                <span className="text-[5.5px] text-slate-400">2022 – PRES</span>
                              </div>
                              <div className="text-[5.5px] text-slate-400 font-bold uppercase">QuantumLabs</div>
                              <div className="text-[5.5px] text-slate-500 mt-0.5 leading-normal">
                                Supervised qubit layout optimization algorithm teams. Achieved a 34% reduction in gate errors.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[7px] font-bold uppercase tracking-wider pb-0.5 border-b text-slate-450" style={{ color: mockColors[mockColor].hex }}>
                            Education History
                          </div>
                          <div className="mt-1.5 space-y-1">
                            <div>
                              <div className="text-[6.5px] font-bold text-slate-850 flex justify-between">
                                <span>Ph.D. in Physics</span>
                                <span className="text-[5.5px] text-slate-400">2018 – 2022</span>
                              </div>
                              <div className="text-[5.5px] text-slate-500 leading-tight">Massachusetts Institute of Technology</div>
                            </div>
                            <div>
                              <div className="text-[6.5px] font-bold text-slate-850 flex justify-between">
                                <span>B.S. in Applied Physics</span>
                                <span className="text-[5.5px] text-slate-400">2014 – 2018</span>
                              </div>
                              <div className="text-[5.5px] text-slate-500 leading-tight">California Institute of Technology</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom tag bar */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[7px] text-slate-400 font-bold uppercase tracking-wider">
                <span>ResumeForge Output</span>
                <span className="flex items-center gap-1"><Sparkles size={8} style={{ color: mockColors[mockColor].hex }} /> Print-ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* How It Works */}
      <HowItWorks />

      {/* Feature Grid Section (Expanded to 6 cards) */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-28 border-t border-slate-900/60">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={11} /> Core Features
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight mt-4">
              Designed for the Security Conscious{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Professional</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
              ResumeForge combines complete client-side security with production-grade template performance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-8 rounded-3xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition-all hover:bg-slate-900/40"
            >
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} mb-6`}>
                <card.icon size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Template Showcase */}
      <TemplateShowcase />

      {/* Student vs Professional */}
      <StudentVsProfessional />

      {/* Resume vs CV Comparison */}
      <ResumeVsCV />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Banner */}
      <CTABanner />
    </LandingLayout>
  )
}
