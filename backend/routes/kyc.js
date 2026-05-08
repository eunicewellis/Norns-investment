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
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      kycVerified: user.kycVerified,
      documents: user.kycDocuments
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