'use client';

import { useEffect, useState } from 'react';
import { formatNumber } from '@/lib/helpers';
import { incrementVisitCount } from '@/lib/storage';

export default function Footer() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(incrementVisitCount());
  }, []);

  return (
    <footer className="bg-white border-t border-support-gray mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <p className="text-sm font-medium text-primary">إدارة عمليات التدريب</p>
            <p className="text-xs text-support-muted">وكالة التدريب - جامعة نايف العربية للعلوم الأمنية</p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs text-support-muted">
              عدد الزيارات: <span className="font-medium text-support-brown">{formatNumber(visitCount)}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
