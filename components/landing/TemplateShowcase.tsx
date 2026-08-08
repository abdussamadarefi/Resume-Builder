"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    name: "Nexus",
    tag: "Modern",
    description: "Clean, centered header with grid layout. Perfect for tech professionals.",
    bestFor: "Professionals",
    accent: "#3b82f6",
    headerStyle: "centered" as const,
  },
  {
    name: "Scholar",
    tag: "Academic",
    description: "Serif typography with traditional academic formatting for CVs.",
    bestFor: "Academics",
    accent: "#8b5cf6",
    headerStyle: "classic" as const,
  },
  {
    name: "Arya",
    tag: "Creative",
    description: "Bold sidebar design with a splash of color for creative roles.",
    bestFor: "Creatives",
    accent: "#e11d48",
    headerStyle: "sidebar" as const,
  },
  {
    name: "Atlas",
    tag: "Professional",
    description: "Balanced two-column layout with clear section hierarchy.",
    bestFor: "Professionals",
    accent: "#10b981",
    headerStyle: "centered" as const,
  },
  {
    name: "Cascade",
    tag: "Elegant",
    description: "Flowing layout with cascading sections and refined typography.",
    bestFor: "Professionals",
    accent: "#f59e0b",
    headerStyle: "classic" as const,
  },
  {
    name: "Compact",
    tag: "Minimal",
    description: "Dense, information-rich layout that maximizes content per page.",
    bestFor: "Students",
    accent: "#06b6d4",
    headerStyle: "centered" as const,
  },
  {
    name: "Executive",
    tag: "Premium",
    description: "Sophisticated design for senior professionals and executives.",
    bestFor: "Executives",
    accent: "#1e40af",
    headerStyle: "classic" as const,
  },
  {
    name: "Meridian",
    tag: "Modern",
    description: "Contemporary split layout with visual skill indicators.",
    bestFor: "Professionals",
    accent: "#7c3aed",
    headerStyle: "sidebar" as const,
  },
  {
    name: "Minimo",
    tag: "Clean",
    description: "Ultra-minimal design that lets your content speak for itself.",
    bestFor: "Students",
    accent: "#64748b",
    headerStyle: "centered" as const,
  },
  {
    name: "Prism",
    tag: "Bold",
    description: "Eye-catching header with geometric accents and bold typography.",
    bestFor: "Creatives",
    accent: "#ec4899",
    headerStyle: "centered" as const,
  },
]

function MiniPreview({ template }: { template: typeof templates[0] }) {
  return (
    <div className="w-full aspect-[1/1.35] bg-white rounded-lg p-3 text-slate-800 flex flex-col select-none overflow-hidden">
      {template.headerStyle === "sidebar" ? (
        <div className="flex flex-1 gap-2 overflow-hidden">
          <div className="w-[30%] rounded-md p-1.5 text-white flex flex-col gap-2" style={{ backgroundColor: template.accent }}>
            <div className="w-6 h-6 rounded-full bg-white/30 mx-auto" />
            <div className="h-1 w-10 bg-white/40 rounded mx-auto" />
            <div className="h-0.5 w-8 bg-white/20 rounded mx-auto" />
            <div className="mt-2 space-y-1">
              <div className="h-0.5 w-full bg-white/20 rounded" />
              <div className="h-0.5 w-3/4 bg-white/20 rounded" />
              <div className="h-0.5 w-full bg-white/20 rounded" />
            </div>
            <div className="mt-auto">
              <div className="h-0.5 w-full bg-white/15 rounded" />
              <div className="h-0.5 w-2/3 bg-white/15 rounded mt-0.5" />
            </div>
          </div>
          <div className="flex-1 space-y-2 p-1">
            <div className="h-1 w-3/4 rounded" style={{ backgroundColor: template.accent + "40" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-200 rounded" />
              <div className="h-0.5 w-5/6 bg-slate-200 rounded" />
              <div className="h-0.5 w-4/5 bg-slate-200 rounded" />
            </div>
            <div className="h-0.5 w-1/2 rounded mt-2" style={{ backgroundColor: template.accent + "40" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-100 rounded" />
              <div className="h-0.5 w-3/4 bg-slate-100 rounded" />
            </div>
            <div className="h-0.5 w-1/2 rounded mt-2" style={{ backgroundColor: template.accent + "40" }} />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-100 rounded" />
              <div className="h-0.5 w-2/3 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ) : template.headerStyle === "classic" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="text-center pb-2 mb-2 border-b-2" style={{ borderColor: template.accent }}>
            <div className="h-1.5 w-20 bg-slate-800 rounded mx-auto" />
            <div className="h-0.5 w-16 rounded mx-auto mt-1" style={{ backgroundColor: template.accent + "80" }} />
            <div className="h-0.5 w-24 bg-slate-300 rounded mx-auto mt-1" />
          </div>
          <div className="space-y-2.5 flex-1">
            <div>
              <div className="h-0.5 w-16 bg-slate-400 rounded mb-1 border-b pb-0.5" style={{ borderColor: template.accent + "40" }} />
              <div className="space-y-0.5 pl-0">
                <div className="h-0.5 w-full bg-slate-200 rounded" />
                <div className="h-0.5 w-5/6 bg-slate-200 rounded" />
                <div className="h-0.5 w-4/5 bg-slate-200 rounded" />
              </div>
            </div>
            <div>
              <div className="h-0.5 w-12 bg-slate-400 rounded mb-1" />
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-slate-100 rounded" />
                <div className="h-0.5 w-3/4 bg-slate-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="text-center pb-2 mb-2">
            <div className="h-1.5 w-20 rounded mx-auto" style={{ backgroundColor: template.accent }} />
            <div className="h-0.5 w-24 bg-slate-400 rounded mx-auto mt-1" />
            <div className="h-0.5 w-28 bg-slate-300 rounded mx-auto mt-0.5" />
          </div>
          <div className="grid grid-cols-3 gap-2 flex-1">
            <div className="col-span-2 space-y-2">
              <div>
                <div className="h-0.5 w-16 rounded mb-1 border-b pb-0.5" style={{ backgroundColor: template.accent + "60", borderColor: template.accent + "30" }} />
                <div className="space-y-0.5">
                  <div className="h-0.5 w-full bg-slate-200 rounded" />
                  <div className="h-0.5 w-5/6 bg-slate-200 rounded" />
                  <div className="h-0.5 w-4/5 bg-slate-200 rounded" />
                  <div className="h-0.5 w-full bg-slate-200 rounded" />
                </div>
              </div>
              <div>
                <div className="h-0.5 w-14 rounded mb-1" style={{ backgroundColor: template.accent + "60" }} />
                <div className="space-y-0.5">
                  <div className="h-0.5 w-full bg-slate-100 rounded" />
                  <div className="h-0.5 w-3/4 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="h-0.5 w-10 rounded mb-1" style={{ backgroundColor: template.accent + "60" }} />
                <div className="space-y-0.5">
                  <div className="h-0.5 w-full bg-slate-100 rounded" />
                  <div className="h-0.5 w-2/3 bg-slate-100 rounded" />
                </div>
              </div>
              <div>
                <div className="h-0.5 w-8 rounded mb-1" style={{ backgroundColor: template.accent + "60" }} />
                <div className="flex flex-wrap gap-0.5">
                  <div className="h-1 w-5 bg-slate-100 rounded-sm" />
                  <div className="h-1 w-4 bg-slate-100 rounded-sm" />
                  <div className="h-1 w-6 bg-slate-100 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TemplateShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-900/60" id="templates-showcase">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> 10 Premium Templates
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
            Templates for Every <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Career Stage</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            From first-job students to seasoned executives — find the perfect layout for your story.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrolling gallery */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Leading spacer */}
          <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] max-w-[200px] hidden xl:block" />

          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex-shrink-0 w-[260px] snap-center group"
            >
              <div className="relative p-4 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/60 transition-all hover:bg-slate-900/60">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ backgroundColor: template.accent }}
                />

                {/* Mini Preview */}
                <div className="relative mb-4 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow group-hover:scale-[1.02] transform transition-transform">
                  <MiniPreview template={template} />
                </div>

                {/* Template Info */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{template.name}</h3>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: template.accent + "15",
                        color: template.accent,
                      }}
                    >
                      {template.tag}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                      Best for {template.bestFor}
                    </span>
                    <Link
                      href={`/builder?template=${template.name.toLowerCase()}`}
                      className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors hover:text-white"
                      style={{ color: template.accent }}
                    >
                      Use <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] max-w-[200px] hidden xl:block" />
        </div>
      </div>

      {/* View All Link */}
      <div className="text-center mt-10">
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-sm font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
        >
          View All Templates <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
