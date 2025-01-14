"use client";
import { Button } from "@/components/ui/button";
import { XIcon } from 'lucide-react';
import Link from 'next/link';

import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <Button asChild>
      <div className="flex items-center gap-x-3">
        <p className="text-sm">Preview Mode Enabled</p>
        <Link
          href="/api/draft-mode/disable"
          className="rounded-full bg-zinc-100 p-1 hover:bg-zinc-200"
        >
          <XIcon className="h-4 w-4" />
        </Link>
      </div>
    </Button>
  );
}
