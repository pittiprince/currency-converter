import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_CURRENCIES } from '@/data/currencies';
import { formatCurrency } from '@/lib/currency-utils';
import { Calculator, ArrowLeft, Plus, Minus, Percent, Divide, X } from 'lucide-react';

const CurrencyCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currency, setCurrency] = useState<string>('USD');
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [clearOnNextInput, setClearOnNextInput] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const clearDisplay = () => {
    setDisplay('0');
    setClearOnNextInput(false);
  };

  const clearAll = () => {
    clearDisplay();
    setMemory(null);
    setOperation(null);
    setHistory([]);
  };

  const handleNumberInput = (num: string) => {
    if (clearOnNextInput) {
      setDisplay(num);
      setClearOnNextInput(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimalPoint = () => {
    if (clearOnNextInput) {
      setDisplay('0.');
      setClearOnNextInput(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (memory === null) {
      setMemory(currentValue);
      setOperation(op);
      setClearOnNextInput(true);
      setHistory([...history, `${formatCurrency(currency, currentValue)} ${op}`]);
    } else {
      // Perform the previous operation
      calculate();
      // Set the new operation
      setOperation(op);
      setClearOnNextInput(true);
    }
  };

  const calculate = () => {
    if (memory === null || operation === null) return;
    
    const currentValue = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+':
        result = memory + currentValue;
        break;
      case '-':
        result = memory - currentValue;
        break;
      case '×':
        result = memory * currentValue;
        break;
      case '÷':
        result = memory / currentValue;
        break;
      case '%':
        result = memory * (currentValue / 100);
        break;
      default:
        return;
    }
    
    // Add to history
    setHistory([...history, `${formatCurrency(currency, memory)} ${operation} ${formatCurrency(currency, currentValue)} = ${formatCurrency(currency, result)}`]);
    
    // Update state
    setDisplay(result.toString());
    setMemory(result);
    setOperation(null);
    setClearOnNextInput(true);
  };

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      
      if (e.key >= '0' && e.key <= '9') {
        handleNumberInput(e.key);
      } else if (e.key === '.') {
        handleDecimalPoint();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
      } else if (e.key === '+') {
        handleOperation('+');
      } else if (e.key === '-') {
        handleOperation('-');
      } else if (e.key === '*') {
        handleOperation('×');
      } else if (e.key === '/') {
        handleOperation('÷');
      } else if (e.key === '%') {
        handleOperation('%');
      } else if (e.key === 'Escape') {
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, memory, operation]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Currency Calculator
        </CardTitle>
        <CardDescription>
          Perform calculations with currency values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Select
              value={currency}
              onValueChange={setCurrency}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Currency">
                  {currency && (
                    <div className="flex items-center">
                      <span className="mr-2">
                        {ALL_CURRENCIES.find(c => c.code === currency)?.flag}
                      </span>
                      <span>{currency}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {ALL_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="ml-2 text-muted-foreground text-xs">
                        ({currency.name})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={display}
              readOnly
              className="flex-1 text-right font-mono text-lg"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" onClick={clearAll}>C</Button>
            <Button variant="outline" onClick={() => handleOperation('%')}>
              <Percent className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleBackspace}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => handleOperation('÷')}>
              <Divide className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" onClick={() => handleNumberInput('7')}>7</Button>
            <Button variant="outline" onClick={() => handleNumberInput('8')}>8</Button>
            <Button variant="outline" onClick={() => handleNumberInput('9')}>9</Button>
            <Button variant="outline" onClick={() => handleOperation('×')}>
              <X className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" onClick={() => handleNumberInput('4')}>4</Button>
            <Button variant="outline" onClick={() => handleNumberInput('5')}>5</Button>
            <Button variant="outline" onClick={() => handleNumberInput('6')}>6</Button>
            <Button variant="outline" onClick={() => handleOperation('-')}>
              <Minus className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" onClick={() => handleNumberInput('1')}>1</Button>
            <Button variant="outline" onClick={() => handleNumberInput('2')}>2</Button>
            <Button variant="outline" onClick={() => handleNumberInput('3')}>3</Button>
            <Button variant="outline" onClick={() => handleOperation('+')}>
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" onClick={() => handleNumberInput('0')}>0</Button>
            <Button variant="outline" onClick={handleDecimalPoint}>.</Button>
            <Button variant="default" className="col-span-2" onClick={calculate}>=</Button>
          </div>
          
          {history.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium mb-2">Calculation History</p>
              <div className="space-y-1 text-sm text-muted-foreground max-h-32 overflow-y-auto">
                {history.map((item: any, index: any) => (
                  <div key={index} className="p-1">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyCalculator;
