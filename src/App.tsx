import { ThemeProvider } from '@/components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrencyConverter from '@/components/CurrencyConverter';
import CurrencyCalculator from './components/CurrencyCalculator ';
import CountryCurrencies from './components/CountryCurrencies ';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="currency-converter-theme">
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
        <Tabs defaultValue="converter" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
          </TabsList>
          <TabsContent value="converter">
            <CurrencyConverter />
          </TabsContent>
          <TabsContent value="calculator">
            <CurrencyCalculator />
          </TabsContent>
          <TabsContent value="currencies">
            <CountryCurrencies />
          </TabsContent>
        </Tabs>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;