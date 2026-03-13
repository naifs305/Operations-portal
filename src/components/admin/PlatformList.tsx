'use client';

import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';
import { Platform } from '@/types';

interface PlatformListProps {
  platforms: Platform[];
  onEdit: (platform: Platform) => void;
  onDelete: (id: string) => void;
}

export default function PlatformList({
  platforms,
  onEdit,
  onDelete,
}: PlatformListProps) {
  if (!platforms.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d6d7d4] bg-white px-6 py-10 text-center">
        <h3 className="text-base font-bold text-[#016564]">لا توجد منصات</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {platforms.map((platform) => {
        const imageSrc = platform.icon?.trim() || '/images/platform-placeholder.svg';

        return (
          <div
            key={platform.id}
            className="rounded-2xl border border-[#e3e5e4] bg-white p-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={imageSrc}
                    alt={platform.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#016564]">
                    {platform.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5f6f86]">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(platform)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d6d7d4] px-4 py-2 text-sm font-semibold text-[#016564] transition hover:bg-[#f3f6f6]"
                >
                  <Pencil size={16} />
                  تعديل
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(platform.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}