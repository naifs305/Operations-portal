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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        await seedDefaultPlatforms();
        await seedPortalSettings();

        const loadedPlatforms = await getPlatforms();
        const loadedSettings = await getPortalSettings();

        setPlatforms(loadedPlatforms.filter((p) => p.visible !== false));
        setColumns(loadedSettings.columns);
        incrementPortalVisit();
        setVisits(getPortalVisits());
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header isAdmin={false} />

      <main className="relative flex-1 bg-white px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-5 md:bg-transparent md:px-10 md:pb-14 md:pt-7">
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url('https://png.pngtree.com/thumb_back/fh260/background/20210812/pngtree-white-background-gray-dot-gradient-perspective-ripple-shape-business-background-image_760038.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-1 text-[20px] font-bold text-[var(--text)] sm:text-[24px] md:text-[27px]">
              المنصات والأنظمة
            </h1>
            <p className="mx-auto max-w-[720px] text-[13px] leading-7 text-[var(--text-secondary)] sm:text-[14px] md:text-[15px]">
              تصفح المنصات والأنظمة المتاحة في إدارة عمليات التدريب
            </p>
          </div>

          {isLoading ? (
            <div className={`grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : columns === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-5'}`}>
              {Array.from({ length: columns === 5 ? 5 : 4 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-[220px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-card)] sm:min-h-[250px] sm:p-5 lg:min-h-[270px]"
                >
                  <div className="mx-auto mb-4 h-[72px] w-[72px] animate-pulse rounded-full border border-[var(--border)] bg-[#f3f4f6] sm:h-[82px] sm:w-[82px] lg:h-[88px] lg:w-[88px]" />
                  <div className="mx-auto mb-3 h-5 w-3/4 animate-pulse rounded bg-[#f3f4f6]" />
                  <div className="mx-auto mb-2 h-4 w-5/6 animate-pulse rounded bg-[#f3f4f6]" />
                  <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-[#f3f4f6]" />
                </div>
              ))}
            </div>
          ) : (
            <PlatformsGrid platforms={platforms} columns={columns} />
          )}
        </div>
      </main>

      <Footer visits={visits} />
    </div>
  );
}