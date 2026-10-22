const numberFormat = (value: number, min: number, max: number) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: min, maximumFractionDigits: max }).format(value)

export function formatNumber(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return '—'
  return numberFormat(value, 0, digits)
}

export function formatPeso(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return '—'
  return `₱${numberFormat(value, digits, digits)}`
}

export function formatCount(value: number): string {
  if (!Number.isFinite(value)) return '—'
  if (Number.isInteger(value)) return numberFormat(value, 0, 0)
  const digits = value < 1 ? 2 : value < 10 ? 1 : 0
  return numberFormat(value, 0, digits)
}

export function formatPercent(value: number, digits?: number): string {
  if (!Number.isFinite(value)) return '—'
  const pct = value * 100
  const d = digits ?? (pct < 10 ? 1 : 0)
  return `${numberFormat(pct, d, d)}%`
}
