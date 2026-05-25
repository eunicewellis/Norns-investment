import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    { q: 'How do I start investing?', a: 'Creating an account is free and takes less than 2 minutes. Simply register, complete KYC verification, make a deposit, and choose your investment plan to start earning daily profits.' },
    { q: 'What is the minimum investment amount?', a: 'Our Starter Plan begins at just $300, making it accessible for everyone. Premium and VIP plans have higher minimums but offer better returns.' },
    { q: 'How are profits calculated and paid?', a: 'Profits are calculated based on your investment plan percentage and paid daily directly to your account balance. You can withdraw your earnings at any time.' },
    { q: 'Is my investment secure?', a: 'Yes, we employ bank-grade 256-bit SSL encryption, cold wallet storage for funds, multi-factor authentication, and regular security audits to protect your assets.' },
    { q: 'How long does a withdrawal take?', a: 'Most withdrawals are processed instantly for small amounts. Larger withdrawals may take 24-48 hours for security verification. Cryptocurrency withdrawals are typically processed within 1 hour.' },
    { q: 'Can I reinvest my profits?', a: 'Yes, you can reinvest your profits at any time to compound your earnings. Our platform makes it easy to roll over profits into new or existing investment plans.' },
    { q: 'What happens after my investment matures?', a: 'Once your investment reaches maturity, the principal plus profits are credited to your available balance. You can withdraw, reinvest, or start a new plan.' },
    { q: 'Is there a referral program?', a: 'Yes! You earn 10% commission on every deposit made by users you refer. Unlimited earning potential with no caps on referral commissions.' },
  ];

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-question-circle"></i> FAQ</div>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle">Find answers to common questions about our platform, investments, and services.</p>
      </div>

      <div style={{maxWidth:'768px', margin:'0 auto'}}>
        {faqs.map((faq, i) => (
          <div className="faq-item" key={i}>
            <div className={`faq-question ${openItem === i ? 'open' : ''}`} onClick={() => setOpenItem(openItem === i ? null : i)}>
              <span>{faq.q}</span>
              <i className={`fas fa-chevron-down ${openItem === i ? 'open' : ''}`}></i>
            </div>
            {openItem === i && (
              <div className="faq-answer">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', marginTop:'48px'}}>
        <p style={{color:'var(--text-secondary)', marginBottom:'16px'}}>Still have questions?</p>
        <a href="/support" className="btn btn-primary"><i className="fas fa-headset"></i> Contact Support</a>
      </div>
    </div>
  );
};

export default FAQ;
