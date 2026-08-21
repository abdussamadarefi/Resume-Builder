"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { useDraftState } from '@/hooks/useDraftState';
import { PageHeader, FormField } from '@/components/admin/ui';
import { BookOpen, Plus, Trash2, Clock, Sparkles, FileCode, CheckCircle2 } from 'lucide-react';
import articlesDefault from '@/content/articles/index.json';

const articleSampleMd = `## Introduction

Write an engaging introduction that clearly sets the context for your readers...

### Key Takeaways
- Point 1: Highlight key strengths
- Point 2: Tailor with keywords
- Point 3: Keep layout clean and parseable

> Pro Tip: Quantify achievements whenever possible.
`;

export default function ArticlesCMS() {
  const { stageFile } = useAdminDraftStore();
  const [articles, setArticles] = useDraftState('content/articles/index.json', articlesDefault);
  const [selectedSlug, setSelectedSlug] = useState<string>(articles[0]?.slug || '');
  const [articleBody, setArticleBody] = useState<string>(articleSampleMd);
  const [saved, setSaved] = useState(false);

  const editingArticle = articles.find((a: any) => a.slug === selectedSlug) || articles[0];

  const handleSelectArticle = async (art: any) => {
    setSelectedSlug(art.slug);
    try {
      const res = await fetch(`/api/admin/content?file=articles/${art.slug}.md`);
      if (res.ok) {
        const data = await res.json();
        setArticleBody(data.content || '');
      } else {
        setArticleBody(articleSampleMd);
      }
    } catch {
      setArticleBody(articleSampleMd);
    }
  };

  const handleCreateNew = () => {
    const newSlug = `new-article-${Date.now()}`;
    const newArt = {
      slug: newSlug,
      title: 'New Career Guide Title',
      description: 'Summary description for this guide...',
      category: 'Career Advice',
      category_color: '#3b82f6',
      read_time: '5 min read',
      published_at: new Date().toISOString().split('T')[0],
      target_audience: 'Job Seekers',
      is_published: true,
      featured: false,
      order: articles.length,
    };
    setArticles([...articles, newArt]);
    setSelectedSlug(newSlug);
    setArticleBody(articleSampleMd);
  };

  const handleDeleteArticle = (slug: string) => {
    if (articles.length <= 1) {
      alert('You must keep at least one article.');
      return;
    }
    const filtered = articles.filter((a: any) => a.slug !== slug);
    setArticles(filtered);
    if (selectedSlug === slug) {
      setSelectedSlug(filtered[0]?.slug || '');
    }
  };

  const handleStageChanges = () => {
    stageFile('content/articles/index.json', JSON.stringify(articles, null, 2), `Articles Index (${articles.length} Articles)`);
    if (selectedSlug && articleBody) {
      stageFile(`content/articles/${selectedSlug}.md`, articleBody, `Article Content: ${editingArticle?.title || selectedSlug}`);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setEditingArticle = (updated: any) => {
    setArticles(
      articles.map((a: any) => (a.slug === selectedSlug ? updated : a))
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BookOpen}
        title="Articles & Career Guides CMS"
        description="Publish and edit SEO articles, guide metadata, read times, and write full markdown body copy."
        onStage={handleStageChanges}
        saved={saved}
        actions={
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/20 transition-all shadow-sm"
          >
            <Plus size={14} />
            <span>Create Article</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Article List Selector */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Articles Index ({articles.length})
          </span>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {articles.map((art: any) => {
              const isSelected = selectedSlug === art.slug;
              return (
                <div
                  key={art.slug}
                  onClick={() => handleSelectArticle(art)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 shadow-sm dark:shadow-none ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-sm'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ backgroundColor: (art.category_color || '#3b82f6') + '20', color: art.category_color || '#3b82f6' }}
                    >
                      {art.category}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArticle(art.slug);
                      }}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {art.title}
                  </h3>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {art.read_time}
                    </span>
                    <span>For {art.target_audience}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Article Editor */}
        {editingArticle ? (
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Editing: <span className="text-blue-600 dark:text-blue-400 font-mono">{editingArticle.slug}</span>
              </span>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={editingArticle.is_published}
                    onChange={(e) => setEditingArticle({ ...editingArticle, is_published: e.target.checked })}
                    className="rounded bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Published</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={editingArticle.featured}
                    onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                    className="rounded bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-purple-600 focus:ring-0"
                  />
                  <span>Featured</span>
                </label>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4">
              <FormField
                label="Article Title"
                bold
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
              />

              <FormField
                label="Summary Description (SEO & Card Preview)"
                multiline
                rows={2}
                value={editingArticle.description}
                onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField
                  label="Category Label"
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                />

                <FormField
                  label="Read Time Estimate"
                  value={editingArticle.read_time}
                  onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                />

                <FormField
                  label="Target Audience"
                  value={editingArticle.target_audience}
                  onChange={(e) => setEditingArticle({ ...editingArticle, target_audience: e.target.value })}
                />
              </div>
            </div>

            {/* Markdown Body Editor */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <FileCode size={14} className="text-blue-600 dark:text-blue-400" />
                  <span>Article Content (Markdown)</span>
                </label>
                <span className="text-[10px] text-slate-500">Supports Headings, Lists, Quotes, Code</span>
              </div>

              <textarea
                rows={16}
                value={articleBody}
                onChange={(e) => setArticleBody(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-blue-500 rounded-xl text-slate-900 dark:text-slate-100 text-xs font-mono leading-relaxed shadow-sm dark:shadow-none focus:outline-none"
                placeholder="# Write your article in markdown..."
              />
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-slate-500 text-xs">
            Select an article from the left list to begin editing.
          </div>
        )}
      </div>
    </div>
  );
}
