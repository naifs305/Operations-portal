'use client';

import { Platform } from '@/types';
import { ArrowDown, ArrowUp, Edit, ExternalLink, Eye, EyeOff, Trash2 } from 'lucide-react';

interface PlatformListItemProps {
  platform: Platform;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (platform: Platform) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function PlatformListItem({
  platform,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onToggleVisibility,
  onMoveUp,
  onMoveDown
}: PlatformListItemProps) {
  return (
    <div className="bg-white border border-support-gray rounded-lg p-4 flex items-center gap-4 hover:border-primary/30 transition-colors">
      <div className="flex flex-col gap-1">
        <button onClick={() => onMoveUp(platform.id)} disabled={isFirst} className="p-1 text-support-muted hover:text-primary disabled:opacity-30" title="تحريك للأعلى">
          <ArrowUp className="w-4 h-4" />
        </button>
        <button onClick={() => onMoveDown(platform.id)} disabled={isLast} className="p-1 text-support-muted hover:text-primary disabled:opacity-30" title="تحريك للأسفل">
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      <div className="w-10 h-10 rounded-lg bg-support-light border border-support-gray flex items-center justify-center flex-shrink-0">
        <img src={platform.image} alt="" className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate">{platform.title}</h3>
          {!platform.visible && <span className="text-xs bg-support-light text-support-muted px-2 py-0.5 rounded">مخفي</span>}
        </div>
        <p className="text-sm text-support-muted truncate">{platform.description || 'بدون وصف'}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onToggleVisibility(platform.id)} className="p-2 text-support-muted hover:text-primary hover:bg-support-light rounded-lg transition-colors" title={platform.visible ? 'إخفاء' : 'إظهار'}>
          {platform.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <a href={platform.url} target="_blank" rel="noopener noreferrer" className="p-2 text-support-muted hover:text-primary hover:bg-support-light rounded-lg transition-colors" title="فتح الرابط">
          <ExternalLink className="w-4 h-4" />
        </a>
        <button onClick={() => onEdit(platform)} className="p-2 text-support-muted hover:text-gold hover:bg-support-light rounded-lg transition-colors" title="تعديل">
          <Edit className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(platform.id)} className="p-2 text-support-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
