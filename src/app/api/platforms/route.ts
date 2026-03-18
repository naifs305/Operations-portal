import { NextResponse } from 'next/server';
import { Platform } from '@/types';
import { getAllPlatformsFromDb, saveAllPlatformsToDb } from '@/lib/db';

export async function GET() {
  try {
    const platforms = await getAllPlatformsFromDb();
    return NextResponse.json({ platforms });
  } catch (error) {
    console.error('GET /api/platforms failed: - route.ts:10', error);
    return NextResponse.json(
      { error: 'تعذر جلب المنصات' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platforms = Array.isArray(body?.platforms) ? (body.platforms as Platform[]) : null;

    if (!platforms) {
      return NextResponse.json(
        { error: 'بيانات المنصات غير صالحة' },
        { status: 400 }
      );
    }

    const saved = await saveAllPlatformsToDb(platforms);
    return NextResponse.json({ platforms: saved });
  } catch (error) {
    console.error('POST /api/platforms failed: - route.ts:33', error);
    return NextResponse.json(
      { error: 'تعذر حفظ المنصات' },
      { status: 500 }
    );
  }
}
