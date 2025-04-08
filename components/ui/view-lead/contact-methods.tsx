'use client';

import { memo, useCallback, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  IoCall,
  IoChatbubblesOutline,
  IoCopy,
  IoLogoFacebook,
  IoLogoWhatsapp,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { SiTelegram } from 'react-icons/si';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Type definitions
type ContactMethodType =
  | 'phone'
  | 'whatsapp'
  | 'telegram'
  | 'facebook'
  | 'email';

interface ContactMethodsProps {
  listing: App.Data.Lead.LeadListData;
}

// Pure utility functions
const formatLocation = (
  locations: App.Services.Location.Data.LocationData[]
): string => {
  if (!locations?.length) return 'Dubai';

  const location = locations[0];
  const breadcrumbs = location.breadcrumbs;

  if (!breadcrumbs?.length) return location.name;

  const emirate = breadcrumbs[0].name;
  const area =
    breadcrumbs.length > 1
      ? breadcrumbs[breadcrumbs.length - 1].name
      : location.name;

  return `${emirate}, ${area}`;
};

const createShareMessage = (listing: App.Data.Lead.LeadListData): string => {
  const location = formatLocation(listing.locations);

  return encodeURIComponent(
    [
      'Hi,',
      `I'm interested in your ${listing.propertyTypeName}`,
      `in ${location}.`,
      '',
      'Is it still available?',
    ].join('\n')
  );
};

const getContactMethodValue = (
  contactMethods: App.Data.ContactMethodData[],
  type: ContactMethodType
): string =>
  contactMethods?.find((method) => method.type === type)?.value || '';

const createContactData = (listing: App.Data.Lead.LeadListData) => ({
  phone: getContactMethodValue(listing.contactMethods, 'phone'),
  whatsapp: getContactMethodValue(listing.contactMethods, 'whatsapp'),
  telegram: getContactMethodValue(listing.contactMethods, 'telegram'),
  facebook: getContactMethodValue(listing.contactMethods, 'facebook'),
  email: getContactMethodValue(listing.contactMethods, 'email'),
});

// Contact method configuration
interface ContactMethodConfig {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  getHref: (
    contact: ReturnType<typeof createContactData>,
    listing: App.Data.Lead.LeadListData
  ) => string;
  color: string;
  external?: boolean;
  shouldShow: (contact: ReturnType<typeof createContactData>) => boolean;
  getValue: (contact: ReturnType<typeof createContactData>) => string;
}

// Configuration constants
const CONTACT_METHODS: ReadonlyArray<ContactMethodConfig> = [
  {
    id: 'chat',
    icon: IoChatbubblesOutline,
    label: 'Chat Now',
    getHref: (_, listing) => `/dashboard/chat?id=${listing.id}`,
    color: 'text-green-500',
    shouldShow: () => true,
    getValue: () => 'Chat in app',
  },
  {
    id: 'call',
    icon: IoCall,
    label: 'Call Now',
    getHref: ({ phone }) => `tel:${phone}`,
    color: 'text-green-500',
    shouldShow: ({ phone }) => Boolean(phone),
    getValue: ({ phone }) => phone,
  },
  {
    id: 'whatsapp',
    icon: IoLogoWhatsapp,
    label: 'WhatsApp',
    getHref: ({ whatsapp }, listing) =>
      `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${createShareMessage(listing)}`,
    color: 'text-blue-500',
    external: true,
    shouldShow: ({ whatsapp }) => Boolean(whatsapp),
    getValue: ({ whatsapp }) => whatsapp,
  },
  {
    id: 'telegram',
    icon: SiTelegram,
    label: 'Telegram',
    getHref: ({ telegram }, listing) =>
      `https://t.me/${telegram.replace('@', '')}?text=${createShareMessage(listing)}`,
    color: 'text-purple-500',
    external: true,
    shouldShow: ({ telegram }) => Boolean(telegram),
    getValue: ({ telegram }) => telegram,
  },
  {
    id: 'facebook',
    icon: IoLogoFacebook,
    label: 'Facebook',
    getHref: ({ facebook }) => `https://www.facebook.com/${facebook}`,
    color: 'text-blue-600',
    external: true,
    shouldShow: ({ facebook }) => Boolean(facebook),
    getValue: ({ facebook }) => facebook,
  },
] as const;

// Reusable UI components
type MethodIconProps = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const MethodIcon = memo(function MethodIcon({
  icon: Icon,
  color,
}: MethodIconProps) {
  return (
    <div className={cn('rounded-full p-2', 'dark:bg-opacity-20')}>
      <Icon className={cn('h-4 w-4', color, 'dark:text-white')} />
    </div>
  );
});

type CopyButtonProps = {
  value: string;
  label: string;
};

const CopyButton = memo(function CopyButton({ value, label }: CopyButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Use startTransition to mark UI updates as non-urgent
      startTransition(() => {
        navigator.clipboard
          .writeText(value)
          .then(() => {
            setIsCopied(true);
            toast.success(`${label} copied to clipboard`);

            // Reset copied state after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy to clipboard');
          });
      });
    },
    [value, label]
  );

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        'h-5 w-5 transition-all',
        isCopied
          ? 'text-green-500 opacity-100'
          : 'opacity-0 group-hover:opacity-100'
      )}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      disabled={isPending}
    >
      <IoCopy className="h-3 w-3" />
    </Button>
  );
});

type ContactMethodItemProps = {
  method: ContactMethodConfig;
  contact: ReturnType<typeof createContactData>;
  listing: App.Data.Lead.LeadListData;
};

const ContactMethodItem = memo(function ContactMethodItem({
  method,
  contact,
  listing,
}: ContactMethodItemProps) {
  const { icon, label, getHref, color, external, getValue } = method;

  // Compute values outside JSX for better readability
  const href = getHref(contact, listing);
  const value = getValue(contact);

  // Use data attributes for better DOM properties
  const linkProps = {
    href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
    className: 'flex items-center justify-between w-full',
    prefetch: !external,
    'data-external': external || undefined,
  };

  return (
    <Button
      asChild
      variant="outline"
      className="h-12 justify-between bg-background hover:bg-muted/5 transition-colors dark:bg-muted/5 dark:hover:bg-muted/10 dark:border-muted/20 group"
    >
      <Link {...linkProps}>
        <div className="flex items-center gap-2">
          <MethodIcon icon={icon} color={color} />
          <div>
            <span className="font-medium text-sm dark:text-white">{label}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground dark:text-white/70">
                {value}
              </span>
              {value && <CopyButton value={value} label={label} />}
            </div>
          </div>
        </div>
        {external && (
          <IoShareSocialOutline className="h-4 w-4 text-muted-foreground dark:text-white/70" />
        )}
      </Link>
    </Button>
  );
});

// Main component
export function ContactMethods({ listing }: ContactMethodsProps) {
  // Derive state from props using useMemo
  const contact = useMemo(() => createContactData(listing), [listing]);

  // Filter methods in a stable way
  const availableMethods = useMemo(
    () => CONTACT_METHODS.filter((method) => method.shouldShow(contact)),
    [contact]
  );

  // Early return for better performance
  if (!availableMethods.length) return null;

  return (
    <Card className="rounded-xl shadow-none border">
      <CardContent className="p-3 space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">
          Quick Actions
        </h4>
        <div className="flex flex-col gap-2">
          {availableMethods.map((method) => (
            <ContactMethodItem
              key={method.id}
              method={method}
              contact={contact}
              listing={listing}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
