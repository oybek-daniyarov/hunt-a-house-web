'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PropertyDetails } from '@/components/ui/view-lead/property-details';
import { PropertyInfo } from '@/components/ui/view-lead/property-info';

interface ViewLeadDialogProps {
  lead: App.Data.Lead.Response.ShowLeadResponseData;
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export function ViewLeadDialog({
  lead,
  open,
  onClose,
  children,
}: ViewLeadDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  //remove the leadId from the url

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);

      // Remove only the lead-related parameters
      params.delete('leadId');
      params.delete('listingId');
      params.delete('view');

      const newPath = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newPath);
    }
  };

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
          <div className="px-6 col-span-1 lg:col-span-5">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
