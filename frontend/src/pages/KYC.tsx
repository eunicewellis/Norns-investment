import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const KYC: React.FC = () => {
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
  });

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/kyc/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setKycStatus(data.status);
        }
      } catch (err) {
        console.error('Error checking KYC status:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitKyc = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/kyc/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Identity verified successfully! Redirecting...');
        setKycStatus('verified');
        // Redirect to dashboard after a short delay
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const personalFields = [
    { label: 'First Name', name: 'firstName', type: 'text' as const, placeholder: 'Enter your first name' },
    { label: 'Last Name', name: 'lastName', type: 'text' as const, placeholder: 'Enter your last name' },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' as const, placeholder: '' },
    { label: 'Nationality', name: 'nationality', type: 'text' as const, placeholder: 'e.g. American' },
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Checking verification status...</p>
      </div>
    );
  }

  if (kycStatus === 'verified') {
    return (
      <div className="page page-sm" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <div className="section-label"><i className="fas fa-shield-halved"></i> KYC Verified</div>
          <h1 className="section-title">You're All Set! ✓</h1>
        </div>
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h2 style={{ marginBottom: '12px' }}>Identity Verified</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Your identity has been successfully verified. You have full access to all platform features including unlimited withdrawals and premium investment plans.
          </p>
          <div className="kyc-verified-features" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px', margin: '0 auto 28px' }}>
            {['Unlimited Withdrawals', 'Premium Investment Plans', 'Higher Deposit Limits', 'Priority Customer Support'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent-primary)' }}></i>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
            <i className="fas fa-chart-pie"></i> Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (kycStatus === 'pending') {
    return (
      <div className="page page-sm" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <div className="section-label"><i className="fas fa-clock"></i> Under Review</div>
          <h1 className="section-title">Verification in Progress</h1>
        </div>
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⏳</div>
          <h2 style={{ marginBottom: '12px' }}>We're Reviewing Your Information</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Our verification team is carefully reviewing your submitted information. This usually takes 24-48 hours. You'll receive an email notification once the verification is complete.
          </p>
          <div className="progress-bar" style={{ height: '8px', marginBottom: '8px' }}>
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>Processing your application...</p>
        </div>
      </div>
    );
  }

  if (kycStatus === 'rejected') {
    return (
      <div className="page page-sm" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <div className="section-label"><i className="fas fa-circle-exclamation"></i> Rejected</div>
          <h1 className="section-title">Verification Failed</h1>
        </div>
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>❌</div>
          <h2 style={{ marginBottom: '12px' }}>Verification Was Not Approved</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Unfortunately, the information you submitted could not be verified. Please review your details and resubmit.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => { setKycStatus(null); }}>
            <i className="fas fa-redo"></i> Resubmit Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-sm">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-shield-halved"></i> KYC Verification</div>
        <h1 className="section-title">Verify Your Identity</h1>
        <p className="section-subtitle">Complete the verification process to unlock full platform features including unlimited withdrawals and premium plans.</p>
      </div>

      {error && <div className="alert alert-error"><i className="fas fa-circle-exclamation"></i>{error}</div>}
      {success && <div className="alert alert-success"><i className="fas fa-check-circle"></i>{success}</div>}

      {/* Personal Information - Simplified */}
      <div className="card" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', fontWeight: 700 }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {personalFields.map(field => (
            <div key={field.name} className="form-group" style={field.name === 'nationality' ? { gridColumn: '1 / -1' } : {}}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                className="form-input"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleSubmitKyc}
            disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.nationality}
          >
            {isSubmitting ? '⏳ Submitting...' : '✓ Submit Verification'}
          </button>
        </div>
      </div>

      <div className="kyc-security-note" style={{ textAlign: 'center', marginTop: '32px' }}>
        <i className="fas fa-lock" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>
        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
          Your personal information is encrypted and securely stored. We never share your data with third parties.
        </span>
      </div>
    </div>
  );
};

export default KYC;