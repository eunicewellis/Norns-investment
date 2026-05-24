import React, { useState } from 'react';
import API_BASE_URL from '../config';

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom',
  'Canada', 'Australia', 'India', 'Brazil', 'Mexico', 'Germany', 'France',
  'Spain', 'Italy', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Belgium', 'Austria', 'Ireland', 'Portugal', 'Poland', 'Czech Republic',
  'Turkey', 'UAE', 'Saudi Arabia', 'Egypt', 'Morocco', 'Algeria', 'Tunisia',
  'Senegal', 'Ivory Coast', 'Cameroon', 'Zambia', 'Zimbabwe', 'Botswana',
  'Philippines', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Singapore',
  'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela'
];

const Withdrawal: React.FC = () => {
  const [method, setMethod] = useState<'bank' | 'cashapp' | 'paypal' | ''>('');
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [iban, setIban] = useState('');
  const [cashTag, setCashTag] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) < 20) {
      setError('Minimum withdrawal amount is $20');
      return;
    }
    if (!method) {
      setError('Please select a withdrawal method');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/withdrawals/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          method: method === 'bank' ? 'Bank Transfer' : method === 'cashapp' ? 'CashApp' : 'PayPal',
          amount: parseFloat(amount),
          walletAddress: method === 'bank' ? JSON.stringify({ country, bankName, accountName, accountNumber, routingNumber: routingNumber || undefined, swiftCode: swiftCode || undefined, iban: iban || undefined }) :
                       method === 'cashapp' ? cashTag : paypalEmail
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Withdrawal request for $${parseFloat(amount).toLocaleString()} submitted successfully!`);
        setTimeout(() => { window.location.href = '/dashboard'; }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="withdrawal-page">
      <div className="page-header">
        <h1>Request Withdrawal</h1>
        <p>Choose your preferred withdrawal method</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="card" style={{maxWidth:'680px', margin:'0 auto', padding:'40px 32px'}}>
        <h3 style={{fontWeight: 700, marginBottom: '24px'}}>
          <i className="fas fa-money-bill-transfer" style={{color:'var(--accent-primary)', marginRight:8}}></i>
          Select Withdrawal Method
        </h3>

        {/* Method Selection */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'28px'}}>
          <button onClick={() => setMethod('bank')} className={`deposit-method-card ${method === 'bank' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>🏦</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>Bank Transfer</div>
          </button>
          <button onClick={() => setMethod('cashapp')} className={`deposit-method-card ${method === 'cashapp' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>💵</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>CashApp</div>
          </button>
          <button onClick={() => setMethod('paypal')} className={`deposit-method-card ${method === 'paypal' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>🅿️</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>PayPal</div>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Amount (USD)</label>
          <input type="number" className="form-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount (min: $20)" min={20} />
        </div>

        {/* Bank Transfer Fields */}
        {method === 'bank' && (
          <>
            <div className="form-group">
              <label className="form-label">Select Country</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select your country...</option>
                {countries.map(c => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Bank Name</label><input type="text" className="form-input" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. First Bank, Chase" /></div>
            <div className="form-group"><label className="form-label">Account Holder Name</label><input type="text" className="form-input" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Full name on account" /></div>
            <div className="form-group"><label className="form-label">Account Number</label><input type="text" className="form-input" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" /></div>
            <div className="form-group"><label className="form-label">Routing / Sort Code <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} placeholder="Routing number" /></div>
            <div className="form-group"><label className="form-label">SWIFT / BIC <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} placeholder="e.g. BOFAUS3N" /></div>
            <div className="form-group"><label className="form-label">IBAN <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="International Bank Account Number" /></div>
          </>
        )}

        {/* CashApp */}
        {method === 'cashapp' && (
          <div className="form-group">
            <label className="form-label">CashApp $Cashtag</label>
            <input type="text" className="form-input" value={cashTag} onChange={(e) => setCashTag(e.target.value)} placeholder="$yourcashtag" />
          </div>
        )}

        {/* PayPal */}
        {method === 'paypal' && (
          <div className="form-group">
            <label className="form-label">PayPal Email</label>
            <input type="email" className="form-input" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="your@email.com" />
          </div>
        )}

        <div className="withdrawal-summary" style={{margin:'24px 0'}}>
          <h4>Withdrawal Summary</h4>
          <div className="summary-item"><span>Method:</span><span>{method === 'bank' ? 'Bank Transfer' : method === 'cashapp' ? 'CashApp' : method === 'paypal' ? 'PayPal' : '-'}</span></div>
          <div className="summary-item"><span>Amount:</span><span>${parseFloat(amount || '0').toLocaleString()}</span></div>
          <div className="summary-item"><span>Processing Fee:</span><span>0%</span></div>
          <div className="summary-item"><span>Processing Time:</span><span>24-72 hours</span></div>
        </div>

        <button className="btn btn-primary btn-lg btn-full" onClick={handleWithdrawal}
          disabled={isLoading || !amount || !method}>
          {isLoading ? '⏳ Processing...' : '📤 Submit Withdrawal Request'}
        </button>

        <div className="security-notice" style={{marginTop:'16px'}}>🔒 Your details are encrypted and securely stored.</div>
      </div>
    </div>
  );
};

export default Withdrawal;