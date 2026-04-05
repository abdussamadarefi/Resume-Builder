# Gemini AI Project Context — ResumeForge

This document provides a high-level overview of the **ResumeForge** (Resume Builder) project for AI coding assistants. ResumeForge is a fully client-side, zero-backend resume and CV builder.

## Project Vision & Core Principles

- **Zero Cost & Friction**: Built with Next.js 14+ and hosted on Vercel. No database, no auth, no signup required.
- **Privacy First**: All user data is stored in the browser's `localStorage`.
- **High-Quality Exports**: Pixel-perfect PDF generation (text-selectable) and ATS-safe templates.
- **Versatility**: Supports both corporate **Resumes** (1-2 pages) and academic **CVs** (multi-page).

## Tech Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router), TypeScript, React 18 |
| **Styling** | Tailwind CSS, Lucide Icons, Framer Motion |
| **State** | Zustand (Global State), React Hook Form, Zod (Validation) |
| **Export** | @react-pdf/renderer (Quality PDF), html2canvas/jsPDF (Quick PDF), docx (DOCX) |
| **Testing** | Playwright (E2E), Vitest (Unit) |

## Core Architecture

- **State Management**:
  - `resumeStore.ts`: Main store for resume/CV data entries.
  - `settingsStore.ts`: Handles templates, accent colors, font pairs, and document type (`resume` vs. `cv`).
  - `uiStore.ts`: Tracks active sections, zoom levels, and preview modes.
- **PDF Rendering**: Parallel render paths using `@react-pdf/renderer` for high quality and `html2canvas` for speed.
- **Data Persistence**: Automatic saves (every 2s) to `localStorage`.

## Proposed File Structure

```text
resumeforge/
├── app/                  # Next.js App Router (Builder, Templates, Preview)
├── components/           # UI, Builder sections, Template components
│   ├── builder/          # Form sections (Work, Education, Skills, etc.)
│   ├── templates/        # Visual layouts (Nexus, Meridian, Atlas, etc.)
│   └── export/           # PDF and DOCX generation components
├── store/                # Zustand state (resumeStore, settingsStore, uiStore)
├── lib/                  # Export logic, validation, and utilities
└── types/                # TypeScript interfaces (resume.ts, index.ts)
```

## Resume vs. CV Features

| Feature | Resume | CV |
| :--- | :--- | :--- |
| **Length** | 1–2 pages (strict) | Unlimited pages |
| **Target** | Corporate / Industry | Academia / Research / Medical |
| **Sections** | Work, Skills, Projects (9 total) | Publications, Grants, Teaching (14 total) |
| **Photo** | Optional | Common in international/academic formats |

## Helping with Development

When helping with ResumeForge:
1. **Maintain Type Safety**: Use the shared interfaces in `types/`.
2. **Component Reusability**: Add new styling tokens to `settingsStore` rather than hardcoding values.
3. **Template Consistency**: Ensure new templates support both web (Tailwind) and PDF (@react-pdf/renderer) renderers.
4. **Performance**: Avoid unnecessary re-renders in the real-time preview.
