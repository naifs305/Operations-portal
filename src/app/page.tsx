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
    <div className="min-h-screen bg-[#f5f7f8] text-gray-900">
      <Header isAdmin={false} />

      <main className="relative">
        <section className="relative overflow-hidden border-t border-[#d6d7d4]/60 bg-[#f5f7f8]">
          <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#d8dde0_1.2px,transparent_1.2px)] [background-size:18px_18px]" />

          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold text-[#00a6a6] sm:text-4xl">مزودي الخدمات</h1>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
                    <div className="mx-auto mb-6 h-20 w-20 animate-pulse rounded bg-[#e5e7eb]" />
                    <div className="mx-auto mb-3 h-6 w-3/4 animate-pulse rounded bg-[#e5e7eb]" />
                    <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-[#eef2f3]" />
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
