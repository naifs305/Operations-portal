'use client';

import { Platform } from '@/types';
import PlatformCard from './PlatformCard';

interface PlatformsGridProps {
  platforms: Platform[];
}

export default function PlatformsGrid({ platforms }: PlatformsGridProps) {
  const visiblePlatforms = platforms.filter((p) => p.visible);

  if (visiblePlatforms.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-support-light flex items-center justify-center">
          <svg className="w-8 h-8 text-support-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منصات متاحة حالياً</h3>
        <p className="text-sm text-support-muted">يرجى التحقق من إعدادات البوابة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {visiblePlatforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
}
