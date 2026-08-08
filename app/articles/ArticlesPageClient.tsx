"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

const articles = [
  {
    slug: "how-to-write-resume-2025",
    title: "How to Write a Professional Resume in 2025",
    description: "A comprehensive guide to crafting a modern, ATS-friendly resume that stands out to both recruiters and automated systems.",
    category: "Resume Guide",
    categoryColor: "#3b82f6",
    readTime: "12 min read",
    target: "Students & Professionals",
  },
  {
    slug: "resume-vs-cv-difference",
    title: "Resume vs. CV: What's the Difference & When to Use Each",
    description: "Understand the key differences between resumes and CVs, and learn which document to use for different career opportunities.",
    category: "Career Advice",
    categoryColor: "#8b5cf6",
    readTime: "8 min read",
    target: "Students & Academics",
  },
  {
    slug: "ats-friendly-resume-tips",
    title: "10 Tips to Make Your Resume ATS-Friendly",
    description: "Learn how applicant tracking systems work and what you can do to ensure your resume passes automated screening.",
    category: "ATS Optimization",
    categoryColor: "#10b981",
    readTime: "10 min read",
    target: "Job Seekers",
  },
  {
    slug: "first-resume-guide-students",
    title: "A Complete Guide to Writing Your First Resume",
    description: "No experience? No problem. Step-by-step instructions for students and recent graduates creating their very first resume.",
    category: "Student Guide",
    categoryColor: "#f59e0b",
    readTime: "11 min read",
    target: "Students",
  },
  {
    slug: "career-change-resume",
    title: "How to Write a Resume for a Career Change",
    description: "Switching industries? Learn how to highlight transferable skills and reframe your experience for a new career path.",
    category: "Career Change",
    categoryColor: "#e11d48",
    readTime: "9 min read",
    target: "Professionals",
  },
]

export default function ArticlesPageClient() {
  return (
    <LandingLayout>
      <div className="w-full max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
            <BookOpen size={11} /> Career Resources
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
            Articles & Guides
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Expert advice on resume writing, CV formatting, ATS optimization, and career development.
            Free resources for students and professionals.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/articles/${article.slug}`} className="group block">
                <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all hover:bg-slate-900/50">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                          style={{ backgroundColor: article.categoryColor + "15", color: article.categoryColor }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Clock size={11} /> {article.readTime}
                        </span>
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                          For {article.target}
                        </span>
                      </div>

                      <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center self-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">
                        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </LandingLayout>
  )
}
