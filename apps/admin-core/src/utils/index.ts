export function formatCurrency(value: number): string {
  return `₦${value.toLocaleString('en-NG')}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-NG');
}
