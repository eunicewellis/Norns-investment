export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export const countryCurrencyMap: Record<string, CurrencyInfo> = {
  'Albania': { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
  'Argentina': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'Australia': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'Austria': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Bahrain': { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  'Bangladesh': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  'Belgium': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Bolivia': { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
  'Bosnia': { code: 'BAM', symbol: 'KM', name: 'Bosnian Mark' },
  'Brazil': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'Brunei': { code: 'BND', symbol: 'B$', name: 'Brunei Dollar' },
  'Bulgaria': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  'Cambodia': { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  'Canada': { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'Colombia': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  'Costa Rica': { code: 'CRC', symbol: '₡', name: 'Costa Rican Colon' },
  'Croatia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Cyprus': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Czech Republic': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'Dominican Republic': { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
  'Ecuador': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'El Salvador': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'Estonia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Finland': { code: 'EUR', symbol: '€', name: 'Euro' },
  'France': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Germany': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Greece': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Guatemala': { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  'Honduras': { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
  'Hong Kong': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  'Hungary': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'Iceland': { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona' },
  'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  'Iran': { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  'Iraq': { code: 'IQD', symbol: 'د.ع', name: 'Iraqi Dinar' },
  'Ireland': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Israel': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  'Italy': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Japan': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'Jordan': { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  'Kuwait': { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  'Laos': { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
  'Latvia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Lebanon': { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  'Lithuania': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Luxembourg': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Macau': { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca' },
  'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'Maldives': { code: 'MVR', symbol: 'ރ.', name: 'Maldivian Rufiyaa' },
  'Malta': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Mexico': { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
  'Mongolia': { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
  'Myanmar': { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  'Nepal': { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
  'Netherlands': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Nicaragua': { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Cordoba' },
  'North Macedonia': { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
  'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'Oman': { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
  'Pakistan': { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  'Panama': { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
  'Paraguay': { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'Portugal': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Qatar': { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  'Romania': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  'Russia': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  'Saudi Arabia': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'Serbia': { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'Slovakia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Slovenia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'South Korea': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'Spain': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Sri Lanka': { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee' },
  'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  'Taiwan': { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
  'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'Turkey': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  'Ukraine': { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  'United Arab Emirates': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'United Kingdom': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'United States': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'Uruguay': { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  'Venezuela': { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolivar' },
  'Vietnam': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
};

export const countries = Object.keys(countryCurrencyMap);

export const defaultCurrency: CurrencyInfo = { code: 'USD', symbol: '$', name: 'US Dollar' };

// Unique currency symbols for admin panel
export const allCurrencySymbols: string[] = [
  '$', '€', '£', '¥', '₿', '₹', 'R$', 'A$', 'CA$', 'MX$', 'S$', 'HK$', 'NT$', 'B$', 'MOP$', 'RD$',
  '₩', '₺', '₱', '₽', '₴', 'zł', 'Kč', 'CHF', 'kr', 'S/', '₨', '৳', 'Rp', '฿', '₫', '₮', '៛', '₭',
  'د.إ', '﷼', 'د.ك', 'د.ب', 'د.ا', 'ل.ل', 'د.ع', '₪',
  '$U', '₲', 'Bs.', '₡', 'B/.', 'Q', 'L', 'C$',
  'Ft', 'lei', 'лв', 'дин', 'L', 'ден', 'KM', 'K',
  'ރ.', 'R',
];

let cachedRates: Record<string, number> = {};
let lastFetched = 0;

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now();
  if (Object.keys(cachedRates).length > 0 && now - lastFetched < 600000) {
    return cachedRates;
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      cachedRates = data.rates || {};
      lastFetched = now;
    }
  } catch (e) {}
  return cachedRates;
}

export function convertPrice(usdPrice: number, targetCode: string): number {
  if (targetCode === 'USD' || !cachedRates[targetCode]) return usdPrice;
  return usdPrice * cachedRates[targetCode];
}

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