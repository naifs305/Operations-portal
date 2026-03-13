import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'بوابة إدارة عمليات التدريب - جامعة نايف العربية للعلوم الأمنية',
  description:
    'البوابة الرئيسية لمنصات وأنظمة إدارة عمليات التدريب في جامعة نايف العربية للعلوم الأمنية',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}