import type { Metadata } from "next"
import ArticleClient from "./ArticleClient"

export const metadata: Metadata = {
  title: "Resume vs. CV: What's the Difference & When to Use Each | ResumeForge",
  description: "Understand the key differences between resumes and CVs. Learn which document to use for industry jobs, academic positions, and international applications.",
}

export default function ArticlePage() {
  return <ArticleClient />
}
