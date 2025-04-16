import { Pencil } from 'lucide-react';

import LaravelPagination from '@/components/laravel/pagination/pagination';
import { LocationDisplay } from '@/components/listing/card/location-display';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMineLeads } from '@/lib/data/laravel/lead/lead.api';
import { formatCurrency, formatToThousands } from '@/lib/utils/format-number';
import { EditLeadDialog } from './edit-lead-dialog';
import { LeadStatus } from './lead-status';

interface LeadsTableProps {
  page: number;
  editLeadId?: string;
}

export async function LeadsTable({ page, editLeadId }: LeadsTableProps) {
  const leads = await getMineLeads({ page });

  // Find the lead being edited (if any)
  const leadToEdit = editLeadId
    ? leads.data.find((lead) => lead.id === editLeadId)
    : undefined;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No listings found
                </TableCell>
              </TableRow>
            ) : (
              leads.data.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.propertyTypeName}</TableCell>
                  <TableCell>
                    {lead.locations && lead.locations.length > 0 ? (
                      <LocationDisplay locations={lead.locations} />
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {lead.minBudget && lead.maxBudget
                      ? `${formatToThousands(lead.minBudget)} - ${formatToThousands(lead.maxBudget)} AED`
                      : lead.minBudget
                        ? formatCurrency(lead.minBudget)
                        : 'N/A'}
                    {lead.budgetFrequency &&
                      ` (${lead.budgetFrequency.replace('_', ' ')})`}
                  </TableCell>
                  <TableCell>
                    <LeadStatus
                      status={lead.status}
                      isActive={lead.isActive}
                      activatedAt={lead.activatedAt}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <span className="text-sm">
                        {lead.currentViews || 0} / {lead.maxViews || 0}
                      </span>
                      {lead.maxViews &&
                        lead.currentViews &&
                        lead.currentViews >= lead.maxViews && (
                          <p className="text-xs text-amber-600">
                            Max views reached
                          </p>
                        )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.contactMethods && lead.contactMethods.length > 0 ? (
                      <div className="space-y-1 text-xs">
                        {lead.contactMethods.map((method, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="font-medium capitalize">
                              {method.type}:
                            </span>
                            <span className="truncate">{method.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No contact info</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`?page=${page}&edit=${lead.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit Listing</span>
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{leads.from || 0}</span> to{' '}
          <span className="font-medium">{leads.to || 0}</span> of{' '}
          <span className="font-medium">{leads.total}</span> listings
        </p>

        <LaravelPagination
          currentPage={leads.current_page}
          lastPage={leads.last_page}
          total={leads.total}
        />
      </div>

      {/* Edit Lead Dialog */}
      {leadToEdit && <EditLeadDialog lead={leadToEdit} open={!!editLeadId} />}
    </div>
  );
}
