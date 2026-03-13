import Image from 'next/image';
import { Eye } from 'lucide-react';
import { Platform } from '@/types';
import { incrementPlatformVisit, getPlatformVisits } from '@/lib/storage';

export default function PlatformCard({
  platform,
  index,
}: {
  platform: Platform;
  index: number;
}) {
  const image =
    platform.icon?.trim() || 'https://api.iconify.design/mdi:web.svg?color=%23016564';
  const visits = getPlatformVisits();
  const visitCount = visits[platform.id] || 0;
  const delayClass = `delay-${Math.min(index + 1, 12)}`;

  function handleClick() {
    incrementPlatformVisit(platform.id);
  }

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`فتح ${platform.name}`}
      className={`platform-card animate-in ${delayClass}`}
    >
      <div className="card-icon-wrap">
        <Image
          src={image}
          alt=""
          width={58}
          height={58}
          className="object-contain"
          unoptimized
        />
      </div>

      <div className="card-title">{platform.name}</div>

      {platform.description ? <div className="card-desc">{platform.description}</div> : null}

      <div className="card-counter">
        <Eye size={14} />
        <span>{visitCount.toLocaleString('ar-SA')}</span>
        زيارة
      </div>
    </a>
  );
}