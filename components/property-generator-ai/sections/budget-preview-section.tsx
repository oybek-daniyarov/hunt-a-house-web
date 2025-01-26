import Preview from '@/components/property-generator-ai/components/preview';
import { usePropertyForm } from '@/components/property-generator-ai/providers/property-form-provider';
import { PropertyResponse } from '@/components/property-generator-ai/schema';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/format-number';

const FREQUENCY_MAP = {
  one_time: 'One Time',
  yearly: 'Yearly',
  monthly: 'Monthly',
  daily: 'Daily',
};

function formatBudget(budget: PropertyResponse['budget'] | null) {
  if (!budget?.min && !budget?.max) return 'Not specified';

  const range = [
    budget.min && formatCurrency(budget.min),
    budget.max && formatCurrency(budget.max),
  ]
    .filter(Boolean)
    .join(' - ');

  const period = budget.frequency ? FREQUENCY_MAP[budget.frequency] : '';

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
  const budget = getValue('budget', null);

  return (
    <Preview>
      <Preview.Row title="Budget" value={formatBudget(budget)} />
    </Preview>
  );
};

export default BudgetPreviewSection;
