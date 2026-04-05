"use client"

import { useUIStore } from "@/store/uiStore"
import { useResumeStore } from "@/store/resumeStore"
import { 
  User, FileText, Briefcase, GraduationCap, 
  Settings, Award, Languages, MousePointer2, 
  BookOpen, Landmark, Presentation, Users2, Palette, Shield, FolderGit2
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

export function SectionNav() {
  const activeSection = useUIStore((state) => state.activeSection)
  const setActiveSection = useUIStore((state) => state.setActiveSection)
  const activeData = useResumeStore((state) => state.getActiveData())

  return (
    <nav className="space-y-1">
      {sections.map(({ id, label, icon: Icon, cvOnly }: any) => {
        if (cvOnly && activeData.meta.type !== "cv") return null

        return (
          <button
            key={id}
            onClick={() => setActiveSection(id as SectionKey)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group text-left",
              activeSection === id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Icon 
              size={18} 
              className={cn(
                "transition-transform duration-200 group-hover:scale-110 flex-shrink-0",
                activeSection === id ? "text-white" : "text-slate-500"
              )} 
            />
            <span className="truncate">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
