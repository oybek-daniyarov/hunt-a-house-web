'use client';

import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';

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
import { PaginatedResponse } from '@/lib/client/laravel/types';
import {
  formatCurrency,
  formatSize,
  formatToThousands,
} from '@/lib/utils/format-number';

interface LeadsTableClientProps {
  leads: PaginatedResponse<App.Data.Lead.LeadData>;
  page: number;
}

export function LeadsTableClient({ leads, page }: LeadsTableClientProps) {
  const router = useRouter();

  const handleRowClick = (leadId: string) => {
    router.push(`/dashboard/agent/leads?leadId=${leadId}`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Type</TableHead>
              <TableHead>Activity Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Bedrooms/Bathrooms</TableHead>
              <TableHead>Size (sqft)</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6">
                  No purchased leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.data.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer group transition-colors hover:bg-muted/50 hover:shadow-sm hover:border-primary/20 hover:outline hover:outline-2 hover:outline-primary/20 hover:outline-offset-[-2px] hover:rounded-md"
                  onClick={() => handleRowClick(lead.id)}
                >
                  <TableCell>{lead.propertyTypeName}</TableCell>
                  <TableCell>{lead.activityTypeName}</TableCell>
                  <TableCell>
                    {lead.locations && lead.locations.length > 0 ? (
                      <LocationDisplay locations={lead.locations} />
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {lead.bedrooms || '0'} bed / {lead.bathrooms || '0'} bath
                  </TableCell>
                  <TableCell>
                    {lead.minSize && lead.maxSize
                      ? `${formatSize(lead.minSize)} - ${formatSize(lead.maxSize)}`
                      : lead.minSize
                        ? formatSize(lead.minSize)
                        : lead.maxSize
                          ? formatSize(lead.maxSize)
                          : 'N/A'}
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
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        lead.isActive && lead.activatedAt
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {lead.activatedAt && lead.isActive
                        ? 'Active'
                        : 'Inactive'}
                    </span>
                    {lead.activatedAt && (
                      <p className="mt-1 text-xs text-gray-500">
                        Since {new Date(lead.activatedAt).toLocaleDateString()}
                      </p>
                    )}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(lead.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View lead details</span>
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
          <span className="font-medium">{leads.total}</span> leads
        </p>

        <LaravelPagination
          currentPage={leads.current_page}
          lastPage={leads.last_page}
          total={leads.total}
        />
      </div>
    </div>
  );
}
