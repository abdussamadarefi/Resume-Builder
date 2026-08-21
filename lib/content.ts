import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface LandingSection {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

export interface LandingHero {
  badge_text: string;
  headline_line1: string;
  headline_gradient: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
}

export interface LandingStat {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  order: number;
  enabled: boolean;
}

export interface LandingData {
  sections: LandingSection[];
  hero: LandingHero;
  stats: LandingStat[];
}

export interface Testimonial {
  id: string;
  author_name: string;
  role: string;
  company_or_school: string;
  quote: string;
  rating: number;
  tag: string;
  avatar_url?: string;
  enabled: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  enabled: boolean;
  order: number;
}

export interface TemplateRegistryItem {
  id: string;
  name: string;
  category: string;
  doc_type: 'resume' | 'cv' | 'both';
  enabled: boolean;
  featured: boolean;
  is_new: boolean;
  ats_score: number;
  accent_color: string;
  description: string;
  best_for?: string;
  tags?: string[];
  order: number;
}

export interface TemplatesPageContent {
  badge_text: string;
  title: string;
  subtitle: string;
  filter_tabs: { id: string; label: string; order: number }[];
}

export interface ValueCard {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  gradient: string;
  order: number;
}

export interface AboutContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  mission: {
    title: string;
    paragraphs: string[];
  };
  values: ValueCard[];
  creator: {
    name: string;
    title: string;
    bio: string;
    avatar_url: string;
    github_url: string;
    email: string;
  };
  cta_banner: {
    title: string;
    description: string;
    button_text: string;
    button_url: string;
  };
}

export interface NavLink {
  id: string;
  label: string;
  url: string;
  order: number;
  enabled?: boolean;
  is_external?: boolean;
}

export interface NavigationContent {
  navbar: NavLink[];
  navbar_cta: { label: string; url: string };
  footer: {
    product: NavLink[];
    resources: NavLink[];
    company: NavLink[];
    legal: NavLink[];
  };
  footer_copyright: string;
  footer_credit: string;
  footer_github_url: string;
}

export interface FeatureFlags {
  ai_optimizer: boolean;
  docx_export: boolean;
  pdf_export: boolean;
  cv_mode: boolean;
  announcement_banner: boolean;
  ats_score_badge: boolean;
  [key: string]: boolean;
}

export interface SiteSettings {
  site_name: string;
  site_url: string;
  ga_measurement_id: string;
  support_email: string;
  announcement: {
    enabled: boolean;
    message: string;
    type: 'info' | 'warning' | 'success' | 'alert';
    link_text?: string;
    link_url?: string;
  };
}

export interface LegalPageContent {
  badge: string;
  title: string;
  subtitle: string;
  last_updated: string;
  tldr_headline?: string;
  tldr_content?: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  category_color: string;
  read_time: string;
  target_audience: string;
  published_at: string;
  is_published: boolean;
  featured: boolean;
  order: number;
}

/**
 * Reads and parses a JSON file from the content directory
 */
export function readContent<T>(relativeFilePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${relativeFilePath}`);
  }
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

/**
 * Reads a Markdown file from the content directory
 */
export function readMarkdown(relativeFilePath: string): string {
  const fullPath = path.join(CONTENT_DIR, relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    return '';
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Checks if a content file exists
 */
export function contentExists(relativeFilePath: string): boolean {
  const fullPath = path.join(CONTENT_DIR, relativeFilePath);
  return fs.existsSync(fullPath);
}

/**
 * Convenience helper methods
 */
export const getContent = {
  landing: () => readContent<LandingData>('landing.json'),
  testimonials: () => readContent<Testimonial[]>('testimonials.json'),
  faqs: () => readContent<FAQItem[]>('faqs.json'),
  templates: () => readContent<TemplateRegistryItem[]>('templates.json'),
  templatesPage: () => readContent<TemplatesPageContent>('templates-page.json'),
  about: () => readContent<AboutContent>('about.json'),
  navigation: () => readContent<NavigationContent>('navigation.json'),
  flags: () => readContent<FeatureFlags>('feature-flags.json'),
  settings: () => readContent<SiteSettings>('site-settings.json'),
  legal: (type: 'privacy' | 'terms' | 'cookies') => readContent<LegalPageContent>(`legal/${type}.json`),
  articles: () => readContent<ArticleMeta[]>('articles/index.json'),
  articleBody: (slug: string) => readMarkdown(`articles/${slug}.md`),
};
