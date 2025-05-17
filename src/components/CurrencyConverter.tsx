import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CurrencySelector from '@/components/CurrencySelector';
import CurrencyInput from '@/components/CurrencyInput';
import ConversionResult from '@/components/ConversionResult';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const CurrencyConverter = () => {
  const {
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
  } = useCurrencyConverter();
  
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    swapCurrencies();
    
    setTimeout(() => {
      setIsSwapping(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-border shadow-lg">
        <CardHeader className="pb-4 relative">
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Currency Converter</CardTitle>
          <CardDescription>
            Convert between currencies with real-time exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <CurrencyInput 
              amount={amount} 
              setAmount={setAmount} 
              disabled={isLoading}
              currency={fromCurrency}
            />

            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
              <CurrencySelector
                value={fromCurrency}
                onChange={setFromCurrency}
                disabled={isLoading}
                label="From"
              />
              
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300",
                  isSwapping ? "rotate-180" : ""
                )}
                onClick={handleSwap}
                disabled={isLoading}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              
              <CurrencySelector
                value={toCurrency}
                onChange={setToCurrency}
                disabled={isLoading}
                label="To"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3 py-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ) : error ? (
            <div className="p-4 text-sm bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          ) : (
            <ConversionResult
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              convertedAmount={convertedAmount}
              rate={conversionRate}
            />
          )}
          
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>
              {lastUpdated 
                ? `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}`
                : 'Fetching rates...'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={refreshRates}
              disabled={isLoading}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyConverter;