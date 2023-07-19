import Decimal from 'decimal.js'

export function toDecimal(value) {
  return Decimal(value || 0)
    .div(100)
    .valueOf()
}

export function toPercentage(value) {
  return Decimal(value || 0)
    .mul(100)
    .valueOf()
}
