import { cache } from 'react';
import Link from 'next/link';
import {
  IoArrowForward,
  IoFlash,
  IoNotifications,
  IoShield,
  IoStar,
} from 'react-icons/io5';

import { fetchSanitySite } from '@/app/(main)/actions';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

const icons = [IoShield, IoFlash, IoNotifications, IoStar];

const GuestView = cache(async () => {
  const settings = await fetchSanitySite();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <DialogTitle>{settings.listingGuestDialog?.title}</DialogTitle>
        <DialogDescription>
          {settings.listingGuestDialog?.subtitle}
        </DialogDescription>
      </div>

      <div className="grid gap-2.5">
        {settings.listingGuestDialog?.features.map((feature, index) => {
          const Icon = icons[index];
          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/50 p-2 transition-all hover:from-muted/5 hover:to-muted/10"
            >
              <div className="flex gap-3">
                <div>
                  <div className="rounded-full bg-primary/5 p-2 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium leading-none">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <Button
          asChild
          size="lg"
          className="relative w-full h-12 bg-primary hover:bg-primary/90 transition-colors"
        >
          <Link href="/auth/login" className="relative z-10">
            <span className="flex items-center justify-center gap-2 text-sm font-medium">
              Sign in as Agent
              <IoArrowForward className="h-4 w-4" />
            </span>
          </Link>
        </Button>
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Not registered yet?{' '}
            <Link
              href="/uae-real-estate-agents"
              className="text-primary hover:text-primary/90 font-medium transition-colors"
            >
              Create Agent Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
});

export default GuestView;
