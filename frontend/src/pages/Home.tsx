import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ usersOnline: 0, totalInvested: 0, dailyProfit: 0, totalMembers: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        usersOnline: Math.floor(Math.random() * 5000) + 10000,
        totalInvested: Math.floor(Math.random() * 50000000) + 500000000,
        dailyProfit: Math.floor(Math.random() * 100000) + 500000,
        totalMembers: Math.floor(Math.random() * 10000) + 1248392
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const testimonials = [
    { name: "Sarah Johnson", location: "United States", amount: "$12,500", text: "I started with the Premium plan and my Bitcoin mining profits have been incredible! The daily payouts are consistent.", avatar: "👩" },
    { name: "Ahmed Hassan", location: "Nigeria", amount: "$8,200", text: "The VIP plan is absolutely amazing! I'm making over $200 daily from my crypto mining investment.", avatar: "👨" },
    { name: "Maria Rodriguez", location: "Brazil", amount: "$5,700", text: "I was skeptical about crypto investing but Norn made it so easy. Started with $500 now I withdrawal weekly.", avatar: "👩" }
  ];

  const plans = [
    { name: 'Starter Plan', roi: '30%', min: '$100', period: '7 Days', features: ['Bitcoin Mining Access', 'Daily Profit', 'Basic Trading Signals'], pop: false },
    { name: 'Premium Plan', roi: '80%', min: '$500', period: '14 Days', features: ['VIP Mining Pool', 'Trading Bot', 'Priority Support'], pop: true },
    { name: 'VIP Plan', roi: '180%', min: '$2,000', period: '30 Days', features: ['AI Trading Bot', 'Personal Manager', 'Zero Fees'], pop: false }
  ];

  const features = [
    { icon: 'fa-microchip', title: 'Instant Mining Payouts', desc: 'Daily profit distributions directly to your wallet. No waiting periods, no hidden fees.' },
    { icon: 'fa-robot', title: 'AI Trading Bots', desc: 'Our advanced algorithms execute profitable trades 24/7 across multiple cryptocurrency markets.' },
    { icon: 'fa-shield-halved', title: 'Bank-Grade Security', desc: '256-bit encryption, cold wallet storage, and multi-factor authentication protect your assets.' },
    { icon: 'fa-headset', title: '24/7 Expert Support', desc: 'Dedicated account managers and support team available around the clock via live chat.' },
    { icon: 'fa-chart-simple', title: 'Real-Time Analytics', desc: 'Comprehensive dashboard with live profit tracking, portfolio insights, and market data.' },
    { icon: 'fa-bolt', title: 'Lightning Withdrawals', desc: 'Instant withdrawal processing with no minimum limits. Access your earnings anytime.' }
  ];

  const [visibleFeed, setVisibleFeed] = useState([
    { name: 'John D.', country: '🇺🇸', action: 'invested', amount: '$2,500', time: '2 min ago' },
    { name: 'Amara O.', country: '🇳🇬', action: 'withdrew', amount: '$780', time: '5 min ago' },
    { name: 'Luis M.', country: '🇧🇷', action: 'deposited', amount: '$5,000', time: '8 min ago' }
  ]);

  useEffect(() => {
    const fi = setInterval(() => {
      const v = (Math.floor(Math.random()*9000)+1000).toLocaleString();
      setVisibleFeed(prev => [{
        name: ['Alex M.', 'Jane D.', 'Mike R.'][Math.floor(Math.random()*3)],
        country: ['🇺🇸', '🇳🇬', '🇧🇷'][Math.floor(Math.random()*3)],
        action: ['invested', 'withdrew', 'deposited'][Math.floor(Math.random()*3)],
        amount: '$' + v,
        time: 'Just now'
      }, ...prev].slice(0, 3));
    }, 8000);
    return () => clearInterval(fi);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-users"></i>
            Trusted by 1.2M+ Investors Worldwide
          </div>
          <h1>Invest in <span>Cryptocurrency Mining</span><br />& Earn Daily Profits</h1>
          <p>Join the future of wealth creation. Norn Investments provides AI-powered crypto mining and trading solutions that generate consistent daily returns.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket"></i> Start Earning Now
            </Link>
            <Link to="/plans" className="btn btn-outline btn-lg">
              <i className="fas fa-chart-bar"></i> View Mining Plans
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">2,450+</span>
              <span className="hero-stat-label">Bitcoins Mined</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">$12M+</span>
              <span className="hero-stat-label">Profits Paid</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">150+</span>
              <span className="hero-stat-label">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE FEED ===== */}
      <section className="live-feed">
        <div className="live-card">
          <div className="live-header">
            <span className="live-dot"></span>
            Live Activity
          </div>
          {visibleFeed.map((item, idx) => (
            <div className="live-item" key={idx}>
              <span>{item.country}</span>
              <span className="live-name">{item.name}</span>
              <span className="live-action">{item.action}</span>
              <span className="live-amount">{item.amount}</span>
              <span className="live-time">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="section" style={{paddingTop:0}}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><i className="fas fa-users"></i></div>
            <div className="stat-content">
              <div className="stat-value">{stats.usersOnline.toLocaleString()}</div>
              <div className="stat-label">Investors Online</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><i className="fas fa-sack-dollar"></i></div>
            <div className="stat-content">
              <div className="stat-value">${stats.totalInvested.toLocaleString()}</div>
              <div className="stat-label">Total Invested</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber"><i className="fas fa-coins"></i></div>
            <div className="stat-content">
              <div className="stat-value">${stats.dailyProfit.toLocaleString()}</div>
              <div className="stat-label">Daily Mining Profits</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><i className="fas fa-globe"></i></div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalMembers.toLocaleString()}</div>
              <div className="stat-label">Total Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-label"><i className="fas fa-star"></i> Why Choose Us</div>
          <h2 className="section-title">The Most Advanced Mining Platform</h2>
          <p className="section-subtitle">We combine cutting-edge technology with financial expertise to deliver unmatched returns on your crypto investments.</p>
        </div>
        <div className="grid-auto">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PLANS ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-label"><i className="fas fa-layer-group"></i> Investment Plans</div>
          <h2 className="section-title">Choose Your Mining Plan</h2>
          <p className="section-subtitle">Select from our range of investment plans designed to maximize your cryptocurrency mining returns.</p>
        </div>
        <div className="grid-3">
          {plans.map((plan, idx) => (
            <div className={'plan-card' + (plan.pop ? ' featured' : '')} key={idx}>
              {plan.pop ? <div className="plan-badge">Most Popular</div> : null}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-roi">{plan.roi}</div>
              <div className="plan-meta">ROI in {plan.period} | Minimum: {plan.min}</div>
              <div className="plan-features">
                {plan.features.map((f, i) => (
                  <div className="plan-feature" key={i}>
                    <i className="fas fa-check-circle"></i>
                    {f}
                  </div>
                ))}
              </div>
              <Link to="/register" className="btn btn-primary btn-full plan-cta">
                <i className="fas fa-rocket"></i> Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-label"><i className="fas fa-comments"></i> Testimonials</div>
          <h2 className="section-title">Real Investors, Real Results</h2>
          <p className="section-subtitle">Hear from our global community of successful crypto investors who trust Norn Investments.</p>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{testimonials[currentTestimonial].avatar}</div>
            <div style={{textAlign:'left'}}>
              <div className="testimonial-name">{testimonials[currentTestimonial].name}</div>
              <div className="testimonial-meta">
                {testimonials[currentTestimonial].location}
                <span className="testimonial-verified">Verified Investor</span>
                &mdash; Profit: {testimonials[currentTestimonial].amount}
              </div>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <div key={idx} className={`testimonial-dot ${idx === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(idx)}></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <div className="section" style={{paddingBottom:0}}>
        <section className="cta-section">
          <h2>Start Earning Bitcoin Today</h2>
          <p>Join over 1.2 million investors already earning daily profits through our crypto mining platform. No experience required.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            <i className="fas fa-rocket"></i> Create Your Account
          </Link>
        </section>
      </div>

      {/* ===== TRUST BAR ===== */}
      <div className="trust-bar">
        <span className="trust-badge"><i className="fas fa-lock"></i> 256-bit Encryption</span>
        <span className="trust-badge"><i className="fas fa-globe"></i> Global Operations</span>
        <span className="trust-badge"><i className="fas fa-bolt"></i> Instant Withdrawals</span>
        <span className="trust-badge"><i className="fas fa-star"></i> 4.9/5 Rating</span>
        <span className="trust-badge"><i className="fas fa-building-columns"></i> Licensed & Regulated</span>
      </div>
    </div>
  );
};

export default Home;