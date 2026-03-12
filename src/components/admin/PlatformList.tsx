'use client';

import { useState } from 'react';
import { Platform } from '@/types/platform';
import Button from '@/components/ui/Button';
import PlatformForm from './PlatformForm';
import { generateId } from '@/lib/helpers';

interface PlatformListProps {
  platforms: Platform[];
  setPlatforms: (platforms: Platform[]) => void;
}

export default function PlatformList({ platforms, setPlatforms }: PlatformListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  function handleAdd() {
    setEditingPlatform(null);
    setShowForm(true);
  }

  function handleEdit(platform: Platform) {
    setEditingPlatform(platform);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    const updated = platforms.filter((p) => p.id !== id);
    setPlatforms(updated);
  }

  function handleSave(data: Omit<Platform, 'id'>) {
    if (editingPlatform) {
      const updated = platforms.map((p) =>
        p.id === editingPlatform.id ? { ...p, ...data } : p
      );
      setPlatforms(updated);
    } else {
      const newPlatform: Platform = {
        id: generateId(),
        ...data,
      };
      setPlatforms([...platforms, newPlatform]);
    }

    setShowForm(false);
    setEditingPlatform(null);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة المنصات</h2>

        <Button onClick={handleAdd}>
          إضافة منصة
        </Button>
      </div>

      {showForm && (
        <PlatformForm
          initialData={editingPlatform}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPlatform(null);
          }}
        />
      )}

      <div className="grid gap-4">

        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-12 h-12 object-contain"
              />

              <div>
                <div className="font-semibold">{platform.name}</div>
                <div className="text-sm text-gray-500">{platform.url}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => handleEdit(platform)}
              >
                تعديل
              </Button>

              <Button
                variant="danger"
                onClick={() => handleDelete(platform.id)}
              >
                حذف
              </Button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}