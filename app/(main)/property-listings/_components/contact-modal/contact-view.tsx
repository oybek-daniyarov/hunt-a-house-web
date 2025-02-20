import { toast } from 'sonner';

import { ContactDetails } from './components/contact-details';
import { ContactMethods } from './components/contact-methods';
import { PropertyDetails } from './components/property-details';
import { PropertyInfo } from './components/property-info';

interface ContactViewProps {
  listing: App.Data.Lead.LeadListData;
}

const DUMMY_CONTACT = {
  name: 'John Smith',
  role: 'Property Owner',
  company: 'Private Owner',
  phone: '+971 58 560 0101',
  whatsapp: '+971 58 560 0101',
  telegram: '@johnsmith',
  email: 'john.smith@email.com',
};

const getMessageText = (listing: App.Data.Lead.LeadListData) => {
  const message = [
    'Hi,',
    `I'm interested in your ${listing.propertyTypeName}`,
    `in ${listing.locations.name}.`,
    '',
    'Is it still available?',
  ].join('\n');

  return encodeURIComponent(message);
};

const getEmailSubject = (listing: App.Data.Lead.LeadListData) => {
  return encodeURIComponent(
    `${listing.propertyTypeName} in ${listing.locations.name} - Inquiry`
  );
};

// const contactMethods = [
//   {
//     icon: Phone,
//     label: 'Call Now',
//     href: `tel:${DUMMY_CONTACT.phone}`,
//     color: 'text-green-500',
//     bgColor: 'bg-green-500/10',
//   },
//   {
//     icon: MessageSquare,
//     label: 'WhatsApp',
//     href: `https://wa.me/${DUMMY_CONTACT.whatsapp.replace(/[^0-9]/g, '')}?text=${getMessageText(listing)}`,
//     color: 'text-blue-500',
//     bgColor: 'bg-blue-500/10',
//     external: true,
//   },
//   {
//     icon: MessageSquare,
//     label: 'Telegram',
//     href: `https://t.me/${DUMMY_CONTACT.telegram.replace('@', '')}?text=${getMessageText(listing)}`,
//     color: 'text-blue-500',
//     bgColor: 'bg-blue-500/10',
//     external: true,
//   },
//   {
//     icon: Mail,
//     label: 'Send Email',
//     href: `mailto:${DUMMY_CONTACT.email}?subject=${getEmailSubject(listing)}&body=${getMessageText(listing)}`,
//     color: 'text-orange-500',
//     bgColor: 'bg-orange-500/10',
//   },
// ];

// const contactDetails = [
//   {
//     icon: Phone,
//     label: 'Phone',
//     value: DUMMY_CONTACT.phone,
//     color: 'text-green-500',
//     bgColor: 'bg-green-500/10',
//   },
//   {
//     icon: MessageSquare,
//     label: 'WhatsApp',
//     value: DUMMY_CONTACT.whatsapp,
//     color: 'text-blue-500',
//     bgColor: 'bg-blue-500/10',
//   },
//   {
//     icon: MessageSquare,
//     label: 'Telegram',
//     value: DUMMY_CONTACT.telegram,
//     color: 'text-blue-500',
//     bgColor: 'bg-blue-500/10',
//   },
//   {
//     icon: Mail,
//     label: 'Email',
//     value: DUMMY_CONTACT.email,
//     color: 'text-orange-500',
//     bgColor: 'bg-orange-500/10',
//   },
// ];

// const propertyDetails = [
//   {
//     icon: BedSingle,
//     label: 'Bedrooms',
//     value: (listing: App.Data.Lead.LeadListData) =>
//       listing.bedrooms === '0' ? 'Studio' : listing.bedrooms || 'N/A',
//   },
//   {
//     icon: Bath,
//     label: 'Bathrooms',
//     value: (listing: App.Data.Lead.LeadListData) => listing.bathrooms || 'N/A',
//   },
//   {
//     icon: Ruler,
//     label: 'Size',
//     value: (listing: App.Data.Lead.LeadListData) =>
//       listing.minSize && listing.maxSize
//         ? `${formatSize(listing.minSize)} - ${formatSize(listing.maxSize)}`
//         : listing.minSize
//           ? formatSize(listing.minSize)
//           : 'Not specified',
//   },
//   {
//     icon: BanknoteIcon,
//     label: 'Budget',
//     value: (listing: App.Data.Lead.LeadListData) =>
//       listing.minBudget && listing.maxBudget
//         ? `${formatCurrency(listing.minBudget)} - ${formatCurrency(listing.maxBudget)}`
//         : listing.minBudget
//           ? formatCurrency(listing.minBudget)
//           : 'Not specified',
//     suffix: (listing: App.Data.Lead.LeadListData) =>
//       listing.budgetFrequency
//         ? ` ${listing.budgetFrequency.replace('_', ' ')}`
//         : '',
//   },
// ];

export function ContactView({ listing }: ContactViewProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mx-6">
      {/* Property and Contact Details - Left Side */}
      <div className="col-span-1 lg:col-span-2 space-y-8 px-6">
        <div className="space-y-8">
          {/* Property Info */}
          <div className="space-y-4">
            <PropertyInfo listing={listing} />

            {listing.description && (
              <p className="text-sm text-muted-foreground">
                {listing.description}
              </p>
            )}

            <PropertyDetails listing={listing} />
          </div>

          {/* Contact Info */}
          <ContactDetails contact={DUMMY_CONTACT} />
        </div>
      </div>

      {/* Quick Actions - Right Side */}
      <div className="col-span-1 space-y-4 px-6">
        <ContactMethods listing={listing} contact={DUMMY_CONTACT} />

        <p className="text-center text-sm text-muted-foreground">
          Available during business hours (9 AM - 6 PM GST)
        </p>
      </div>
    </div>
  );
}
