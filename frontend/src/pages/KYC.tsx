import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KYC: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  });

  const [documents, setDocuments] = useState<{
    idFront: File | null;
    idBack: File | null;
    selfie: File | null;
    proofOfAddress: File | null;
  }>({
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
  });

  useEffect(() => {
    checkKycStatus();
  }, []);

  const checkKycStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/kyc/status', {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (field: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments({ ...documents, [field]: e.target.files[0] });
    }
  };

  const handleSubmitKyc = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formPayload = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      if (documents.idFront) formPayload.append('idFront', documents.idFront);
      if (documents.idBack) formPayload.append('idBack', documents.idBack);
      if (documents.selfie) formPayload.append('selfie', documents.selfie);
      if (documents.proofOfAddress) formPayload.append('proofOfAddress', documents.proofOfAddress);

      const response = await fetch('http://localhost:5000/kyc/submit', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formPayload,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('KYC documents submitted successfully! We will review them shortly.');
        setKycStatus('pending');
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepFields = [
    { label: 'First Name', name: 'firstName', type: 'text' as const, placeholder: 'Enter your first name' },
    { label: 'Last Name', name: 'lastName', type: 'text' as const, placeholder: 'Enter your last name' },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' as const },
    { label: 'Nationality', name: 'nationality', type: 'text' as const, placeholder: 'e.g. American' },
  ];

  const addressFields = [
    { label: 'Street Address', name: 'address', type: 'text' as const, placeholder: 'Enter your street address' },
    { label: 'City', name: 'city', type: 'text' as const, placeholder: 'Enter your city' },
    { label: 'State/Province', name: 'state', type: 'text' as const, placeholder: 'Enter your state' },
    { label: 'Postal Code', name: 'postalCode', type: 'text' as const, placeholder: 'e.g. 10001' },
    { label: 'Country', name: 'country', type: 'text' as const, placeholder: 'e.g. United States' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' as const, placeholder: '+1 (555) 123-4567' },
  ];

  const renderDocumentUpload = (field: keyof typeof documents, label: string, desc: string) => {
    const file = documents[field];
    return (
      <div className="kyc-doc-upload" onClick={() => fileInputRef.current?.click()}>
        <div className="kyc-upload-icon">
          {file ? '✅' : '📄'}
        </div>
        <div className="kyc-upload-text">
          <strong>{label}</strong>
          <p>{desc}</p>
        </div>
        {file && (
          <span className="kyc-uploaded">{file.name}</span>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange(field)}
          accept="image/*,.pdf"
          style={{ display: 'none' }}
        />
      </div>
    );
  };

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
          <h2 style={{ marginBottom: '12px' }}>We're Reviewing Your Documents</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Our verification team is carefully reviewing your submitted documents. This usually takes 24-48 hours. You'll receive an email notification once the verification is complete.
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
          <h2 style={{ marginBottom: '12px' }}>Documents Were Not Approved</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Unfortunately, the documents you submitted could not be verified. Please review the requirements below and resubmit your application with clear, valid documents.
          </p>
          <div className="alert alert-warning" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <i className="fas fa-lightbulb"></i>
            <span>Make sure all documents are clearly visible, not expired, and match your registration details.</span>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => { setKycStatus(null); setCurrentStep(1); }}>
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

      {/* Progress Steps */}
      <div className="kyc-steps">
        {[
          { step: 1, label: 'Personal Info', icon: 'fa-user' },
          { step: 2, label: 'Address', icon: 'fa-home' },
          { step: 3, label: 'Documents', icon: 'fa-file' },
        ].map(s => (
          <div key={s.step} className={`kyc-step ${currentStep >= s.step ? 'active' : ''} ${currentStep > s.step ? 'completed' : ''}`}>
            <div className="kyc-step-circle">
              {currentStep > s.step ? '✓' : <i className={`fas ${s.icon}`}></i>}
            </div>
            <span className="kyc-step-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 700 }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {stepFields.map(field => (
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
            <button className="btn btn-primary btn-lg" onClick={() => setCurrentStep(2)}>
              Continue <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Address */}
      {currentStep === 2 && (
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 700 }}>Address Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {addressFields.map(field => (
              <div key={field.name} className="form-group" style={['address', 'country'].includes(field.name) ? { gridColumn: '1 / -1' } : {}}>
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
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-ghost" onClick={() => setCurrentStep(1)}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => setCurrentStep(3)}>
              Continue <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Document Upload */}
      {currentStep === 3 && (
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontWeight: 700 }}>Document Upload</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
            Please upload clear, legible copies of the following documents. Accepted formats: JPG, PNG, PDF.
          </p>
          
          <div className="kyc-doc-list">
            {renderDocumentUpload('idFront', 'Government ID (Front)', 'Passport, Driver\'s License, or National ID')}
            {renderDocumentUpload('idBack', 'Government ID (Back)', 'Back side of your ID document')}
            {renderDocumentUpload('selfie', 'Selfie with ID', 'Take a selfie holding your ID document')}
            {renderDocumentUpload('proofOfAddress', 'Proof of Address', 'Utility bill or bank statement (last 3 months)')}
          </div>

          <div className="kyc-requirements">
            <h4 style={{ marginBottom: '12px', fontWeight: 600 }}>Document Requirements:</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 2 }}>
              <li><i className="fas fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>Documents must be valid and not expired</li>
              <li><i className="fas fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>All text must be clearly visible and readable</li>
              <li><i className="fas fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>No glare, shadows, or obstructions on documents</li>
              <li><i className="fas fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>Name on documents must match your registration</li>
              <li><i className="fas fa-check" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>Max file size: 10MB per document</li>
            </ul>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-ghost" onClick={() => setCurrentStep(2)}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleSubmitKyc}
              disabled={isSubmitting || !documents.idFront || !documents.selfie}
            >
              {isSubmitting ? '⏳ Submitting...' : '✓ Submit Verification'}
            </button>
          </div>
        </div>
      )}

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