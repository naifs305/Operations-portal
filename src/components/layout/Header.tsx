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
      <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between px-6 md:h-[88px]">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative h-[58px] w-[58px] shrink-0 md:h-16 md:w-16">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          <div className="leading-[1.4]">
            <div className="text-[17px] font-bold text-[var(--primary)] md:text-[19px]">
              جامعة نايف العربية للعلوم الأمنية
            </div>
            <div className="text-sm text-[var(--text-secondary)] md:text-[15px]">
              إدارة عمليات التدريب
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            aria-label="الرئيسية"
            className={`flex h-[46px] w-[46px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
              !isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Home size={22} />
          </Link>

          <Link
            href="/admin"
            aria-label="لوحة الإدارة"
            className={`flex h-[46px] w-[46px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] transition-all ${
              isAdmin
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            }`}
          >
            <Settings size={22} />
          </Link>
        </nav>
      </div>
    </header>
  );
}