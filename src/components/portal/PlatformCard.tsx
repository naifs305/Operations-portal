import { Platform } from '@/types';

export default function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-[#e5e7eb] bg-white px-6 py-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex min-h-[280px] flex-col items-center justify-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center">
          {platform.icon ? (
            <img
              src={platform.icon}
              alt={platform.name}
              className="max-h-24 max-w-24 object-contain"
            />
          ) : null}
        </div>

        <h3 className="mb-3 text-2xl font-normal leading-snug text-[#5b6f8a]">
          {platform.name}
        </h3>

        <p className="text-xl leading-relaxed text-[#5b6f8a]">
          {platform.description}
        </p>
      </div>
    </a>
  );
}
