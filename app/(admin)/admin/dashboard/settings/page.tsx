"use client";

import React, { useState } from 'react';
import { useAdminDraftStore } from '@/store/adminDraftStore';
import { useDraftState } from '@/hooks/useDraftState';
import { PageHeader, Card, FormField, Toggle } from '@/components/admin/ui';
import { Settings, Bell, Globe } from 'lucide-react';
import settingsDefault from '@/content/site-settings.json';

export default function SiteSettingsCMS() {
  const { stageFile } = useAdminDraftStore();
  const [settings, setSettings] = useDraftState('content/site-settings.json', settingsDefault);
  const [saved, setSaved] = useState(false);

  const handleStage = () => {
    stageFile('content/site-settings.json', JSON.stringify(settings, null, 2), 'Site Settings & Announcements');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        icon={Settings}
        title="Global Site Settings"
        description="Configure site identity, GA4 Measurement ID, support contact email, and real-time announcement banner."
        onStage={handleStage}
        saved={saved}
      />

      {/* General Identity */}
      <Card title="Site Identity & Analytics" icon={Globe}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Site Title"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
          />

          <FormField
            label="Production URL"
            mono
            value={settings.site_url}
            onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
          />

          <FormField
            label="Google Analytics 4 Measurement ID"
            mono
            value={settings.ga_measurement_id}
            onChange={(e) => setSettings({ ...settings, ga_measurement_id: e.target.value })}
          />

          <FormField
            label="Support / Inquiries Email"
            value={settings.support_email}
            onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
          />
        </div>
      </Card>

      {/* Broadcast Announcement */}
      <Card
        title="Site-Wide Announcement Banner"
        icon={Bell}
        iconColor="text-amber-400"
        action={
          <Toggle
            label="Show Banner"
            checked={settings.announcement.enabled}
            onChange={(checked) =>
              setSettings({
                ...settings,
                announcement: { ...settings.announcement, enabled: checked },
              })
            }
          />
        }
      >
        <div className="space-y-3">
          <FormField
            label="Banner Message"
            value={settings.announcement.message}
            onChange={(e) =>
              setSettings({
                ...settings,
                announcement: { ...settings.announcement, message: e.target.value },
              })
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              label="Action Link Text (Optional)"
              placeholder="e.g. Learn More"
              value={settings.announcement.link_text || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement: { ...settings.announcement, link_text: e.target.value },
                })
              }
            />

            <FormField
              label="Action Target URL (Optional)"
              mono
              placeholder="e.g. /templates"
              value={settings.announcement.link_url || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcement: { ...settings.announcement, link_url: e.target.value },
                })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
