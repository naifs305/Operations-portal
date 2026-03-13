'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformsGrid from '@/components/portal/PlatformsGrid';
import { Platform, PortalSettings } from '@/types';
import {
  getPlatforms,
  seedDefaultPlatforms,
  incrementPortalVisit,
  getPortalVisits,
  getPortalSettings,
  seedPortalSettings,
} from '@/lib/storage';

export default function HomePage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [visits, setVisits] = useState(0);
  const [settings, setSettings] = useState<PortalSettings>({ columns: 4 });

  useEffect(() => {
    seedDefaultPlatforms();
    seedPortalSettings();

    setPlatforms(getPlatforms().filter((p) => p.visible !== false));
    setSettings(getPortalSettings());
    incrementPortalVisit();
    setVisits(getPortalVisits());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header isAdmin={false} />

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-9 text-center">
            <h1 className="mb-2 text-[26px] font-bold text-[var(--text)] md:text-[30px]">
              المنصات والأنظمة
            </h1>
            <p className="text-[15px] text-[var(--text-secondary)]">
              تصفح المنصات والأنظمة المتاحة في إدارة عمليات التدريب
            </p>
          </div>

          <PlatformsGrid platforms={platforms} columns={settings.columns} />
        </div>
      </main>

      <Footer visits={visits} />
    </div>
  );
}