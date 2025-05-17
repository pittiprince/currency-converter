import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/currency-utils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
// import { motion } from 'framer-motion';

interface ConversionResultProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  rate: number;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  rate
}) => {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  // Handle copy to clipboard
  const handleCopy = () => {
    const textToCopy = `${formatCurrency(fromCurrency, amount)} = ${formatCurrency(toCurrency, convertedAmount)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopying(true);
      toast({
        title: "Copied to clipboard",
        description: "The conversion result has been copied.",
      });
      
      setTimeout(() => setCopying(false), 1500);
    });
  };

  return (
    <Card className="bg-muted/40 border">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight">
              {formatCurrency(toCurrency, convertedAmount)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(fromCurrency, amount)} = {formatCurrency(toCurrency, convertedAmount)}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copying ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground pt-1 border-t border-border">
          <p>1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionResult;