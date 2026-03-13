'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Settings } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 md:h-[90px] md:px-10 md:py-0">
        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="الرئيسية"
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all sm:h-[42px] sm:w-[42px] ${
              !isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Home size={18} />
          </Link>

          <Link
            href="/admin"
            aria-label="لوحة الإدارة"
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all sm:h-[42px] sm:w-[42px] ${
              isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Settings size={18} />
          </Link>
        </nav>

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4"
        >
          <div className="min-w-0 text-right leading-[1.2]">
            <div className="truncate text-[13px] font-bold text-[var(--primary)] sm:text-[15px] md:text-[20px]">
              جامعة نايف العربية للعلوم الأمنية
            </div>
            <div className="mt-1 text-[10px] text-[var(--text-secondary)] sm:text-[11px] md:text-[14px]">
              إدارة عمليات التدريب
            </div>
          </div>

          <div className="relative h-[42px] w-[118px] shrink-0 sm:h-[48px] sm:w-[138px] md:h-[68px] md:w-[210px]">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف"
              fill
              className="object-contain object-right"
              priority
              unoptimized
            />
          </div>
        </Link>
      </div>
    </header>
  );
}