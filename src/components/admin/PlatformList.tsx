'use client';

import Image from 'next/image';
import { Eye, EyeOff, ExternalLink, GripHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Platform } from '@/types';
import { getPlatformVisits } from '@/lib/storage';

interface PlatformListProps {
  platforms: Platform[];
  onEdit: (platform: Platform) => void;
  onDelete: (id: string) => void;
  onMove?: (draggedId: string, targetId: string) => void;
  onToggleVisibility?: (id: string) => void;
}

export default function PlatformList({
  platforms,
  onEdit,
  onDelete,
  onMove,
  onToggleVisibility,
}: PlatformListProps) {
  const visits = getPlatformVisits();

  if (!platforms.length) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-6 py-[52px] text-center">
        <h3 className="mb-2 text-[17px] font-semibold text-[var(--text)]">لا توجد منصات</h3>
        <p className="text-sm text-[var(--text-secondary)]">أضف منصة جديدة للبدء</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {platforms.map((platform) => {
        const image = platform.icon?.trim() || 'https://api.iconify.design/mdi:web.svg?color=%23016564';
        const visitCount = visits[platform.id] || 0;

        return (
          <div
            key={platform.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', platform.id);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const draggedId = e.dataTransfer.getData('text/plain');
              if (draggedId && draggedId !== platform.id && onMove) {
                onMove(draggedId, platform.id);
              }
            }}
            className="flex items-center gap-[14px] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[18px] py-4 transition-colors hover:border-[var(--primary)]"
          >
            <div className="cursor-grab text-[var(--text-muted)]">
              <GripHorizontal size={20} />
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)]">
              <Image
                src={image}
                alt=""
                width={26}
                height={26}
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-[var(--text)]">
                <span>{platform.name}</span>
                {platform.visible === false ? (
                  <span className="rounded px-2 py-[3px] text-[11px] font-medium text-[#dc2626] bg-[#fef2f2]">
                    مخفي
                  </span>
                ) : null}
              </div>

              <div className="mt-[3px] text-[13px] text-[var(--text-secondary)]">
                {platform.description || 'بدون وصف'}
              </div>

              <div className="mt-[5px] text-xs font-semibold text-[var(--gold)]">
                {visitCount.toLocaleString('ar-SA')} زيارة
              </div>
            </div>

            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={() => onToggleVisibility?.(platform.id)}
                className="flex rounded-md p-[10px] text-[var(--text-muted)] transition-all hover:bg-[var(--background)] hover:text-[var(--primary)]"
                title={platform.visible === false ? 'إظهار' : 'إخفاء'}
              >
                {platform.visible === false ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-md p-[10px] text-[var(--text-muted)] transition-all hover:bg-[var(--background)] hover:text-[var(--primary)]"
                title="فتح الرابط"
              >
                <ExternalLink size={18} />
              </a>

              <button
                type="button"
                onClick={() => onEdit(platform)}
                className="flex rounded-md p-[10px] text-[var(--text-muted)] transition-all hover:bg-[var(--background)] hover:text-[var(--primary)]"
                title="تعديل"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(platform.id)}
                className="flex rounded-md p-[10px] text-[var(--text-muted)] transition-all hover:bg-[#fef2f2] hover:text-[#dc2626]"
                title="حذف"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}