'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformsGrid from '@/components/portal/PlatformsGrid';
import { Platform } from '@/types';
import { getPlatforms } from '@/lib/storage';

export default function HomePage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlatforms(getPlatforms());
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-support-light">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">منصات وأنظمة التدريب</h1>
            <p className="text-support-muted max-w-2xl mx-auto">تصفح المنصات والأنظمة المتاحة في إدارة عمليات التدريب</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-support-gray p-6 animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 bg-support-gray rounded-xl" />
                  <div className="h-5 bg-support-gray rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-support-gray rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <PlatformsGrid platforms={platforms} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
