import Image from 'next/image';
import { Platform } from '@/types';

export default function PlatformCard({ platform }: { platform: Platform }) {
  const imageSrc = platform.icon?.trim() || '/images/platform-placeholder.svg';

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noreferrer"
      className="group block h-full overflow-hidden rounded-2xl border border-[#e3e5e4] bg-white px-6 py-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-full min-h-[250px] flex-col items-center justify-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white">
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={platform.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        <h3 className="text-xl font-normal leading-relaxed text-[#5f6f86] sm:text-[1.65rem]">
          {platform.name}
        </h3>

        <p className="mt-3 text-lg leading-loose text-[#5f6f86] sm:text-[1.35rem]">
          {platform.description}
        </p>
      </div>
    </a>
  );
}