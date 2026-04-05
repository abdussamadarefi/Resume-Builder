"use client"

import { useState } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { Label } from "@/components/ui/Label"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Plus } from "lucide-react"

const SUGGESTED_SUMMARIES = {
  "Short & Punchy": [
    "Results-driven professional with a proven track record of exceeding goals, optimizing workflows, and delivering high-quality outcomes.",
    "Proactive and adaptable team player with exceptional analytical skills and a passion for strategic problem-solving.",
    "Detail-oriented specialist dedicated to executing high-impact solutions and fostering cross-functional collaboration.",
    "Dynamic leader known for spearheading key initiatives, mentoring teams, and building strong stakeholder relationships.",
    "Resourceful self-starter committed to continuous improvement, operational excellence, and driving project success."
  ],
  "Detailed & Comprehensive": [
    "Dedicated and results-driven professional with a proven track record of taking initiative and delivering high-quality results. Adept at problem-solving, collaborating with cross-functional teams, and quickly adapting to new challenges in fast-paced environments.",
    "Dynamic and highly motivated specialist with extensive experience in driving project success and operational efficiency. Excellent communicator who thrives in collaborative settings and continuously seeks innovative ways to optimize workflows and exceed organizational goals.",
    "Versatile and detail-oriented professional with a strong foundation in strategic planning and execution. Passionate about learning new technologies and methodologies to bring value to the team and contribute to the company's long-term vision.",
    "Proactive team player with exceptional analytical and critical thinking skills. Recognized for the ability to manage multiple priorities simultaneously while maintaining a high standard of work and fostering a positive, inclusive workplace culture.",
    "Resourceful and adaptable professional known for a creative approach to problem-solving. Committed to continuous improvement, building strong professional relationships, and consistently delivering measurable value to stakeholders and clients."
  ]
}

export function SummaryForm() {
  const activeData = useResumeStore((state) => state.getActiveData())
  const updateSummary = useResumeStore((state) => state.updateSummary)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeCategory, setActiveCategory] = useState<keyof typeof SUGGESTED_SUMMARIES>("Short & Punchy")
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded-full"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showSuggestions ? "Hide Suggestions" : "Need Inspiration?"}
          </button>
        </div>

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl mt-2 overflow-hidden flex flex-col max-h-[320px]">
                {/* Category Tabs */}
                <div className="flex items-center border-b border-slate-800 bg-slate-900/60 p-1">
                  {(Object.keys(SUGGESTED_SUMMARIES) as Array<keyof typeof SUGGESTED_SUMMARIES>).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`flex-1 text-xs py-2 px-3 rounded-md transition-all ${
                        activeCategory === category 
                          ? "bg-slate-800 text-slate-200 font-medium shadow-sm" 
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Scrollable Summary List */}
                <div className="p-2 overflow-y-auto custom-scrollbar">
                  {SUGGESTED_SUMMARIES[activeCategory].map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        updateSummary(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="flex w-full text-left gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
                    >
                      <Plus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <textarea
          id="summary"
          rows={6}
          value={activeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Briefly describe your career goals and key achievements..."
          className="flex w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 min-h-[150px] resize-none"
        />
        <p className="text-xs text-slate-500 text-right">
          {activeData.summary.length} characters
        </p>
      </div>
    </motion.div>
  )
}
