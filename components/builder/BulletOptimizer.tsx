"use client"

import { Button } from "@/components/ui/Button"
import { Sparkles, Wand2, Check, Copy, RefreshCw } from "lucide-react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BulletOptimizerProps {
  initialText: string
  onApply: (optimizedText: string) => void
  onClose: () => void
}

export function BulletOptimizer({ initialText, onApply, onClose }: BulletOptimizerProps) {
  const [suggestion, setSuggestion] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [tone, setTone] = React.useState<"professional" | "achiever" | "concise">("achiever")

  const generateSuggestion = async () => {
    if (!initialText.trim()) {
      setSuggestion("Please type a basic responsibility first to see the AI optimization.");
      return;
    }
    
    setIsGenerating(true)
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initialText, tone })
      });
      
      const data = await res.json();
      if (res.ok && data.suggestion) {
        setSuggestion(data.suggestion);
      } else {
        setSuggestion(data.suggestion || data.error || "Failed to generate optimization.");
      }
    } catch (e) {
      setSuggestion("Error connecting to AI service.");
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-2xl w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Sparkles size={20} />
        </div>
        <h4 className="text-xl font-bold text-white tracking-tight">AI Bullet Optimizer</h4>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Current Draft</label>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-sm italic">
            {initialText || "Type something in the form first..."}
          </div>
        </div>

        <div className="flex gap-2">
          {(["achiever", "professional", "concise"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                tone === t 
                  ? "bg-primary text-white" 
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Button 
          onClick={generateSuggestion} 
          disabled={isGenerating || !initialText}
          className="w-full gap-2 h-12 bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 transition-opacity"
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
          {isGenerating ? "Optimizing..." : "Improve with AI"}
        </Button>

        <AnimatePresence>
          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative group">
                <p className="text-sm text-slate-200 leading-relaxed pr-8">
                  {suggestion}
                </p>
                <div className="absolute top-4 right-4 flex gap-2 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 group-hover:opacity-100 opacity-0 transition-opacity">
                   <button 
                    onClick={() => {navigator.clipboard.writeText(suggestion)}} 
                    className="p-2 hover:bg-slate-800 text-slate-400"
                    title="Copy to clipboard"
                   >
                     <Copy size={14} />
                   </button>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => onApply(suggestion)} className="flex-1 gap-2 border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10" variant="outline">
                  <Check size={16} /> Use This Suggestion
                </Button>
                <Button onClick={onClose} variant="ghost" className="text-slate-500 hover:text-slate-300">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
