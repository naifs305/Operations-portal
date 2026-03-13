'use client';

import { useEffect, useState } from 'react';
import { Platform } from '@/types';

interface Props {
  onSave: (platform: Platform) => void;
  platform?: Platform;
}

function createEmptyPlatform(): Platform {
  return {
    id: Date.now().toString(),
    name: '',
    description: '',
    url: '',
    icon: '',
    visible: true,
  };
}

export default function PlatformForm({ onSave, platform }: Props) {
  const [form, setForm] = useState<Platform>(createEmptyPlatform());

  useEffect(() => {
    if (platform) {
      setForm({
        ...platform,
        icon: platform.icon || '',
        visible: platform.visible !== false,
      });
      return;
    }

    setForm(createEmptyPlatform());
  }, [platform]);

  function handleSave() {
    if (!form.name.trim()) return;
    if (!form.description.trim()) return;
    if (!form.url.trim()) return;

    onSave({
      ...form,
      id: form.id || Date.now().toString(),
      name: form.name.trim(),
      description: form.description.trim(),
      url: form.url.trim(),
      icon: form.icon.trim(),
      visible: form.visible !== false,
    });

    if (!platform) {
      setForm(createEmptyPlatform());
    }
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 text-sm outline-none focus:border-[#016564]"
        placeholder="اسم المنصة"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="min-h-[110px] w-full rounded-xl border border-[#d6d7d4] px-4 py-3 text-sm outline-none focus:border-[#016564]"
        placeholder="وصف مختصر"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 text-sm outline-none focus:border-[#016564]"
        placeholder="رابط المنصة"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />

      <input
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 text-sm outline-none focus:border-[#016564]"
        placeholder="رابط الأيقونة أو الصورة"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />

      <label className="flex items-center justify-between rounded-xl border border-[#d6d7d4] px-4 py-3">
        <span className="text-sm font-medium text-[#016564]">إظهار المنصة</span>
        <input
          type="checkbox"
          checked={form.visible !== false}
          onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          className="h-4 w-4 accent-[#016564]"
        />
      </label>

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-xl bg-[#016564] px-4 py-3 font-bold text-white transition hover:bg-[#014b4a]"
      >
        {platform ? 'حفظ التعديل' : 'حفظ المنصة'}
      </button>
    </div>
  );
}