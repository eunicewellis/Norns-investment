import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, including: (a) Account Information: name, email address, phone number, date of birth, and nationality when you register; (b) Identity Verification: government-issued ID, passport, driver\'s license, proof of address documents for KYC compliance; (c) Financial Information: bank account details, cryptocurrency wallet addresses, and transaction history; (d) Communications: your messages when contacting our support team; (e) Technical Data: IP address, browser type, device information, and cookie data.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use your personal information for the following purposes: (a) To provide, maintain, and improve our investment platform and services; (b) To process transactions, including deposits, withdrawals, and investment returns; (c) To verify your identity and comply with KYC/AML regulatory requirements; (d) To communicate with you about your account, transactions, and platform updates; (e) To detect and prevent fraud, abuse, and security incidents; (f) To comply with applicable laws and regulations.'
    },
    {
      title: '3. Data Sharing and Disclosure',
      content: 'We may share your information with: (a) Third-party service providers who assist in platform operations, payment processing, identity verification, and customer support; (b) Regulatory authorities and law enforcement agencies as required by applicable law; (c) Professional advisors including auditors, lawyers, and accountants. We do not sell your personal information to third parties for marketing purposes. All third-party service providers are contractually bound to protect your data.'
    },
    {
      title: '4. Data Security',
      content: 'We implement comprehensive security measures to protect your personal information, including: (a) 256-bit SSL/TLS encryption for all data in transit; (b) AES-256 encryption for data at rest; (c) Multi-factor authentication for account access; (d) Regular security audits and penetration testing; (e) Strict access controls and employee training; (f) Cold storage for cryptocurrency assets. While we strive to protect your data, no method of transmission or storage is 100% secure.'
    },
    {
      title: '5. International Transfers',
      content: 'Your personal information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place through standard contractual clauses and data protection agreements to protect your information regardless of where it is processed.'
    },
    {
      title: '6. Data Retention',
      content: 'We retain your personal information for as long as your account is active and for a period of at least 5 years after account closure to comply with regulatory requirements. Certain data may be retained longer where required by law. You can request deletion of your data after the mandatory retention period, subject to legal obligations.'
    },
    {
      title: '7. Your Rights',
      content: 'Under applicable data protection laws, you have the right to: (a) Access your personal data held by us; (b) Rectify inaccurate or incomplete data; (c) Request erasure of your data (subject to legal requirements); (d) Restrict or object to processing of your data; (e) Data portability to another service provider; (f) Withdraw consent at any time where processing is based on consent. To exercise these rights, contact our Data Protection Officer at dpo@norninvestments.com.'
    },
    {
      title: '8. Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and improve our services. Types of cookies we use include: (a) Essential cookies required for platform functionality; (b) Analytics cookies to understand how users interact with our platform; (c) Preference cookies to remember your settings. You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.'
    },
    {
      title: '9. Children\'s Privacy',
      content: 'Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will take steps to delete such information and terminate the associated account. If you believe a minor has provided us with their data, please contact us immediately.'
    },
    {
      title: '10. Third-Party Links',
      content: 'Our platform may contain links to third-party websites or services that are not owned or controlled by Norn Investments. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you interact with through our platform.'
    },
    {
      title: '11. California Privacy Rights',
      content: 'If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including: (a) The right to know what personal information we collect, use, and share; (b) The right to request deletion of your personal information; (c) The right to opt out of the sale of your personal information; (d) The right to non-discrimination for exercising your CCPA rights. To exercise these rights, please contact dpo@norninvestments.com.'
    },
    {
      title: '12. GDPR Compliance',
      content: 'For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). Our lawful bases for processing include: (a) Performance of a contract with you; (b) Compliance with legal obligations; (c) Legitimate interests; (d) Your consent where required. You have the right to lodge a complaint with your local data protection authority.'
    },
    {
      title: '13. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. Material changes will be communicated via email and platform notification. The "Last Updated" date at the top of this policy will indicate when changes were made. We encourage you to review this policy periodically.'
    },
    {
      title: '14. Contact Information',
      content: 'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us: Data Protection Officer: dpo@norninvestments.com; Support: /support; Address: Norn Investments Ltd, Suite 305, Global Gateway, Victoria, Mahé, Seychelles. We will respond to your inquiry within 30 days.'
    },
  ];

  return (
    <div className="page page-sm">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-shield-halved"></i> Privacy</div>
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-subtitle">Last Updated: May 1, 2026. Learn how we collect, use, and protect your personal information.</p>
      </div>

      <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div className="alert alert-info" style={{ marginBottom: '24px', background: 'var(--accent-secondary-light)', border: '1px solid var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
          <i className="fas fa-info-circle"></i>
          <span>Your privacy is important to us. This Privacy Policy explains how Norn Investments collects, uses, discloses, and safeguards your personal information when you use our platform.</span>
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
          <Link to="/terms" className="btn btn-outline"><i className="fas fa-file-contract"></i> Terms of Service</Link>
          <Link to="/faq" className="btn btn-outline"><i className="fas fa-question-circle"></i> FAQ</Link>
          <Link to="/support" className="btn btn-primary"><i className="fas fa-headset"></i> Contact Support</Link>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '24px', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}>
        <i className="fas fa-lock" style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '12px' }}></i>
        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Our Commitment</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
          Norn Investments is committed to protecting your privacy and maintaining your trust. We continuously review and enhance our security practices to safeguard your personal information.
        </p>
      </div>
    </div>
  );
};

export default Privacy;