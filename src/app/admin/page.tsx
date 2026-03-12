'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformList from '@/components/admin/PlatformList';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Platform } from '@/types';
import { exportData, getPlatforms, importData, resetToDefault, savePlatforms } from '@/lib/storage';
import { CheckCircle, Download, Lock, RotateCcw, Upload } from 'lucide-react';

export default function AdminPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    const authenticated = typeof window !== 'undefined' ? sessionStorage.getItem('admin_authenticated') : null;
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      setPlatforms(getPlatforms());
    }
  }, []);

  const showSuccessMessage = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPlatforms(getPlatforms());
      setPasswordError('');
      return;
    }
    setPasswordError('كلمة المرور غير صحيحة');
  };

  const handleUpdate = (updatedPlatforms: Platform[]) => {
    setPlatforms(updatedPlatforms);
    savePlatforms(updatedPlatforms);
    showSuccessMessage('تم حفظ التغييرات');
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `training-portal-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    showSuccessMessage('تم تصدير البيانات');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        setPlatforms(getPlatforms());
        showSuccessMessage('تم استيراد البيانات بنجاح');
      } else {
        alert('فشل في استيراد البيانات. تأكد من صحة الملف.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetToDefault();
    setPlatforms(getPlatforms());
    setShowResetConfirm(false);
    showSuccessMessage('تم استعادة الإعدادات الافتراضية');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-support-light">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-support-gray p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">لوحة الإدارة</h1>
              <p className="text-sm text-support-muted mt-1">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full px-4 py-3 border border-support-gray rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-center" autoFocus />
                {passwordError && <p className="mt-2 text-sm text-red-500 text-center">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full" size="lg">دخول</Button>
            </form>
            <p className="mt-6 text-xs text-support-muted text-center">كلمة المرور الافتراضية: admin123<br />(يمكن تغييرها من ملف src/app/admin/page.tsx)</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-support-light">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة</h1>
                <p className="text-support-muted mt-1">إدارة منصات البوابة وترتيبها</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={handleExport}><Download className="w-4 h-4" />تصدير البيانات</Button>
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-white text-primary border border-support-gray hover:bg-support-light cursor-pointer">
                  <Upload className="w-4 h-4" />استيراد البيانات
                  <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
                <Button variant="secondary" onClick={() => setShowResetConfirm(true)}><RotateCcw className="w-4 h-4" />استعادة الافتراضيات</Button>
              </div>
            </div>
          </div>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">{showSuccess}</span>
            </div>
          )}

          <div className="mb-6 bg-gold/10 border border-gold/30 rounded-lg p-4">
            <p className="text-sm text-gray-700"><strong>ملاحظة:</strong> جميع التغييرات تُحفظ محلياً في المتصفح. استخدم خيار "تصدير البيانات" لحفظ نسخة احتياطية، و"استيراد البيانات" لاستعادتها.</p>
          </div>

          <PlatformList platforms={platforms} onUpdate={handleUpdate} />
        </div>
      </main>

      <Modal isOpen={showResetConfirm} onClose={() => setShowResetConfirm(false)} title="استعادة الإعدادات الافتراضية" size="sm">
        <div className="space-y-4">
          <p className="text-gray-600">سيتم حذف جميع التغييرات واستعادة المنصات الافتراضية. هل أنت متأكد؟</p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={handleReset} className="flex-1">استعادة</Button>
            <Button variant="secondary" onClick={() => setShowResetConfirm(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
