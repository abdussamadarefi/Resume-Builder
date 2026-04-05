# ResumeForge 📄✨

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-brown?style=for-the-badge)

**ResumeForge** is a fully client-side, zero-backend, privacy-first resume and CV builder. 

Designed for professionals, academics, and job-seekers, it offers a frictionless experience to build pixel-perfect, ATS-friendly resumes without the need for signups, monthly subscriptions, or cloud data tracking. Everything is processed and stored securely right in your browser.

## 🌟 Key Features

- **Zero Cost & Friction**: Fully open-source and free to use. No accounts or paywalls.
- **Privacy First**: 100% of your data stays in your browser's `localStorage`. No databases, no tracking.
- **Real-Time Preview**: Instantly see how your resume looks as you type.
- **Dual Export Options**:
  - High-Quality, Text-Selectable PDF generation via `@react-pdf/renderer`.
  - Fast, visual fallback PDF via `html2canvas/jsPDF`.
  - DOCX Export compatibility.
- **Versatile Modes**: 
  - **Resume Mode**: Strict 1-2 page formatting suited for corporate and industry roles.
  - **CV Mode**: Multi-page layout for extensive academic, medical, and research backgrounds.
- **Dynamic Templates**: Choose between multiple professionally crafted designs (Nexus, Meridian, Atlas, etc.).

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript & React 18
- **Styling**: Tailwind CSS, Framer Motion, Lucide Icons
- **State Management**: Zustand (Global), React Hook Form, Zod (Validation)
- **PDF Generation**: `@react-pdf/renderer`, `html2canvas/jsPDF`
- **Testing Environment**: Playwright (E2E), Vitest (Unit Testing)

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdussamadarefi/Resume-Builder.git
   cd Resume-Builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the builder in action!

## 📂 Project Structure

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

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!
If you'd like to improve the codebase:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

When committing, please maintain type safety across the shared interfaces in `types/` and ensure that all new templates support both web and PDF renderer formats.

## 📄 License

This project is open-source and free for everyone.
## 📬 Contact

**Abdus Samad Arefi** - Developer  
✉️ Email: [abdussamadarefi@gmail.com](mailto:abdussamadarefi@gmail.com)  
💻 GitHub: [@abdussamadarefi](https://github.com/abdussamadarefi)
