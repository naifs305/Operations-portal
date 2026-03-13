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
      <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between px-6 md:h-[82px] md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-[50px] w-[160px] shrink-0 md:h-[56px] md:w-[180px]">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف"
              fill
              className="object-contain object-right"
              priority
              unoptimized
            />
          </div>

          <div className="leading-[1.2]">
            <div className="text-[17px] font-bold text-[var(--primary)] md:text-[19px]">
              جامعة نايف العربية للعلوم الأمنية
            </div>
            <div className="mt-1 text-[12px] text-[var(--text-secondary)] md:text-[13px]">
              إدارة عمليات التدريب
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="الرئيسية"
            className={`flex h-[42px] w-[42px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
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
            className={`flex h-[42px] w-[42px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
              isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Settings size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}