"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import defaultFaqs from "@/content/faqs.json"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = defaultFaqs.filter((f: any) => f.enabled)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-200 dark:border-slate-900/60" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={12} /> Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto">
            Everything you need to know about ResumeForge, privacy, templates, and exports.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={faq.id || faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700/80 shadow-sm dark:shadow-none"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-0 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
