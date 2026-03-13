import PlatformCard from './PlatformCard';
import { Platform } from '@/types';

export default function PlatformsGrid({
  platforms,
  columns = 4,
}: {
  platforms: Platform[];
  columns?: 2 | 3 | 4 | 5;
}) {
  if (!platforms.length) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-6 py-14 text-center">
        <h3 className="text-[17px] font-semibold text-[var(--text)]">لا توجد منصات متاحة</h3>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">أضف منصة جديدة من لوحة الإدارة</p>
      </div>
    );
  }

  const gridClassMap: Record<2 | 3 | 4 | 5, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  };

  return (
    <div className={`grid gap-4 sm:gap-5 md:gap-6 ${gridClassMap[columns]}`}>
      {platforms.map((platform, index) => (
        <PlatformCard key={platform.id} platform={platform} index={index} />
      ))}
    </div>
  );
}