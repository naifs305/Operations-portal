'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformsGrid from '@/components/portal/PlatformsGrid';
import { Platform } from '@/types';
import { getPlatforms, seedDefaultPlatforms } from '@/lib/storage';

export default function HomePage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    seedDefaultPlatforms();
    const loadedPlatforms = getPlatforms();
    setPlatforms(loadedPlatforms.filter((p) => p.visible !== false));
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f9f9] text-[#1f2937]">
      <Header isAdmin={false} />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden border-t border-[#d6d7d4] bg-[#f1f3f2]">
          <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#d6d7d4_1.1px,transparent_1.1px)] [background-size:18px_18px]" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[#016564] sm:text-4xl">
                بوابة إدارة عمليات التدريب
              </h1>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-[#d6d7d4] bg-white p-6 shadow-sm"
                  >
                    <div className="mx-auto mb-5 h-16 w-16 animate-pulse rounded-2xl bg-[#e5e7eb]" />
                    <div className="mx-auto mb-3 h-5 w-3/4 animate-pulse rounded bg-[#e5e7eb]" />
                    <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-[#eef2f3]" />
                  </div>
                ))}
              </div>
            ) : (
              <PlatformsGrid platforms={platforms} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}