import { ThemeProvider } from '@/components/ThemeProvider';
import CurrencyConverter from '@/components/CurrencyConverter';
import CurrencyInfo from '@/components/CurrencyInfo';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="currency-converter-theme">
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
        <CurrencyConverter />
        <CurrencyInfo />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;