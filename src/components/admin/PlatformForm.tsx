'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Platform } from '@/types';

interface Props {
  onSave: (platform: Platform) => void;
  platform?: Platform;
}

const ICONS = [
  'https://api.iconify.design/mdi:school.svg?color=%23016564',
  'https://api.iconify.design/mdi:account-group.svg?color=%23016564',
  'https://api.iconify.design/mdi:calendar-clock.svg?color=%23016564',
  'https://api.iconify.design/mdi:clipboard-check.svg?color=%23016564',
  'https://api.iconify.design/mdi:presentation.svg?color=%23016564',
  'https://api.iconify.design/mdi:certificate.svg?color=%23016564',
  'https://api.iconify.design/mdi:chart-bar.svg?color=%23016564',
  'https://api.iconify.design/mdi:check-circle.svg?color=%23016564',
  'https://api.iconify.design/mdi:book-open-page-variant.svg?color=%23016564',
  'https://api.iconify.design/mdi:video.svg?color=%23016564',
  'https://api.iconify.design/mdi:laptop.svg?color=%23016564',
  'https://api.iconify.design/mdi:folder-open.svg?color=%23016564',
  'https://api.iconify.design/mdi:file-document.svg?color=%23016564',
  'https://api.iconify.design/mdi:database.svg?color=%23016564',
  'https://api.iconify.design/mdi:cog.svg?color=%23016564',
  'https://api.iconify.design/mdi:briefcase.svg?color=%23016564',
  'https://api.iconify.design/mdi:account-tie.svg?color=%23016564',
  'https://api.iconify.design/mdi:teach.svg?color=%23016564',
  'https://api.iconify.design/mdi:whiteboard.svg?color=%23016564',
  'https://api.iconify.design/mdi:pencil.svg?color=%23016564',
  'https://api.iconify.design/mdi:medal.svg?color=%23016564',
  'https://api.iconify.design/mdi:trophy.svg?color=%23016564',
  'https://api.iconify.design/mdi:star.svg?color=%23016564',
  'https://api.iconify.design/mdi:lightbulb.svg?color=%23016564',
  'https://api.iconify.design/mdi:brain.svg?color=%23016564',
  'https://api.iconify.design/mdi:target.svg?color=%23016564',
  'https://api.iconify.design/mdi:compass.svg?color=%23016564',
  'https://api.iconify.design/mdi:rocket.svg?color=%23016564',
  'https://api.iconify.design/mdi:web.svg?color=%23016564',
  'https://api.iconify.design/mdi:application.svg?color=%23016564',
];

function createEmptyPlatform(): Platform {
  return {
    id: Date.now().toString(),
    name: '',
    description: '',
    url: '',
    icon: ICONS[0],
    visible: true,
  };
}

export default function PlatformForm({ onSave, platform }: Props) {
  const [form, setForm] = useState<Platform>(createEmptyPlatform());
  const [customImage, setCustomImage] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [errors, setErrors] = useState<{ name?: string; url?: string }>({});

  useEffect(() => {
    if (platform) {
      const currentIcon = platform.icon || ICONS[0];
      const isPreset = ICONS.includes(currentIcon);

      setForm({
        ...platform,
        icon: currentIcon,
        visible: platform.visible !== false,
      });
      setSelectedIcon(isPreset ? currentIcon : ICONS[0]);
      setCustomImage(isPreset ? '' : currentIcon);
      setErrors({});
      return;
    }

    setForm(createEmptyPlatform());
    setSelectedIcon(ICONS[0]);
    setCustomImage('');
    setErrors({});
  }, [platform]);

  function validate() {
    const nextErrors: { name?: string; url?: string } = {};

    if (!form.name.trim()) {
      nextErrors.name = 'اسم المنصة مطلوب';
    }

    if (!form.url.trim()) {
      nextErrors.url = 'رابط المنصة مطلوب';
    } else {
      try {
        new URL(form.url.trim());
      } catch {
        nextErrors.url = 'الرجاء إدخال رابط صحيح';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    onSave({
      ...form,
      id: form.id || Date.now().toString(),
      name: form.name.trim(),
      description: form.description.trim(),
      url: form.url.trim(),
      icon: customImage.trim() || selectedIcon,
      visible: form.visible !== false,
    });

    if (!platform) {
      setForm(createEmptyPlatform());
      setSelectedIcon(ICONS[0]);
      setCustomImage('');
      setErrors({});
    }
  }

  return (
    <div>
      <div className="mb-[22px]">
        <label className="mb-2 block text-sm font-medium">
          اسم المنصة <span className="text-[#dc2626]">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          className={`w-full rounded-[var(--radius)] border px-4 py-[14px] text-[15px] outline-none transition focus:border-[var(--primary)] ${
            errors.name ? 'border-[#dc2626]' : 'border-[var(--border)]'
          }`}
          placeholder="مثال: منصة التدريب الإلكتروني"
        />
        {errors.name ? <p className="mt-[6px] text-[13px] text-[#dc2626]">{errors.name}</p> : null}
      </div>

      <div className="mb-[22px]">
        <label className="mb-2 block text-sm font-medium">وصف المنصة</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="min-h-[90px] w-full rounded-[var(--radius)] border border-[var(--border)] px-4 py-[14px] text-[15px] outline-none transition focus:border-[var(--primary)]"
          placeholder="وصف مختصر للمنصة"
        />
      </div>

      <div className="mb-[22px]">
        <label className="mb-2 block text-sm font-medium">
          رابط المنصة <span className="text-[#dc2626]">*</span>
        </label>
        <input
          type="url"
          dir="ltr"
          value={form.url}
          onChange={(e) => {
            setForm({ ...form, url: e.target.value });
            if (errors.url) setErrors((prev) => ({ ...prev, url: undefined }));
          }}
          className={`w-full rounded-[var(--radius)] border px-4 py-[14px] text-left text-[15px] outline-none transition focus:border-[var(--primary)] ${
            errors.url ? 'border-[#dc2626]' : 'border-[var(--border)]'
          }`}
          placeholder="https://example.com"
        />
        {errors.url ? <p className="mt-[6px] text-[13px] text-[#dc2626]">{errors.url}</p> : null}
      </div>

      <div className="mb-[18px]">
        <div className="mb-[10px] text-sm font-medium">اختر أيقونة من القائمة:</div>
        <div className="grid max-h-[300px] grid-cols-6 gap-[10px] overflow-y-auto p-[6px]">
          {ICONS.map((icon) => {
            const selected = !customImage.trim() && selectedIcon === icon;

            return (
              <button
                key={icon}
                type="button"
                onClick={() => {
                  setSelectedIcon(icon);
                  setCustomImage('');
                }}
                className={`aspect-square rounded-[var(--radius)] border-2 bg-[var(--surface)] p-[10px] transition ${
                  selected
                    ? 'border-[var(--primary)] bg-[rgba(1,101,100,0.04)]'
                    : 'border-[var(--border)] hover:border-[var(--text-muted)]'
                }`}
              >
                <div className="relative h-full w-full">
                  <Image src={icon} alt="" fill className="object-contain" unoptimized />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-[22px] flex items-center gap-[14px] text-[13px] text-[var(--text-muted)] before:h-px before:flex-1 before:bg-[var(--border)] after:h-px after:flex-1 after:bg-[var(--border)]">
        أو
      </div>

      <div className="mb-[22px]">
        <label className="mb-2 block text-sm font-medium">أضف رابط صورة (بديل للأيقونة)</label>
        <input
          type="url"
          dir="ltr"
          value={customImage}
          onChange={(e) => setCustomImage(e.target.value)}
          className="w-full rounded-[var(--radius)] border border-[var(--border)] px-4 py-[14px] text-left text-[15px] outline-none transition focus:border-[var(--primary)]"
          placeholder="https://example.com/image.png"
        />
      </div>

      <div className="mb-[22px] flex gap-7 pt-[10px]">
        <label className="flex cursor-pointer items-center gap-[10px]">
          <input
            type="checkbox"
            checked={form.visible !== false}
            onChange={(e) => setForm({ ...form, visible: e.target.checked })}
            className="h-[18px] w-[18px] cursor-pointer accent-[var(--primary)]"
          />
          <span className="text-sm">إظهار في البوابة</span>
        </label>
      </div>

      <div className="mt-[26px] flex gap-[14px] border-t border-[var(--border)] pt-[22px]">
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 rounded-[var(--radius)] bg-[var(--primary)] px-[18px] py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-dark)]"
        >
          حفظ
        </button>

        <button
          type="button"
          onClick={() => {
            if (platform) {
              const currentIcon = platform.icon || ICONS[0];
              const isPreset = ICONS.includes(currentIcon);
              setForm({
                ...platform,
                icon: currentIcon,
                visible: platform.visible !== false,
              });
              setSelectedIcon(isPreset ? currentIcon : ICONS[0]);
              setCustomImage(isPreset ? '' : currentIcon);
            } else {
              setForm(createEmptyPlatform());
              setSelectedIcon(ICONS[0]);
              setCustomImage('');
            }
            setErrors({});
          }}
          className="flex-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[18px] py-3 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--background)]"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}