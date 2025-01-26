import { PropertyFormProvider } from '@/components/property-generator-ai/providers/property-form-provider';
import { PropertyGeneratorProvider } from '@/components/property-generator-ai/providers/property-generator-provider';
import { getLeadFilters } from '@/lib/data/laravel/lead/lead.api';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = async ({ children }: ProvidersProps) => {
  const filters = await getLeadFilters();

  return (
    <PropertyGeneratorProvider>
      <PropertyFormProvider filters={filters}>{children}</PropertyFormProvider>
    </PropertyGeneratorProvider>
  );
};

export default Providers;
