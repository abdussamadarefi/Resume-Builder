"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"
import defaultArticles from "@/content/articles/index.json"

export default function ArticlesPageClient() {
  const articles = defaultArticles.filter((a: any) => a.is_published)

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
            <BookOpen size={11} /> Career Resources
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Articles &amp; Guides
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Expert advice on resume writing, CV formatting, ATS optimization, and career development.
            Free resources for students and professionals.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {articles.map((article: any, index: number) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/articles/${article.slug}`} className="group block">
                <div className="p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/60 transition-all hover:bg-white dark:hover:bg-slate-900/50 shadow-sm dark:shadow-none">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                          style={{
                            backgroundColor: (article.category_color || "#3b82f6") + "15",
                            color: article.category_color || "#3b82f6",
                          }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock size={11} /> {article.read_time}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
                        <span className="text-xs text-slate-500">
                          For {article.target_audience}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/60">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:underline">
                        Read Guide <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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
