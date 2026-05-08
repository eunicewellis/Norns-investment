const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  totalProfit: {
    type: Number,
    default: 0
  },
  totalDeposited: {
    type: Number,
    default: 0
  },
  totalWithdrawn: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending'],
    default: 'active'
  },
  activeInvestments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment'
  }],
  completedInvestments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment'
  }],
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: String
  },
  kycVerified: {
    type: Boolean,
    default: false
  },
  kycDocuments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KycDocument'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);