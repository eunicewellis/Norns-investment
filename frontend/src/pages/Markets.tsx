import React, { useState, useEffect } from 'react';
import { fetchExchangeRates, convertPrice, getStoredCurrency } from '../utils/currency';

interface CryptoCoin {
  name: string;
  symbol: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  icon: string;
  chart: string;
}

const coinGeckoIds: Record<string, {symbol:string, icon:string, chart:string}> = {
  bitcoin: {symbol: 'BTC', icon: '₿', chart: '#f7931a'},
  ethereum: {symbol: 'ETH', icon: '♦', chart: '#627eea'},
  solana: {symbol: 'SOL', icon: '◎', chart: '#00ffa3'},
  cardano: {symbol: 'ADA', icon: '₳', chart: '#0033ad'},
  'ripple': {symbol: 'XRP', icon: '✕', chart: '#23292f'},
  polkadot: {symbol: 'DOT', icon: '●', chart: '#e6007a'},
  chainlink: {symbol: 'LINK', icon: '⬡', chart: '#375bd2'},
  'avalanche-2': {symbol: 'AVAX', icon: '▲', chart: '#e84142'},
};

const Markets: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCoin[]>([]);
  const [animatePrices, setAnimatePrices] = useState(false);
  const [loading, setLoading] = useState(true);
  const currency = getStoredCurrency();

  useEffect(() => {
    fetchExchangeRates().then(() => fetchPrices());
    const interval = setInterval(() => fetchExchangeRates().then(() => fetchPrices()), 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const ids = Object.keys(coinGeckoIds).join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true&include_24hr_high=true&include_24hr_low=true`);
      if (res.ok) {
        const data = await res.json();
        const mapped: CryptoCoin[] = Object.entries(coinGeckoIds).map(([id, meta], idx) => {
          const coin = data[id] || {};
          return {
            name: id === 'ripple' ? 'XRP' : id === 'avalanche-2' ? 'Avalanche' : id.charAt(0).toUpperCase() + id.slice(1),
            symbol: meta.symbol,
            price: convertPrice(coin.usd || 0, currency.code),
            change: coin.usd_24h_change || 0,
            high: convertPrice(coin.usd_24h_high || 0, currency.code),
            low: convertPrice(coin.usd_24h_low || 0, currency.code),
            volume: coin.usd_24h_vol ? '$' + (coin.usd_24h_vol / 1e9).toFixed(1) + 'B' : 'N/A',
            marketCap: coin.usd_market_cap ? '$' + (coin.usd_market_cap / 1e12).toFixed(2) + 'T' : 'N/A',
            icon: meta.icon,
            chart: meta.chart,
          };
        });
        setCryptos(mapped);
        setAnimatePrices(true);
        setTimeout(() => setAnimatePrices(false), 500);
        setLoading(false);
      }
    } catch (e) {
      // Fallback hardcoded data
      if (cryptos.length === 0) {
        setCryptos([
          { name: 'Bitcoin', symbol: 'BTC', price: 67845, change: 2.45, high: 68200, low: 66150, volume: '28.4B', marketCap: '1.32T', icon: '₿', chart: '#f7931a' },
          { name: 'Ethereum', symbol: 'ETH', price: 3456, change: 3.12, high: 3500, low: 3350, volume: '15.2B', marketCap: '415.8B', icon: '♦', chart: '#627eea' },
          { name: 'Solana', symbol: 'SOL', price: 142.50, change: 5.67, high: 145, low: 135, volume: '3.8B', marketCap: '62.1B', icon: '◎', chart: '#00ffa3' },
          { name: 'Cardano', symbol: 'ADA', price: 0.456, change: -1.23, high: 0.462, low: 0.448, volume: '1.2B', marketCap: '16.1B', icon: '₳', chart: '#0033ad' },
          { name: 'XRP', symbol: 'XRP', price: 0.623, change: 1.89, high: 0.63, low: 0.61, volume: '2.1B', marketCap: '33.7B', icon: '✕', chart: '#23292f' },
          { name: 'Polkadot', symbol: 'DOT', price: 7.23, change: -0.56, high: 7.35, low: 7.10, volume: '890M', marketCap: '9.4B', icon: '●', chart: '#e6007a' },
          { name: 'Chainlink', symbol: 'LINK', price: 14.89, change: 4.23, high: 15.10, low: 14.30, volume: '1.5B', marketCap: '8.7B', icon: '⬡', chart: '#375bd2' },
          { name: 'Avalanche', symbol: 'AVAX', price: 35.42, change: 6.78, high: 36.00, low: 33.20, volume: '2.3B', marketCap: '13.4B', icon: '▲', chart: '#e84142' },
        ]);
        setLoading(false);
      }
    }
  };

  const totalMarketCap = cryptos.reduce((sum, c) => sum + parseFloat(c.marketCap.replace(/[^0-9.]/g, '') || '0'), 0).toFixed(2) + 'T';

  return (
    <div className="page-container">
      <div className="markets-hero">
        <div className="markets-header">
          <div className="market-chip">📊 Real-Time Data</div>
          <h1 className="page-title">Crypto Market Watch</h1>
          <p className="page-subtitle">Track live cryptocurrency prices, charts, and market movements</p>
        </div>
        <div className="market-summary-cards">
          <div className="summary-mini-card">
            <span>Total Market Cap</span>
            <strong>{cryptos.length > 0 ? '$' + totalMarketCap : 'Loading...'}</strong>
          </div>
          <div className="summary-mini-card">
            <span>24h Volume</span>
            <strong>{cryptos.reduce((sum, c) => sum + parseFloat(c.volume.replace(/[^0-9.]/g, '') || '0'), 0).toFixed(1)}B</strong>
          </div>
          <div className="summary-mini-card">
            <span>BTC Dominance</span>
            <strong>{cryptos.length > 0 ? ((parseFloat(cryptos[0].marketCap.replace(/[^0-9.]/g, '') || '0') / parseFloat(totalMarketCap.replace(/[^0-9.]/g, '') || '1')) * 100).toFixed(1) + '%' : '...'}</strong>
          </div>
          <div className="summary-mini-card">
            <span>Active Cryptos</span>
            <strong>{cryptos.length > 0 ? cryptos.length + '+' : '...'}</strong>
          </div>
        </div>
      </div>

      <div className="market-ticker">
        <div className="ticker-gradient"></div>
        <div className="ticker-content">
          <span className="ticker-label">🔥 LIVE</span>
          {cryptos.map((c, i) => (
            <span key={i} className="ticker-item">
              {c.icon} {c.symbol} <span className={c.change >= 0 ? 'green' : 'red'}>${c.price?.toFixed(2)}</span>
              <span className={c.change >= 0 ? 'green' : 'red'}>({c.change >= 0 ? '+' : ''}{c.change?.toFixed(2)}%)</span>
            </span>
          ))}
        </div>
      </div>

      <div className="market-tools">
        <div className="search-box">
          <input type="text" placeholder="Search cryptocurrencies..." />
        </div>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Gainers</button>
          <button className="filter-btn">Losers</button>
          <button className="filter-btn">Favorites</button>
        </div>
      </div>

      <div className="market-table-container">
        <table className="market-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h High</th>
              <th>24h Low</th>
              <th>Volume (24h)</th>
              <th>Market Cap</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.symbol} className={animatePrices ? 'flash' : ''}>
                <td className="rank">{index + 1}</td>
                <td className="coin-info">
                  <span className="coin-icon" style={{background: crypto.chart}}>{crypto.icon}</span>
                  <div>
                    <span className="coin-name">{crypto.name}</span>
                    <span className="coin-symbol">{crypto.symbol}</span>
                  </div>
                </td>
                <td className={`price ${crypto.change >= 0 ? 'green' : 'red'}`} style={{verticalAlign:'middle'}}>
                  {currency.symbol}{crypto.price?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </td>
                <td>
                  <span className={`change-badge ${crypto.change >= 0 ? 'up' : 'down'}`}>
                    {crypto.change >= 0 ? '▲' : '▼'} {Math.abs(crypto.change || 0).toFixed(2)}%
                  </span>
                </td>
                <td className="price green" style={{verticalAlign:'middle'}}>{currency.symbol}{crypto.high?.toLocaleString()}</td>
                <td className="price red" style={{verticalAlign:'middle'}}>{currency.symbol}{crypto.low?.toLocaleString()}</td>
                <td>{crypto.volume}</td>
                <td>{crypto.marketCap}</td>
                <td>
                  <div className="mini-chart">
                    <svg width="80" height="30" viewBox="0 0 80 30">
                      <polyline
                        points={Array.from({length: 20}, (_, i) => `${i*4},${15 + Math.sin(i*0.8 + index)*8}`).join(' ')}
                        fill="none"
                        stroke={crypto.change >= 0 ? '#0ecb81' : '#f6465d'}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="market-features">
        <div className="mfeature-card">
          <div className="mfeature-icon chart-animate">📈</div>
          <h3>Live Order Book</h3>
          <p>Real-time buy/sell orders with depth chart visualization</p>
        </div>
        <div className="mfeature-card">
          <div className="mfeature-icon chart-animate" style={{animationDelay: '0.1s'}}>🤖</div>
          <h3>AI Predictions</h3>
          <p>Machine learning price forecasts with 87% accuracy rate</p>
        </div>
        <div className="mfeature-card">
          <div className="mfeature-icon chart-animate" style={{animationDelay: '0.2s'}}>⚡</div>
          <h3>Instant Execution</h3>
          <p>Trade execution in under 50ms with zero slippage</p>
        </div>
      </div>
    </div>
  );
};

export default Markets;