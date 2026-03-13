'use client';

interface FooterProps {
  visits?: number;
}

export default function Footer({ visits = 0 }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] px-6 py-7">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-[10px] text-center sm:flex-row sm:justify-between sm:text-right">
        <div>
          <div className="text-[15px] font-semibold text-[var(--primary)]">
            إدارة عمليات التدريب
          </div>
          <div className="text-[13px] text-[var(--text-secondary)]">
            وكالة التدريب - جامعة نايف العربية للعلوم الأمنية
          </div>
        </div>

        <div className="text-[13px] text-[var(--text-muted)]">
          زيارات البوابة:{' '}
          <span className="font-semibold text-[var(--text-secondary)]">
            {visits.toLocaleString('ar-SA')}
          </span>
        </div>
      </div>
    </footer>
  );
}