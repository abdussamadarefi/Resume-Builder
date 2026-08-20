import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/builder"],
      },
    ],
    sitemap: "https://resumee.pro.bd/sitemap.xml",
  }
}
