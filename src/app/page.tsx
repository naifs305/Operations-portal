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
        className="flex-1 px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-5 md:px-10 md:pb-14 md:pt-7"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url('https://png.pngtree.com/thumb_back/fh260/background/20210812/pngtree-white-background-gray-dot-gradient-perspective-ripple-shape-business-background-image_760038.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-1 text-[20px] font-bold text-[var(--text)] sm:text-[24px] md:text-[27px]">
              المنصات والأنظمة
            </h1>
            <p className="mx-auto max-w-[720px] text-[13px] leading-7 text-[var(--text-secondary)] sm:text-[14px] md:text-[15px]">
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