const numberFormatter = new Intl.NumberFormat("en-AE", {
  style: "decimal",
  maximumFractionDigits: 0,
})

const currencyFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
})

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatSize(size: number) {
  return `${formatNumber(size)} sq.ft`
} 