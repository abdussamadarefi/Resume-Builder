"use client";

import React, { useState, useEffect } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import {
  Layers,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import landingDefault from '@/content/landing.json';
import testimonialsDefault from '@/content/testimonials.json';
import faqsDefault from '@/content/faqs.json';

export default function LandingPageCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  // Load from draft if staged, otherwise default
  const [landing, setLanding] = useState(() => {
    if (stagedFiles['content/landing.json']) {
      try {
        return JSON.parse(stagedFiles['content/landing.json'].content);
      } catch { }
    }
    return landingDefault;
  });

  const [testimonials, setTestimonials] = useState(() => {
    if (stagedFiles['content/testimonials.json']) {
      try {
        return JSON.parse(stagedFiles['content/testimonials.json'].content);
      } catch { }
    }
    return testimonialsDefault;
  });

  const [faqs, setFaqs] = useState(() => {
    if (stagedFiles['content/faqs.json']) {
      try {
        return JSON.parse(stagedFiles['content/faqs.json'].content);
      } catch { }
    }
    return faqsDefault;
  });

  const [activeTab, setActiveTab] = useState<'hero' | 'sections' | 'stats' | 'testimonials' | 'faqs'>('hero');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleStageAll = () => {
    stageFile('content/landing.json', JSON.stringify(landing, null, 2), 'Landing Page (Hero & Sections)');
    stageFile('content/testimonials.json', JSON.stringify(testimonials, null, 2), 'User Testimonials');
    stageFile('content/faqs.json', JSON.stringify(faqs, null, 2), 'FAQ Accordion');

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  // Section toggle helper
  const toggleSection = (id: string) => {
    setLanding((prev: any) => ({
      ...prev,
      sections: prev.sections.map((s: any) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  // Section move helper
  const moveSection = (index: number, direction: 'up' | 'down') => {
    setLanding((prev: any) => {
      const newSections = [...prev.sections];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newSections.length) return prev;

      const temp = newSections[index];
      newSections[index] = newSections[targetIndex];
      newSections[targetIndex] = temp;

      return {
        ...prev,
        sections: newSections.map((s, idx) => ({ ...s, order: idx })),
      };
    });
  };

  // Testimonial helpers
  const addTestimonial = () => {
    const newT = {
      id: `t_${Date.now()}`,
      author_name: 'New Reviewer',
      role: 'Student / Professional',
      company_or_school: 'University or Company',
      quote: 'Great experience using ResumeForge!',
      rating: 5,
      tag: 'Student',
      avatar_url: '',
      enabled: true,
      order: testimonials.length,
    };
    setTestimonials([...testimonials, newT]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t: any) => t.id !== id));
  };

  // FAQ helpers
  const addFaq = () => {
    const newF = {
      id: `faq_${Date.now()}`,
      question: 'New Question?',
      answer: 'Answer text goes here...',
      category: 'General',
      enabled: true,
      order: faqs.length,
    };
    setFaqs([...faqs, newF]);
  };

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter((f: any) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="text-blue-400" size={20} />
            <span>Landing Page CMS Controller</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit hero copy, toggle & reorder 10 sections, update stats, reviews, and FAQs.
          </p>
        </div>

        <button
          onClick={handleStageAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
        >
          {savedStatus ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-300" />
              <span>Staged in Draft!</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>Stage Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
        {[
          { id: 'hero', label: 'Hero Copy & CTAs' },
          { id: 'sections', label: '10-Section Toggles & Order' },
          { id: 'stats', label: 'Stats Counter Bar' },
          { id: 'testimonials', label: `Testimonials (${testimonials.length})` },
          { id: 'faqs', label: `FAQs (${faqs.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HERO */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <span>Hero Header & Call-to-Actions</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Top Badge Text
              </label>
              <input
                type="text"
                value={landing.hero.badge_text}
                onChange={(e) =>
                  setLanding({
                    ...landing,
                    hero: { ...landing.hero, badge_text: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Headline (Line 1)
                </label>
                <input
                  type="text"
                  value={landing.hero.headline_line1}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, headline_line1: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Headline (Gradient Highlight Text)
                </label>
                <input
                  type="text"
                  value={landing.hero.headline_gradient}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, headline_gradient: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subheadline Paragraph
              </label>
              <textarea
                rows={3}
                value={landing.hero.subheadline}
                onChange={(e) =>
                  setLanding({
                    ...landing,
                    hero: { ...landing.hero, subheadline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <span className="text-xs font-bold text-blue-400">Primary CTA Button</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={landing.hero.cta_primary_text}
                    onChange={(e) =>
                      setLanding({
                        ...landing,
                        hero: { ...landing.hero, cta_primary_text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Target URL</label>
                  <input
                    type="text"
                    value={landing.hero.cta_primary_url}
                    onChange={(e) =>
                      setLanding({
                        ...landing,
                        hero: { ...landing.hero, cta_primary_url: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <span className="text-xs font-bold text-purple-400">Secondary CTA Button</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={landing.hero.cta_secondary_text}
                    onChange={(e) =>
                      setLanding({
                        ...landing,
                        hero: { ...landing.hero, cta_secondary_text: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Target URL</label>
                  <input
                    type="text"
                    value={landing.hero.cta_secondary_url}
                    onChange={(e) =>
                      setLanding({
                        ...landing,
                        hero: { ...landing.hero, cta_secondary_url: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTIONS TOGGLES & ORDER */}
      {activeTab === 'sections' && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              Landing Page Sections (Enable / Disable & Reorder)
            </h2>
            <span className="text-[11px] text-slate-500">10 Sections Total</span>
          </div>

          <div className="space-y-2">
            {landing.sections.map((sec: any, index: number) => (
              <div
                key={sec.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${sec.enabled
                    ? 'bg-slate-950/80 border-slate-800/80'
                    : 'bg-slate-950/30 border-slate-800/40 opacity-60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-500 w-5">
                    {index + 1}.
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white">{sec.title}</span>
                    <span className="text-[10px] text-slate-500 ml-2 font-mono">id: {sec.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <MoveUp size={14} />
                  </button>

                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === landing.sections.length - 1}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <MoveDown size={14} />
                  </button>

                  <button
                    onClick={() => toggleSection(sec.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${sec.enabled
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                      }`}
                  >
                    {sec.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STATS */}
      {activeTab === 'stats' && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">Stats Counter Cards (4 Metrics)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {landing.stats.map((st: any, idx: number) => (
              <div key={st.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400">Stat #{idx + 1} ({st.id})</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Value Display</label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const newStats = [...landing.stats];
                        newStats[idx].value = e.target.value;
                        setLanding({ ...landing, stats: newStats });
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Main Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const newStats = [...landing.stats];
                        newStats[idx].label = e.target.value;
                        setLanding({ ...landing, stats: newStats });
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Sublabel Description</label>
                  <input
                    type="text"
                    value={st.sublabel}
                    onChange={(e) => {
                      const newStats = [...landing.stats];
                      newStats[idx].sublabel = e.target.value;
                      setLanding({ ...landing, stats: newStats });
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare size={16} className="text-purple-400" />
              <span>User Testimonials & Reviews</span>
            </h2>
            <button
              onClick={addTestimonial}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30"
            >
              <Plus size={13} />
              <span>Add Review Card</span>
            </button>
          </div>

          <div className="space-y-3">
            {testimonials.map((t: any, idx: number) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">#{idx + 1}</span>
                    <input
                      type="text"
                      value={t.author_name}
                      onChange={(e) => {
                        const next = [...testimonials];
                        next[idx].author_name = e.target.value;
                        setTestimonials(next);
                      }}
                      placeholder="Author Name"
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-white text-xs font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={t.tag}
                      onChange={(e) => {
                        const next = [...testimonials];
                        next[idx].tag = e.target.value;
                        setTestimonials(next);
                      }}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300"
                    >
                      <option value="Student">Student</option>
                      <option value="Academic">Academic</option>
                      <option value="Professional">Professional</option>
                      <option value="Career Changer">Career Changer</option>
                    </select>

                    <button
                      onClick={() => removeTestimonial(t.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={t.role}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].role = e.target.value;
                      setTestimonials(next);
                    }}
                    placeholder="Role / Title"
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                  />
                  <input
                    type="text"
                    value={t.company_or_school}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].company_or_school = e.target.value;
                      setTestimonials(next);
                    }}
                    placeholder="School or Company"
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                  />
                </div>

                <textarea
                  rows={2}
                  value={t.quote}
                  onChange={(e) => {
                    const next = [...testimonials];
                    next[idx].quote = e.target.value;
                    setTestimonials(next);
                  }}
                  placeholder="Review quote..."
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FAQS */}
      {activeTab === 'faqs' && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-400" />
              <span>FAQ Accordion Q&A</span>
            </h2>
            <button
              onClick={addFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30"
            >
              <Plus size={13} />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f: any, idx: number) => (
              <div key={f.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Q#{idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={f.category}
                      onChange={(e) => {
                        const next = [...faqs];
                        next[idx].category = e.target.value;
                        setFaqs(next);
                      }}
                      placeholder="Category"
                      className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-400"
                    />
                    <button
                      onClick={() => removeFaq(f.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={f.question}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].question = e.target.value;
                    setFaqs(next);
                  }}
                  placeholder="Question text"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs font-semibold"
                />

                <textarea
                  rows={3}
                  value={f.answer}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].answer = e.target.value;
                    setFaqs(next);
                  }}
                  placeholder="Answer text..."
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-xs leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
