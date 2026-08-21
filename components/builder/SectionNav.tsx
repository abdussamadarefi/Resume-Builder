"use client"

import React, { useState, useEffect } from "react"
import { useUIStore } from "@/store/uiStore"
import { useResumeStore } from "@/store/resumeStore"
import { 
  User, FileText, Briefcase, GraduationCap, 
  Settings, Award, Languages, MousePointer2, 
  BookOpen, Landmark, Presentation, Users2, Palette, Shield, FolderGit2,
  ChevronDown, Plus, Trash2, Copy, Pencil, Check, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionKey } from "@/types"

const sections = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "summary", label: "Profile Summary", icon: FileText },
  { id: "experience", label: "Work Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Core Skills", icon: MousePointer2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "languages", label: "Languages", icon: Languages },
  { id: "publications", label: "Publications", icon: BookOpen, cvOnly: true },
  { id: "grants", label: "Grants & Funding", icon: Landmark, cvOnly: true },
  { id: "teaching", label: "Teaching", icon: Presentation, cvOnly: true },
  { id: "references", label: "References", icon: Users2 },
  { id: "custom", label: "Custom Section", icon: Settings },
  { id: "settings", label: "Design & Layout", icon: Palette },
  { id: "data", label: "Data & Privacy", icon: Shield },
] as const

export function SectionNav({ onNavClick }: { onNavClick?: () => void }) {
  const activeSection = useUIStore((state) => state.activeSection)
  const setActiveSection = useUIStore((state) => state.setActiveSection)
  
  const activeData = useResumeStore((state) => state.getActiveData())
  const resumes = useResumeStore((state) => state.resumes)
  const switchResume = useResumeStore((state) => state.switchResume)
  const createNewResume = useResumeStore((state) => state.createNewResume)
  const duplicateResume = useResumeStore((state) => state.duplicateResume)
  const deleteResume = useResumeStore((state) => state.deleteResume)
  const renameResume = useResumeStore((state) => state.renameResume)

  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitle, setTempTitle] = useState("")

  const handleRename = () => {
    if (tempTitle.trim()) {
      renameResume(activeData.meta.id, tempTitle.trim())
    }
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      setTempTitle(activeData.meta.title)
    }
  }, [isEditing, activeData.meta.title])

  if (!activeData || !activeData.meta) return null

  return (
    <div className="space-y-6">
      {/* Workspace Manager */}
      <div className="p-4 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl relative shadow-sm dark:shadow-inner transition-colors">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
          Document Workspace
        </label>
        
        <div className="relative">
          <div className="flex gap-2 items-center">
            {isEditing ? (
              <div className="flex items-center gap-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-2 py-1.5 flex-1 shadow-inner">
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename()
                    if (e.key === "Escape") setIsEditing(false)
                  }}
                  className="bg-transparent text-xs text-slate-900 dark:text-white font-medium focus:outline-none flex-1 w-full min-w-0"
                  autoFocus
                />
                <button onClick={handleRename} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <Check size={13} />
                </button>
                <button onClick={() => setIsEditing(false)} className="text-rose-600 dark:text-rose-400 hover:text-rose-500 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="flex-1 min-w-0 flex items-center justify-between bg-white dark:bg-slate-950/60 hover:bg-slate-50 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 transition-all group shadow-sm dark:shadow-none">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex-1 min-w-0 flex items-center justify-between text-left mr-2 focus:outline-none"
                >
                  <div className="truncate pr-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                      {activeData.meta.title}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn(
                        "text-[8px] font-extrabold uppercase px-1 py-0.2 rounded tracking-wide",
                        activeData.meta.type === "cv" 
                          ? "bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400" 
                          : "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      )}>
                        {activeData.meta.type === "cv" ? "CV" : "Resume"}
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        {new Date(activeData.meta.updatedAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200 flex-shrink-0 ml-1", isOpen && "rotate-180")} />
                </button>
                
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex-shrink-0"
                  title="Rename Document"
                >
                  <Pencil size={11} />
                </button>
              </div>
            )}
          </div>

          {/* Dropdown Drawer */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[250px] overflow-y-auto scrollbar-thin">
                <div className="space-y-0.5">
                  {Object.values(resumes).map((res) => {
                    const isActive = res.meta.id === activeData.meta.id
                    return (
                      <div 
                        key={res.meta.id} 
                        className={cn(
                          "flex items-center justify-between p-2 rounded-lg text-left transition-colors group/item",
                          isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-slate-100 dark:hover:bg-slate-800/40"
                        )}
                      >
                        <button
                          onClick={() => {
                            switchResume(res.meta.id)
                            setIsOpen(false)
                          }}
                          className="flex-1 text-left min-w-0 focus:outline-none"
                        >
                          <div className={cn(
                            "text-xs font-bold truncate pr-1",
                            isActive ? "text-primary" : "text-slate-800 dark:text-slate-200"
                          )}>
                            {res.meta.title}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={cn(
                              "text-[8px] font-extrabold uppercase px-1 rounded",
                              res.meta.type === "cv" 
                                ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" 
                                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            )}>
                              {res.meta.type === "cv" ? "CV" : "Resume"}
                            </span>
                          </div>
                        </button>

                        <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover/item:opacity-100 transition-opacity">
                          <button
                            onClick={() => duplicateResume(res.meta.id)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
                            title="Duplicate Document"
                          >
                            <Copy size={11} />
                          </button>
                          {Object.keys(resumes).length > 1 && (
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${res.meta.title}"?`)) {
                                  deleteResume(res.meta.id)
                                }
                              }}
                              className="p-1 hover:bg-rose-100 dark:hover:bg-rose-950 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              title="Delete Document"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 my-1.5 pt-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      createNewResume("resume")
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-[0.98]"
                  >
                    <Plus size={13} /> New Corporate Resume
                  </button>
                  <button
                    onClick={() => {
                      createNewResume("cv")
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-all active:scale-[0.98]"
                  >
                    <Plus size={13} /> New Academic CV
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {sections.map(({ id, label, icon: Icon, cvOnly }: any) => {
          if (cvOnly && activeData.meta.type !== "cv") return null

          return (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id as SectionKey)
                if (onNavClick) onNavClick()
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group text-left",
                activeSection === id
                  ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              )}
            >
              <Icon 
                size={18} 
                className={cn(
                  "transition-transform duration-200 group-hover:scale-110 flex-shrink-0",
                  activeSection === id ? "text-white" : "text-slate-400 dark:text-slate-500"
                )} 
              />
              <span className="truncate">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
