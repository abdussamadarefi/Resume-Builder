import type { Metadata } from "next"
import ArticleClient from "./ArticleClient"

export const metadata: Metadata = {
  title: "How to Write a Professional Resume in 2025 | ResumeForge",
  description: "A comprehensive guide to crafting a modern, ATS-friendly resume in 2025. Learn about formatting, sections, keywords, and common mistakes to avoid.",
}

export default function ArticlePage() {
  return <ArticleClient />
}
