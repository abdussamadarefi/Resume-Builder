"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import LandingLayout from "@/components/landing/LandingLayout"

type FilterType = "all" | "resume" | "cv" | "both"

const templates = [
  {
    name: "Nexus",
    tag: "Modern",
    description: "Clean, centered header with a 3-column grid layout. Perfect for tech professionals who want a polished, modern look with clear section hierarchy.",
    bestFor: "Professionals",
    type: "both" as const,
    accent: "#3b82f6",
    features: ["ATS-Optimized", "Grid Layout", "Skill Tags"],
    headerStyle: "centered" as const,
  },
  {
    name: "Scholar",
    tag: "Academic",
    description: "Traditional serif typography with formal academic formatting. Ideal for CVs with publications, research experience, and teaching positions.",
    bestFor: "Academics",
    type: "cv" as const,
    accent: "#8b5cf6",
    features: ["Serif Typography", "Publication Format", "Academic Sections"],
    headerStyle: "classic" as const,
  },
  {
    name: "Arya",
    tag: "Creative",
    description: "Bold sidebar design with a colored accent panel. Great for creatives who want to stand out while maintaining readability.",
    bestFor: "Creatives",
    type: "resume" as const,
    accent: "#e11d48",
    features: ["Sidebar Layout", "Color Accent", "Photo Support"],
    headerStyle: "sidebar" as const,
  },
  {
    name: "Atlas",
    tag: "Professional",
    description: "Balanced two-column layout with clear section hierarchy. A versatile template suitable for most industries and experience levels.",
    bestFor: "Professionals",
    type: "both" as const,
    accent: "#10b981",
    features: ["Two-Column", "Versatile", "Clean Headers"],
    headerStyle: "centered" as const,
  },
  {
    name: "Cascade",
    tag: "Elegant",
    description: "Flowing layout with cascading sections and refined typography. Conveys sophistication and attention to detail.",
    bestFor: "Professionals",
    type: "resume" as const,
    accent: "#f59e0b",
    features: ["Flowing Layout", "Refined Type", "Section Dividers"],
    headerStyle: "classic" as const,
  },
  {
    name: "Compact",
    tag: "Minimal",
    description: "Dense, information-rich layout that maximizes content per page. Perfect for students and recent graduates with limited experience.",
    bestFor: "Students",
    type: "resume" as const,
    accent: "#06b6d4",
    features: ["Space Efficient", "Dense Layout", "1-Page Friendly"],
    headerStyle: "centered" as const,
  },
  {
    name: "Executive",
    tag: "Premium",
    description: "Sophisticated design for senior professionals and executives. Commands attention with premium typography and strategic whitespace.",
    bestFor: "Executives",
    type: "resume" as const,
    accent: "#1e40af",
    features: ["Executive Style", "Premium Feel", "Strategic Spacing"],
    headerStyle: "classic" as const,
  },
  {
    name: "Meridian",
    tag: "Modern",
    description: "Contemporary split layout with visual skill indicators. A modern approach that balances aesthetics with ATS compatibility.",
    bestFor: "Professionals",
    type: "both" as const,
    accent: "#7c3aed",
    features: ["Split Layout", "Skill Bars", "Modern Design"],
    headerStyle: "sidebar" as const,
  },
  {
    name: "Minimo",
    tag: "Clean",
    description: "Ultra-minimal design that lets your content speak for itself. No distractions — just clean, professional formatting.",
    bestFor: "Students",
    type: "resume" as const,
    accent: "#64748b",
    features: ["Ultra-Minimal", "Content-First", "Maximum Readability"],
    headerStyle: "centered" as const,
  },
  {
    name: "Prism",
    tag: "Bold",
    description: "Eye-catching header with geometric accents and bold typography. Makes a strong first impression while maintaining structure.",
    bestFor: "Creatives",
    type: "resume" as const,
    accent: "#ec4899",
    features: ["Bold Header", "Geometric Accents", "Strong Impact"],
    headerStyle: "centered" as const,
  },
]

const filterOptions: { label: string; value: FilterType }[] = [
  { label: "All Templates", value: "all" },
  { label: "Resume", value: "resume" },
  { label: "CV", value: "cv" },
  { label: "Both", value: "both" },
]

function MiniPreview({ template }: { template: typeof templates[0] }) {
  return (
    <div className="w-full aspect-[1/1.35] bg-white rounded-xl p-4 text-slate-800 flex flex-col select-none overflow-hidden shadow-inner">
      {template.headerStyle === "sidebar" ? (
        <div className="flex flex-1 gap-2.5 overflow-hidden">
          <div className="w-[30%] rounded-lg p-2 text-white flex flex-col gap-2.5" style={{ backgroundColor: template.accent }}>
            <div className="w-8 h-8 rounded-full bg-white/30 mx-auto" />
            <div className="h-1.5 w-12 bg-white/40 rounded mx-auto" />
            <div className="h-1 w-10 bg-white/20 rounded mx-auto" />
            <div className="mt-3 space-y-1.5">
              <div className="h-1 w-full bg-white/20 rounded" />
              <div className="h-1 w-3/4 bg-white/20 rounded" />
              <div className="h-1 w-full bg-white/20 rounded" />
            </div>
          </div>
          <div className="flex-1 space-y-3 p-1">
            <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: template.accent + "40" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200 rounded" />
              <div className="h-1 w-5/6 bg-slate-200 rounded" />
              <div className="h-1 w-4/5 bg-slate-200 rounded" />
            </div>
            <div className="h-1 w-1/2 rounded mt-3" style={{ backgroundColor: template.accent + "40" }} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-100 rounded" />
              <div className="h-1 w-3/4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ) : template.headerStyle === "classic" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="text-center pb-3 mb-3 border-b-2" style={{ borderColor: template.accent }}>
            <div className="h-2 w-24 bg-slate-800 rounded mx-auto" />
            <div className="h-1 w-20 rounded mx-auto mt-1.5" style={{ backgroundColor: template.accent + "80" }} />
            <div className="h-1 w-28 bg-slate-300 rounded mx-auto mt-1" />
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <div className="h-1 w-20 bg-slate-400 rounded mb-1.5" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-slate-200 rounded" />
                <div className="h-1 w-5/6 bg-slate-200 rounded" />
                <div className="h-1 w-4/5 bg-slate-200 rounded" />
              </div>
            </div>
            <div>
              <div className="h-1 w-16 bg-slate-400 rounded mb-1.5" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-3/4 bg-slate-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="text-center pb-3 mb-3">
            <div className="h-2 w-24 rounded mx-auto" style={{ backgroundColor: template.accent }} />
            <div className="h-1 w-28 bg-slate-400 rounded mx-auto mt-1.5" />
            <div className="h-1 w-32 bg-slate-300 rounded mx-auto mt-1" />
          </div>
          <div className="grid grid-cols-3 gap-3 flex-1">
            <div className="col-span-2 space-y-3">
              <div>
                <div className="h-1 w-20 rounded mb-1.5" style={{ backgroundColor: template.accent + "60" }} />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-slate-200 rounded" />
                  <div className="h-1 w-5/6 bg-slate-200 rounded" />
                  <div className="h-1 w-4/5 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-1 w-12 rounded mb-1.5" style={{ backgroundColor: template.accent + "60" }} />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-slate-100 rounded" />
                  <div className="h-1 w-2/3 bg-slate-100 rounded" />
                </div>
              </div>
              <div>
                <div className="h-1 w-10 rounded mb-1.5" style={{ backgroundColor: template.accent + "60" }} />
                <div className="flex flex-wrap gap-0.5">
                  <div className="h-1.5 w-6 bg-slate-100 rounded-sm" />
                  <div className="h-1.5 w-5 bg-slate-100 rounded-sm" />
                  <div className="h-1.5 w-7 bg-slate-100 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TemplatesPageClient() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filteredTemplates = templates.filter((t) => {
    if (filter === "all") return true
    return t.type === filter
  })

  return (
    <LandingLayout>
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> Template Gallery
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Choose Your Perfect Template
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            10 professionally designed templates for resumes and academic CVs. 
            All templates are ATS-friendly, print-ready, and completely free.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800">
            <Filter size={14} className="text-slate-500 ml-3 mr-1" />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                  filter === option.value
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
              className="group"
            >
              <div className="relative p-5 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all hover:bg-slate-900/50">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ backgroundColor: template.accent }}
                />

                {/* Preview */}
                <div className="relative mb-5 group-hover:scale-[1.02] transform transition-transform">
                  <MiniPreview template={template} />
                </div>

                {/* Info */}
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{template.name}</h3>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                      style={{
                        backgroundColor: template.accent + "15",
                        color: template.accent,
                      }}
                    >
                      {template.tag}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">{template.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-slate-800/60 text-slate-500"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Best for {template.bestFor}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                        {template.type === "both" ? "Resume & CV" : template.type === "cv" ? "CV" : "Resume"}
                      </span>
                    </div>
                    <Link
                      href={`/builder?template=${template.name.toLowerCase()}`}
                      className="group/btn inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-white"
                      style={{ color: template.accent }}
                    >
                      Use Template <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LandingLayout>
  )
}
