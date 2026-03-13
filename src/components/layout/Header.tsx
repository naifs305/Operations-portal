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
      <div className="mx-auto flex h-[96px] max-w-[1400px] items-center justify-between px-6 md:h-[108px] md:px-10">
        <Link href="/" className="flex items-center gap-5">
          <div className="relative h-[74px] w-[74px] shrink-0 md:h-[82px] md:w-[82px]">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          <div className="leading-[1.35]">
            <div className="text-[24px] font-bold text-[var(--primary)] md:text-[28px]">
              جامعة نايف العربية للعلوم الأمنية
            </div>
            <div className="mt-1 text-[17px] text-[var(--text-secondary)] md:text-[19px]">
              إدارة عمليات التدريب
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="الرئيسية"
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
              !isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Home size={24} />
          </Link>

          <Link
            href="/admin"
            aria-label="لوحة الإدارة"
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
              isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Settings size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
}