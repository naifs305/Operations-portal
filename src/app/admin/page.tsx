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

  function handleSave(platform: Platform) {
    const exists = platforms.some((p) => p.id === platform.id);
    const updated = exists
      ? platforms.map((p) => (p.id === platform.id ? platform : p))
      : [...platforms, platform];

    setPlatforms(updated);
    savePlatforms(updated);
    setEditingPlatform(undefined);
  }

  function handleDelete(id: string) {
    const updated = platforms.filter((p) => p.id !== id);
    setPlatforms(updated);
    savePlatforms(updated);
    if (editingPlatform?.id === id) setEditingPlatform(undefined);
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f5f7f8]">
        <Header isAdmin />
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-xl font-semibold text-[#5b6f8a]">تسجيل دخول الإدارة</h1>
            <input
              type="password"
              className="w-full rounded-md border border-[#d6d7d4] px-4 py-3 outline-none"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') login();
              }}
            />
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
            <button
              className="mt-4 w-full rounded-md bg-[#00a6a6] px-4 py-3 text-white"
              onClick={login}
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
    <div className="min-h-screen bg-[#f5f7f8]">
      <Header isAdmin />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#5b6f8a]">إدارة المنصات</h1>
          <div className="rounded-md bg-white px-4 py-2 text-sm text-[#5b6f8a] shadow-sm">
            إجمالي المنصات: <span className="font-bold">{platforms.length}</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <PlatformForm onSave={handleSave} platform={editingPlatform} />
          </div>
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <PlatformList platforms={platforms} onDelete={handleDelete} onEdit={setEditingPlatform} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
