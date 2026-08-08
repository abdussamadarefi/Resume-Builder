import type { Metadata } from "next"
import ArticleClient from "./ArticleClient"

export const metadata: Metadata = {
  title: "How to Write a Resume for a Career Change | ResumeForge",
  description: "Switching industries? Learn how to write a career change resume that highlights transferable skills and reframes your experience for a new field.",
}

export default function ArticlePage() {
  return <ArticleClient />
}
