# ResumeForge 📄✨

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)

**A next-generation, zero-backend, privacy-first Resume & Academic CV workspace.**

[Live Demo](resumee.pro.bd) • [View Templates](https://resumee.pro.bd/templates) • [Read Guides](https://resumee.pro.bd/articles) • [Report Bug](https://github.com/abdussamadarefi/Resume-Builder/issues)

</div>

---

## 💡 What is ResumeForge?

**ResumeForge** is a fully client-side, open-source resume and academic CV builder built for job seekers, students, researchers, and executives. 

Unlike traditional resume builders that lock features behind paywalls or sell user data, ResumeForge operates with **zero backend servers and zero databases**. All your data stays 100% securely inside your browser's `localStorage`.

---

## 🔥 Key Features

- 🔒 **100% Privacy-First Architecture**: Zero data collection, zero trackers, zero cookies, zero signups. Your data never leaves your browser.
- 🎨 **10 ATS-Friendly Templates**: Includes Nexus, Scholar, Arya, Atlas, Cascade, Compact, Executive, Meridian, Minimo, and Prism.
- 📄 **Resume vs. CV Dual Modes**:
  - **Resume Mode** (9 sections): Strict 1–2 page layout tailored for corporate and industry roles.
  - **CV Mode** (14 sections): Multi-page format with dedicated sections for Publications, Teaching, Research, and Grants.
- ⚡ **Real-Time Live Preview**: Instant visual feedback as you type, with dynamic color theme and font pairing controls.
- 🖨️ **Multi-Format Vector Exports**:
  - **Native Vector PDF**: Crisp, text-selectable PDF output powered by `@react-pdf/renderer`.
  - **DOCX Export**: Edit-ready Word documents built with `docx`.
  - **Quick PDF Fallback**: Fast visual canvas capture via `html2canvas`.
- 📚 **Rich Content & Resource Hub**:
  - Full **Templates Gallery** with category filtering.
  - 5 SEO-rich **Career Articles & Guides** (Writing in 2025, Resume vs. CV, ATS Optimization, Student Guide, Career Change).
  - Complete **Privacy Policy**, **Terms of Service**, and **Cookie Policy**.

---

## 🎨 Built-In Templates

| Template | Category | Style | Best For |
| :--- | :--- | :--- | :--- |
| **Nexus** | Modern | Centered 3-Column Grid | Tech & Corporate Professionals |
| **Scholar** | Academic | Formal Serif | Professors, Postdocs & Researchers |
| **Arya** | Creative | Accent Sidebar | Designers & Creative Roles |
| **Atlas** | Professional | Two-Column Split | Experienced Industry Applicants |
| **Cascade** | Elegant | Flowing Sections | Corporate Executives |
| **Compact** | Minimal | Dense Space-Saving | Students & Entry-Level Job Seekers |
| **Executive** | Premium | Sophisticated Classic | Senior Leaders & Directors |
| **Meridian** | Modern | Split with Skill Indicators | Software Engineers & Consultants |
| **Minimo** | Clean | Ultra-Minimal | Fresh Graduates |
| **Prism** | Bold | Geometric Header | Product Managers & Marketers |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Generation)
- **Frontend**: [React 18](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/)
- **State & Forms**: [Zustand](https://zustand-demo.pmnd.rs/), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **PDF & Document Engine**: `@react-pdf/renderer`, `docx`, `html2canvas`

---

## 📂 Project Structure

```text
Resume-Builder/
├── app/                  # Next.js App Router (Landing, Builder, Pages)
│   ├── about/            # Project story, tech stack & mission
│   ├── articles/         # 5 Career guides & article hub
│   ├── api/              # AI optimization endpoints
│   ├── builder/          # Main interactive resume workspace
│   ├── cookies/          # Cookie policy (Zero cookie declaration)
│   ├── privacy/          # Privacy policy
│   ├── templates/        # Interactive template showcase gallery
│   ├── terms/            # Terms of service
│   ├── robots.ts          # SEO Crawling rules
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/           # UI & Feature components
│   ├── builder/          # Form inputs (Work, Education, Skills, etc.)
│   ├── export/           # PDF & DOCX export renderers
│   ├── landing/          # Hero, Navbar, Footer, FAQ, Stats, Showcases
│   ├── templates/        # 10 Visual layout renderers
│   └── ui/               # Base UI primitives (Buttons, Inputs)
├── lib/                  # Export utilities, ATS optimizer, helpers
├── store/                # Zustand stores (resumeStore, settingsStore, uiStore)
├── styles/               # CSS Design tokens & globals
└── types/                # Shared TypeScript interfaces (resume.ts)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18.0.0` or higher
- `npm` (v9+) or `yarn` / `pnpm`

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdussamadarefi/Resume-Builder.git
   cd Resume-Builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/abdussamadarefi/Resume-Builder/issues).

### Development Guidelines
1. Maintain strict type safety across shared interfaces in `types/`.
2. Ensure any new template supports both web (Tailwind/HTML) and vector PDF (`@react-pdf/renderer`) rendering paths.
3. Keep state updates optimized to preserve instant real-time live preview responsiveness.

---

## 📄 License

This project is open-source under the **MIT License**.

---

## 📬 Contact & Author

Created with ❤️ by **Abdus Samad Arefi**

- 💻 GitHub: [@abdussamadarefi](https://github.com/abdussamadarefi)
- ✉️ Email: [abdussamadarefi@gmail.com](mailto:abdussamadarefi@gmail.com)
- 🌐 Live Site: [resumee.pro.bd](https://resumee.pro.bd)
