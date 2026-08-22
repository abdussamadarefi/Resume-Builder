"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import {
  BookOpen,
  Plus,
  Save,
  CheckCircle2,
  Trash2,
  Edit,
  Clock,
  Tag,
  Eye,
  FileCode,
} from 'lucide-react';
import articlesIndexDefault from '@/content/articles/index.json';

export default function ArticlesCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [articles, setArticles] = useState(() => {
    if (stagedFiles['content/articles/index.json']) {
      try {
        return JSON.parse(stagedFiles['content/articles/index.json'].content);
      } catch { }
    }
    return articlesIndexDefault;
  });

  const [selectedSlug, setSelectedSlug] = useState<string | null>(articles[0]?.slug || null);
  const [editingArticle, setEditingArticle] = useState<any>(articles[0] || null);
  const [articleBody, setArticleBody] = useState<string>(`# Article Title\n\nWrite your guide content here in markdown...`);
  const [saved, setSaved] = useState(false);

  const handleSelectArticle = (art: any) => {
    setSelectedSlug(art.slug);
    setEditingArticle({ ...art });

    // Check if body is in draft, or fallback
    const draftMd = stagedFiles[`content/articles/${art.slug}.md`];
    if (draftMd) {
      setArticleBody(draftMd.content);
    } else {
      // Default markdown template
      setArticleBody(`# ${art.title}\n\n## Introduction\n${art.description}\n\n## Key Takeaways\n1. Strategy one\n2. Strategy two\n\n## Conclusion\nSummary here...`);
    }
  };

  const handleSaveArticle = () => {
    if (!editingArticle) return;

    // Update list
    const nextList = articles.map((a: any) =>
      a.slug === editingArticle.slug ? editingArticle : a
    );
    setArticles(nextList);

    // Stage index.json and [slug].md
    stageFile('content/articles/index.json', JSON.stringify(nextList, null, 2), `Articles Catalog (${nextList.length} guides)`);
    stageFile(`content/articles/${editingArticle.slug}.md`, articleBody, `Article: ${editingArticle.title}`);

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCreateNew = () => {
    const newSlug = `career-guide-${Date.now()}`;
    const newArt = {
      slug: newSlug,
      title: 'New Career Guide Title',
      description: 'A brief description of this new career guide for students and professionals.',
      category: 'Career Advice',
      category_color: '#3b82f6',
      read_time: '7 min read',
      target_audience: 'Job Seekers',
      published_at: new Date().toISOString().split('T')[0],
      is_published: true,
      featured: false,
      order: articles.length,
    };

    const nextList = [newArt, ...articles];
    setArticles(nextList);
    setSelectedSlug(newSlug);
    setEditingArticle(newArt);
    setArticleBody(`# ${newArt.title}\n\n## Introduction\n${newArt.description}\n\nWrite full content here...`);
  };

  const handleDeleteArticle = (slug: string) => {
    const nextList = articles.filter((a: any) => a.slug !== slug);
    setArticles(nextList);
    stageFile('content/articles/index.json', JSON.stringify(nextList, null, 2), `Articles Catalog (${nextList.length} guides)`);

    if (selectedSlug === slug) {
      if (nextList.length > 0) {
        handleSelectArticle(nextList[0]);
      } else {
        setSelectedSlug(null);
        setEditingArticle(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="text-purple-400" size={20} />
            <span>Articles & Career Guides CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, and publish SEO career guides with live Markdown editor and metadata controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 text-xs font-bold transition-all"
          >
            <Plus size={14} />
            <span>New Guide</span>
          </button>

          <button
            onClick={handleSaveArticle}
            disabled={!editingArticle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-40"
          >
            {saved ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-300" />
                <span>Staged in Draft!</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Stage Article</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Article List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            All Articles ({articles.length})
          </h2>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {articles.map((art: any) => {
              const isSelected = selectedSlug === art.slug;
              return (
                <div
                  key={art.slug}
                  onClick={() => handleSelectArticle(art)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${isSelected
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArticle(art.slug);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-white line-clamp-1">
                    {art.title}
                  </h3>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
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
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-slate-200">
                Editing: <span className="text-blue-400">{editingArticle.slug}</span>
              </span>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.is_published}
                    onChange={(e) => setEditingArticle({ ...editingArticle, is_published: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Published</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArticle.featured}
                    onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-0"
                  />
                  <span>Featured</span>
                </label>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Summary Description (SEO & Card Preview)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.description}
                  onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Category Label</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Read Time Estimate</label>
                  <input
                    type="text"
                    value={editingArticle.read_time}
                    onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={editingArticle.target_audience}
                    onChange={(e) => setEditingArticle({ ...editingArticle, target_audience: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Markdown Body Editor */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <FileCode size={14} className="text-blue-400" />
                  <span>Article Content (Markdown)</span>
                </label>
                <span className="text-[10px] text-slate-500">Supports Headings, Lists, Quotes, Code</span>
              </div>

              <textarea
                rows={16}
                value={articleBody}
                onChange={(e) => setArticleBody(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-100 text-xs font-mono leading-relaxed"
                placeholder="# Write your article in markdown..."
              />
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-slate-500 text-xs">
            Select an article from the left or create a new guide.
          </div>
        )}
      </div>
    </div>
  );
}
