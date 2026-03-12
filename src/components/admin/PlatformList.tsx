'use client';

import { Platform } from '@/types';

interface Props {
  platforms: Platform[];
  onDelete: (id: string) => void;
  onEdit: (platform: Platform) => void;
}

export default function PlatformList({ platforms, onDelete, onEdit }: Props) {
  if (!platforms.length) {
    return <div className="text-sm text-[#5b6f8a]">لا توجد منصات مضافة حاليًا</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {platforms.map((p) => (
        <div key={p.id} className="rounded-xl border border-[#e5e7eb] bg-white p-4">
          <div className="flex items-center gap-3">
            {p.icon ? <img src={p.icon} alt={p.name} className="h-10 w-10 object-contain" /> : null}
            <div>
              <h3 className="font-semibold text-[#5b6f8a]">{p.name}</h3>
              <p className="text-xs text-[#94a3b8]">{p.url}</p>
            </div>
          </div>

          <p className="mt-3 text-sm text-[#64748b]">{p.description}</p>

          <div className="mt-4 flex gap-3">
            <button className="rounded-md border border-[#d6d7d4] px-4 py-2 text-sm text-[#5b6f8a]" onClick={() => onEdit(p)}>
              تعديل
            </button>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm text-white" onClick={() => onDelete(p.id)}>
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
