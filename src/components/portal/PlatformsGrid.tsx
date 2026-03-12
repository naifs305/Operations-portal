import PlatformCard from './PlatformCard';
import { Platform } from '@/types';

export default function PlatformsGrid({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
}
