"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Code, Sparkles, User, Mail } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"
import aboutData from "@/content/about.json"

const GithubIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield,
  Heart,
  Code,
  Sparkles,
}

const techStack = [
  { name: "Next.js 14", description: "App Router, Server Components", color: "text-slate-900 dark:text-white" },
  { name: "React 18", description: "Hooks, Concurrent Features", color: "text-blue-600 dark:text-blue-400" },
  { name: "TypeScript", description: "Full type safety", color: "text-blue-500 dark:text-blue-300" },
  { name: "Tailwind CSS", description: "Utility-first styling", color: "text-cyan-600 dark:text-cyan-400" },
  { name: "Zustand", description: "Lightweight state management", color: "text-amber-600 dark:text-amber-400" },
  { name: "Framer Motion", description: "Smooth animations", color: "text-pink-600 dark:text-pink-400" },
  { name: "@react-pdf/renderer", description: "Vector PDF generation", color: "text-rose-600 dark:text-rose-400" },
  { name: "React Hook Form + Zod", description: "Form handling & validation", color: "text-emerald-600 dark:text-emerald-400" },
]

export default function AboutPageClient() {
  const { hero, mission, values, creator, cta_banner } = aboutData

  return (
    <LandingLayout>
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> {hero.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            {hero.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {hero.subtitle}
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 mb-16 space-y-6 shadow-sm dark:shadow-none"
        >
          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            {mission.title}
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed font-normal">
            {mission.paragraphs.map((p: string, idx: number) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-2"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
              Our Core Principles
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              The four pillars that guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val: any, index: number) => {
              const Icon = iconMap[val.icon_name] || Sparkles
              return (
                <motion.div
                  key={val.id || val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-4 shadow-sm dark:shadow-none"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.gradient || "from-blue-500 to-indigo-600"} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{val.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
              Built with Modern Tech
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              The open-source stack that powers ResumeForge.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 text-center space-y-1 shadow-sm dark:shadow-none"
              >
                <div className={`font-bold text-sm ${tech.color}`}>{tech.name}</div>
                <div className="text-[11px] text-slate-500">{tech.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 mb-20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left shadow-sm dark:shadow-none"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-primary/20 flex-shrink-0">
            {creator.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{creator.name}</h3>
              <div className="text-sm text-primary font-semibold mt-0.5">{creator.title}</div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-xl font-normal">
              {creator.bio}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href={creator.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                <GithubIcon size={14} /> GitHub Profile
              </a>
              <a
                href={`mailto:${creator.email}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
              >
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-6 shadow-sm dark:shadow-none"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            {cta_banner.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
            {cta_banner.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Start Building Now <ArrowRight size={16} />
            </Link>
            <a
              href={cta_banner.button_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700/60 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <GithubIcon size={16} /> {cta_banner.button_text}
            </a>
          </div>
        </motion.div>
      </section>
    </LandingLayout>
  )
}
