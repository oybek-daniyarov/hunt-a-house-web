import { BiMoney } from 'react-icons/bi';
import {
  FaBath,
  FaBed,
  FaEnvelope,
  FaFacebook,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { TbRulerMeasure } from 'react-icons/tb';

import { LocationDisplay } from '@/components/listing/card/location-display';
import { PriceDisplay } from '@/components/listing/card/price-display';
import { PropertyBadges } from '@/components/listing/card/property-badges';
import { Card, CardContent } from '@/components/ui/card';
import { ContactButton } from '@/components/ui/grid-property-listing/contact-button';

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
      <CardContent className="flex h-full flex-col p-4 gap-3">
        <div className="flex justify-between items-start">
          <PropertyBadges
            propertyTypeName={listing.propertyTypeName}
            activityTypeName={listing.activityTypeName}
          />

          {listing.isUserHadPurchasedLead ? (
            <div className="flex items-center text-green-500">
              <IoLockOpen className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex items-center text-foreground">
              <IoLockClosed className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          {listing.description && (
            <p className="text-muted-foreground text-sm">
              {listing.description}
            </p>
          )}
          <LocationDisplay locations={listing.locations} />
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <FaBed className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms || 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground ml-0.5">bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaBath className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{listing.bathrooms || 'N/A'}</span>
              <span className="text-xs text-muted-foreground ml-0.5">bath</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <BiMoney className="h-4 w-4 text-muted-foreground" />
              <PriceDisplay
                minBudget={listing.minBudget}
                maxBudget={listing.maxBudget}
                budgetFrequency={listing.budgetFrequency}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <TbRulerMeasure className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {listing.minSize
                  ? `${listing.minSize}${listing.maxSize ? `-${listing.maxSize}` : ''}`
                  : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground ml-0.5">ft²</span>
            </div>
          </div>

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
            className="w-full bg-foreground text-background hover:bg-foreground/90 mt-1"
            listing={listing}
          />
        </div>
      </CardContent>
    </Card>
  );
}
