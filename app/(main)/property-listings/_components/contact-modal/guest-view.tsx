import Link from 'next/link';
import { ArrowRight, Bell, ChartBar, Shield, Star, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';

const benefits = [
  {
    icon: Shield,
    title: 'Direct Owner Access',
    description: 'Connect directly with verified property owners',
  },
  {
    icon: Zap,
    title: 'Exclusive Listings',
    description: 'Access off-market properties before others',
  },
  {
    icon: Bell,
    title: 'Lead Notifications',
    description: 'Get instant alerts for new owner listings',
  },
  {
    icon: Star,
    title: 'Quality Leads',
    description: 'Genuine property owners with intent to sell',
  },
  {
    icon: ChartBar,
    title: 'Market Data',
    description: 'Track property values and owner trends',
  },
];

export function GuestView() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">
          Connect with Property Owners
        </h2>
        <DialogDescription className="text-base leading-relaxed">
          Join UAE's premier agent platform for direct access to verified
          property owners and exclusive listings.
        </DialogDescription>
      </div>

      <div className="grid gap-2.5">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/50 p-3 transition-all hover:from-muted/5 hover:to-muted/10"
          >
            <div className="flex gap-3">
              <div className="rounded-full bg-primary/5 p-2 group-hover:bg-primary/10 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
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
            <span className="flex items-center justify-center gap-2">
              Sign in as Agent
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </Link>
        </Button>
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Not registered yet?{' '}
            <Link
              href="/auth/register/agent"
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
