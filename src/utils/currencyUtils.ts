import type { Currency } from '../hooks/useCurrencies';

export const formatCurrencyValue = (value: number, currency?: Currency): string => {
  if (!currency) {
    return `${value.toLocaleString()}`;
  }

  const formattedValue = value.toLocaleString();
  
  if (!currency.symbol) {
    return `${currency.code} ${formattedValue}`;
  }

  // symbolPosition: 0 = before, 1 = after
  if (currency.symbolPosition === 1) {
    return `${formattedValue} ${currency.symbol}`;
  } else {
    return `${currency.symbol}${formattedValue}`;
  }
}; 