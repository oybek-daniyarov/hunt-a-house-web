'use client';

import { useEffect } from 'react';

import { revalidateTagsAsync } from '@/lib/client/laravel';
import { useModelUpdates } from '@/lib/echo/echo-provider';

export default function LaravelLive() {
  const modelUpdates = useModelUpdates();

  useEffect(() => {
    if (modelUpdates) {
      const tags = [
        modelUpdates.type,
        modelUpdates.id ? `${modelUpdates.type}.${modelUpdates.id}` : '',
      ].filter(Boolean);

      revalidateTagsAsync(tags);
    }
  }, [modelUpdates]);

  // This component doesn't render anything visible
  // It just sets up the real-time listeners
  return null;
}
