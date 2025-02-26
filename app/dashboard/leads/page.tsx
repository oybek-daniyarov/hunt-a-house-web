import { LeadsList } from './_components/leads-list';

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
    {
      id: 2,
      propertyTypeName: 'Villa',
      activityTypeName: 'Rent',
      areaName: 'Palm Jumeirah',
      emirateName: 'Dubai',
      description: 'Searching for a luxury villa',
      bedrooms: 4,
      bathrooms: 5,
      minSize: 3000,
      maxSize: 5000,
      minBudget: 300000,
      maxBudget: 500000,
      budgetFrequency: 'per_year' as App.Enums.BudgetFrequency,
      user: null,
      createdAt: '2024-03-19',
      isAuthenticated: true,
      isUserHadPurchasedLead: false,
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    to: 2,
    total: 2,
    last_page: 1,
  },
};

export default async function LeadsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-bold">My Leads</h1>
        <p className="mt-2 text-gray-600">
          View and manage your property leads
        </p>
      </div>
      {/* @ts-expect-error Server Component */}
      <LeadsList initialLeads={dummyLeads} />
    </div>
  );
}
