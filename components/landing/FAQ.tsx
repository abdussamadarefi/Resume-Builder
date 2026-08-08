"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "Is ResumeForge really free? What's the catch?",
    answer: "ResumeForge is 100% free with zero paywalls, no premium tiers, and no hidden costs. It's an open-source project maintained by the community. There is no catch — we believe everyone deserves access to professional resume tools without financial barriers.",
  },
  {
    question: "Where is my data stored? Is it secure?",
    answer: "All your resume data is stored exclusively in your browser's localStorage. We don't have servers, databases, or any backend infrastructure that touches your personal information. Your data never leaves your device — it's the most private resume builder possible.",
  },
  {
    question: "What does 'ATS-friendly' mean?",
    answer: "ATS (Applicant Tracking System) is software that companies use to scan and filter resumes before a human reads them. Our templates are designed with clean formatting, proper heading hierarchy, and standard section labels that these systems can parse correctly — increasing your chances of getting past automated filters.",
  },
  {
    question: "Can I export my resume as a PDF?",
    answer: "Yes! ResumeForge supports multiple export formats. You can download your resume as a high-quality, vector PDF with selectable text (using @react-pdf/renderer) or as an editable DOCX file. The PDF output is print-ready and pixel-perfect.",
  },
  {
    question: "What's the difference between a Resume and a CV?",
    answer: "A Resume is typically 1-2 pages and tailored for corporate/industry jobs, highlighting relevant work experience and skills. A CV (Curriculum Vitae) is a comprehensive multi-page document used in academia, research, and medicine, including publications, grants, teaching experience, and more. ResumeForge supports both formats with dedicated templates.",
  },
  {
    question: "Can I use ResumeForge on my phone or tablet?",
    answer: "ResumeForge is fully responsive and works on all devices. However, for the best experience with the real-time preview and form editing, we recommend using a tablet or desktop screen. The exported PDF will always be pixel-perfect regardless of the device you use to create it.",
  },
  {
    question: "How do I switch between templates?",
    answer: "In the builder, you can switch templates at any time from the settings panel. Your content is preserved when switching — only the visual layout changes. This lets you experiment with different designs without re-entering any information.",
  },
  {
    question: "What if I clear my browser data? Will I lose my resume?",
    answer: "Since data is stored in localStorage, clearing your browser data will remove your saved resume. We recommend exporting your resume as a PDF or DOCX before clearing browser data. You can also bookmark or print the builder page as a precaution.",
  },
  {
    question: "Can I contribute to ResumeForge?",
    answer: "Absolutely! ResumeForge is open source and we welcome contributions. Whether it's adding new templates, fixing bugs, improving documentation, or suggesting features — visit our GitHub repository to get started. Every contribution makes the tool better for everyone.",
  },
  {
    question: "Do you track user analytics or use cookies?",
    answer: "No. ResumeForge uses zero cookies, zero analytics, and zero tracking scripts. We don't know who you are, what you build, or when you visit. Your privacy is absolute — we can't track you even if we wanted to.",
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-800/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className={cn(
          "mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          isOpen ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-500"
        )}>
          <ChevronDown
            size={14}
            className={cn("transition-transform duration-200", isOpen && "rotate-180")}
          />
        </div>
        <span className={cn(
          "text-sm font-semibold transition-colors flex-1",
          isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
        )}>
          {item.question}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pl-10 pb-5 text-sm text-slate-400 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative z-10 w-full py-20 md:py-32 border-t border-slate-900/60" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            <HelpCircle size={11} /> FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              Questions
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Everything you need to know about ResumeForge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-6 md:p-8"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
