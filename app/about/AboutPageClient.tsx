"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Code, Sparkles, Palette, FileText, Zap, Globe, Users } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const GithubIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "We believe your career data is deeply personal. That's why we built a tool that never sees your data — it all stays on your device.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "No premium tiers. No paywalls. No \"upgrade to unlock\" prompts. Professional resume tools should be accessible to everyone.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Every line of code is public. Audit it, fork it, contribute to it. Transparency builds trust.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Sparkles,
    title: "Quality Output",
    description: "ATS-optimized templates with vector PDF export. Your resume should look as professional as you are.",
    gradient: "from-purple-500 to-violet-600",
  },
]

const techStack = [
  { name: "Next.js 14", description: "App Router, Server Components", color: "text-white" },
  { name: "React 18", description: "Hooks, Concurrent Features", color: "text-blue-400" },
  { name: "TypeScript", description: "Full type safety", color: "text-blue-300" },
  { name: "Tailwind CSS", description: "Utility-first styling", color: "text-cyan-400" },
  { name: "Zustand", description: "Lightweight state management", color: "text-amber-400" },
  { name: "Framer Motion", description: "Smooth animations", color: "text-pink-400" },
  { name: "@react-pdf/renderer", description: "Vector PDF generation", color: "text-red-400" },
  { name: "React Hook Form + Zod", description: "Form handling & validation", color: "text-emerald-400" },
]

export default function AboutPageClient() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
            <Globe size={11} /> Our Story
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            Building the Resume Tool
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-emerald-400">
              We Wished Existed
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ResumeForge started from a simple frustration: every resume builder either costs too much, 
            collects too much data, or produces mediocre output. We built the alternative.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-12 rounded-3xl bg-slate-900/30 border border-slate-800/60 overflow-hidden"
        >
          <div className="absolute top-[-30%] right-[-20%] w-[50%] h-[100%] bg-indigo-500/5 blur-[80px] rounded-full" />
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-white mb-6">Our Mission</h2>
            <div className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed">
              <p>
                We believe that creating a professional resume shouldn&apos;t require a subscription, 
                shouldn&apos;t require handing over your personal data, and shouldn&apos;t require a design degree.
              </p>
              <p>
                ResumeForge is a <strong className="text-white">fully client-side application</strong>. 
                There is no backend, no database, and no server that ever touches your information. 
                Your resume data lives exclusively in your browser&apos;s localStorage — and when you 
                close the tab or clear your storage, it&apos;s gone. We never had a copy.
              </p>
              <p>
                Whether you&apos;re a <strong className="text-white">student writing your first resume</strong>, 
                an <strong className="text-white">academic building a comprehensive CV</strong>, or a 
                <strong className="text-white"> professional making a career change</strong> — ResumeForge 
                provides the templates and tools to tell your story beautifully.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-5 shadow-lg`}>
                <value.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24 border-t border-slate-900/60 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
            <Zap size={11} /> Technology
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
            Built with Modern Tools
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            ResumeForge is built on a cutting-edge stack chosen for performance, developer experience, and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800/60 text-center hover:border-slate-700/60 transition-all"
            >
              <div className={`text-sm font-bold ${tech.color} mb-1`}>{tech.name}</div>
              <div className="text-[11px] text-slate-500">{tech.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24 border-t border-slate-900/60 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-12 rounded-3xl bg-slate-900/30 border border-slate-800/60 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/20">
            AA
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">Abdus Samad Arefi</h2>
          <p className="text-slate-500 text-sm mb-6">Creator & Maintainer</p>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
            A developer passionate about building tools that respect user privacy while delivering 
            professional-grade quality. ResumeForge is a labor of love — built to prove that the 
            best tools don&apos;t need to cost money or compromise on privacy.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/abdussamadarefi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white hover:bg-slate-700 transition-all"
            >
              <GithubIcon size={16} /> GitHub Profile
            </a>
            <a
              href="mailto:abdussamadarefi@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contribute CTA */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/60"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-emerald-600/10" />
          <div className="relative p-8 md:p-12 text-center">
            <Users size={36} className="text-indigo-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight mb-4">
              Want to Contribute?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              ResumeForge is open source. Whether you want to add a new template, fix a bug, 
              improve documentation, or suggest a feature — we welcome your contribution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/abdussamadarefi/Resume-Builder"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              >
                <GithubIcon size={16} /> View on GitHub <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/builder?type=resume"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-white font-bold text-sm rounded-xl hover:border-slate-700 transition-all"
              >
                Try the Builder <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </LandingLayout>
  )
}
