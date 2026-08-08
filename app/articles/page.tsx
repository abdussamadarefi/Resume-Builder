import type { Metadata } from "next"
import ArticlesPageClient from "./ArticlesPageClient"

export const metadata: Metadata = {
  title: "Resume & Career Articles | ResumeForge",
  description: "Expert guides on resume writing, CV formatting, ATS optimization, and career development. Free resources for students and professionals.",
}

export default function ArticlesPage() {
  return <ArticlesPageClient />
}
