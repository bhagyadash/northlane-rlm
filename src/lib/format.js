const ZERO_DECIMAL = new Set(['JPY'])

export function money(n, currency = 'USD') {
  const digits = ZERO_DECIMAL.has(currency) ? 0 : 2
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(n)
  } catch {
    const sign = n < 0 ? '-' : ''
    return `${sign}${currency} ${Math.abs(n).toFixed(digits)}`
  }
}

export function pct(n, digits = 0) {
  return `${n.toFixed(digits)}%`
}
