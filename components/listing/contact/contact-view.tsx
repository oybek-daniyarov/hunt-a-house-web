import { ContactDetails } from '@/components/listing/contact/components/contact-details';
import { ContactMethods } from '@/components/listing/contact/components/contact-methods';
import { PropertyDetails } from '@/components/listing/contact/components/property-details';
import { PropertyInfo } from '@/components/listing/contact/components/property-info';

interface ContactViewProps {
  listing: App.Data.Lead.LeadListData;
}

// Helper function to get contact method value by type
const getContactMethodValue = (
  contactMethods: App.Data.ContactMethodData[],
  type: string
): string => {
  const method = contactMethods.find((method) => method.type === type);
  return method?.value || '';
};

export function ContactView({ listing }: ContactViewProps) {
  // Create contact object from listing data
  const contact = {
    name: listing.owner.name,
    phone: getContactMethodValue(listing.contactMethods, 'phone'),
    whatsapp: getContactMethodValue(listing.contactMethods, 'whatsapp'),
    telegram: getContactMethodValue(listing.contactMethods, 'telegram'),
    facebook: getContactMethodValue(listing.contactMethods, 'facebook'),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mx-6">
      <div className="col-span-1 lg:col-span-2 space-y-8 px-6">
        <div className="space-y-4">
          <PropertyInfo listing={listing} />

          {listing.description && (
            <p className="text-sm text-muted-foreground">
              {listing.description}
            </p>
          )}

          <PropertyDetails listing={listing} />
        </div>
      </div>

      {/* Quick Actions - Right Side */}
      <div className="col-span-1 space-y-4 px-6">
        <ContactMethods listing={listing} contact={contact} />

        <p className="text-center text-sm text-muted-foreground">
          Available during business hours (9 AM - 6 PM GST)
        </p>
      </div>
      <div className="col-span-3 space-y-4 px-6">
        <ContactDetails contact={contact} />
      </div>
    </div>
  );
}
