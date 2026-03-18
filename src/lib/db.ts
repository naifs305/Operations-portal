import { neon } from '@neondatabase/serverless';
import { Platform, PortalSettings } from '@/types';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured');
}

const sql = neon(databaseUrl);

type PlatformRow = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type PortalSettingsRow = {
  id: number;
  columns: number;
  updated_at: string;
};

let initialized = false;

export async function initializeDatabase() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS portal_platforms (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      url TEXT NOT NULL DEFAULT '',
      icon TEXT NOT NULL DEFAULT '',
      visible BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portal_settings (
      id INTEGER PRIMARY KEY,
      columns INTEGER NOT NULL DEFAULT 4,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    INSERT INTO portal_settings (id, columns)
    VALUES (1, 4)
    ON CONFLICT (id) DO NOTHING;
  `;

  initialized = true;
}

function mapPlatformRow(row: PlatformRow): Platform {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    url: row.url,
    icon: row.icon,
    visible: row.visible,
  };
}

export async function getAllPlatformsFromDb(): Promise<Platform[]> {
  await initializeDatabase();

  const rows = await sql<PlatformRow[]>`
    SELECT id, name, description, url, icon, visible, sort_order, created_at, updated_at
    FROM portal_platforms
    ORDER BY sort_order ASC, created_at ASC;
  `;

  return rows.map(mapPlatformRow);
}

export async function saveAllPlatformsToDb(platforms: Platform[]): Promise<Platform[]> {
  await initializeDatabase();

  await sql`BEGIN`;

  try {
    await sql`DELETE FROM portal_platforms`;

    for (let index = 0; index < platforms.length; index += 1) {
      const platform = platforms[index];

      await sql`
        INSERT INTO portal_platforms (
          id,
          name,
          description,
          url,
          icon,
          visible,
          sort_order
        )
        VALUES (
          ${platform.id},
          ${platform.name},
          ${platform.description},
          ${platform.url},
          ${platform.icon},
          ${platform.visible !== false},
          ${index}
        );
      `;
    }

    await sql`COMMIT`;
  } catch (error) {
    await sql`ROLLBACK`;
    throw error;
  }

  return getAllPlatformsFromDb();
}

export async function getPortalSettingsFromDb(): Promise<PortalSettings> {
  await initializeDatabase();

  const rows = await sql<PortalSettingsRow[]>`
    SELECT id, columns, updated_at
    FROM portal_settings
    WHERE id = 1
    LIMIT 1;
  `;

  const columns = rows[0]?.columns;

  if (columns === 2 || columns === 3 || columns === 4 || columns === 5) {
    return { columns };
  }

  return { columns: 4 };
}

export async function savePortalSettingsToDb(
  settings: PortalSettings
): Promise<PortalSettings> {
  await initializeDatabase();

  const safeColumns =
    settings.columns === 2 ||
    settings.columns === 3 ||
    settings.columns === 4 ||
    settings.columns === 5
      ? settings.columns
      : 4;

  await sql`
    INSERT INTO portal_settings (id, columns, updated_at)
    VALUES (1, ${safeColumns}, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      columns = EXCLUDED.columns,
      updated_at = NOW();
  `;

  return { columns: safeColumns };
}
