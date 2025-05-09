// You would typically use your own API key here
// For this example, we're using a sample response
// In a real application, replace this with an actual API call
interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  success: boolean;
  timestamp: number;
}

// Sample rates for demonstration
// In a production app, this would be removed and replaced with an actual API call
const SAMPLE_RATES: Record<string, number> = {
  AED: 3.6732,
  AUD: 1.5374,
  BRL: 5.3307,
  CAD: 1.3683,
  CHF: 0.8808,
  CNY: 7.1982,
  EUR: 0.9325,
  GBP: 0.7952,
  HKD: 7.8206,
  INR: 83.3856,
  JPY: 148.3700,
  KRW: 1367.9900,
  MXN: 16.9888,
  NOK: 10.9158,
  NZD: 1.6632,
  PLN: 3.9958,
  RUB: 91.2454,
  SAR: 3.7500,
  SEK: 10.9536,
  SGD: 1.3517,
  THB: 36.4900,
  TRY: 32.2363,
  USD: 1.0000,
  ZAR: 18.6693
};

// Mock API call
export const fetchExchangeRates = async (): Promise<ExchangeRatesResponse> => {
  // In a real application, replace this with:
  // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  // return await response.json();

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 1 in 10 chance of error to simulate network issues
  if (Math.random() < 0.1) {
    throw new Error('Failed to connect to exchange rate API');
  }

  return {
    base: 'USD',
    date: new Date().toISOString().split('T')[0],
    rates: SAMPLE_RATES,
    success: true,
    timestamp: Date.now()
  };
};