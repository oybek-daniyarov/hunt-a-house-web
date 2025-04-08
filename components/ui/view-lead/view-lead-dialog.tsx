'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AuthenticatedView } from '@/components/ui/view-lead/authenticated-view';
import { ContactMethods } from '@/components/ui/view-lead/contact-methods';
import { GuestView } from '@/components/ui/view-lead/guest-view';
import { PropertyDetails } from '@/components/ui/view-lead/property-details';
import { PropertyInfo } from '@/components/ui/view-lead/property-info';

interface ViewLeadDialogProps {
  lead: App.Data.Lead.Response.ShowLeadResponseData;
  open: boolean;
  onClose?: () => void;
}

const components: Record<App.Enums.LeadViewEnum, React.ComponentType<any>> = {
  guest: GuestView,
  purchased: ContactMethods,
  authenticated: AuthenticatedView,
};

export function ViewLeadDialog({ lead, open, onClose }: ViewLeadDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  //remove the leadId from the url

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(pathname);
    }
  };

  const access = lead.access ? lead.access : 'guest';

  const Component = components[access];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Listing Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 -mx-6 mt-4">
          <div className="col-span-1 lg:col-span-7 space-y-8 px-6">
            <div className="space-y-4">
              <PropertyInfo listing={lead.data} />

              {lead.data.description && (
                <p className="text-sm text-muted-foreground">
                  {lead.data.description}
                </p>
              )}

              <PropertyDetails listing={lead.data} />
            </div>
          </div>

          {/* Quick Actions - Right Side */}
          <div className="px-6 col-span-1 lg:col-span-5">
            <Component listing={lead.data} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
