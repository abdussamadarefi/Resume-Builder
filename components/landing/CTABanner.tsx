"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTABanner() {
  return (
    <section className="relative z-10 w-full py-20 md:py-28" id="cta-banner">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800/60 shadow-xl dark:shadow-none bg-white/60 dark:bg-transparent"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-emerald-500/15 dark:from-indigo-600/20 dark:via-purple-600/10 dark:to-emerald-600/20" />
          <div className="absolute inset-0 bg-white/50 dark:bg-[#030712]/60" />
          
          {/* Decorative orbs */}
          <div className="absolute top-[-40%] right-[-20%] w-[60%] h-[120%] bg-indigo-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-40%] left-[-20%] w-[50%] h-[100%] bg-emerald-500/10 blur-[100px] rounded-full" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-white/60 text-[10px] font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles size={11} /> Start Your Career Journey
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              Start Building Your Future.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400">
                It&apos;s Free.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10 font-medium">
              No signup required. No credit card. No data collected. Just open the builder and create 
              a pixel-perfect resume in minutes. Your career story starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder?type=resume"
                id="cta-btn-resume"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm tracking-wide rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]"
              >
                Build Your Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/builder?type=cv"
                id="cta-btn-cv"
                className="group flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-sm tracking-wide rounded-2xl transition-all active:scale-[0.98] shadow-sm dark:shadow-none"
              >
                Create Academic CV <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
