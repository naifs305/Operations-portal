'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="h-1 w-full bg-gradient-to-l from-primary via-support-teal to-gold" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl border border-support-gray/60 bg-white shadow-sm sm:h-16 sm:w-16">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف العربية للعلوم الأمنية"
              fill
              className="object-contain p-2"
              priority
              unoptimized
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-primary sm:text-2xl lg:text-3xl">
              بوابة إدارة عمليات التدريب
            </h1>
            <p className="truncate text-xs font-medium text-support-muted sm:text-sm lg:text-base">
              جامعة نايف العربية للعلوم الأمنية
            </p>
          </div>
        </div>

        <nav className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              !isAdmin
                ? 'bg-primary text-white shadow-sm'
                : 'bg-support-light text-primary hover:bg-primary hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Link>

          <Link
            href="/admin"
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              isAdmin
                ? 'bg-primary text-white shadow-sm'
                : 'bg-support-light text-primary hover:bg-primary hover:text-white'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">إدارة البوابة</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}