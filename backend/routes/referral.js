const express = require('express');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const router = express.Router();

// Get referral information (stats endpoint used by frontend)
router.get('/stats', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get referral statistics
    const referredUsers = await User.find({ referredBy: user.referralCode });
    const totalDeposits = referredUsers.reduce((sum, u) => sum + (u.totalDeposited || 0), 0);

    const activeReferrals = referredUsers.filter(u => u.status === 'active').length;

    res.json({
      code: user.referralCode,
      stats: {
        totalReferrals: referredUsers.length,
        activeReferrals,
        totalEarned: totalDeposits * 0.1,
        pendingCommissions: totalDeposits * 0.05
      },
      referrals: referredUsers.map(u => ({
        name: `${u.firstName} ${u.lastName}`,
        dateJoined: u.createdAt,
        depositAmount: u.totalDeposited || 0,
        commission: (u.totalDeposited || 0) * 0.1,
        status: u.status
      })),
      commissionRate: '10%'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get referral information (original endpoint)
router.get('/info', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get referral statistics
    const referredUsers = await User.find({ referredBy: user.referralCode });
    const totalDeposits = referredUsers.reduce((sum, u) => sum + (u.totalDeposited || 0), 0);

    res.json({
      referralCode: user.referralCode,
      referredUsers: referredUsers.length,
      totalDeposits: totalDeposits,
      commissionRate: '10%',
      totalCommission: (totalDeposits * 0.1).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get referral link
router.get('/link', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referralLink = `https://norninvestments.com/register?ref=${user.referralCode}`;

    res.json({
      referralCode: user.referralCode,
      referralLink: referralLink,
      shareableMessage: `Join Norn Investments with my referral code ${user.referralCode} and get a bonus on your first deposit! ${referralLink}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const topReferrers = await User.find()
      .sort({ balance: -1 })
      .limit(10)
      .select('firstName lastName balance referralCode');

    res.json(topReferrers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;