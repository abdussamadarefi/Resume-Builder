"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Palette, Download, Users } from "lucide-react"

const stats = [
  { icon: Palette, label: "Templates", value: 10, suffix: "+", color: "text-indigo-400" },
  { icon: Download, label: "Export Formats", value: 3, suffix: "", color: "text-emerald-400" },
  { icon: FileText, label: "Resume Sections", value: 14, suffix: "+", color: "text-purple-400" },
  { icon: Users, label: "Cost to You", value: 0, suffix: "$", prefix: "$", color: "text-amber-400" },
]

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return
    
    const duration = 1500
    const steps = 30
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix === "$" ? "$" : ""}{count}{suffix !== "$" ? suffix : ""}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="relative z-10 w-full py-12 md:py-16 border-t border-b border-slate-900/60 bg-slate-950/30" id="stats">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 mb-3 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
