import {
  FaEnvelope,
  FaFacebook,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';

import { LocationDisplay } from '@/components/listing/card/location-display';
import { PriceDisplay } from '@/components/listing/card/price-display';
import { Card, CardContent } from '@/components/ui/card';
import { ContactButton } from '@/components/ui/grid-property-listing/contact-button';
import { PropertyBadges } from './property-badges';
import { PropertyFeaturesGrid } from './property-features-grid';

type PropertyListingCardProps = {
  listing: App.Data.Lead.LeadListData;
};

const contactMethodIcons = {
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  email: FaEnvelope,
  facebook: FaFacebook,
  phone: FaPhone,
};

type ContactMethod = keyof typeof contactMethodIcons;

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
        </div>

        <div className="flex flex-col gap-5 justify-end flex-1">
          <div className="space-y-2">
            <LocationDisplay locations={listing.locations} />
            <PriceDisplay
              minBudget={listing.minBudget}
              maxBudget={listing.maxBudget}
              budgetFrequency={listing.budgetFrequency}
            />
          </div>
          <PropertyFeaturesGrid
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            minSize={listing.minSize}
            maxSize={listing.maxSize}
          />

          {listing.contactMethods && listing.contactMethods.length > 0 && (
            <div className="flex gap-2 justify-between">
              <span className="text-sm text-muted-foreground">
                Contact via:
              </span>
              <div className="flex items-center gap-2">
                {listing.contactMethods.map((method, index) => {
                  const IconComponent =
                    contactMethodIcons[method.type as ContactMethod] ||
                    contactMethodIcons.phone;
                  return (
                    <div
                      key={`${method.type}-${index}`}
                      title={`${method.type}: ${method.value}`}
                    >
                      <IconComponent className="size-5 text-foreground" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <ContactButton
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            listing={listing}
          />
        </div>
      </CardContent>
    </Card>
  );
}
