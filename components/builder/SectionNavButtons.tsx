"use client"

import React, { useMemo } from "react"
import { useUIStore } from "@/store/uiStore"
import { useResumeStore } from "@/store/resumeStore"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionKey } from "@/types"

/**
 * Ordered list of all builder sections — must match SectionNav.tsx order.
 * `cvOnly` sections are excluded when the active document is a resume.
 */
const allSections: { id: SectionKey; label: string; cvOnly?: boolean }[] = [
  { id: "personal", label: "Personal Info" },
  { id: "summary", label: "Profile Summary" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Core Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "publications", label: "Publications", cvOnly: true },
  { id: "grants", label: "Grants & Funding", cvOnly: true },
  { id: "teaching", label: "Teaching", cvOnly: true },
  { id: "references", label: "References" },
  { id: "custom", label: "Custom Section" },
  { id: "settings", label: "Design & Layout" },
  { id: "data", label: "Data & Privacy" },
]

export function SectionNavButtons() {
  const activeSection = useUIStore((state) => state.activeSection)
  const setActiveSection = useUIStore((state) => state.setActiveSection)
  const activeData = useResumeStore((state) => state.getActiveData())

  const docType = activeData?.meta?.type

  // Filter out CV-only sections when document type is "resume"
  const visibleSections = useMemo(() => {
    return allSections.filter((s) => !s.cvOnly || docType === "cv")
  }, [docType])

  const currentIndex = visibleSections.findIndex((s) => s.id === activeSection)
  const prevSection = currentIndex > 0 ? visibleSections[currentIndex - 1] : null
  const nextSection = currentIndex < visibleSections.length - 1 ? visibleSections[currentIndex + 1] : null

  // Progress indicator: how far through the form flow we are (1-indexed)
  const progress = currentIndex >= 0 ? currentIndex + 1 : 0
  const total = visibleSections.length

  const handleNavigate = (section: { id: SectionKey }) => {
    setActiveSection(section.id)
    // Scroll to top so the user sees the new section heading
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (currentIndex === -1) return null

  return (
    <div className="mt-12 pt-8 border-t border-slate-800/60">
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Progress
          </span>
          <span className="text-[10px] font-bold text-slate-500 tabular-nums">
            {progress} / {total}
          </span>
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-3">
        {prevSection ? (
          <button
            onClick={() => handleNavigate(prevSection)}
            className={cn(
              "group flex items-center gap-2 px-4 py-3 rounded-xl",
              "bg-slate-900/60 border border-slate-800 hover:border-slate-700",
              "text-slate-400 hover:text-white",
              "transition-all duration-200 active:scale-[0.98]",
              "min-w-0 flex-1 max-w-[48%]"
            )}
          >
            <ChevronLeft
              size={16}
              className="flex-shrink-0 text-slate-500 group-hover:text-primary group-hover:-translate-x-0.5 transition-all"
            />
            <div className="min-w-0 text-left">
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                Back
              </div>
              <div className="text-xs font-semibold truncate">
                {prevSection.label}
              </div>
            </div>
          </button>
        ) : (
          <div className="flex-1 max-w-[48%]" />
        )}

        {nextSection ? (
          <button
            onClick={() => handleNavigate(nextSection)}
            className={cn(
              "group flex items-center justify-end gap-2 px-4 py-3 rounded-xl",
              "bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 hover:border-primary/40",
              "text-slate-300 hover:text-white",
              "transition-all duration-200 active:scale-[0.98]",
              "min-w-0 flex-1 max-w-[48%]"
            )}
          >
            <div className="min-w-0 text-right">
              <div className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">
                Next
              </div>
              <div className="text-xs font-semibold truncate">
                {nextSection.label}
              </div>
            </div>
            <ChevronRight
              size={16}
              className="flex-shrink-0 text-primary group-hover:translate-x-0.5 transition-all"
            />
          </button>
        ) : (
          <div className="flex-1 max-w-[48%]" />
        )}
      </div>
    </div>
  )
}
