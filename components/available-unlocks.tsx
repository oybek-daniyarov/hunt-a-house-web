import { Coins } from 'lucide-react';

import { Badge } from './ui/badge';

interface AvailableUnlocksProps {
  credits: number;
  variant?: 'badge' | 'dropdown';
}

export function AvailableUnlocks({
  credits,
  variant = 'badge',
}: AvailableUnlocksProps) {
  if (variant === 'badge') {
    return (
      <div className="mb-2 px-2">
        <Badge
          variant="outline"
          className="w-full flex justify-between items-center py-1.5"
        >
          <span className="flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium">Available Unlocks</span>
          </span>
          <span className="font-bold text-primary">{credits || 0}</span>
        </Badge>
      </div>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <Coins className="h-4 w-4 text-primary" />
      Available Unlocks
    </span>
  );
}
