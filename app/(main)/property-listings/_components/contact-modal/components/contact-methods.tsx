import { ExternalLink, Mail, MessageSquare, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactMethodsProps {
  listing: App.Data.Lead.LeadListData;
  contact: {
    phone: string;
    whatsapp: string;
    telegram: string;
    email: string;
  };
}

const getMessageText = (listing: App.Data.Lead.LeadListData) => {
  const message = [
    'Hi,',
    `I'm interested in your ${listing.propertyTypeName}`,
    `in ${listing.emirateName}, ${listing.areaName}.`,
    '',
    'Is it still available?',
  ].join('\n');

  return encodeURIComponent(message);
};

const getEmailSubject = (listing: App.Data.Lead.LeadListData) => {
  return encodeURIComponent(
    `${listing.propertyTypeName} in ${listing.emirateName} - Inquiry`
  );
};

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Now',
    href: (contact: ContactMethodsProps['contact']) => `tel:${contact.phone}`,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: MessageSquare,
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
    icon: MessageSquare,
    label: 'Telegram',
    href: (
      contact: ContactMethodsProps['contact'],
      listing: App.Data.Lead.LeadListData
    ) =>
      `https://t.me/${contact.telegram.replace('@', '')}?text=${getMessageText(listing)}`,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    external: true,
  },
  {
    icon: Mail,
    label: 'Send Email',
    href: (
      contact: ContactMethodsProps['contact'],
      listing: App.Data.Lead.LeadListData
    ) =>
      `mailto:${contact.email}?subject=${getEmailSubject(listing)}&body=${getMessageText(listing)}`,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

export function ContactMethods({ listing, contact }: ContactMethodsProps) {
  return (
    <div className="space-y-3 rounded-lg bg-gradient-to-br from-background to-muted/50 p-4">
      <h4 className="font-medium">Quick Actions</h4>
      <div className="grid gap-2">
        {contactMethods.map(
          ({ icon: Icon, label, href, color, bgColor, external }) => (
            <Button
              key={label}
              asChild
              variant="outline"
              className="h-12 justify-between bg-background hover:bg-muted/5 transition-colors"
            >
              <a
                href={
                  typeof href === 'function' ? href(contact, listing) : href
                }
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('rounded-full p-2', bgColor)}>
                    <Icon className={cn('h-4 w-4', color)} />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </Button>
          )
        )}
      </div>
    </div>
  );
}
