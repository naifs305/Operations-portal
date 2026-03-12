import { Platform } from '@/types';

const STORAGE_KEY = 'training_portal_data';
const VISIT_COUNT_KEY = 'training_portal_visits';

export function getPlatforms(): Platform[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    return JSON.parse(stored) as Platform[];
  } catch (error) {
    console.error('Error loading platforms: - storage.ts:15', error);
    return [];
  }
}

export function savePlatforms(platforms: Platform[]): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms));
}

export function addPlatform(platform: Platform): void {
  const platforms = getPlatforms();
  platforms.push(platform);
  savePlatforms(platforms);
}

export function updatePlatform(updatedPlatform: Platform): void {
  const platforms = getPlatforms().map((platform) =>
    platform.id === updatedPlatform.id ? updatedPlatform : platform
  );

  savePlatforms(platforms);
}

export function deletePlatform(id: string): void {
  const platforms = getPlatforms().filter((platform) => platform.id !== id);
  savePlatforms(platforms);
}

export function resetToDefault(): void {
  savePlatforms([]);
}

export function exportData(): string {
  const platforms = getPlatforms();
  return JSON.stringify(platforms, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);

    if (!Array.isArray(parsed)) return false;

    savePlatforms(parsed as Platform[]);
    return true;
  } catch (error) {
    console.error('Error importing data: - storage.ts:63', error);
    return false;
  }
}

export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;

  const count = localStorage.getItem(VISIT_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
}

export function incrementVisitCount(): number {
  if (typeof window === 'undefined') return 0;

  const currentCount = getVisitCount();
  const newCount = currentCount + 1;
  localStorage.setItem(VISIT_COUNT_KEY, newCount.toString());
  return newCount;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}