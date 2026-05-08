const express = require('express');
const Investment = require('../models/Investment');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all investment plans - Crypto Mining & Trading Focused
router.get('/plans', (req, res) => {
  const plans = [
    {
      id: 'starter',
      type: 'Starter',
      icon: '🌱',
      color: '#10b981',
      roi: 30,
      lockupPeriod: 7,
      minAmount: 100,
      maxAmount: 499,
      description: 'Perfect for beginners to start crypto investing with low entry',
      features: [
        'Bitcoin mining pool access',
        'Daily profit distribution',
        'Basic trading signals',
        'Email support',
        'Withdraw anytime after lockup'
      ],
      badge: null
    },
    {
      id: 'premium',
      type: 'Premium',
      icon: '⭐',
      color: '#165DFF',
      roi: 80,
      lockupPeriod: 14,
      minAmount: 500,
      maxAmount: 1999,
      description: 'Boost your earnings with premium crypto trading strategies',
      features: [
        'VIP mining pool access',
        'Automated trading bot',
        'Daily profit + bonus',
        'Priority email & chat support',
        'Early withdrawal available (5% fee)',
        'Weekly market analysis reports'
      ],
      badge: 'Most Popular'
    },
    {
      id: 'vip',
      type: 'VIP',
      icon: '👑',
      color: '#FFB800',
      roi: 180,
      lockupPeriod: 30,
      minAmount: 2000,
      maxAmount: 9999,
      description: 'Exclusive VIP program for serious crypto investors',
      features: [
        'Exclusive mining farm access',
        'AI-powered trading bot',
        'Profit reinvestment option',
        '24/7 personal account manager',
        'Zero withdrawal fees',
        'VIP trading signals group',
        'Monthly crypto airdrops'
      ],
      badge: 'Best Value'
    },
    {
      id: 'bitcoin',
      type: 'Bitcoin Max',
      icon: '₿',
      color: '#f7931a',
      roi: 300,
      lockupPeriod: 60,
      minAmount: 10000,
      maxAmount: 50000,
      description: 'Maximum returns through Bitcoin mining & trading operations',
      features: [
        'Dedicated Bitcoin mining rig',
        'High-frequency trading bot',
        'Daily profit compounding',
        'Personal crypto consultant',
        'Instant withdrawals',
        'Early access to new ICOs',
        'Exclusive investor webinars',
        'Lifetime elite membership'
      ],
      badge: 'High Returns'
    },
    {
      id: 'crypto-whale',
      type: 'Crypto Whale',
      icon: '🐋',
      color: '#8b5cf6',
      roi: 500,
      lockupPeriod: 90,
      minAmount: 50000,
      maxAmount: 500000,
      description: 'The ultimate crypto investment package for whales',
      features: [
        'Own mining farm share',
        'Quantitative trading algorithms',
        'Daily 2% profit guarantee',
        'Dedicated financial advisor',
        'Instant priority withdrawals',
        'Private jet meetups invitation',
        'Governance voting rights',
        'Revenue sharing program',
        'Custom investment strategies'
      ],
      badge: 'Ultimate'
    }
  ];

  res.json(plans);
});

// Create new investment
router.post('/create', auth, async (req, res) => {
  try {
    const { planType, amount, paymentMethod } = req.body;
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find plan details
    const plans = [
      { type: 'Starter', roi: 30, lockupPeriod: 7, minAmount: 100 },
      { type: 'Premium', roi: 80, lockupPeriod: 14, minAmount: 500 },
      { type: 'VIP', roi: 180, lockupPeriod: 30, minAmount: 2000 },
      { type: 'Bitcoin Max', roi: 300, lockupPeriod: 60, minAmount: 10000 },
      { type: 'Crypto Whale', roi: 500, lockupPeriod: 90, minAmount: 50000 }
    ];

    const plan = plans.find(p => p.type === planType);

    if (!plan) {
      return res.status(400).json({ message: 'Invalid investment plan' });
    }

    if (amount < plan.minAmount) {
      return res.status(400).json({ message: `Minimum amount for ${planType} is $${plan.minAmount}` });
    }

    // Check user balance
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance. Please make a deposit first.' });
    }

    // Calculate maturity date
    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + plan.lockupPeriod);

    // Create investment
    const investment = new Investment({
      userId: user._id,
      planType,
      amount,
      roiPercentage: plan.roi,
      lockupPeriod: plan.lockupPeriod,
      maturityDate,
      method: paymentMethod || 'BTC',
      type: 'investment'
    });

    await investment.save();

    // Update user balance and investments
    user.balance -= amount;
    user.activeInvestments.push(investment._id);
    await user.save();

    res.json({
      message: 'Investment created successfully! Your crypto mining has started.',
      investment: {
        id: investment._id,
        planType: investment.planType,
        amount: investment.amount,
        roiPercentage: investment.roiPercentage,
        expectedReturn: amount + (amount * plan.roi / 100),
        dailyProfit: ((amount * plan.roi / 100) / plan.lockupPeriod).toFixed(2),
        lockupPeriod: investment.lockupPeriod,
        maturityDate: investment.maturityDate,
        status: investment.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user investments
router.get('/user', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId)
      .populate('activeInvestments', 'planType amount roiPercentage maturityDate totalReturn type method')
      .populate('completedInvestments', 'planType amount roiPercentage maturityDate totalReturn type method');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      activeInvestments: user.activeInvestments,
      completedInvestments: user.completedInvestments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;