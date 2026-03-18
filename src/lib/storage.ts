import { Platform, PortalSettings } from '@/types';

const STORAGE_KEY = 'nauss_portal_platforms';
const VISIT_KEY = 'nauss_portal_visits';
const PLATFORM_VISITS_KEY = 'nauss_platform_visits';
const PORTAL_SETTINGS_KEY = 'nauss_portal_settings';

type RawPlatform = Partial<Platform> & {
  title?: string;
  customImage?: string;
};

const DEFAULT_PLATFORMS: Platform[] = [
  {
    id: '1',
    name: 'منصة التدريب LMS',
    description: 'البوابة الرئيسية للتدريب الإلكتروني',
    url: 'https://example.com/lms',
    icon: 'https://api.iconify.design/mdi:school.svg?color=%23016564',
    visible: true,
  },
  {
    id: '2',
    name: 'منصة إقفال الدورات',
    description: 'إدارة إقفال واعتماد الدورات التدريبية',
    url: 'https://example.com/closure',
    icon: 'https://api.iconify.design/mdi:clipboard-check.svg?color=%23016564',
    visible: true,
  },
  {
    id: '3',
    name: 'منصة مخزون التدريب',
    description: 'إدارة العهد والمواد والمخزون التدريبي',
    url: 'https://example.com/inventory',
    icon: 'https://api.iconify.design/mdi:package-variant-closed.svg?color=%23016564',
    visible: true,
  },
  {
    id: '4',
    name: 'منصة الجدول الأسبوعي',
    description: 'متابعة جدول الدورات والبرامج الأسبوعية',
    url: 'https://example.com/schedule',
    icon: 'https://api.iconify.design/mdi:calendar-clock.svg?color=%23016564',
    visible: true,
  },
  {
    id: '5',
    name: 'منصة رسائل الواتساب',
    description: 'إدارة الرسائل والتنبيهات وقوالب التواصل',
    url: 'https://example.com/whatsapp',
    icon: 'https://api.iconify.design/mdi:whatsapp.svg?color=%23016564',
    visible: true,
  },
];

const DEFAULT_SETTINGS: PortalSettings = {
  columns: 4,
};

function normalizePlatform(item: RawPlatform, index: number): Platform {
  return {
    id: String(item.id || `${Date.now()}-${index}`),
    name: String(item.name || item.title || '').trim(),
    description: String(item.description || '').trim(),
    url: String(item.url || '').trim(),
    icon: String(item.icon || item.customImage || '').trim(),
    visible: item.visible !== false,
  };
}

function normalizePlatforms(items: RawPlatform[]): Platform[] {
  return items
    .map((item, index) => normalizePlatform(item, index))
    .filter((item) => item.name);
}

export function getPlatforms(): Platform[] {
  if (typeof window === 'undefined') return DEFAULT_PLATFORMS;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PLATFORMS;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return DEFAULT_PLATFORMS;

    return normalizePlatforms(parsed);
  } catch {
    return DEFAULT_PLATFORMS;
  }
}

export function savePlatforms(platforms: Platform[]): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const normalized = normalizePlatforms(platforms);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch (error) {
    console.error('Failed to save platforms: - storage.ts:101', error);
    return false;
  }
}

export function seedDefaultPlatforms(): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLATFORMS));
      return;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLATFORMS));
      return;
    }

    const normalized = normalizePlatforms(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.error('Failed to seed platforms: - storage.ts:125', error);
  }
}

export function getPortalSettings(): PortalSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const stored = localStorage.getItem(PORTAL_SETTINGS_KEY);
    if (!stored) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(stored) as Partial<PortalSettings>;
    const columns = parsed.columns;

    if (columns === 2 || columns === 3 || columns === 4 || columns === 5) {
      return { columns };
    }

    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function savePortalSettings(settings: PortalSettings): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(PORTAL_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Failed to save portal settings: - storage.ts:156', error);
    return false;
  }
}

export function seedPortalSettings(): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(PORTAL_SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(PORTAL_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  } catch (error) {
    console.error('Failed to seed portal settings: - storage.ts:170', error);
  }
}

export function getPortalVisits(): number {
  if (typeof window === 'undefined') return 0;

  try {
    return parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

export function incrementPortalVisit(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const nextValue = getPortalVisits() + 1;
    localStorage.setItem(VISIT_KEY, nextValue.toString());
    return nextValue;
  } catch {
    return 0;
  }
}

export function getPlatformVisits(): Record<string, number> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(PLATFORM_VISITS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function incrementPlatformVisit(platformId: string): number {
  if (typeof window === 'undefined') return 0;

  try {
    const visits = getPlatformVisits();
    visits[platformId] = (visits[platformId] || 0) + 1;
    localStorage.setItem(PLATFORM_VISITS_KEY, JSON.stringify(visits));
    return visits[platformId];
  } catch {
    return 0;
  }
}
