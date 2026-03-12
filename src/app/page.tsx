'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlatformsGrid from '@/components/portal/PlatformsGrid';
import { Platform } from '@/types';
import { getPlatforms } from '@/lib/storage';
import { Sparkles, ArrowDownLeft, Shield, Grid2x2Check } from 'lucide-react';

export default function HomePage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedPlatforms = getPlatforms();
    setPlatforms(loadedPlatforms);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9f9] text-gray-900">
      <Header isAdmin={false} />

      <main className="relative overflow-hidden">
        <section className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(1,101,100,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(208,178,132,0.12),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#98aaaa_1px,transparent_1px),linear-gradient(to_bottom,#98aaaa_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-xs font-semibold text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>واجهة موحدة للوصول إلى جميع منصات التدريب</span>
                </div>

                <div className="space-y-4">
                  <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
                    وصول منظم، سريع، واحترافي
                    <span className="block text-gray-900">إلى أنظمة ومنصات إدارة عمليات التدريب</span>
                  </h2>

                  <p className="max-w-2xl text-sm leading-8 text-support-muted sm:text-base lg:text-lg">
                    بوابة مؤسسية صُممت لتجمع جميع الأنظمة والمنصات في واجهة واحدة واضحة،
                    بما يسهّل على فريق إدارة عمليات التدريب الوصول السريع، ويمنح العمل
                    اليومي طابعًا أكثر ترتيبًا وجاهزية.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#platforms"
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(1,101,100,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#015453]"
                  >
                    <span>استعرض المنصات</span>
                    <ArrowDownLeft className="h-4 w-4" />
                  </a>

                  <a
                    href="/admin"
                    className="inline-flex items-center gap-2 rounded-2xl border border-support-gray bg-white px-5 py-3 text-sm font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <span>الدخول إلى الإدارة</span>
                  </a>
                </div>

                <div className="grid max-w-2xl gap-3 pt-2 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Grid2x2Check className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">بوابة موحدة</p>
                    <p className="mt-1 text-xs leading-6 text-support-muted">
                      جميع الأنظمة في مكان واحد
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">هوية مؤسسية</p>
                    <p className="mt-1 text-xs leading-6 text-support-muted">
                      متوافقة مع طابع الجامعة
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-support-teal/10 text-support-teal">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">تجربة أوضح</p>
                    <p className="mt-1 text-xs leading-6 text-support-muted">
                      تنقل أسهل وعرض أنظف
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-gold/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-[0_20px_60px_rgba(1,101,100,0.10)] backdrop-blur sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-support-muted">واجهة البوابة</p>
                      <p className="text-lg font-bold text-primary">منصات وأنظمة التدريب</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-primary/30" />
                      <span className="h-3 w-3 rounded-full bg-gold/60" />
                      <span className="h-3 w-3 rounded-full bg-support-teal/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'منصة التدريب الإلكتروني',
                      'إدارة المتدربين',
                      'الجدولة',
                      'الشهادات',
                      'التقييم',
                      'التقارير',
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-support-gray/70 bg-[#fcfcfc] p-4"
                      >
                        <div className="mb-3 h-10 w-10 rounded-xl bg-primary/10" />
                        <p className="text-xs font-bold text-gray-900 sm:text-sm">{item}</p>
                        <p className="mt-1 text-[11px] text-support-muted">عرض احترافي موحد</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platforms" className="relative mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-support-gray/70 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-support-muted">
                TRAINING OPERATIONS PORTAL
              </p>
              <h3 className="text-2xl font-extrabold text-primary sm:text-3xl">
                المنصات المتاحة
              </h3>
              <p className="mt-2 text-sm leading-7 text-support-muted sm:text-base">
                اختر المنصة المطلوبة للوصول السريع إلى الخدمة أو النظام المرتبط بها.
              </p>
            </div>

            <div className="rounded-2xl border border-support-gray bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-support-muted">إجمالي البطاقات الظاهرة</p>
              <p className="text-xl font-extrabold text-primary">
                {isLoading ? '...' : platforms.filter((p) => p.visible !== false).length}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-support-gray bg-white p-5 shadow-sm"
                >
                  <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-2xl bg-support-gray/50" />
                  <div className="mx-auto mb-3 h-5 w-3/4 animate-pulse rounded bg-support-gray/50" />
                  <div className="mx-auto h-4 w-full animate-pulse rounded bg-support-gray/40" />
                </div>
              ))}
            </div>
          ) : (
            <PlatformsGrid platforms={platforms} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}