"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { useDraftState } from '@/hooks/useDraftState';
import { PageHeader, Card, FormField } from '@/components/admin/ui';
import { Info, Heart, Sparkles, User } from 'lucide-react';
import aboutDefault from '@/content/about.json';

export default function AboutPageCMS() {
  const { stageFile } = useAdminDraftStore();
  const [about, setAbout] = useDraftState('content/about.json', aboutDefault);
  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/about.json', JSON.stringify(about, null, 2), 'About Us Page Content');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        icon={Info}
        title="About Page Controller (/about)"
        description="Manage your mission statement, 4 core values cards, creator bio & socials, and open-source CTA banner."
        onStage={handleStage}
        saved={saved}
      />

      {/* Hero & Story */}
      <Card title="Story & Mission Paragraphs" icon={Sparkles}>
        <div className="space-y-3">
          <FormField
            label="Badge Text"
            value={about.hero.badge}
            onChange={(e) => setAbout({ ...about, hero: { ...about.hero, badge: e.target.value } })}
          />

          <FormField
            label="Headline"
            bold
            value={about.hero.title}
            onChange={(e) => setAbout({ ...about, hero: { ...about.hero, title: e.target.value } })}
          />

          <FormField
            label="Subtitle"
            multiline
            rows={2}
            value={about.hero.subtitle}
            onChange={(e) => setAbout({ ...about, hero: { ...about.hero, subtitle: e.target.value } })}
          />

          <FormField
            label="Mission Paragraphs (JSON array of strings)"
            multiline
            rows={4}
            mono
            value={JSON.stringify(about.mission.paragraphs, null, 2)}
            onChange={(e) => {
              try {
                const arr = JSON.parse(e.target.value);
                setAbout({ ...about, mission: { ...about.mission, paragraphs: arr } });
              } catch {}
            }}
          />
        </div>
      </Card>

      {/* Core Values (4 Cards) */}
      <Card title="4 Core Value Cards" icon={Heart} iconColor="text-rose-600 dark:text-rose-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.values.map((v: any, idx: number) => (
            <div key={v.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-2.5 shadow-sm dark:shadow-none">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Card #{idx + 1} ({v.icon_name})</span>
              <FormField
                bold
                value={v.title}
                onChange={(e) => {
                  const next = [...about.values];
                  next[idx].title = e.target.value;
                  setAbout({ ...about, values: next });
                }}
              />
              <FormField
                multiline
                rows={2}
                value={v.description}
                onChange={(e) => {
                  const next = [...about.values];
                  next[idx].description = e.target.value;
                  setAbout({ ...about, values: next });
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Creator Profile */}
      <Card title="Creator & Maintainer Profile" icon={User} iconColor="text-emerald-600 dark:text-emerald-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Creator Name"
            value={about.creator.name}
            onChange={(e) => setAbout({ ...about, creator: { ...about.creator, name: e.target.value } })}
          />

          <FormField
            label="Title / Role"
            value={about.creator.title}
            onChange={(e) => setAbout({ ...about, creator: { ...about.creator, title: e.target.value } })}
          />

          <FormField
            label="GitHub URL"
            mono
            value={about.creator.github_url}
            onChange={(e) => setAbout({ ...about, creator: { ...about.creator, github_url: e.target.value } })}
          />

          <FormField
            label="Contact Email"
            value={about.creator.email}
            onChange={(e) => setAbout({ ...about, creator: { ...about.creator, email: e.target.value } })}
          />
        </div>

        <FormField
          label="Bio Summary"
          multiline
          rows={2}
          value={about.creator.bio}
          onChange={(e) => setAbout({ ...about, creator: { ...about.creator, bio: e.target.value } })}
        />
      </Card>
    </div>
  );
}
