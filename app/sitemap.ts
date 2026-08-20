import { MetadataRoute } from "next"

const BASE_URL = "https://resumee.pro.bd"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/templates",
    "/articles",
    "/about",
    "/privacy",
    "/terms",
    "/cookies",
    "/builder",
  ]

  const articles = [
    "/articles/how-to-write-resume-2025",
    "/articles/resume-vs-cv-difference",
    "/articles/ats-friendly-resume-tips",
    "/articles/first-resume-guide-students",
    "/articles/career-change-resume",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path === "/templates" ? 0.9 : 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articles.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...articleEntries]
}
