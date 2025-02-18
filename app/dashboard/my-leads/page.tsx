import { LeadsList } from '@/app/dashboard/leads/_components/leads-list';

export const metadata = {
  title: 'My Leads',
  description: 'View and manage your property leads',
};

const dummyLeads = {
  data: [
    {
      id: 1,
      propertyTypeName: 'Apartment',
      activityTypeName: 'Buy',
      areaName: 'Dubai Marina',
      emirateName: 'Dubai',
      description: 'Looking for a 2 bedroom apartment',
      bedrooms: 2,
      bathrooms: 2,
      minSize: 1000,
      maxSize: 1500,
      minBudget: 1000000,
      maxBudget: 1500000,
      budgetFrequency: 'per_year' as App.Enums.BudgetFrequency,
      user: null,
      createdAt: '2024-03-20',
      isAuthenticated: true,
      isUserHadPurchasedLead: false,
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    to: 1,
    total: 1,
    last_page: 1,
  },
};

export default async function MyLeadsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold">My Leads</h1>
        <p className="mt-2 text-gray-600">
          View and manage your property leads
        </p>
      </div>
      <LeadsList initialLeads={dummyLeads} />
    </div>
  );
}
