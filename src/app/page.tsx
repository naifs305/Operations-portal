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

      <main className="flex-1 px-6 py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-[24px] font-bold text-[var(--text)] md:text-[28px]">
              المنصات والأنظمة
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)] md:text-[16px]">
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