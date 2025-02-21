import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';
import LeadSteps from './lead-steps';

const LeadForm = async () => {
  const filters = await getLeadFilters();

  return <LeadSteps filters={filters} />;
};

export default LeadForm;
