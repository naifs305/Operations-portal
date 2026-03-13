'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformForm from '@/components/admin/PlatformForm';
import PlatformList from '@/components/admin/PlatformList';
import { getPlatforms, savePlatforms } from '@/lib/storage';
import { Platform } from '@/types';

const ADMIN_PASSWORD = 'Nn@123123';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [editingPlatform, setEditingPlatform] = useState<Platform | undefined>(undefined);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setPlatforms(getPlatforms());
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true);
      setError('');
      return;
    }

    setError('كلمة المرور غير صحيحة');
  }

  function handleSavePlatform(platform: Platform) {
    setSaveError('');

    const normalizedPlatform: Platform = {
      ...platform,
      id: platform.id || Date.now().toString(),
      name: platform.name.trim(),
      description: platform.description.trim(),
      url: platform.url.trim(),
      icon: platform.icon || '',
      visible: platform.visible !== false,
    };

    const exists = platforms.some((p) => p.id === normalizedPlatform.id);

    const updated = exists
      ? platforms.map((p) => (p.id === normalizedPlatform.id ? normalizedPlatform : p))
      : [...platforms, normalizedPlatform];

    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر حفظ المنصة. غالبًا بسبب امتلاء التخزين المحلي أو وجود صورة كبيرة.');
      return;
    }

    const refreshed = getPlatforms();
    setPlatforms(refreshed);
    setEditingPlatform(undefined);
  }

  function handleDeletePlatform(id: string) {
    setSaveError('');

    const updated = platforms.filter((p) => p.id !== id);
    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر حذف المنصة من التخزين المحلي.');
      return;
    }

    const refreshed = getPlatforms();
    setPlatforms(refreshed);

    if (editingPlatform?.id === id) {
      setEditingPlatform(undefined);
    }
  }

  function handleEditPlatform(platform: Platform) {
    setEditingPlatform(platform);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f8f9f9]">
        <Header isAdmin />

        <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl items-center justify-center px-4 py-8">
          <div className="w-full max-w-md rounded-2xl border border-[#d6d7d4] bg-white p-6 shadow-sm">
            <h1 className="mb-2 text-2xl font-bold text-[#016564]">تسجيل دخول الإدارة</h1>
            <p className="mb-4 text-sm text-[#6b7280]">أدخل كلمة المرور للوصول إلى لوحة الإدارة</p>

            <input
              type="password"
              className="w-full rounded-xl border border-[#d6d7d4] px-4 py-3 outline-none focus:border-[#016564]"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') login();
              }}
            />

            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

            <button
              onClick={login}
              className="mt-4 w-full rounded-xl bg-[#016564] px-4 py-3 font-bold text-white hover:bg-[#014b4a]"
            >
              دخول
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9f9]">
      <Header isAdmin />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#016564]">إدارة المنصات</h1>
          <div className="rounded-xl border border-[#d6d7d4] bg-white px-4 py-2 text-sm text-[#374151]">
            إجمالي المنصات: <span className="font-bold text-[#016564]">{platforms.length}</span>
          </div>
        </div>

        {saveError ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-[#d6d7d4] bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-[#016564]">
              {editingPlatform ? 'تعديل منصة' : 'إضافة منصة جديدة'}
            </h2>
            <p className="mb-4 text-sm text-[#6b7280]">
              {editingPlatform ? 'عدّل بيانات المنصة ثم احفظ التغييرات' : 'أدخل بيانات المنصة ثم احفظها'}
            </p>

            <PlatformForm onSave={handleSavePlatform} platform={editingPlatform} />
          </div>

          <div className="rounded-2xl border border-[#d6d7d4] bg-white p-6 shadow-sm">
            <PlatformList
              platforms={platforms}
              onDelete={handleDeletePlatform}
              onEdit={handleEditPlatform}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}