import { Platform, PortalData } from '@/types';
import { defaultPlatforms } from '@/data/platforms';

const STORAGE_KEY = 'training_portal_data';
const VISIT_COUNT_KEY = 'training_portal_visits';

function cloneDefaults(): Platform[] {
  return [...defaultPlatforms].map((item) => ({ ...item })).sort((a, b) => a.order - b.order);
}

export function getPlatforms(): Platform[] {
  if (typeof window === 'undefined') {
    return cloneDefaults();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: PortalData = JSON.parse(stored);
      return [...data.platforms].sort((a, b) => a.order - b.order);
    }
  } catch (error) {
    console.error('Error loading platforms:', error);
  }

  return cloneDefaults();
}

export function savePlatforms(platforms: Platform[]): void {
  if (typeof window === 'undefined') return;

  const normalized = [...platforms]
    .sort((a, b) => a.order - b.order)
    .map((platform, index) => ({ ...platform, order: index + 1 }));

  const data: PortalData = {
    platforms: normalized,
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function exportData(): string {
  const data: PortalData = {
    platforms: getPlatforms(),
    lastUpdated: new Date().toISOString()
  };

  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data: PortalData = JSON.parse(jsonString);
    if (!Array.isArray(data.platforms)) return false;
    savePlatforms(data.platforms);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

export function resetToDefault(): void {
  savePlatforms(cloneDefaults());
}

export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  const count = localStorage.getItem(VISIT_COUNT_KEY);
  return count ? parseInt(count, 10) || 0 : 0;
}

export function incrementVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  const next = getVisitCount() + 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(next));
  return next;
}
