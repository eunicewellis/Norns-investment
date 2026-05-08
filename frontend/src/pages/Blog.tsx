import React from 'react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const articles = [
    { id: 1, title: 'Bitcoin Reaches New All-Time High: What This Means for Investors', category: 'Market Analysis', date: 'May 5, 2026', readTime: '5 min read', image: '📈', author: 'Crypto Analyst', excerpt: 'Bitcoin surged past $100,000 marking a historic milestone. Our experts break down the factors driving this unprecedented growth.' },
    { id: 2, title: 'Top 5 Altcoins to Watch This Month', category: 'Crypto Insights', date: 'May 4, 2026', readTime: '4 min read', image: '💎', author: 'Investment Team', excerpt: 'Discover the hidden gems in the crypto market that could deliver massive returns in the coming weeks.' },
    { id: 3, title: 'How AI Trading Bots Are Revolutionizing Crypto Investments', category: 'Technology', date: 'May 3, 2026', readTime: '6 min read', image: '🤖', author: 'Tech Editor', excerpt: 'Artificial intelligence is transforming the way we trade cryptocurrencies. Learn how our AI-powered bots maximize your profits.' },
    { id: 4, title: 'Success Story: From $500 to $50,000 in 6 Months', category: 'Success Stories', date: 'May 2, 2026', readTime: '3 min read', image: '🏆', author: 'Community', excerpt: 'Read how one of our investors turned a modest investment into life-changing wealth using our VIP plan.' },
    { id: 5, title: 'Crypto Mining: The Complete Beginner\'s Guide 2026', category: 'Education', date: 'May 1, 2026', readTime: '8 min read', image: '⛏️', author: 'Mining Expert', excerpt: 'Everything you need to know about cryptocurrency mining - from hardware to profitability.' },
    { id: 6, title: 'Weekly Market Update: Green Candles Across the Board', category: 'Market Analysis', date: 'Apr 30, 2026', readTime: '4 min read', image: '📊', author: 'Market Analyst', excerpt: 'Another bullish week for cryptocurrencies as institutional adoption continues to accelerate globally.' },
  ];

  return (
    <div className="page-container">
      <div className="blog-header-section">
        <div className="blog-chip">📰 Latest News</div>
        <h1 className="page-title">Crypto Insights & News</h1>
        <p className="page-subtitle">Stay informed with the latest market analysis, success stories, and expert insights</p>
      </div>

      <div className="featured-article">
        <div className="featured-image">
          <span className="featured-icon">🚀</span>
        </div>
        <div className="featured-content">
          <span className="featured-category">Breaking News</span>
          <h2>Norn Investments Surpasses $1 Billion in Total Crypto Mining Output</h2>
          <p>Our state-of-the-art mining facilities across three continents have achieved a major milestone, producing over 10,000 BTC since inception. This achievement solidifies our position as a leading crypto investment platform.</p>
          <div className="featured-meta">
            <span>📅 May 5, 2026</span>
            <span>👤 CEO, Norn Investments</span>
            <span>⏱ 7 min read</span>
          </div>
        </div>
      </div>

      <div className="blog-categories">
        {['All', 'Market Analysis', 'Success Stories', 'Technology', 'Education', 'Crypto Insights'].map((cat, i) => (
          <button key={i} className={`blog-cat-btn ${i === 0 ? 'active' : ''}`}>{cat}</button>
        ))}
      </div>

      <div className="blog-grid">
        {articles.map(article => (
          <div className="blog-card" key={article.id}>
            <div className="blog-card-image">
              <span>{article.image}</span>
            </div>
            <div className="blog-card-content">
              <span className="blog-category">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-author">👤 {article.author}</span>
                <span className="blog-date">📅 {article.date}</span>
                <span className="blog-read-time">⏱ {article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;