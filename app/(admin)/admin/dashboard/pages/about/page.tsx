"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { Info, Save, CheckCircle2, Heart, Shield, Code, Sparkles, User, Mail } from 'lucide-react';
import aboutDefault from '@/content/about.json';

export default function AboutPageCMS() {
  const { stageFile, stagedFiles } = useAdminDraftStore();

  const [about, setAbout] = useState(() => {
    if (stagedFiles['content/about.json']) {
      try {
        return JSON.parse(stagedFiles['content/about.json'].content);
      } catch { }
    }
    return aboutDefault;
  });

  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/about.json', JSON.stringify(about, null, 2), 'About Us Page Content');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Info className="text-blue-400" size={20} />
            <span>About Page Controller (/about)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your mission statement, 4 core values cards, creator bio & socials, and open-source CTA banner.
          </p>
        </div>

        <button
          onClick={handleStage}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
        >
          {saved ? (
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

      {/* Hero & Story */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <span>Story & Mission Paragraphs</span>
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
            <input
              type="text"
              value={about.hero.badge}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, badge: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Headline</label>
            <input
              type="text"
              value={about.hero.title}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, title: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
            <textarea
              rows={2}
              value={about.hero.subtitle}
              onChange={(e) => setAbout({ ...about, hero: { ...about.hero, subtitle: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mission Paragraphs (JSON array of strings)</label>
            <textarea
              rows={4}
              value={JSON.stringify(about.mission.paragraphs, null, 2)}
              onChange={(e) => {
                try {
                  const arr = JSON.parse(e.target.value);
                  setAbout({ ...about, mission: { ...about.mission, paragraphs: arr } });
                } catch { }
              }}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Core Values (4 Cards) */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Heart size={16} className="text-rose-400" />
          <span>4 Core Value Cards</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.values.map((v: any, idx: number) => (
            <div key={v.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400">Card #{idx + 1} ({v.icon_name})</span>
              <input
                type="text"
                value={v.title}
                onChange={(e) => {
                  const next = [...about.values];
                  next[idx].title = e.target.value;
                  setAbout({ ...about, values: next });
                }}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs font-bold"
              />
              <textarea
                rows={2}
                value={v.description}
                onChange={(e) => {
                  const next = [...about.values];
                  next[idx].description = e.target.value;
                  setAbout({ ...about, values: next });
                }}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 text-xs leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Creator Profile */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <User size={16} className="text-emerald-400" />
          <span>Creator & Maintainer Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Creator Name</label>
            <input
              type="text"
              value={about.creator.name}
              onChange={(e) => setAbout({ ...about, creator: { ...about.creator, name: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Title / Role</label>
            <input
              type="text"
              value={about.creator.title}
              onChange={(e) => setAbout({ ...about, creator: { ...about.creator, title: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">GitHub URL</label>
            <input
              type="text"
              value={about.creator.github_url}
              onChange={(e) => setAbout({ ...about, creator: { ...about.creator, github_url: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Contact Email</label>
            <input
              type="text"
              value={about.creator.email}
              onChange={(e) => setAbout({ ...about, creator: { ...about.creator, email: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-slate-400 mb-1">Bio Summary</label>
          <textarea
            rows={2}
            value={about.creator.bio}
            onChange={(e) => setAbout({ ...about, creator: { ...about.creator, bio: e.target.value } })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
