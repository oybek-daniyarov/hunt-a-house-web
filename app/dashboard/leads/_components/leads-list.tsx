'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

type PaginatedLeads = {
  data: App.Data.Lead.LeadListData[];
  meta: {
    current_page: number;
    from: number;
    to: number;
    total: number;
    last_page: number;
  };
};

type LeadsListProps = {
  initialLeads: PaginatedLeads;
};

export function LeadsList({ initialLeads }: LeadsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<PaginatedLeads>(initialLeads);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        // Simulating API call with dummy data
        const dummyResponse = {
          data: initialLeads.data,
          meta: {
            ...initialLeads.meta,
            current_page: page,
          },
        };
        setLeads(dummyResponse);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [initialLeads]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border">
        <div className="grid divide-y">
          {leads.data.map((lead) => (
            <div
              key={lead.id}
              className={cn(
                'grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4',
                isLoading && 'opacity-50'
              )}
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Property Type
                </p>
                <p className="mt-1">{lead.propertyTypeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Activity Type
                </p>
                <p className="mt-1">{lead.activityTypeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Budget</p>
                <p className="mt-1">
                  {lead.minBudget} - {lead.maxBudget} AED
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {leads.meta && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{leads.meta.from}</span> to{' '}
            <span className="font-medium">{leads.meta.to}</span> of{' '}
            <span className="font-medium">{leads.meta.total}</span> leads
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(leads.meta.current_page - 1)}
              disabled={leads.meta.current_page === 1 || isLoading}
              className="rounded-md border px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(leads.meta.current_page + 1)}
              disabled={
                leads.meta.current_page === leads.meta.last_page || isLoading
              }
              className="rounded-md border px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
