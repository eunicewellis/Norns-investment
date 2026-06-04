const express = require('express');
const User = require('../models/User');
const Investment = require('../models/Investment');
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
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Check minimum amount ($20)
    if (amount < 20) {
      return res.status(400).json({ message: 'Minimum withdrawal amount is $20' });
    }

    // Check user balance
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create withdrawal record in DB
    const withdrawal = new Investment({
      userId: user._id,
      type: 'withdrawal',
      method,
      amount,
      walletAddress: walletAddress || '',
      status: 'pending',
      planType: 'Deposit'
    });

    await withdrawal.save();

    // Deduct user balance
    user.balance -= amount;
    user.totalWithdrawn = (user.totalWithdrawn || 0) + amount;
    await user.save();

    res.json({
      message: 'Withdrawal request created successfully',
      withdrawal: {
        id: withdrawal._id,
        method: withdrawal.method,
        amount: withdrawal.amount,
        walletAddress: withdrawal.walletAddress,
        status: withdrawal.status,
        createdAt: withdrawal.createdAt
      },
      newBalance: user.balance,
      processingTime: '24-72 hours'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user withdrawals
router.get('/user', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const withdrawals = await Investment.find({
      userId: decoded.userId,
      type: 'withdrawal'
    }).sort({ createdAt: -1 });

    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;