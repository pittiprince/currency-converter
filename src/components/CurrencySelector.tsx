import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { POPULAR_CURRENCIES, ALL_CURRENCIES } from '@/data/currencies';
// import { formatCurrency } from '@/lib/currency-utils';

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  label
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency">
            {value && (
              <div className="flex items-center">
                <span className="mr-2">
                  {ALL_CURRENCIES.find(c => c.code === value)?.flag}
                </span>
                <span>{value}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Popular Currencies</SelectLabel>
            {POPULAR_CURRENCIES.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{currency.flag}</span>
                  <span>{currency.code}</span>
                  <span className="ml-2 text-muted-foreground text-xs">
                    ({currency.name})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>All Currencies</SelectLabel>
            {ALL_CURRENCIES.filter(
              currency => !POPULAR_CURRENCIES.some(pop => pop.code === currency.code)
            ).map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{currency.flag}</span>
                  <span>{currency.code}</span>
                  <span className="ml-2 text-muted-foreground text-xs">
                    ({currency.name})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;