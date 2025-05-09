import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ALL_CURRENCIES } from '@/data/currencies';

const CurrencyInfo: React.FC = () => {
  return (
    <Card className="mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Currency Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {ALL_CURRENCIES.map((currency) => (
              <div
                key={currency.code}
                className="flex items-center p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <span className="text-2xl mr-2">{currency.flag}</span>
                <div>
                  <p className="font-medium">{currency.code}</p>
                  <p className="text-xs text-muted-foreground">{currency.name}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CurrencyInfo;