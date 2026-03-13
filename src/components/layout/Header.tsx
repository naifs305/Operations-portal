'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="border-b border-[#d6d7d4] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              !isAdmin
                ? 'border border-[#016564] bg-[#016564] text-white'
                : 'text-[#016564] hover:bg-[#f3f6f6]'
            }`}
          >
            الرئيسية
          </Link>

          <Link
            href="/admin"
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isAdmin
                ? 'border border-[#016564] bg-[#016564] text-white'
                : 'text-[#016564] hover:bg-[#f3f6f6]'
            }`}
          >
            الإدارة
          </Link>
        </nav>

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="min-w-0 text-left">
            <h1 className="truncate text-base font-bold text-[#016564] sm:text-lg lg:text-xl">
              بوابة إدارة عمليات التدريب
            </h1>
          </div>

          <div className="relative h-14 w-24 shrink-0 sm:h-16 sm:w-28 lg:h-18 lg:w-32">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف العربية للعلوم الأمنية"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </header>
  );
}