const express = require('express');
const User = require('../models/User');
const Investment = require('../models/Investment');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const router = express.Router();

// Get withdrawal methods
router.get('/methods', (req, res) => {
  const methods = [
    {
      type: 'Bank Transfer',
      description: 'Direct bank transfer to your account',
      instructions: 'Enter your bank details for withdrawal processing.',
      minAmount: 100,
      maxAmount: 10000,
      processingTime: '3-5 business days'
    },
    {
      type: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, and other crypto withdrawals',
      instructions: 'Enter your crypto wallet address for withdrawal.',
      minAmount: 50,
      maxAmount: 5000,
      processingTime: '1-2 business days'
    },
    {
      type: 'E-Wallet',
      description: 'Popular e-wallet services',
      instructions: 'Withdraw to your e-wallet account.',
      minAmount: 20,
      maxAmount: 2000,
      processingTime: '24 hours'
    }
  ];

  res.json(methods);
});

// Create withdrawal request
router.post('/create', auth, async (req, res) => {
  try {
    const { method, amount, walletAddress } = req.body;
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Check minimum and maximum limits
    const methods = await router.get('/methods');
    const selectedMethod = methods.find(m => m.type === method);

    if (!selectedMethod) {
      return res.status(400).json({ message: 'Invalid withdrawal method' });
    }

    if (amount < selectedMethod.minAmount) {
      return res.status(400).json({ message: `Minimum amount for ${method} is $${selectedMethod.minAmount}` });
    }

    if (amount > selectedMethod.maxAmount) {
      return res.status(400).json({ message: `Maximum amount for ${method} is $${selectedMethod.maxAmount}` });
    }

    // Check user balance
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create withdrawal request
    const withdrawal = {
      id: uuidv4(),
      method,
      amount,
      walletAddress,
      status: 'pending',
      createdAt: new Date()
    };

    // For demo purposes, auto-approve withdrawal
    user.balance -= amount;
    await user.save();

    res.json({
      message: 'Withdrawal request created successfully',
      withdrawal,
      newBalance: user.balance,
      processingTime: selectedMethod.processingTime
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user withdrawals
router.get('/user', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // For demo purposes, return fake withdrawal history
    const withdrawals = [
      {
        id: uuidv4(),
        method: 'Bank Transfer',
        amount: 1000,
        status: 'completed',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
      },
      {
        id: uuidv4(),
        method: 'Cryptocurrency',
        amount: 0.05,
        status: 'completed',
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000)
      }
    ];

    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;