"use client"

import { motion } from "framer-motion"
import { FileText, ClipboardList, ArrowRight } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#020617] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-white mb-6"
        >
          Resume<span className="text-primary">Forge</span>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Craft your professional story with precision. Privacy-first, zero-backend, 
          and pixel-perfect exports for industry or academia.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Resume Option */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-primary/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Corporate Resume</h3>
              <p className="text-slate-400 mb-6 line-clamp-2">
                Optimized for 1–2 pages. Perfect for industry roles, tech positions, and fast-paced hiring.
              </p>
              <Link 
                href="/builder?type=resume"
                className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
              >
                Start Building <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* CV Option */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Academic CV</h3>
              <p className="text-slate-400 mb-6 line-clamp-2">
                Unlimited pages. Detailed sections for Publications, Grants, Teaching, and Research.
              </p>
              <Link 
                href="/builder?type=cv"
                className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all"
              >
                Create Full CV <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-slate-500 text-sm font-medium"
        >
          No signup required. All data stays on your device.
        </motion.div>
      </motion.div>

      {/* Subtle Footer */}
      <footer className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-center text-slate-600 text-xs tracking-widest uppercase">
        <span>© 2026 ResumeForge</span>
        <div className="flex gap-4">
          <Link href="/builder?type=resume" className="hover:text-white transition-colors">Resume</Link>
          <Link href="/builder?type=cv" className="hover:text-white transition-colors">Academic CV</Link>
        </div>
      </footer>
    </main>
  )
}
