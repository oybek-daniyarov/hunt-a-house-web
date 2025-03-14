import { getLeadById } from '@/lib/data/laravel/lead/lead.api';
import { ViewLeadDialog } from './view-lead-dialog';

export { ViewLeadDialog };

interface ViewLeadProps {
  leadId?: string;
  returnUrl: string;
}

export async function ViewLead({ leadId, returnUrl }: ViewLeadProps) {
  // Fetch the lead if leadId is provided
  let viewLead;
  if (leadId) {
    try {
      viewLead = await getLeadById(leadId);
    } catch (error) {
      console.error('Error fetching lead:', error);
    }
  }

  return (
    <>
      {viewLead && (
        <ViewLeadDialog lead={viewLead} open={!!leadId} returnUrl={returnUrl} />
      )}
    </>
  );
}
