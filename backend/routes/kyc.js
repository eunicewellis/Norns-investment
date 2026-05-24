const express = require('express');
const User = require('../models/User');
const KycDocument = require('../models/KycDocument');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get KYC status
router.get('/status', auth, async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userId)
      .populate('kycDocuments', 'documentType status rejectionReason');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine overall status from documents
    const docs = user.kycDocuments || [];
    let status = 'none';
    if (user.kycVerified) {
      status = 'verified';
    } else if (docs.some((d) => d.status === 'pending')) {
      status = 'pending';
    } else if (docs.some((d) => d.status === 'rejected')) {
      status = 'rejected';
    }

    res.json({
      kycVerified: user.kycVerified,
      status,
      documents: docs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload KYC document
router.post('/upload', auth, upload.single('document'), async (req, res) => {
  try {
    const { documentType } = req.body;
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new KYC document
    const kycDocument = new KycDocument({
      userId: user._id,
      documentType,
      fileName: req.file.filename,
      filePath: req.file.path
    });

    await kycDocument.save();

    // Add document to user
    user.kycDocuments.push(kycDocument._id);
    await user.save();

    res.json({
      message: 'KYC document uploaded successfully',
      document: {
        id: kycDocument._id,
        documentType: kycDocument.documentType,
        fileName: kycDocument.fileName,
        status: kycDocument.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit KYC application (handles individual document uploads)
router.post('/submit', auth, upload.fields([
  { name: 'idFront', maxCount: 1 },
  { name: 'idBack', maxCount: 1 },
  { name: 'selfie', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 }
]), async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, nationality, address, city, state, postalCode, country, phoneNumber } = req.body;
    const decoded = req.user;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const files = req.files || {};
    const docTypes = [
      { field: 'idFront', documentType: 'ID' },
      { field: 'idBack', documentType: 'ID' },
      { field: 'selfie', documentType: 'Selfie' },
      { field: 'proofOfAddress', documentType: 'ProofOfAddress' }
    ];

    for (const { field, documentType } of docTypes) {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        const kycDocument = new KycDocument({
          userId: user._id,
          documentType,
          fileName: file.filename,
          filePath: file.path,
          status: 'pending'
        });
        await kycDocument.save();
        user.kycDocuments.push(kycDocument._id);
      }
    }

    await user.save();

    res.json({
      message: 'KYC documents submitted successfully! We will review them shortly.',
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get KYC documents for admin
router.get('/admin', auth, async (req, res) => {
  try {
    const decoded = req.user;

    if (!decoded.admin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const documents = await KycDocument.find()
      .populate('userId', 'email firstName lastName');

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;