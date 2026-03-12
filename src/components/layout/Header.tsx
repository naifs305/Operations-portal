'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-support-gray sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
                alt="شعار جامعة نايف العربية للعلوم الأمنية"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold text-primary leading-tight">بوابة إدارة عمليات التدريب</h1>
              <p className="text-xs text-support-muted leading-tight">جامعة نايف العربية للعلوم الأمنية</p>
            </div>
          </Link>

          <Link href="/admin/" className="flex items-center gap-2 px-3 py-2 text-sm text-support-muted hover:text-primary transition-colors rounded-lg hover:bg-support-light">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">إدارة البوابة</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
