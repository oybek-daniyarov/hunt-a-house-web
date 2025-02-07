import Preview from '@/components/property-generator-ai/components/preview';
import { usePropertyForm } from '@/components/property-generator-ai/providers/property-form-provider';
import { Badge } from '@/components/ui/badge';
import { LocationSearchResponse } from '@/lib/ai/types';
import { formatCurrency } from '@/lib/utils/format-number';

const FREQUENCY_MAP = {
  one_time: 'One Time',
  yearly: 'Yearly',
  monthly: 'Monthly',
  daily: 'Daily',
};

function formatBudget(budget: LocationSearchResponse['price'] | null) {
  if (!budget?.min && !budget?.max) return 'Not specified';

  const range = [
    budget.min && formatCurrency(budget.min),
    budget.max && formatCurrency(budget.max),
  ]
    .filter(Boolean)
    .join(' - ');

  const period = budget.term ? FREQUENCY_MAP[budget.term] : '';

  return (
    <span className="flex items-center gap-2">
      <span className="grow">{range}</span>
      <Badge size="sm" variant="outline">
        {period}
      </Badge>
    </span>
  );
}

const BudgetPreviewSection = () => {
  const { getValue } = usePropertyForm();
  const budget = getValue('price', null);

  return (
    <Preview>
      <Preview.Row title="Budget" value={formatBudget(budget)} />
    </Preview>
  );
};

export default BudgetPreviewSection;
