import { Loader2 } from 'lucide-react';

export function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-8 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    </div>
  );
}
