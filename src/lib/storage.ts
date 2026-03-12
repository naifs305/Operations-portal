import { Platform } from '@/types';

const STORAGE_KEY = 'training_portal_data';

const defaultPlatforms: Platform[] = [
  {
    id: '1',
    name: 'منصة التدريب',
    description: 'الدخول إلى التدريب الإلكتروني',
    url: 'https://example.com/training',
    icon: '/icons/training.svg',
    visible: true
  },
  {
    id: '2',
    name: 'التقارير',
    description: 'الدخول إلى لوحة التقارير',
    url: 'https://example.com/reports',
    icon: '/icons/reports.svg',
    visible: true
  },
  {
    id: '3',
    name: 'المتدربين',
    description: 'إدارة بيانات المتدربين',
    url: 'https://example.com/students',
    icon: '/icons/students.svg',
    visible: true
  },
  {
    id: '4',
    name: 'الشهادات',
    description: 'إصدار ومتابعة الشهادات',
    url: 'https://example.com/certificates',
    icon: '/icons/certificate.svg',
    visible: true
  }
];

export function getPlatforms(): Platform[] {
  if (typeof window === 'undefined') return defaultPlatforms;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultPlatforms;
    return JSON.parse(stored) as Platform[];
  } catch {
    return defaultPlatforms;
  }
}

export function savePlatforms(platforms: Platform[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms));
}

export function seedDefaultPlatforms(): void {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) savePlatforms(defaultPlatforms);
}
