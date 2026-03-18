import { Platform, PortalSettings } from '@/types';

const VISIT_KEY = 'nauss_portal_visits';
const PLATFORM_VISITS_KEY = 'nauss_platform_visits';

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

type RawPlatform = Partial<Platform> & {
  title?: string;
  customImage?: string;
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

export async function getPlatforms(): Promise<Platform[]> {
  try {
    const response = await fetch('/api/platforms', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return DEFAULT_PLATFORMS;
    }

    const data = await response.json();
    const platforms = Array.isArray(data?.platforms) ? data.platforms : DEFAULT_PLATFORMS;

    return normalizePlatforms(platforms);
  } catch (error) {
    console.error('Failed to fetch platforms: - storage.ts:91', error);
    return DEFAULT_PLATFORMS;
  }
}

export async function savePlatforms(platforms: Platform[]): Promise<boolean> {
  try {
    const normalized = normalizePlatforms(platforms);

    const response = await fetch('/api/platforms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platforms: normalized }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to save platforms: - storage.ts:110', error);
    return false;
  }
}

export async function seedDefaultPlatforms(): Promise<void> {
  try {
    const platforms = await getPlatforms();

    if (!platforms.length) {
      await savePlatforms(DEFAULT_PLATFORMS);
    }
  } catch (error) {
    console.error('Failed to seed platforms: - storage.ts:123', error);
  }
}

export async function getPortalSettings(): Promise<PortalSettings> {
  try {
    const response = await fetch('/api/settings', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return DEFAULT_SETTINGS;
    }

    const data = await response.json();
    const settings = data?.settings as Partial<PortalSettings> | undefined;
    const columns = settings?.columns;

    if (columns === 2 || columns === 3 || columns === 4 || columns === 5) {
      return { columns };
    }

    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Failed to fetch portal settings: - storage.ts:148', error);
    return DEFAULT_SETTINGS;
  }
}

export async function savePortalSettings(settings: PortalSettings): Promise<boolean> {
  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to save portal settings: - storage.ts:165', error);
    return false;
  }
}

export async function seedPortalSettings(): Promise<void> {
  try {
    const settings = await getPortalSettings();

    if (![2, 3, 4, 5].includes(settings.columns)) {
      await savePortalSettings(DEFAULT_SETTINGS);
    }
  } catch (error) {
    console.error('Failed to seed portal settings: - storage.ts:178', error);
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
