import { getCurrencyByCode, getCurrencySymbol } from '@/data/currencies';

/**
 * Format a currency value according to locale and currency code
 * @param currencyCode The currency code (e.g., USD, EUR)
 * @param value The numerical value to format
 * @param symbolOnly Whether to return just the symbol instead of formatting the value
 * @returns The formatted currency string
 */
export function formatCurrency(
  currencyCode: string, 
  value: number,
  symbolOnly: boolean = false
): string {
  if (symbolOnly) {
    return getCurrencySymbol(currencyCode);
  }

  try {
    // Get decimals based on currency type (some currencies like JPY don't use decimals)
    const decimals = ['JPY', 'KRW', 'IDR', 'VND', 'CLP'].includes(currencyCode) ? 0 : 2;
    
    // Format using Intl.NumberFormat
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(value);
  } catch (error) {
    // Fallback formatting if Intl doesn't support the currency
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${value.toFixed(2)}`;
  }
}