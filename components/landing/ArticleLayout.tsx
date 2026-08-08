"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react"
import LandingLayout from "@/components/landing/LandingLayout"

interface ArticleLayoutProps {
  title: string
  description: string
  readTime: string
  date: string
  category: string
  categoryColor: string
  children: React.ReactNode
}

export default function ArticleLayout({
  title,
  description,
  readTime,
  date,
  category,
  categoryColor,
  children,
}: ArticleLayoutProps) {
  return (
    <LandingLayout>
      <article className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: categoryColor + "15", color: categoryColor }}
            >
              {category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} /> {readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar size={12} /> {date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.header>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="prose prose-invert prose-slate max-w-none
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-slate-400 [&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:text-slate-400 [&_ul]:text-sm [&_ul]:md:text-base [&_ul]:leading-relaxed [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:pl-5
            [&_ol]:text-slate-400 [&_ol]:text-sm [&_ol]:md:text-base [&_ol]:leading-relaxed [&_ol]:space-y-2 [&_ol]:mb-6 [&_ol]:pl-5
            [&_li]:text-slate-400
            [&_strong]:text-slate-200 [&_strong]:font-semibold
            [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-slate-900/30 [&_blockquote]:rounded-r-xl [&_blockquote]:pr-5
            [&_code]:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-emerald-400 [&_code]:font-mono
          "
        >
          {children}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-transparent to-emerald-600/10 border border-slate-800/60 text-center"
        >
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
            Ready to Build Your Resume?
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Put these tips into practice with ResumeForge. Free, private, and no signup required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder?type=resume"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Start Building <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-white font-bold text-sm rounded-xl hover:border-slate-700 transition-all"
            >
              Browse Templates
            </Link>
          </div>
        </motion.div>

        {/* Back to Articles */}
        <div className="mt-10 pt-8 border-t border-slate-800/60">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to All Articles
          </Link>
        </div>
      </article>
    </LandingLayout>
  )
}
