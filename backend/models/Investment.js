const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['investment', 'deposit', 'withdrawal'],
    default: 'investment'
  },
  planType: {
    type: String,
    required: true,
    enum: ['Starter', 'Premium', 'VIP', 'Bitcoin Max', 'Crypto Whale', 'Deposit']
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    default: 'BTC'
  },
  walletAddress: {
    type: String,
    default: ''
  },
  reference: {
    type: String,
    default: ''
  },
  giftCardCode: {
    type: String,
    default: ''
  },
  giftCardPin: {
    type: String,
    default: ''
  },
  roiPercentage: {
    type: Number,
    default: 0
  },
  lockupPeriod: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  maturityDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'active', 'completed', 'withdrawn', 'rejected', 'cancelled']
  },
  totalReturn: {
    type: Number,
    default: 0
  },
  dailyProfit: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Investment', investmentSchema);