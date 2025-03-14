'use client';

import {
  IoCall,
  IoCopy,
  IoLogoFacebook,
  IoLogoWhatsapp,
} from 'react-icons/io5';
import { SiTelegram } from 'react-icons/si';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContactDetailsProps {
  contact: {
    name: string;
    phone: string;
    whatsapp: string;
    telegram: string;
    facebook?: string;
  };
}

const contactDetails = [
  {
    icon: IoCall,
    label: 'Phone',
    getValue: (contact: ContactDetailsProps['contact']) => contact.phone,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: IoLogoWhatsapp,
    label: 'WhatsApp',
    getValue: (contact: ContactDetailsProps['contact']) => contact.whatsapp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: SiTelegram,
    label: 'Telegram',
    getValue: (contact: ContactDetailsProps['contact']) => contact.telegram,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: IoLogoFacebook,
    label: 'Facebook',
    getValue: (contact: ContactDetailsProps['contact']) =>
      contact.facebook || '',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    condition: (contact: ContactDetailsProps['contact']) => !!contact.facebook,
  },
];

export function ContactDetails({ contact }: ContactDetailsProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="space-y-4 pt-6 border-t">
      <div>
        <h3 className="text-lg font-medium tracking-tight">{contact.name}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        {contactDetails
          .filter((detail) => !detail.condition || detail.condition(contact))
          .map(({ icon: Icon, label, getValue, color }) => (
            <div key={label} className="group flex items-center gap-2">
              <div
                className={cn(
                  'rounded-full p-2 bg-opacity-10',
                  color.replace('text-', 'bg-')
                )}
              >
                <Icon className={cn('h-4 w-4', color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{getValue(contact)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(getValue(contact), label)}
                  >
                    <IoCopy className="h-3 w-3" />
                    <span className="sr-only">Copy {label}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
