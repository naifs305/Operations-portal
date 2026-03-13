import PlatformCard from './PlatformCard';
import { Platform } from '@/types';

export default function PlatformsGrid({ platforms }: { platforms: Platform[] }) {
  if (!platforms.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d6d7d4] bg-white px-6 py-12 text-center shadow-sm">
        <h3 className="text-lg font-bold text-[#016564]">لا توجد منصات متاحة</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
}