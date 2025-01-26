'use client';

import { Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PreviewForm() {
  const { watch } = useFormContext();
  const formData = watch();

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  const sections = [
    {
      title: 'Property Details',
      items: [
        { label: 'Property Type', value: formData.propertyType },
        { label: 'Activity Type', value: formData.activityType },
        { label: 'Bedrooms', value: formData.bedrooms },
        { label: 'Bathrooms', value: formData.bathrooms },
        {
          label: 'Size Range',
          value: `${formData.minSize} - ${formData.maxSize} sqft`,
        },
        {
          label: 'Budget Range',
          value: `${formatCurrency(formData.minBudget)} - ${formatCurrency(formData.maxBudget)} ${formData.budgetFrequency}`,
        },
        { label: 'Additional Requirements', value: formData.description },
      ],
    },
    {
      title: 'Location Details',
      items: [
        { label: 'Emirate', value: formData.emirate },
        { label: 'City', value: formData.city },
        {
          label: 'Preferred Areas',
          value: formData.areas,
          type: 'array',
        },
      ],
    },
    {
      title: 'Contact Information',
      items: [
        { label: 'Full Name', value: formData.name },
        { label: 'Email', value: formData.email },
        { label: 'Phone', value: formData.phone },
        {
          label: 'Preferred Contact Methods',
          value: formData.contactMethods,
          type: 'array',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Review Your Information
        </h2>
        <p className="text-muted-foreground">
          Please review your information before submitting
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-3 items-start"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="col-span-2 text-sm">
                      {item.type === 'array' ? (
                        <div className="flex flex-wrap gap-2">
                          {(item.value as string[])?.map((value) => (
                            <Badge key={value} variant="secondary">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="flex items-center gap-2">
                          {item.value || '-'}
                          {item.value && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
