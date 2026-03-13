'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformForm from '@/components/admin/PlatformForm';
import PlatformList from '@/components/admin/PlatformList';
import {
  getPlatforms,
  savePlatforms,
  seedDefaultPlatforms,
  getPortalVisits,
  getPortalSettings,
  savePortalSettings,
  seedPortalSettings,
} from '@/lib/storage';
import { Platform, PortalSettings } from '@/types';

const ADMIN_PASSWORD = 'Nn@123123';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [editingPlatform, setEditingPlatform] = useState<Platform | undefined>(undefined);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [visits, setVisits] = useState(0);
  const [settings, setSettings] = useState<PortalSettings>({ columns: 4 });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    seedDefaultPlatforms();
    seedPortalSettings();
    setPlatforms(getPlatforms());
    setSettings(getPortalSettings());
    setVisits(getPortalVisits());
  }, []);

  function refreshPlatforms(nextPlatforms?: Platform[]) {
    setPlatforms(nextPlatforms || getPlatforms());
  }

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
      icon: platform.icon?.trim() || '',
      visible: platform.visible !== false,
    };

    const exists = platforms.some((p) => p.id === normalizedPlatform.id);

    const updated = exists
      ? platforms.map((p) => (p.id === normalizedPlatform.id ? normalizedPlatform : p))
      : [...platforms, normalizedPlatform];

    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر حفظ المنصة.');
      return;
    }

    refreshPlatforms(updated);
    setEditingPlatform(undefined);
  }

  function handleDeletePlatform(id: string) {
    setSaveError('');

    const updated = platforms.filter((p) => p.id !== id);
    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر حذف المنصة.');
      return;
    }

    refreshPlatforms(updated);

    if (editingPlatform?.id === id) {
      setEditingPlatform(undefined);
    }
  }

  function handleEditPlatform(platform: Platform) {
    setEditingPlatform(platform);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleToggleVisibility(id: string) {
    setSaveError('');

    const updated = platforms.map((platform) =>
      platform.id === id ? { ...platform, visible: platform.visible === false } : platform
    );

    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر تحديث حالة المنصة.');
      return;
    }

    refreshPlatforms(updated);

    if (editingPlatform?.id === id) {
      const nextEditing = updated.find((platform) => platform.id === id);
      setEditingPlatform(nextEditing);
    }
  }

  function handleMovePlatform(draggedId: string, targetId: string) {
    setSaveError('');

    const fromIndex = platforms.findIndex((platform) => platform.id === draggedId);
    const toIndex = platforms.findIndex((platform) => platform.id === targetId);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

    const updated = [...platforms];
    const [draggedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, draggedItem);

    const saved = savePlatforms(updated);

    if (!saved) {
      setSaveError('تعذر تحديث ترتيب المنصات.');
      return;
    }

    refreshPlatforms(updated);
  }

  function handleColumnsChange(columns: 2 | 3 | 4 | 5) {
    const nextSettings: PortalSettings = { columns };
    const saved = savePortalSettings(nextSettings);

    if (!saved) {
      setSaveError('تعذر حفظ إعدادات توزيع المنصات.');
      return;
    }

    setSettings(nextSettings);
    setSaveError('');
  }

  function handleExport() {
    const blob = new Blob(
      [JSON.stringify({ platforms, settings }, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'training-operations-portal-platforms.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));

        const importedPlatforms = Array.isArray(parsed) ? parsed : parsed.platforms;
        const importedSettings = Array.isArray(parsed) ? null : parsed.settings;

        if (!Array.isArray(importedPlatforms)) {
          setSaveError('ملف الاستيراد غير صالح.');
          return;
        }

        const normalized: Platform[] = importedPlatforms.map((item, index) => ({
          id: item.id || `${Date.now()}-${index}`,
          name: String(item.name || '').trim(),
          description: String(item.description || '').trim(),
          url: String(item.url || '').trim(),
          icon: String(item.icon || '').trim(),
          visible: item.visible !== false,
        }));

        const savedPlatforms = savePlatforms(normalized);

        if (!savedPlatforms) {
          setSaveError('تعذر استيراد البيانات.');
          return;
        }

        if (
          importedSettings &&
          (importedSettings.columns === 2 ||
            importedSettings.columns === 3 ||
            importedSettings.columns === 4 ||
            importedSettings.columns === 5)
        ) {
          savePortalSettings({ columns: importedSettings.columns });
          setSettings({ columns: importedSettings.columns });
        }

        refreshPlatforms(normalized);
        setEditingPlatform(undefined);
        setSaveError('');
      } catch {
        setSaveError('تعذر قراءة ملف الاستيراد.');
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  }

  function handleReset() {
    localStorage.removeItem('nauss_portal_platforms');
    localStorage.removeItem('nauss_portal_settings');
    seedDefaultPlatforms();
    seedPortalSettings();
    const defaults = getPlatforms();
    refreshPlatforms(defaults);
    setSettings(getPortalSettings());
    setEditingPlatform(undefined);
    setSaveError('');
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--background)]">
        <Header isAdmin />

        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-[380px] rounded-[var(--radius-lg)] bg-[var(--surface)] px-[30px] py-9 shadow-[var(--shadow-card)]">
            <div className="mb-[18px] flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(1,101,100,0.08)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[var(--primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="mb-2 text-center text-xl font-semibold">لوحة الإدارة</h2>
            <p className="mb-[26px] text-center text-sm text-[var(--text-secondary)]">
              أدخل كلمة المرور للوصول إلى لوحة التحكم
            </p>

            <input
              type="password"
              className="w-full rounded-[var(--radius)] border border-[var(--border)] px-4 py-[14px] text-center text-[15px] outline-none focus:border-[var(--primary)]"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') login();
              }}
              autoComplete="off"
            />

            {error ? <p className="mt-2 text-[13px] text-[#dc2626]">{error}</p> : null}

            <button
              type="button"
              onClick={login}
              className="mt-4 w-full rounded-[var(--radius)] bg-[var(--primary)] px-[18px] py-3 text-sm font-medium text-white transition hover:bg-[var(--primary-dark)]"
            >
              دخول
            </button>
          </div>
        </main>

        <Footer visits={visits} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header isAdmin />

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[22px] font-bold">لوحة الإدارة</h1>
              <p className="text-sm text-[var(--text-secondary)]">إدارة منصات البوابة وترتيبها</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-[10px] text-[13px] font-medium transition hover:bg-[var(--background)]"
              >
                تصدير
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-[10px] text-[13px] font-medium transition hover:bg-[var(--background)]"
              >
                استيراد
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-[10px] text-[13px] font-medium transition hover:bg-[var(--background)]"
              >
                استعادة
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-6 rounded-[var(--radius)] border border-[rgba(208,178,132,0.25)] bg-[rgba(208,178,132,0.08)] px-[18px] py-4">
            <p className="text-[13px] text-[var(--text-secondary)]">
              ملاحظة: جميع التغييرات تُحفظ محليًا في المتصفح. استخدم تصدير لحفظ نسخة احتياطية.
            </p>
          </div>

          {saveError ? (
            <div className="mb-6 rounded-[var(--radius)] border border-[rgba(220,38,38,0.2)] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
              {saveError}
            </div>
          ) : null}

          <div className="mb-[18px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[17px] font-semibold">
              قائمة المنصات (<span>{platforms.length}</span>)
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-secondary)]">عدد الأعمدة:</span>

              {[2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleColumnsChange(count as 2 | 3 | 4 | 5)}
                  className={`rounded-[var(--radius)] border px-3 py-2 text-sm font-medium transition ${
                    settings.columns === count
                      ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--background)]'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
              <h2 className="mb-3 text-[17px] font-semibold">
                {editingPlatform ? 'تعديل المنصة' : 'إضافة منصة جديدة'}
              </h2>

              <PlatformForm onSave={handleSavePlatform} platform={editingPlatform} />
            </section>

            <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
              <PlatformList
                platforms={platforms}
                onDelete={handleDeletePlatform}
                onEdit={handleEditPlatform}
                onMove={handleMovePlatform}
                onToggleVisibility={handleToggleVisibility}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer visits={visits} />
    </div>
  );
}