const express = require('express');
const User = require('../models/User');
const Investment = require('../models/Investment');
const KycDocument = require('../models/KycDocument');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and is admin
    if (email) {
      const user = await User.findOne({ email, isAdmin: true });
      if (user) {
        const token = jwt.sign(
          { userId: user._id, admin: true },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE }
        );
        return res.json({ message: 'Admin login successful', token, user: { id: user._id, email: user.email } });
      }
    }

    // Fallback to password-only auth for backward compatibility
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }
    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check admin auth
router.get('/check', auth, async (req, res) => {
  try {
    if (!req.user.admin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ message: 'Authorized', admin: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find()
      .populate('activeInvestments', 'planType amount roiPercentage maturityDate')
      .populate('completedInvestments', 'planType amount roiPercentage maturityDate')
      .populate('kycDocuments', 'documentType status rejectionReason');
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle user status
router.put('/users/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User status updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all transactions
router.get('/transactions', auth, async (req, res) => {
  try {
    const investments = await Investment.find()
      .populate('userId', 'firstName lastName email balance')
      .sort({ createdAt: -1 });
    
    const transactions = investments.map(inv => ({
      _id: inv._id,
      userId: inv.userId,
      type: inv.type || 'investment',
      amount: inv.amount,
      method: inv.method || 'BTC',
      planType: inv.planType,
      status: inv.status,
      walletAddress: inv.walletAddress,
      createdAt: inv.createdAt
    }));
    
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update transaction status (for deposits/withdrawals)
router.put('/deposit/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Transaction not found' });

    investment.status = status;
    await investment.save();

    // If deposit approved, credit user balance
    if (status === 'completed' && investment.type === 'deposit') {
      const user = await User.findById(investment.userId);
      user.balance += investment.amount;
      user.totalDeposited = (user.totalDeposited || 0) + investment.amount;
      await user.save();
    }

    res.json({ message: 'Transaction status updated', investment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/withdrawal/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Transaction not found' });

    investment.status = status;
    await investment.save();

    res.json({ message: 'Transaction status updated', investment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get deposit methods
router.get('/deposit-methods', auth, async (req, res) => {
  const methods = [
    { _id: '1', name: 'Bitcoin (BTC)', type: 'Bitcoin', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', active: true },
    { _id: '2', name: 'Ethereum (ETH)', type: 'Ethereum', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', active: true },
    { _id: '3', name: 'USDT (TRC20)', type: 'USDT', address: 'TXn9Md4kqjX5i1YZ9GqKGsQ1yfKcKQ7bQr', active: true },
    { _id: '4', name: 'Credit/Debit Card', type: 'Card', address: 'Visa, Mastercard, Amex', active: true },
    { _id: '5', name: 'Gift Card', type: 'Gift Card', address: 'Amazon, iTunes, Steam, Google Play', active: true },
  ];
  res.json({ methods });
});

// Get KYC documents
router.get('/kyc', auth, async (req, res) => {
  try {
    const documents = await KycDocument.find()
      .populate('userId', 'email firstName lastName');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Export user data as CSV
router.get('/export/users', auth, async (req, res) => {
  try {
    const users = await User.find();
    const csv = 'ID,Name,Email,Balance,Status,Joined\n' +
      users.map(u => `${u._id},"${u.firstName} ${u.lastName}",${u.email},${u.balance},${u.status},${u.createdAt}`).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;