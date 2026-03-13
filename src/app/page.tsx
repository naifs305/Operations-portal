'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformsGrid from '@/components/portal/PlatformsGrid';
import { Platform } from '@/types';
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
  const [columns, setColumns] = useState<2 | 3 | 4 | 5>(4);

  useEffect(() => {
    seedDefaultPlatforms();
    seedPortalSettings();

    setPlatforms(getPlatforms().filter((p) => p.visible !== false));
    setColumns(getPortalSettings().columns);
    incrementPortalVisit();
    setVisits(getPortalVisits());
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header isAdmin={false} />

      <main
        className="flex-1 px-6 pb-12 pt-6 md:px-10 md:pb-14 md:pt-7"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url('https://png.pngtree.com/thumb_back/fh260/background/20210812/pngtree-white-background-gray-dot-gradient-perspective-ripple-shape-business-background-image_760038.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <h1 className="mb-1 text-[24px] font-bold text-[var(--text)] md:text-[27px]">
              المنصات والأنظمة
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)] md:text-[15px]">
              تصفح المنصات والأنظمة المتاحة في إدارة عمليات التدريب
            </p>
          </div>

          <PlatformsGrid platforms={platforms} columns={columns} />
        </div>
      </main>

      <Footer visits={visits} />
    </div>
  );
}