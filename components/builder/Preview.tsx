"use client"

import React from "react"
import { useResumeStore } from "@/store/resumeStore"
import { useSettingsStore } from "@/store/settingsStore"
import { useUIStore } from "@/store/uiStore"
import { NexusTemplate } from "@/components/templates/NexusTemplate"
import { MeridianTemplate } from "@/components/templates/MeridianTemplate"
import { AtlasTemplate } from "@/components/templates/AtlasTemplate"
import { PrismTemplate } from "@/components/templates/PrismTemplate"
import { ScholarTemplate } from "@/components/templates/ScholarTemplate"
import { CompactTemplate } from "@/components/templates/CompactTemplate"
import { CascadeTemplate } from "@/components/templates/CascadeTemplate"
import { MinimoTemplate } from "@/components/templates/MinimoTemplate"
import { AryaTemplate } from "@/components/templates/AryaTemplate"
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate"

export function Preview() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const { templateId, accentColor, zoom, fontSize, lineHeight, margin } = useSettingsStore()
  const [isOverflowing, setIsOverflowing] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      const a4HeightPx = 1122 // ~297mm at 96dpi
      setIsOverflowing(height > a4HeightPx)
    }
  }, [activeData, templateId])
  
  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-slate-800/20 overflow-auto">
      {isOverflowing && activeData.meta.type === "resume" && (
        <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 animate-bounce flex-shrink-0">
          <span>⚠️ Content exceeds one page</span>
        </div>
      )}
      {/* Outer container that provides correct dimensions for scaled content */}
      <div
        style={{
          width: `calc(210mm * ${zoom})`,
          height: `calc(297mm * ${zoom})`,
          flexShrink: 0,
        }}
      >
        <div 
          ref={contentRef}
          className="bg-white shadow-2xl origin-top-left transition-transform duration-300 ease-out"
          style={{ 
            width: "210mm", 
            minHeight: "297mm",
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {templateId === "nexus" && (
            <NexusTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "meridian" && (
            <MeridianTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "atlas" && (
            <AtlasTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "prism" && (
            <PrismTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "scholar" && (
            <ScholarTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "compact" && (
            <CompactTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "cascade" && (
            <CascadeTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "minimo" && (
            <MinimoTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "arya" && (
            <AryaTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
          {templateId === "executive" && (
            <ExecutiveTemplate data={activeData} accentColor={accentColor} fontSize={fontSize} lineHeight={lineHeight} margin={margin} />
          )}
        </div>
      </div>
    </div>
  )
}
