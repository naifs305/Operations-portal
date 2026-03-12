'use client';

import { useEffect, useState } from 'react';
import { Platform, PlatformFormData } from '@/types';
import Button from '@/components/ui/Button';

interface PlatformFormProps {
  platform?: Platform | null;
  onSubmit: (data: PlatformFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const iconOptions = [
  { value: '/icons/training.svg', label: 'تدريب' },
  { value: '/icons/students.svg', label: 'متدربين' },
  { value: '/icons/schedule.svg', label: 'جدولة' },
  { value: '/icons/evaluation.svg', label: 'تقييم' },
  { value: '/icons/trainers.svg', label: 'مدربين' },
  { value: '/icons/certificate.svg', label: 'شهادات' },
  { value: '/icons/reports.svg', label: 'تقارير' },
  { value: '/icons/attendance.svg', label: 'حضور' }
];

export default function PlatformForm({ platform, onSubmit, onCancel, isLoading }: PlatformFormProps) {
  const [formData, setFormData] = useState<PlatformFormData>({
    title: '',
    description: '',
    url: '',
    image: '/icons/training.svg',
    visible: true
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PlatformFormData, string>>>({});
  const [customImage, setCustomImage] = useState('');

  useEffect(() => {
    if (platform) {
      setFormData({
        title: platform.title,
        description: platform.description,
        url: platform.url,
        image: platform.image,
        visible: platform.visible
      });
      setCustomImage(platform.image.startsWith('/icons/') ? '' : platform.image);
    }
  }, [platform]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof PlatformFormData, string>> = {};
    if (!formData.title.trim()) nextErrors.title = 'عنوان المنصة مطلوب';
    if (!formData.url.trim()) {
      nextErrors.url = 'رابط المنصة مطلوب';
    } else {
      try {
        new URL(formData.url);
      } catch {
        nextErrors.url = 'الرجاء إدخال رابط صحيح';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = customImage.trim() ? customImage.trim() : formData.image;
    if (!validate()) return;
    onSubmit({ ...formData, image: finalImage });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">عنوان المنصة <span className="text-red-500">*</span></label>
        <input id="title" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${errors.title ? 'border-red-500' : 'border-support-gray'}`} placeholder="مثال: منصة التدريب الإلكتروني" />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">الوصف</label>
        <textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 border border-support-gray rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="وصف مختصر للمنصة" />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1.5">رابط المنصة <span className="text-red-500">*</span></label>
        <input id="url" type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-left ${errors.url ? 'border-red-500' : 'border-support-gray'}`} placeholder="https://example.com" dir="ltr" />
        {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">أيقونة المنصة</label>
        <div className="grid grid-cols-4 gap-2">
          {iconOptions.map((icon) => (
            <button key={icon.value} type="button" onClick={() => { setFormData({ ...formData, image: icon.value }); setCustomImage(''); }} className={`p-3 border rounded-lg transition-all ${formData.image === icon.value && !customImage ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-support-gray hover:border-primary/50'}`}>
              <img src={icon.value} alt={icon.label} className="w-8 h-8 mx-auto object-contain" />
              <span className="text-xs text-support-muted mt-1 block">{icon.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label className="block text-xs text-support-muted mb-1">أو أدخل رابط صورة مخصص</label>
          <input type="text" value={customImage} onChange={(e) => setCustomImage(e.target.value)} className="w-full px-4 py-2 border border-support-gray rounded-lg text-sm" placeholder="https://example.com/icon.svg" dir="ltr" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" role="switch" aria-checked={formData.visible} onClick={() => setFormData({ ...formData, visible: !formData.visible })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.visible ? 'bg-primary' : 'bg-support-gray'}`}>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.visible ? '-translate-x-6' : '-translate-x-1'}`} />
        </button>
        <label className="text-sm text-gray-700">إظهار المنصة في البوابة</label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-support-gray">
        <Button type="submit" disabled={isLoading} className="flex-1">{isLoading ? 'جاري الحفظ...' : platform ? 'تحديث المنصة' : 'إضافة المنصة'}</Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>إلغاء</Button>
      </div>
    </form>
  );
}
