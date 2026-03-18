import { NextResponse } from 'next/server';
import { PortalSettings } from '@/types';
import { getPortalSettingsFromDb, savePortalSettingsToDb } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getPortalSettingsFromDb();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('GET /api/settings failed: - route.ts:10', error);
    return NextResponse.json(
      { error: 'تعذر جلب الإعدادات' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const settings = body?.settings as PortalSettings | undefined;

    if (
      !settings ||
      ![2, 3, 4, 5].includes(settings.columns)
    ) {
      return NextResponse.json(
        { error: 'بيانات الإعدادات غير صالحة' },
        { status: 400 }
      );
    }

    const saved = await savePortalSettingsToDb(settings);
    return NextResponse.json({ settings: saved });
  } catch (error) {
    console.error('POST /api/settings failed: - route.ts:36', error);
    return NextResponse.json(
      { error: 'تعذر حفظ الإعدادات' },
      { status: 500 }
    );
  }
}
