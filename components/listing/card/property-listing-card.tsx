import {
  FaEnvelope,
  FaFacebook,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';

import { Card, CardContent } from '@/components/ui/card';
import { ContactButton } from '@/components/ui/grid-property-listing/contact-button';
import { LocationDisplay } from './location-display';
import { PriceDisplay } from './price-display';
import { PropertyBadges } from './property-badges';
import { PropertyFeaturesGrid } from './property-features-grid';

type PropertyListingCardProps = {
  listing: Omit<App.Data.Lead.LeadListData, 'contactMethods'> & {
    contactMethods: Array<{
      type: 'whatsapp' | 'telegram' | 'email' | 'facebook' | 'phone';
      value: string;
    }>;
  };
};

const contactMethodIcons = {
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  email: FaEnvelope,
  facebook: FaFacebook,
  phone: FaPhone,
};

export function PropertyListingCard({ listing }: PropertyListingCardProps) {
  return (
    <Card className="rounded-xl shadow-none border bg-card text-card-foreground  bg-gradient-to-b from-muted/20 to-muted/10 transition-all dark:from-muted/20 dark:to-muted/10 dark:hover:from-muted/30 dark:hover:to-muted/20">
      <CardContent className="flex h-full flex-col p-4 gap-5">
        <div className="space-y-4">
          <PropertyBadges
            propertyTypeName={listing.propertyTypeName}
            activityTypeName={listing.activityTypeName}
          />

          {listing.description && (
            <p className="text-muted-foreground line-clamp-2">
              {listing.description}
            </p>
          )}

          <div className="space-y-2">
            <LocationDisplay locations={listing.locations} />
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <PriceDisplay
            minBudget={listing.minBudget}
            maxBudget={listing.maxBudget}
            budgetFrequency={listing.budgetFrequency}
          />

          <PropertyFeaturesGrid
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            minSize={listing.minSize}
            maxSize={listing.maxSize}
          />
        </div>

        {listing.contactMethods && listing.contactMethods.length > 0 && (
          <div className="flex gap-2 justify-center">
            {listing.contactMethods.map((method, index) => {
              const IconComponent = contactMethodIcons[method.type];
              return (
                <div
                  key={`${method.type}-${index}`}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  title={`${method.type}: ${method.value}`}
                >
                  <IconComponent className="h-4 w-4 text-foreground" />
                </div>
              );
            })}
          </div>
        )}

        <ContactButton
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          listing={listing}
        />
      </CardContent>
    </Card>
  );
}
