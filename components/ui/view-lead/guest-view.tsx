import Link from 'next/link';
import {
  IoArrowForward,
  IoFlash,
  IoNotifications,
  IoShield,
  IoStar,
} from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

const benefits = [
  {
    icon: IoShield,
    title: 'Direct Owner Access',
    description: 'Connect directly with verified property owners',
  },
  {
    icon: IoFlash,
    title: 'Exclusive Listings',
    description: 'Access off-market properties before others',
  },
  {
    icon: IoNotifications,
    title: 'Lead Notifications',
    description: 'Get instant alerts for new owner listings',
  },
  {
    icon: IoStar,
    title: 'Quality Leads',
    description: 'Genuine property owners with intent to sell',
  },
];

export function GuestView() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <DialogTitle>Connect with Property Owners</DialogTitle>
        <DialogDescription>
          Join UAE&apos;s premier agent platform for direct access to verified
          property owners and exclusive listings.
        </DialogDescription>
      </div>

      <div className="grid gap-2.5">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/50 p-2 transition-all hover:from-muted/5 hover:to-muted/10"
          >
            <div className="flex gap-3">
              <div>
                <div className="rounded-full bg-primary/5 p-2 group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium leading-none">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
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
}
