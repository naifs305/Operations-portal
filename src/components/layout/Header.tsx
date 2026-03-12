'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <Image
              src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
              alt="شعار جامعة نايف العربية للعلوم الأمنية"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-[#5b6f8a] sm:text-xl">
              بوابة إدارة عمليات التدريب
            </h1>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`rounded-md px-4 py-2 text-sm ${
              !isAdmin ? 'bg-[#00a6a6] text-white' : 'text-[#5b6f8a]'
            }`}
          >
            الرئيسية
          </Link>

          <Link
            href="/admin"
            className={`rounded-md px-4 py-2 text-sm ${
              isAdmin ? 'bg-[#00a6a6] text-white' : 'text-[#5b6f8a]'
            }`}
          >
            إدارة البوابة
          </Link>
        </nav>
      </div>
    </header>
  );
}
