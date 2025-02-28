import { formatCurrency } from '@/lib/utils/format-number';

type BudgetFrequency = string; // Replace with actual enum if available

interface PriceDisplayProps {
  minBudget: number | null;
  maxBudget: number | null;
  budgetFrequency: BudgetFrequency | null;
}

const mapBudgetFrequency: Record<BudgetFrequency, string> = {
  per_year: 'Per Year',
  per_month: 'Per Month',
  per_day: 'Per Day',
};

export function PriceDisplay({
  minBudget,
  maxBudget,
  budgetFrequency,
}: PriceDisplayProps) {
  return (
    <div className="text-sm font-medium">
      {minBudget && maxBudget
        ? `${formatCurrency(minBudget)} - ${formatCurrency(maxBudget)}`
        : minBudget
          ? formatCurrency(minBudget)
          : 'Price on request'}
      {budgetFrequency && (
        <span className="ms-1 text-xs font-normal text-gray-600">
          / {mapBudgetFrequency[budgetFrequency]}
        </span>
      )}
    </div>
  );
}
