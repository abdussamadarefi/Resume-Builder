import type { Metadata } from "next"
import ArticleClient from "./ArticleClient"

export const metadata: Metadata = {
  title: "10 Tips to Make Your Resume ATS-Friendly | ResumeForge",
  description: "Learn how Applicant Tracking Systems work and 10 practical tips to ensure your resume passes automated screening and reaches human recruiters.",
}

export default function ArticlePage() {
  return <ArticleClient />
}
