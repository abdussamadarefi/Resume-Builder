import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL("https://resumeforge.vercel.app"),
  title: "ResumeForge | Premium AI Resume & CV Builder",
  description: "Craft pixel-perfect, ATS-friendly corporate resumes and academic CVs. A privacy-first, zero-backend platform where all your data stays safely in your browser. Free, open-source, and zero signup required.",
  keywords: [
    "resume builder",
    "cv builder",
    "cv generator",
    "academic cv",
    "ats-safe resume",
    "free resume maker",
    "privacy-first cv",
    "next.js resume builder",
    "react resume builder",
    "open source resume creator"
  ],
  authors: [{ name: "Abdus Samad Arefi", url: "https://github.com/abdussamadarefi" }],
  creator: "Abdus Samad Arefi",
  openGraph: {
    title: "ResumeForge | Premium AI Resume & CV Builder",
    description: "Build beautiful, text-selectable resumes and CVs with real-time preview and parallel PDF rendering. 100% privacy-first.",
    url: "https://resumeforge.vercel.app",
    siteName: "ResumeForge",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "ResumeForge Logo Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge | Premium AI Resume & CV Builder",
    description: "Privacy-first, free, and open-source resume & CV builder. Generate print-ready PDFs instantly.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise fixed inset-0 z-[9999]" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
