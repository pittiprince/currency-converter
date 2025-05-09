import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '@/services/currencyService';

interface UseCurrencyConverterResult {
  amount: number;
  setAmount: (amount: number) => void;
  fromCurrency: string;
  setFromCurrency: (currency: string) => void;
  toCurrency: string;
  setToCurrency: (currency: string) => void;
  conversionRate: number;
  convertedAmount: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  refreshRates: () => Promise<void>;
  swapCurrencies: () => void;
}

export const useCurrencyConverter = (): UseCurrencyConverterResult => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Calculate conversion rate and converted amount
  const conversionRate = rates[toCurrency] / rates[fromCurrency] || 0;
  const convertedAmount = amount * conversionRate;

  // Function to fetch rates
  const fetchRates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchExchangeRates();
      
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(Date.now());
      } else {
        throw new Error('Invalid data received from API');
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to fetch exchange rates. Please try again.'
      );
      
      // Use cached rates from localStorage if available
      const cachedRates = localStorage.getItem('cachedRates');
      if (cachedRates) {
        try {
          const parsed = JSON.parse(cachedRates);
          setRates(parsed.rates);
          setLastUpdated(parsed.timestamp);
          setError('Using cached rates. ' + (err instanceof Error ? err.message : ''));
        } catch (e) {
          // If parsing fails, keep the original error
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch rates on initial load
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Cache rates in localStorage when they change
  useEffect(() => {
    if (Object.keys(rates).length > 0 && lastUpdated) {
      localStorage.setItem('cachedRates', JSON.stringify({
        rates,
        timestamp: lastUpdated
      }));
    }
  }, [rates, lastUpdated]);

  // Function to manually refresh rates
  const refreshRates = async () => {
    await fetchRates();
  };

  // Function to swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    conversionRate,
    convertedAmount,
    isLoading,
    error,
    lastUpdated,
    refreshRates,
    swapCurrencies,
  };
};