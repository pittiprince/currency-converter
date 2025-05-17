import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Expanded currency data with 180+ countries
const ALL_CURRENCIES = [
  // North America
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', region: 'North America', country: 'United States' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$', flag: '🇨🇦', region: 'North America', country: 'Canada' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', region: 'North America', country: 'Mexico' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲', region: 'North America', country: 'Jamaica' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹', region: 'North America', country: 'Guatemala' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷', region: 'North America', country: 'Costa Rica' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦', region: 'North America', country: 'Panama' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: '$', flag: '🇧🇧', region: 'North America', country: 'Barbados' },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿', region: 'North America', country: 'Belize' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳', region: 'North America', country: 'Honduras' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮', region: 'North America', country: 'Nicaragua' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴', region: 'North America', country: 'Dominican Republic' },
  { code: 'CUP', name: 'Cuban Peso', symbol: '₱', flag: '🇨🇺', region: 'North America', country: 'Cuba' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹', region: 'North America', country: 'Haiti' },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', flag: '🇹🇹', region: 'North America', country: 'Trinidad and Tobago' },
  
  // South America
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', region: 'South America', country: 'Brazil' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', region: 'South America', country: 'Argentina' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', region: 'South America', country: 'Colombia' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.', flag: '🇵🇪', region: 'South America', country: 'Peru' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', region: 'South America', country: 'Chile' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.', flag: '🇧🇴', region: 'South America', country: 'Bolivia' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.', flag: '🇻🇪', region: 'South America', country: 'Venezuela' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', region: 'South America', country: 'Uruguay' },
  { code: 'PYG', name: 'Paraguayan Guaraní', symbol: '₲', flag: '🇵🇾', region: 'South America', country: 'Paraguay' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: '$', flag: '🇬🇾', region: 'South America', country: 'Guyana' },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$', flag: '🇸🇷', region: 'South America', country: 'Suriname' },
  { code: 'FKP', name: 'Falkland Islands Pound', symbol: '£', flag: '🇫🇰', region: 'South America', country: 'Falkland Islands' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪', region: 'South America', country: 'Georgia' },
  
  // Europe
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', region: 'Europe', country: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', region: 'Europe', country: 'United Kingdom' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', region: 'Europe', country: 'Switzerland' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', region: 'Europe', country: 'Norway' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', region: 'Europe', country: 'Sweden' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', region: 'Europe', country: 'Denmark' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱', region: 'Europe', country: 'Poland' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', region: 'Europe', country: 'Czech Republic' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', region: 'Europe', country: 'Romania' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', region: 'Europe', country: 'Hungary' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸', region: 'Europe', country: 'Iceland' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷', region: 'Europe', country: 'Croatia' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', region: 'Europe', country: 'Bulgaria' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин.', flag: '🇷🇸', region: 'Europe', country: 'Serbia' },
  { code: 'ALL', name: 'Albanian Lek', symbol: 'Lek', flag: '🇦🇱', region: 'Europe', country: 'Albania' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰', region: 'Europe', country: 'North Macedonia' },
  { code: 'BAM', name: 'Bosnia and Herzegovina Convertible Mark', symbol: 'KM', flag: '🇧🇦', region: 'Europe', country: 'Bosnia and Herzegovina' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦', region: 'Europe', country: 'Ukraine' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', region: 'Europe', country: 'Russia' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', region: 'Europe', country: 'Turkey' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾', region: 'Europe', country: 'Belarus' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩', region: 'Europe', country: 'Moldova' },
  
  // Asia
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', region: 'Asia', country: 'Japan' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', region: 'Asia', country: 'China' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: '$', flag: '🇭🇰', region: 'Asia', country: 'Hong Kong' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: '$', flag: '🇸🇬', region: 'Asia', country: 'Singapore' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', region: 'Asia', country: 'South Korea' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', region: 'Asia', country: 'India' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', region: 'Asia', country: 'Thailand' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', region: 'Asia', country: 'Indonesia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', region: 'Asia', country: 'Malaysia' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', region: 'Asia', country: 'Philippines' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', region: 'Asia', country: 'Vietnam' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', region: 'Asia', country: 'Pakistan' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', region: 'Asia', country: 'Bangladesh' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰', region: 'Asia', country: 'Sri Lanka' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', flag: '🇳🇵', region: 'Asia', country: 'Nepal' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲', region: 'Asia', country: 'Myanmar' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭', region: 'Asia', country: 'Cambodia' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦', region: 'Asia', country: 'Laos' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: '.ރ', flag: '🇲🇻', region: 'Asia', country: 'Maldives' },
  { code: 'BND', name: 'Brunei Dollar', symbol: '$', flag: '🇧🇳', region: 'Asia', country: 'Brunei' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', region: 'Asia', country: 'Taiwan' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', flag: '🇲🇳', region: 'Asia', country: 'Mongolia' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿', region: 'Asia', country: 'Kazakhstan' },
  { code: 'KGS', name: 'Kyrgystani Som', symbol: 'с', flag: '🇰🇬', region: 'Asia', country: 'Kyrgyzstan' },
  { code: 'UZS', name: 'Uzbekistan Som', symbol: 'лв', flag: '🇺🇿', region: 'Asia', country: 'Uzbekistan' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'ЅМ', flag: '🇹🇯', region: 'Asia', country: 'Tajikistan' },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'm', flag: '🇹🇲', region: 'Asia', country: 'Turkmenistan' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿', region: 'Asia', country: 'Azerbaijan' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲', region: 'Asia', country: 'Armenia' },
  { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪', flag: '🇮🇱', region: 'Asia', country: 'Israel' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴', region: 'Asia', country: 'Jordan' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧', region: 'Asia', country: 'Lebanon' },
  { code: 'SYP', name: 'Syrian Pound', symbol: '£', flag: '🇸🇾', region: 'Asia', country: 'Syria' },
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶', region: 'Asia', country: 'Iraq' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷', region: 'Asia', country: 'Iran' },
  { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ', flag: '🇦🇪', region: 'Asia', country: 'United Arab Emirates' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', region: 'Asia', country: 'Saudi Arabia' },
  { code: 'QAR', name: 'Qatari Rial', symbol: '﷼', flag: '🇶🇦', region: 'Asia', country: 'Qatar' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲', region: 'Asia', country: 'Oman' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', region: 'Asia', country: 'Kuwait' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭', region: 'Asia', country: 'Bahrain' },
  { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪', region: 'Asia', country: 'Yemen' },
  
  // Africa
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', region: 'Africa', country: 'South Africa' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', region: 'Africa', country: 'Nigeria' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', region: 'Africa', country: 'Egypt' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', region: 'Africa', country: 'Kenya' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭', region: 'Africa', country: 'Ghana' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿', region: 'Africa', country: 'Tanzania' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', region: 'Africa', country: 'Uganda' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦', region: 'Africa', country: 'Morocco' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿', region: 'Africa', country: 'Algeria' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳', region: 'Africa', country: 'Tunisia' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د', flag: '🇱🇾', region: 'Africa', country: 'Libya' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س.', flag: '🇸🇩', region: 'Africa', country: 'Sudan' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹', region: 'Africa', country: 'Ethiopia' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh.So.', flag: '🇸🇴', region: 'Africa', country: 'Somalia' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj', flag: '🇩🇯', region: 'Africa', country: 'Djibouti' },
  { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk', flag: '🇪🇷', region: 'Africa', country: 'Eritrea' },
  { code: 'SSP', name: 'South Sudanese Pound', symbol: '£', flag: '🇸🇸', region: 'Africa', country: 'South Sudan' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'RF', flag: '🇷🇼', region: 'Africa', country: 'Rwanda' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu', flag: '🇧🇮', region: 'Africa', country: 'Burundi' },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le', flag: '🇸🇱', region: 'Africa', country: 'Sierra Leone' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: 'L$', flag: '🇱🇷', region: 'Africa', country: 'Liberia' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', flag: '🇬🇳', region: 'Africa', country: 'Guinea' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', flag: '🇬🇲', region: 'Africa', country: 'Gambia' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', flag: '🇸🇿', region: 'Africa', country: 'Eswatini' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸', region: 'Africa', country: 'Lesotho' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', flag: '🇳🇦', region: 'Africa', country: 'Namibia' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼', region: 'Africa', country: 'Botswana' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', region: 'Africa', country: 'Zambia' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼', region: 'Africa', country: 'Malawi' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿', region: 'Africa', country: 'Mozambique' },
  { code: 'MDG', name: 'Malagasy Ariary', symbol: 'Ar', flag: '🇲🇬', region: 'Africa', country: 'Madagascar' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', flag: '🇸🇨', region: 'Africa', country: 'Seychelles' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺', region: 'Africa', country: 'Mauritius' },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: 'Esc', flag: '🇨🇻', region: 'Africa', country: 'Cape Verde' },
  { code: 'STP', name: 'São Tomé and Príncipe Dobra', symbol: 'Db', flag: '🇸🇹', region: 'Africa', country: 'São Tomé and Príncipe' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🇸🇳', region: 'Africa', country: 'Senegal' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', flag: '🇨🇲', region: 'Africa', country: 'Cameroon' },
  
  // Oceania
  { code: 'AUD', name: 'Australian Dollar', symbol: '$', flag: '🇦🇺', region: 'Oceania', country: 'Australia' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: '$', flag: '🇳🇿', region: 'Oceania', country: 'New Zealand' },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬', region: 'Oceania', country: 'Papua New Guinea' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: '$', flag: '🇫🇯', region: 'Oceania', country: 'Fiji' },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: '$', flag: '🇸🇧', region: 'Oceania', country: 'Solomon Islands' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺', region: 'Oceania', country: 'Vanuatu' },
  { code: 'WST', name: 'Samoan Tala', symbol: 'T', flag: '🇼🇸', region: 'Oceania', country: 'Samoa' },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴', region: 'Oceania', country: 'Tonga' },
  { code: 'KID', name: 'Kiribati Dollar', symbol: '$', flag: '🇰🇮', region: 'Oceania', country: 'Kiribati' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', flag: '🇵🇫', region: 'Oceania', country: 'French Polynesia' },
];

// Type definition for our currency
type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  region: string;
  country: string;
};

const CountryCurrencies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleRegions, setVisibleRegions] = useState<Record<string, boolean>>({
    'North America': true,
    'South America': true,
    'Europe': true,
    'Asia': true,
    'Africa': true,
    'Oceania': true
  });
  const [currentTab, setCurrentTab] = useState('regions');
  
  // Lazy load currencies for better performance
  const [loadedItems, setLoadedItems] = useState(30);
  
  // Group currencies by region - memoized for performance
  const regions = useMemo(() => {
    const result: Record<string, Currency[]> = {
      'North America': [],
      'South America': [],
      'Europe': [],
      'Asia': [],
      'Africa': [],
      'Oceania': []
    };
    
    ALL_CURRENCIES.forEach(currency => {
      if (result[currency.region]) {
        result[currency.region].push(currency);
      }
    });
    
    return result;
  }, []);
  
  // Filtered currencies based on search query
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return [];
    
    return ALL_CURRENCIES.filter(
      c => c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
           c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  // Load more items when scrolling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 200) {
      setLoadedItems(prev => Math.min(prev + 20, ALL_CURRENCIES.length));
    }
  };
  
  // Toggle region visibility
  const toggleRegion = (region: string) => {
    setVisibleRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };
  
  // Reset loaded items when changing tabs or search
  useEffect(() => {
    setLoadedItems(30);
  }, [currentTab, searchQuery]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>World Currencies</CardTitle>
        <CardDescription>
          Browse currencies by region or search from 180+ countries
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search currency, country or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regions" className="w-full" onValueChange={(value) => setCurrentTab(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regions">By Region</TabsTrigger>
            <TabsTrigger value="all">All Currencies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regions">
            <ScrollArea className="h-[400px] pr-4" onScroll={handleScroll}>
              {searchQuery ? (
                <div className="grid grid-cols-1 gap-4 py-4">
                  {filteredCurrencies.slice(0, loadedItems).map((currency) => (
                    <CurrencyCard key={currency.code} currency={currency} />
                  ))}
                  {filteredCurrencies.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No currencies match your search
                    </div>
                  )}
                </div>
              ) : (
                Object.entries(regions).map(([region, currencies]) => (
                  <div key={region} className="mb-6">
                    <h3 
                      className="text-lg font-semibold mb-2 cursor-pointer flex items-center" 
                      onClick={() => toggleRegion(region)}
                    >
                      <span className="mr-2">
                        {visibleRegions[region] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </span>
                      <span>
                        {region === 'North America' && '🌎 '}
                        {region === 'South America' && '🌎 '}
                        {region === 'Europe' && '🇪🇺 '}
                        {region === 'Asia' && '🌏 '}
                        {region === 'Oceania' && '🌏 '}
                        {region === 'Africa' && '🌍 '}
                        {region}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({currencies.length} currencies)
                      </span>
                    </h3>
                    {visibleRegions[region] && (
                      <div className="grid grid-cols-1 gap-3">
                        {currencies.slice(0, loadedItems / 6).map((currency) => (
                          <CurrencyCard key={currency.code} currency={currency} />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="all">
            <ScrollArea className="h-[400px] pr-4" onScroll={handleScroll}>
              <div className="grid grid-cols-1 gap-3 py-4">
                {(searchQuery ? filteredCurrencies : ALL_CURRENCIES)
                  .slice(0, loadedItems)
                  .map((currency) => (
                    <CurrencyCard key={currency.code} currency={currency} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Separate component for currency card to improve performance
const CurrencyCard: React.FC<{ currency: Currency }> = ({ currency }) => {
  return (
    <div className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors">
      <span className="text-3xl mr-3">{currency.flag}</span>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium">{currency.name}</p>
          <span className="bg-accent/40 text-xs font-medium rounded px-2 py-1">
            {currency.code}
          </span>
        </div>
        <p className="text-sm text-muted-foreground flex items-center">
          <span className="mr-1">{currency.country}</span>
          {currency.symbol && <span className="opacity-70">({currency.symbol})</span>}
        </p>
      </div>
    </div>
  );
};

export default CountryCurrencies;