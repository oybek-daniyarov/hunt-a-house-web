import { Suspense } from 'react';

import { AuthenticatedView } from '@/components/ui/view-lead/authenticated-view';
import { ContactMethods } from '@/components/ui/view-lead/contact-methods';
import GuestView from '@/components/ui/view-lead/guest-view';
import { getLeadById } from '@/lib/data/laravel/lead/lead.api';
import { ViewLeadDialog } from './view-lead-dialog';

export { ViewLeadDialog };

interface ViewLeadProps {
  leadId?: string;
}

const components: Record<App.Enums.LeadViewEnum, React.ComponentType<any>> = {
  guest: GuestView,
  purchased: ContactMethods,
  authenticated: AuthenticatedView,
};

export async function ViewLead({ leadId }: ViewLeadProps) {
  if (!leadId) {
    return null;
  }

  let viewLead;
  if (leadId) {
    try {
      viewLead = await getLeadById(leadId);
    } catch (error) {
      console.error('Error fetching lead:', error);
    }
  }

  const access = viewLead?.access ? viewLead.access : 'guest';

  const Component = components[access];

  return (
    <>
      {viewLead && (
        <Suspense>
          <ViewLeadDialog lead={viewLead} open={!!leadId}>
            <Component listing={viewLead.data} />
          </ViewLeadDialog>
        </Suspense>
      )}
    </>
  );
}
