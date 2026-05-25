export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export const countryCurrencyMap: Record<string, CurrencyInfo> = {
  'Nigeria': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  'Ghana': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  'Kenya': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  'South Africa': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  'United States': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'United Kingdom': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'Canada': { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  'Australia': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'Brazil': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'Mexico': { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
  'Germany': { code: 'EUR', symbol: '€', name: 'Euro' },
  'France': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Spain': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Italy': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Netherlands': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'Turkey': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  'UAE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'Saudi Arabia': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'Egypt': { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  'Morocco': { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'Argentina': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'Colombia': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'Czech Republic': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
};

export const countries = Object.keys(countryCurrencyMap);

export const defaultCurrency: CurrencyInfo = { code: 'USD', symbol: '$', name: 'US Dollar' };

export function getCurrencyForCountry(country: string): CurrencyInfo {
  return countryCurrencyMap[country] || defaultCurrency;
}

export function getStoredCurrency(): CurrencyInfo {
  const stored = localStorage.getItem('binexelite_currency');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  const storedCountry = localStorage.getItem('binexelite_country');
  if (storedCountry) {
    return getCurrencyForCountry(storedCountry);
  }
  return defaultCurrency;
}

export function formatCurrency(amount: number, currency?: CurrencyInfo): string {
  const c = currency || getStoredCurrency();
  return c.symbol + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}