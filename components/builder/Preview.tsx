"use client"

import React from "react"
import { useResumeStore } from "@/store/resumeStore"
import { useSettingsStore } from "@/store/settingsStore"
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
  const [pageCount, setPageCount] = React.useState(1)
  const [pageHeightPx, setPageHeightPx] = React.useState(1122)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current) {
      // Create a temporary dummy element to measure 297mm in exact pixels for the current DPI/browser
      const dummy = document.createElement("div")
      dummy.style.height = "297mm"
      dummy.style.position = "absolute"
      dummy.style.visibility = "hidden"
      document.body.appendChild(dummy)
      const measuredPageHeight = dummy.clientHeight || 1122
      document.body.removeChild(dummy)
      
      setPageHeightPx(measuredPageHeight)

      const sHeight = contentRef.current.scrollHeight
      const count = Math.max(1, Math.ceil(sHeight / measuredPageHeight))
      setPageCount(count)

      // Overflows single page limit if scroll height is greater than page height
      const isActuallyOverflowing = sHeight > measuredPageHeight + 2
      setIsOverflowing(isActuallyOverflowing)
    }
  }, [activeData, templateId, fontSize, lineHeight, margin])
  
  if (!activeData || !activeData.meta) return null

  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-slate-200/60 dark:bg-slate-950/60 overflow-auto scrollbar-thin transition-colors duration-200">
      {isOverflowing && activeData.meta.type === "resume" && (
        <div className="mb-4 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 animate-pulse flex-shrink-0">
          <span>⚠️ Content exceeds one page limit</span>
        </div>
      )}
      {/* Outer container that provides correct dimensions for scaled content */}
      <div
        style={{
          width: `calc(210mm * ${zoom})`,
          height: `calc(297mm * ${zoom} * ${pageCount})`,
          flexShrink: 0,
        }}
        className="transition-all duration-300"
      >
        <div 
          id="rf-preview-doc"
          ref={contentRef}
          className="relative bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-300/60 dark:border-slate-800 origin-top-left transition-transform duration-300 ease-out"
          style={{ 
            width: "210mm", 
            minHeight: `calc(297mm * ${pageCount})`,
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
