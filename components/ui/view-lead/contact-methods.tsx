'use client';

import Link from 'next/link';
import {
  IoCall,
  IoChatbubblesOutline,
  IoLogoFacebook,
  IoLogoWhatsapp,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { SiTelegram } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContactMethodsProps {
  listing: App.Data.Lead.LeadListData;
  contact: {
    phone: string;
    whatsapp: string;
    telegram: string;
    facebook?: string;
    email?: string;
  };
}

// Helper function to extract emirate and area names from locations
const getLocationNames = (
  locations: App.Services.Location.Data.LocationData[]
): { emirateName: string; areaName: string } => {
  // Default values
  let emirateName = 'Dubai';
  let areaName = '';

  // If locations exist, try to extract emirate and area names
  if (locations && locations.length > 0) {
    // Assuming the first location is the most specific one
    const location = locations[0];

    // If breadcrumbs exist, the first one is usually the emirate
    if (location.breadcrumbs && location.breadcrumbs.length > 0) {
      emirateName = location.breadcrumbs[0].name;

      // If there are more breadcrumbs, the last one before the current location is the area
      if (location.breadcrumbs.length > 1) {
        areaName = location.breadcrumbs[location.breadcrumbs.length - 1].name;
      }
    }

    // If no area name was found in breadcrumbs, use the location name itself
    if (!areaName) {
      areaName = location.name;
    }
  }

  return { emirateName, areaName };
};

const getMessageText = (listing: App.Data.Lead.LeadListData) => {
  const { emirateName, areaName } = getLocationNames(listing.locations);

  const message = [
    'Hi,',
    `I'm interested in your ${listing.propertyTypeName}`,
    `in ${emirateName}, ${areaName}.`,
    '',
    'Is it still available?',
  ].join('\n');

  return encodeURIComponent(message);
};

const contactMethods = [
  {
    icon: IoChatbubblesOutline,
    label: 'Chat Now',
    href: (
      contact: ContactMethodsProps['contact'],
      listing: App.Data.Lead.LeadListData
    ) => `/dashboard/chat?id=${listing.owner.id}`,
    color: 'text-green-500',
  },
  {
    icon: IoCall,
    label: 'Call Now',
    href: (contact: ContactMethodsProps['contact']) => `tel:${contact.phone}`,
    color: 'text-green-500',
  },
  {
    icon: IoLogoWhatsapp,
    label: 'WhatsApp',
    href: (
      contact: ContactMethodsProps['contact'],
      listing: App.Data.Lead.LeadListData
    ) =>
      `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${getMessageText(listing)}`,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    external: true,
  },
  {
    icon: SiTelegram,
    label: 'Telegram',
    href: (
      contact: ContactMethodsProps['contact'],
      listing: App.Data.Lead.LeadListData
    ) =>
      `https://t.me/${contact.telegram.replace('@', '')}?text=${getMessageText(listing)}`,
    color: 'text-purple-500',
    external: true,
  },
  {
    icon: IoLogoFacebook,
    label: 'Facebook',
    href: (contact: ContactMethodsProps['contact']) =>
      `https://www.facebook.com/${contact.facebook}`,
    color: 'text-blue-600',
    external: true,
    condition: (contact: ContactMethodsProps['contact']) => !!contact.facebook,
  },
];

export function ContactMethods({ listing, contact }: ContactMethodsProps) {
  return (
    <Card className="rounded-xl shadow-none border">
      <CardContent className="p-3 space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">
          Quick Actions
        </h4>
        <div className="flex flex-col gap-2">
          {contactMethods
            .filter((method) => !method.condition || method.condition(contact))
            .map(({ icon: Icon, label, href, color, bgColor, external }) => (
              <Button
                key={label}
                asChild
                variant="outline"
                className="h-12 justify-between bg-background hover:bg-muted/5 transition-colors dark:bg-muted/5 dark:hover:bg-muted/10 dark:border-muted/20"
              >
                <Link
                  href={
                    typeof href === 'function' ? href(contact, listing) : href
                  }
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn('rounded-full p-2', 'dark:bg-opacity-20')}
                    >
                      <Icon
                        className={cn('h-4 w-4', color, 'dark:text-white')}
                      />
                    </div>
                    <span className="font-medium text-sm dark:text-white">
                      {label}
                    </span>
                  </div>
                  {external && (
                    <IoShareSocialOutline className="h-4 w-4 text-muted-foreground dark:text-white/70" />
                  )}
                </Link>
              </Button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
