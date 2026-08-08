import type { Metadata } from "next"
import ArticleClient from "./ArticleClient"

export const metadata: Metadata = {
  title: "A Complete Guide to Writing Your First Resume (Students) | ResumeForge",
  description: "Step-by-step instructions for students and recent graduates writing their very first resume. No experience required — learn how to showcase your potential.",
}

export default function ArticlePage() {
  return <ArticleClient />
}
