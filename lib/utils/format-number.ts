const numberFormatter = new Intl.NumberFormat('en-AE', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat('en-AE', {
  style: 'currency',
  currency: 'AED',
  maximumFractionDigits: 0,
});

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatSize(size: number) {
  return `${formatNumber(size)} sq.ft`;
}
export function formatToThousands(value: number) {
  if (value < 1000) {
    return formatNumber(value);
  }
  if (value >= 1000000) {
    const millions = value / 1000000;
    // Show one decimal place if it's not a whole number
    return millions % 1 === 0
      ? `${formatNumber(millions)}M`
      : `${formatNumber(Math.floor(millions))}.${Math.floor((millions % 1) * 10)}M`;
  }
  const thousands = value / 1000;
  // Show one decimal place if it's not a whole number
  return thousands % 1 === 0
    ? `${formatNumber(thousands)}k`
    : `${formatNumber(Math.floor(thousands))}.${Math.floor((thousands % 1) * 10)}k`;
}
