import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { LocationDisplay } from '@/components/listing/card/location-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPurchasedLeadById } from '@/lib/data/laravel/lead/lead.api';
import {
  formatCurrency,
  formatSize,
  formatToThousands,
} from '@/lib/utils/format-number';

interface LeadPageProps {
  params: {
    id: string;
  };
}

export default async function LeadPage({ params }: LeadPageProps) {
  let lead;

  try {
    lead = await getPurchasedLeadById(params.id);
  } catch (error) {
    console.error('Error fetching lead:', error);
    notFound();
  }

  if (!lead) {
    notFound();
  }

  // Helper function to get contact method value by type
  const getContactMethodValue = (
    contactMethods: App.Data.ContactMethodData[],
    type: string
  ): string => {
    const method = contactMethods.find((method) => method.type === type);
    return method?.value || '';
  };

  // Create contact object from lead data
  const contact = {
    name: lead.owner.name,
    phone: getContactMethodValue(lead.contactMethods, 'phone'),
    whatsapp: getContactMethodValue(lead.contactMethods, 'whatsapp'),
    telegram: getContactMethodValue(lead.contactMethods, 'telegram'),
    facebook: getContactMethodValue(lead.contactMethods, 'facebook'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/agent/leads">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to leads</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Lead Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Property Type
                </h3>
                <p>{lead.propertyTypeName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Activity Type
                </h3>
                <p>{lead.activityTypeName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Location
                </h3>
                {lead.locations && lead.locations.length > 0 ? (
                  <LocationDisplay locations={lead.locations} />
                ) : (
                  <p className="text-gray-500">N/A</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Bedrooms/Bathrooms
                </h3>
                <p>
                  {lead.bedrooms || '0'} bed / {lead.bathrooms || '0'} bath
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Size
                </h3>
                <p>
                  {lead.minSize && lead.maxSize
                    ? `${formatSize(lead.minSize)} - ${formatSize(lead.maxSize)}`
                    : lead.minSize
                      ? formatSize(lead.minSize)
                      : lead.maxSize
                        ? formatSize(lead.maxSize)
                        : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Budget
                </h3>
                <p>
                  {lead.minBudget && lead.maxBudget
                    ? `${formatToThousands(lead.minBudget)} - ${formatToThousands(lead.maxBudget)} AED`
                    : lead.minBudget
                      ? formatCurrency(lead.minBudget)
                      : 'N/A'}
                  {lead.budgetFrequency &&
                    ` (${lead.budgetFrequency.replace('_', ' ')})`}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Status
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      lead.isActive && lead.activatedAt
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {lead.activatedAt && lead.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {lead.activatedAt && (
                    <span className="text-xs text-gray-500">
                      Since {new Date(lead.activatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {lead.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Description
                </h3>
                <p className="mt-1 text-sm">{lead.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Name
              </h3>
              <p>{contact.name}</p>
            </div>

            {contact.phone && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Phone
                </h3>
                <p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>
            )}

            {contact.whatsapp && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  WhatsApp
                </h3>
                <p>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {contact.whatsapp}
                  </a>
                </p>
              </div>
            )}

            {contact.telegram && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Telegram
                </h3>
                <p>
                  <a
                    href={`https://t.me/${contact.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {contact.telegram}
                  </a>
                </p>
              </div>
            )}

            {contact.facebook && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Facebook
                </h3>
                <p>
                  <a
                    href={`https://www.facebook.com/${contact.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {contact.facebook}
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
