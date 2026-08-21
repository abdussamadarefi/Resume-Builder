"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { useDraftState } from '@/hooks/useDraftState';
import { PageHeader, TabBar, Card, FormField } from '@/components/admin/ui';
import {
  Layers,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  HelpCircle,
  MessageSquare,
  BarChart3,
} from 'lucide-react';
import landingDefault from '@/content/landing.json';
import testimonialsDefault from '@/content/testimonials.json';
import faqsDefault from '@/content/faqs.json';

export default function LandingPageCMS() {
  const { stageFile } = useAdminDraftStore();

  const [landing, setLanding] = useDraftState('content/landing.json', landingDefault);
  const [testimonials, setTestimonials] = useDraftState('content/testimonials.json', testimonialsDefault);
  const [faqs, setFaqs] = useDraftState('content/faqs.json', faqsDefault);

  const [activeTab, setActiveTab] = useState<'hero' | 'sections' | 'stats' | 'testimonials' | 'faqs'>('hero');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleStageAll = () => {
    stageFile('content/landing.json', JSON.stringify(landing, null, 2), 'Landing Page (Hero & Sections)');
    stageFile('content/testimonials.json', JSON.stringify(testimonials, null, 2), 'User Testimonials');
    stageFile('content/faqs.json', JSON.stringify(faqs, null, 2), 'FAQ Accordion');

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const toggleSection = (id: string) => {
    setLanding((prev: any) => ({
      ...prev,
      sections: prev.sections.map((s: any) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

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
      <PageHeader
        icon={Layers}
        title="Landing Page & Homepage CMS"
        description="Edit Hero headlines, reorder homepage feature sections, manage live counter statistics, reviews, and FAQs."
        onStage={handleStageAll}
        saved={savedStatus}
      />

      <TabBar
        active={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'hero', label: 'Hero Header', icon: Sparkles },
          { id: 'sections', label: '10-Section Layout & Toggles', count: landing.sections?.length, icon: Layers },
          { id: 'stats', label: 'Live Stats Counters', count: landing.stats?.length, icon: BarChart3 },
          { id: 'testimonials', label: 'User Testimonials', count: testimonials.length, icon: MessageSquare },
          { id: 'faqs', label: 'FAQ Accordions', count: faqs.length, icon: HelpCircle },
        ]}
      />

      {/* TAB 1: HERO */}
      {activeTab === 'hero' && (
        <Card title="Hero Showcase Headline & Callouts" icon={Sparkles}>
          <div className="space-y-4">
            <FormField
              label="Badge / Announcement Pill Text"
              value={landing.hero.badge_text}
              onChange={(e) =>
                setLanding({
                  ...landing,
                  hero: { ...landing.hero, badge_text: e.target.value },
                })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Main Headline Line 1"
                value={landing.hero.headline_line1}
                onChange={(e) =>
                  setLanding({
                    ...landing,
                    hero: { ...landing.hero, headline_line1: e.target.value },
                  })
                }
              />

              <FormField
                label="Headline (Gradient Highlight Text)"
                value={landing.hero.headline_gradient}
                onChange={(e) =>
                  setLanding({
                    ...landing,
                    hero: { ...landing.hero, headline_gradient: e.target.value },
                  })
                }
              />
            </div>

            <FormField
              label="Subheadline Paragraph"
              multiline
              rows={3}
              value={landing.hero.subheadline}
              onChange={(e) =>
                setLanding({
                  ...landing,
                  hero: { ...landing.hero, subheadline: e.target.value },
                })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm dark:shadow-none">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Primary CTA Button</span>
                <FormField
                  label="Button Text"
                  value={landing.hero.cta_primary_text}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, cta_primary_text: e.target.value },
                    })
                  }
                />
                <FormField
                  label="Target URL"
                  mono
                  value={landing.hero.cta_primary_url}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, cta_primary_url: e.target.value },
                    })
                  }
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm dark:shadow-none">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Secondary CTA Button</span>
                <FormField
                  label="Button Text"
                  value={landing.hero.cta_secondary_text}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, cta_secondary_text: e.target.value },
                    })
                  }
                />
                <FormField
                  label="Target URL"
                  mono
                  value={landing.hero.cta_secondary_url}
                  onChange={(e) =>
                    setLanding({
                      ...landing,
                      hero: { ...landing.hero, cta_secondary_url: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 2: SECTIONS TOGGLES & ORDER */}
      {activeTab === 'sections' && (
        <Card
          title="Landing Page Sections (Enable / Disable & Reorder)"
          badge="10 Sections Total"
          icon={Layers}
        >
          <div className="space-y-2">
            {landing.sections.map((sec: any, index: number) => (
              <div
                key={sec.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all shadow-sm dark:shadow-none ${
                  sec.enabled
                    ? 'bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800/80'
                    : 'bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800/40 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-500 w-5">
                    {index + 1}.
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{sec.title}</span>
                    <span className="text-[10px] text-slate-500 ml-2 font-mono">id: {sec.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 border border-slate-200 dark:border-slate-800"
                    title="Move up"
                  >
                    <MoveUp size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === landing.sections.length - 1}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 border border-slate-200 dark:border-slate-800"
                    title="Move down"
                  >
                    <MoveDown size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSection(sec.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      sec.enabled
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {sec.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: STATS */}
      {activeTab === 'stats' && (
        <Card title="Stats Counter Cards (4 Metrics)" icon={BarChart3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {landing.stats.map((st: any, idx: number) => (
              <div key={st.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Stat #{idx + 1} ({st.id})</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    label="Value Display"
                    value={st.value}
                    bold
                    onChange={(e) => {
                      const newStats = [...landing.stats];
                      newStats[idx].value = e.target.value;
                      setLanding({ ...landing, stats: newStats });
                    }}
                  />

                  <FormField
                    label="Main Label"
                    value={st.label}
                    onChange={(e) => {
                      const newStats = [...landing.stats];
                      newStats[idx].label = e.target.value;
                      setLanding({ ...landing, stats: newStats });
                    }}
                  />
                </div>

                <FormField
                  label="Sublabel Description"
                  value={st.sublabel}
                  onChange={(e) => {
                    const newStats = [...landing.stats];
                    newStats[idx].sublabel = e.target.value;
                    setLanding({ ...landing, stats: newStats });
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <Card
          title="User Testimonials & Reviews"
          icon={MessageSquare}
          action={
            <button
              type="button"
              onClick={addTestimonial}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/20"
            >
              <Plus size={13} />
              <span>Add Review Card</span>
            </button>
          }
        >
          <div className="space-y-3">
            {testimonials.map((t: any, idx: number) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">#{idx + 1}</span>
                    <input
                      type="text"
                      value={t.author_name}
                      onChange={(e) => {
                        const next = [...testimonials];
                        next[idx].author_name = e.target.value;
                        setTestimonials(next);
                      }}
                      placeholder="Author Name"
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs font-bold shadow-sm dark:shadow-none focus:outline-none focus:border-blue-500"
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
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-300 shadow-sm dark:shadow-none focus:outline-none focus:border-blue-500"
                    >
                      <option value="Student">Student</option>
                      <option value="Academic">Academic</option>
                      <option value="Professional">Professional</option>
                      <option value="Career Changer">Career Changer</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => removeTestimonial(t.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <FormField
                    placeholder="Role / Title"
                    value={t.role}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].role = e.target.value;
                      setTestimonials(next);
                    }}
                  />
                  <FormField
                    placeholder="School or Company"
                    value={t.company_or_school}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].company_or_school = e.target.value;
                      setTestimonials(next);
                    }}
                  />
                </div>

                <FormField
                  multiline
                  rows={2}
                  placeholder="Review quote..."
                  value={t.quote}
                  onChange={(e) => {
                    const next = [...testimonials];
                    next[idx].quote = e.target.value;
                    setTestimonials(next);
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: FAQS */}
      {activeTab === 'faqs' && (
        <Card
          title="FAQ Accordion Q&A"
          icon={HelpCircle}
          action={
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/20"
            >
              <Plus size={13} />
              <span>Add Question</span>
            </button>
          }
        >
          <div className="space-y-3">
            {faqs.map((f: any, idx: number) => (
              <div key={f.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2.5 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Q#{idx + 1}</span>
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
                      className="px-2.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md text-[11px] text-slate-700 dark:text-slate-400 shadow-sm dark:shadow-none focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFaq(f.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <FormField
                  placeholder="Question text"
                  value={f.question}
                  bold
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].question = e.target.value;
                    setFaqs(next);
                  }}
                />

                <FormField
                  multiline
                  rows={3}
                  placeholder="Answer text..."
                  value={f.answer}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].answer = e.target.value;
                    setFaqs(next);
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
