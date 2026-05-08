const express = require('express');
const User = require('../models/User');
const Investment = require('../models/Investment');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const router = express.Router();

// Get deposit methods - Crypto focused
router.get('/methods', (req, res) => {
  const methods = [
    {
      id: 'credit-card',
      type: 'Credit/Debit Card',
      icon: '💳',
      description: 'Instant deposit using your Visa, Mastercard, or American Express card',
      instructions: 'Enter your card details to make an instant deposit. Funds are credited immediately.',
      minAmount: 50,
      maxAmount: 25000,
      processingTime: 'Instant',
      fee: '2.5%'
    },
    {
      id: 'bitcoin',
      type: 'Bitcoin (BTC)',
      icon: '₿',
      description: 'Deposit with Bitcoin - the world\'s leading cryptocurrency',
      instructions: 'Send Bitcoin to our secure wallet address. Your deposit will be credited after 1 network confirmation.',
      minAmount: 20,
      maxAmount: 100000,
      processingTime: '10-30 minutes (1 confirmation)',
      fee: '0%',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    {
      id: 'ethereum',
      type: 'Ethereum (ETH)',
      icon: '♦️',
      description: 'Deposit with Ethereum for fast and secure transactions',
      instructions: 'Send Ethereum to our wallet address. Credits after 12 network confirmations.',
      minAmount: 20,
      maxAmount: 100000,
      processingTime: '5-15 minutes (12 confirmations)',
      fee: '0%',
      walletAddress: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    {
      id: 'usdt',
      type: 'USDT (TRC20)',
      icon: '💵',
      description: 'Stablecoin deposit - no volatility risk',
      instructions: 'Send USDT on TRC20 network to our wallet address. Fast and low fee.',
      minAmount: 20,
      maxAmount: 100000,
      processingTime: '5-10 minutes',
      fee: '0%',
      walletAddress: 'TXn9Md4kqjX5i1YZ9GqKGsQ1yfKcKQ7bQr'
    },
    {
      id: 'gift-card',
      type: 'Gift Card',
      icon: '🎁',
      description: 'Use your gift cards to invest - Amazon, iTunes, Steam, Google Play & more',
      instructions: 'Enter your gift card code and PIN. We accept multiple gift card brands at competitive exchange rates.',
      minAmount: 10,
      maxAmount: 5000,
      processingTime: 'Instant',
      fee: '5%',
      brands: ['Amazon', 'iTunes', 'Steam', 'Google Play', 'eBay', 'Walmart', 'Target', 'Best Buy']
    }
  ];

  res.json(methods);
});

// Create deposit
router.post('/create', auth, async (req, res) => {
  try {
    const { method, amount, reference, walletAddress } = req.body;
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create investment record for deposit
    const deposit = new Investment({
      userId: user._id,
      type: 'deposit',
      method,
      amount,
      reference,
      walletAddress,
      status: 'pending',
      planType: 'Deposit'
    });

    await deposit.save();

    res.json({
      message: 'Deposit request submitted successfully! Awaiting confirmation.',
      deposit,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user deposits
router.get('/user', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const deposits = await Investment.find({ 
      userId: decoded.userId,
      type: 'deposit'
    }).sort({ createdAt: -1 });

    res.json(deposits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;