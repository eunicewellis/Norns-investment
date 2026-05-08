const express = require('express');
const auth = require('./auth');
const investments = require('./investments');
const admin = require('./admin');
const deposits = require('./deposits');
const withdrawals = require('./withdrawals');
const kyc = require('./kyc');
const referral = require('./referral');

const router = express.Router();

// API routes
router.use('/auth', auth);
router.use('/investments', investments);
router.use('/admin', admin);
router.use('/deposits', deposits);
router.use('/withdrawals', withdrawals);
router.use('/kyc', kyc);
router.use('/referral', referral);
module.exports = router;