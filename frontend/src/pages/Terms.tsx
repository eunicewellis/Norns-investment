import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using the Norn Investments platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services. These terms constitute a legally binding agreement between you ("User") and Norn Investments ("Company", "we", "us", "our").'
    },
    {
      title: '2. Eligibility',
      content: 'To use our platform, you must: (a) be at least 18 years of age or the age of majority in your jurisdiction; (b) have the legal capacity to enter into a binding contract; (c) not be a resident of any jurisdiction where cryptocurrency investments are prohibited; (d) provide accurate and complete registration information; and (e) maintain the confidentiality of your account credentials.'
    },
    {
      title: '3. Account Registration',
      content: 'You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate our terms or are used for fraudulent activities. Each user may only maintain one account.'
    },
    {
      title: '4. Investments and Returns',
      content: 'All investments made through our platform are subject to the specific terms of the chosen investment plan. Past performance does not guarantee future returns. Investment plans have defined lock-up periods during which principal amounts may not be withdrawn. Profit projections provided are estimates and not guarantees. We reserve the right to modify plan terms with reasonable notice to users.'
    },
    {
      title: '5. Deposits and Withdrawals',
      content: 'Deposits are processed according to the selected payment method and may be subject to processing fees as disclosed at the time of deposit. Withdrawal requests are subject to verification procedures and may be delayed for security purposes. Minimum withdrawal amounts apply as specified on our platform. We reserve the right to refuse withdrawals that violate anti-money laundering (AML) policies.'
    },
    {
      title: '6. Fees and Charges',
      content: 'The Company charges fees for certain services including but not limited to: withdrawal processing fees, early termination fees for investments, and currency conversion fees. All applicable fees will be disclosed prior to transaction confirmation. We reserve the right to modify our fee schedule with 30 days advance notice to users.'
    },
    {
      title: '7. KYC and Compliance',
      content: 'All users must complete Know Your Customer (KYC) verification to access full platform features. We reserve the right to request additional documentation for compliance with anti-money laundering (AML) and counter-terrorism financing (CTF) regulations. Failure to complete KYC verification within 60 days may result in account restrictions.'
    },
    {
      title: '8. Prohibited Activities',
      content: 'Users are prohibited from: (a) using the platform for money laundering, terrorist financing, or any illegal activity; (b) attempting to manipulate our systems or pricing; (c) creating multiple accounts; (d) using automated scripts or bots; (e) engaging in any activity that could damage our reputation or systems; (f) violating any applicable laws or regulations.'
    },
    {
      title: '9. Intellectual Property',
      content: 'All content, trademarks, logos, and intellectual property displayed on our platform are owned by Norn Investments or our licensors. You may not reproduce, distribute, modify, or create derivative works without our express written consent. The Norn Investments name and logo are registered trademarks.'
    },
    {
      title: '10. Limitation of Liability',
      content: 'To the maximum extent permitted by law, Norn Investments shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities. Our total liability shall not exceed the total amount invested by you on our platform.'
    },
    {
      title: '11. Risk Disclosure',
      content: 'Cryptocurrency investments carry inherent risks including market volatility, regulatory changes, and technological risks. You acknowledge that: (a) the value of cryptocurrencies can fluctuate significantly; (b) past performance is not indicative of future results; (c) you may lose some or all of your invested capital; (d) we do not provide investment advice; and (e) you should consult with a financial advisor before investing.'
    },
    {
      title: '12. Privacy and Data Protection',
      content: 'We collect, store, and process your personal information in accordance with our Privacy Policy. By using our platform, you consent to our data practices as described in the Privacy Policy. We implement industry-standard security measures to protect your data but cannot guarantee absolute security.'
    },
    {
      title: '13. Termination',
      content: 'Either party may terminate this agreement at any time. Upon termination, your account will be suspended and any remaining balance will be returned subject to applicable fees and pending obligations. We may terminate accounts immediately for breach of these terms or illegal activities.'
    },
    {
      title: '14. Amendments',
      content: 'We reserve the right to modify these terms at any time. Material changes will be communicated to users via email or platform notification. Continued use of the platform after changes constitutes acceptance of the modified terms. It is your responsibility to review these terms periodically.'
    },
    {
      title: '15. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the Republic of Seychelles. Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the International Chamber of Commerce (ICC).'
    },
    {
      title: '16. Contact Information',
      content: 'For questions regarding these Terms and Conditions, please contact our legal department at legal@norninvestments.com or via our Support Center at /support. Our registered office is located at: Norn Investments Ltd, Suite 305, Global Gateway, Victoria, Mahé, Seychelles.'
    },
  ];

  return (
    <div className="page page-sm">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-file-contract"></i> Legal</div>
        <h1 className="section-title">Terms & Conditions</h1>
        <p className="section-subtitle">Last Updated: May 1, 2026. Please read these terms carefully before using our platform.</p>
      </div>

      <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div className="alert alert-warning" style={{ marginBottom: '24px' }}>
          <i className="fas fa-exclamation-triangle"></i>
          <span>These Terms and Conditions constitute a legally binding agreement. By using Norn Investments, you acknowledge that you have read, understood, and agree to be bound by these terms.</span>
        </div>

        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--accent-primary)' }}>{section.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }}>{section.content}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/privacy" className="btn btn-outline"><i className="fas fa-shield-halved"></i> Privacy Policy</Link>
          <Link to="/faq" className="btn btn-outline"><i className="fas fa-question-circle"></i> FAQ</Link>
          <Link to="/support" className="btn btn-primary"><i className="fas fa-headset"></i> Contact Support</Link>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
        <i className="fas fa-print"></i> You can print or save a copy of these terms for your records.
      </p>
    </div>
  );
};

export default Terms;