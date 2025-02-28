import { formatCurrency } from '@/lib/utils/format-number';

type BudgetFrequency = string; // Replace with actual enum if available

interface PriceDisplayProps {
  minBudget: number | null;
  maxBudget: number | null;
  budgetFrequency: BudgetFrequency | null;
}

export function PriceDisplay({
  minBudget,
  maxBudget,
  budgetFrequency,
}: PriceDisplayProps) {
  return (
    <div className="text-sm">
      {minBudget && maxBudget
        ? `${formatCurrency(minBudget)} - ${formatCurrency(maxBudget)}`
        : minBudget
          ? formatCurrency(minBudget)
          : 'Price on request'}
      {budgetFrequency && (
        <span className="ms-1 text-xs font-normal text-gray-600">
          /{budgetFrequency.toLowerCase()}
        </span>
      )}
    </div>
  );
}
