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
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
        placeholder="اسم المنصة"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="min-h-[120px] w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
        placeholder="وصف المنصة"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
        placeholder="رابط المنصة"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />

      <select
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
        value={form.icon.startsWith('/icons/') ? form.icon : ''}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      >
        <option value="">اختر أيقونة جاهزة</option>
        <option value="/icons/training.svg">التدريب</option>
        <option value="/icons/reports.svg">التقارير</option>
        <option value="/icons/students.svg">المتدربين</option>
        <option value="/icons/trainers.svg">المدربين</option>
        <option value="/icons/certificate.svg">الشهادات</option>
        <option value="/icons/attendance.svg">الحضور</option>
        <option value="/icons/schedule.svg">الجدولة</option>
        <option value="/icons/evaluation.svg">التقييم</option>
      </select>

      <input
        className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
        placeholder="رابط الصورة أو الأيقونة (اختياري)"
        value={form.icon.startsWith('/icons/') ? '' : form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />

      {form.icon ? (
        <div className="rounded-xl border border-[#d6d7d4] bg-[#f8f9f9] p-3">
          <p className="mb-2 text-sm font-bold text-[#016564]">معاينة الأيقونة</p>
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border border-[#d6d7d4] bg-white p-2">
            <img
              src={form.icon}
              alt="preview"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-xl bg-[#016564] px-4 py-3 font-bold text-white hover:bg-[#014b4a]"
      >
        {platform ? 'حفظ التعديلات' : 'حفظ المنصة'}
      </button>
    </div>
  );
}