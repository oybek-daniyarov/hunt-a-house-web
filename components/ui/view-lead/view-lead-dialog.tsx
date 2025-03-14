'use client';

import { useRouter } from 'next/navigation';

import { PropertyDetails } from '@/components/listing/contact/components/property-details';
import { PropertyInfo } from '@/components/listing/contact/components/property-info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactDetails } from '@/components/ui/view-lead/contact-details';
import { ContactMethods } from '@/components/ui/view-lead/contact-methods';

interface ViewLeadDialogProps {
  lead: App.Data.Lead.LeadData;
  open: boolean;
  returnUrl: string;
  onClose?: () => void;
}

// Helper function to get contact method value by type
const getContactMethodValue = (
  contactMethods: App.Data.ContactMethodData[],
  type: string
): string => {
  const method = contactMethods.find((method) => method.type === type);
  return method?.value || '';
};

export function ViewLeadDialog({
  lead,
  open,
  returnUrl,
  onClose,
}: ViewLeadDialogProps) {
  const router = useRouter();

  // Create contact object from lead data
  const contact = {
    name: lead.owner.name,
    phone: getContactMethodValue(lead.contactMethods, 'phone'),
    whatsapp: getContactMethodValue(lead.contactMethods, 'whatsapp'),
    telegram: getContactMethodValue(lead.contactMethods, 'telegram'),
    facebook: getContactMethodValue(lead.contactMethods, 'facebook'),
  };

  // Create a listing object that matches the expected shape for the components
  const listing = {
    ...lead,
    agent: null,
    isAuthenticated: true,
    isUserHadPurchasedLead: true,
    creditCost: 0,
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(returnUrl);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Lead Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mx-6 mt-4">
          <div className="col-span-1 lg:col-span-2 space-y-8 px-6">
            <div className="space-y-4">
              <PropertyInfo listing={listing} />

              {lead.description && (
                <p className="text-sm text-muted-foreground">
                  {lead.description}
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
      </DialogContent>
    </Dialog>
  );
}
