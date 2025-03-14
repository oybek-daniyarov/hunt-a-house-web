import { LeadsTableClient } from '@/app/dashboard/agent/leads/_components/leads-table-client';
import { getPurchasedLeads } from '@/lib/data/laravel/lead/lead.api';

interface LeadsTableProps {
  page: number;
}

export async function LeadsTable({ page }: LeadsTableProps) {
  const leads = await getPurchasedLeads({ page });

  return <LeadsTableClient leads={leads} page={page} />;
}
