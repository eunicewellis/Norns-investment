export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export const countryCurrencyMap: Record<string, CurrencyInfo> = {
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
  'Belgium': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Austria': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Ireland': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Portugal': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Finland': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Greece': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Luxembourg': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'Turkey': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  'United Arab Emirates': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'Saudi Arabia': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'Qatar': { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  'Kuwait': { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  'Oman': { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
  'Bahrain': { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  'Jordan': { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  'Lebanon': { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  'Iraq': { code: 'IQD', symbol: 'د.ع', name: 'Iraqi Dinar' },
  'Iran': { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  'Israel': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'Vietnam': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  'South Korea': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'Japan': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'Hong Kong': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  'Taiwan': { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
  'Pakistan': { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  'Bangladesh': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  'Sri Lanka': { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee' },
  'Nepal': { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
  'Maldives': { code: 'MVR', symbol: 'ރ.', name: 'Maldivian Rufiyaa' },
  'Myanmar': { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  'Cambodia': { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  'Laos': { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
  'Mongolia': { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
  'Brunei': { code: 'BND', symbol: 'B$', name: 'Brunei Dollar' },
  'Macau': { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca' },
  'Argentina': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'Colombia': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  'Uruguay': { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  'Paraguay': { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  'Bolivia': { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
  'Costa Rica': { code: 'CRC', symbol: '₡', name: 'Costa Rican Colon' },
  'Panama': { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
  'Dominican Republic': { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
  'Guatemala': { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  'Honduras': { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
  'El Salvador': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'Nicaragua': { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Cordoba' },
  'Venezuela': { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolivar' },
  'Ecuador': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'Russia': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  'Ukraine': { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'Czech Republic': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  'Hungary': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'Romania': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  'Bulgaria': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  'Croatia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Serbia': { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  'Albania': { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
  'North Macedonia': { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
  'Bosnia': { code: 'BAM', symbol: 'KM', name: 'Bosnian Mark' },
  'Slovakia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Slovenia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Estonia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Latvia': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Lithuania': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Cyprus': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Malta': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Iceland': { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona' },
  'New Zealand': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  'Fiji': { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar' },
  'Papua New Guinea': { code: 'PGK', symbol: 'K', name: 'Papua New Guinea Kina' },
  'Samoa': { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },
  'Tonga': { code: 'TOP', symbol: 'T$', name: 'Tongan Paanga' },
  'Vanuatu': { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },
  'Solomon Islands': { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar' },
  'Timor-Leste': { code: 'USD', symbol: '$', name: 'US Dollar' },
};

export const countries = Object.keys(countryCurrencyMap);

export const defaultCurrency: CurrencyInfo = { code: 'USD', symbol: '$', name: 'US Dollar' };

// Unique currency symbols for admin panel
export const allCurrencySymbols: string[] = [
  '$', '€', '£', '¥', '₿', '₹', 'R$', 'A$', 'CA$', 'MX$', 'S$', 'HK$', 'NT$', 'NZ$', 'FJ$', 'SI$', 'WS$', 'T$', 'B$', 'MOP$', 'RD$',
  '₩', '₺', '₱', '₽', '₴', 'zł', 'Kč', 'CHF', 'kr', 'S/', '₨', '৳', 'Rp', '฿', '₫', '₮', '៛', '₭',
  'د.إ', '﷼', 'د.ك', 'د.ب', 'د.ا', 'ل.ل', 'د.ع', '₪',
  '$U', '₲', 'Bs.', '₡', 'B/.', 'Q', 'L', 'C$',
  'Ft', 'lei', 'лв', 'дин', 'L', 'ден', 'KM', 'K', 'VT',
  'ރ.', '₦', 'R',
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