export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-SA').format(num);
}
export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}