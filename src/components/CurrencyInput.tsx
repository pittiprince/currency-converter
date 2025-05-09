import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/currency-utils';

interface CurrencyInputProps {
  amount: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
  currency: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  setAmount,
  disabled = false,
  currency
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty input (set to 0) or numeric values
    if (value === '') {
      setAmount(0);
    } else {
      // Convert to number and validate
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setAmount(numValue);
      }
    }
  };

  // Format for display if needed
  const displayValue = amount === 0 ? '' : amount.toString();

  return (
    <div className="space-y-2">
      <Label htmlFor="amount" className="text-sm font-medium">
        Amount
      </Label>
      <div className="relative">
        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
          <span className="text-muted-foreground">
            {formatCurrency(currency, 0, true)}
          </span>
        </div>
        <Input
          id="amount"
          type="number"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          className="pl-10"
          placeholder="Enter amount"
          step="any"
          min="0"
        />
      </div>
    </div>
  );
};

export default CurrencyInput;