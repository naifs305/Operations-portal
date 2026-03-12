'use client';

import { Platform } from '@/types';
import { ExternalLink, Globe } from 'lucide-react';

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  const handleClick = () => {
    window.open(platform.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-xl border border-support-gray p-6 cursor-pointer card-hover group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`فتح ${platform.title}`}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-xl bg-support-light border border-support-gray flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
          {platform.image ? (
            <img
              src={platform.image}
              alt=""
              className="w-10 h-10 object-contain"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                e.currentTarget.style.display = 'none';
                if (parent && !parent.querySelector('svg')) {
                  const replacement = document.createElement('div');
                  replacement.innerHTML = '<svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>';
                  parent.appendChild(replacement.firstChild as Node);
                }
              }}
            />
          ) : (
            <Globe className="w-8 h-8 text-support-muted" />
          )}
        </div>
      </div>

      <h3 className="text-base font-semibold text-gray-900 text-center mb-2 group-hover:text-primary transition-colors">
        {platform.title}
      </h3>

      {platform.description && (
        <p className="text-sm text-support-muted text-center leading-relaxed line-clamp-2">
          {platform.description}
        </p>
      )}

      <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1 text-xs text-primary">
          <span>فتح المنصة</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
}
