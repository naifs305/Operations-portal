'use client';

import { ChangeEvent, useEffect, useState } from 'react';
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
    visible: true
  };
}

export default function PlatformForm({ onSave, platform }: Props) {
  const [form, setForm] = useState<Platform>(platform || createEmptyPlatform());

  useEffect(() => {
    if (platform) setForm(platform);
    else setForm(createEmptyPlatform());
  }, [platform]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, icon: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.description.trim() || !form.url.trim()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      url: form.url.trim()
    });
    if (!platform) setForm(createEmptyPlatform());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#5b6f8a]">{platform ? 'تعديل منصة' : 'إضافة منصة جديدة'}</h2>

      <input
        className="w-full rounded-md border border-[#d6d7d4] px-4 py-3 outline-none"
        placeholder="اسم المنصة"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="min-h-[110px] w-full rounded-md border border-[#d6d7d4] px-4 py-3 outline-none"
        placeholder="وصف المنصة"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full rounded-md border border-[#d6d7d4] px-4 py-3 outline-none"
        placeholder="رابط المنصة"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />

      <select
        className="w-full rounded-md border border-[#d6d7d4] px-4 py-3 outline-none"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      >
        <option value="">اختر أيقونة</option>
        <option value="/icons/training.svg">التدريب</option>
        <option value="/icons/reports.svg">التقارير</option>
        <option value="/icons/students.svg">المتدربين</option>
        <option value="/icons/trainers.svg">المدربين</option>
        <option value="/icons/certificate.svg">الشهادات</option>
        <option value="/icons/attendance.svg">الحضور</option>
        <option value="/icons/schedule.svg">الجدولة</option>
        <option value="/icons/evaluation.svg">التقييم</option>
      </select>

      <input type="file" accept="image/*" onChange={handleImage} />

      {form.icon ? (
        <div className="rounded-md border border-[#e5e7eb] p-3">
          <img src={form.icon} alt="preview" className="h-16 w-16 object-contain" />
        </div>
      ) : null}

      <button className="w-full rounded-md bg-[#00a6a6] px-4 py-3 text-white" onClick={handleSave}>
        {platform ? 'حفظ التعديلات' : 'حفظ المنصة'}
      </button>
    </div>
  );
}
