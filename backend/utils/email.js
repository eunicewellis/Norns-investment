const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email - Norn Investments',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Norn Investments!</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f0f0f0; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">
            ${verificationCode}
          </div>
          <p>Enter this code to verify your email address.</p>
          <p>If you did not create an account with Norn Investments, please ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Norn Investments Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send deposit confirmation email
const sendDepositConfirmation = async (email, amount, currency = 'USD') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Deposit Confirmed - Norn Investments',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Deposit Confirmed!</h2>
          <p>Your deposit of ${amount} ${currency} has been successfully processed and added to your account balance.</p>
          <p>You can now start investing and earning profits.</p>
          <br>
          <p>Best regards,</p>
          <p>The Norn Investments Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send withdrawal email
const sendWithdrawalNotification = async (email, amount, status = 'processing') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: status === 'processing' ? 'Withdrawal Request Received' : 'Withdrawal Completed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Withdrawal ${status === 'processing' ? 'Request Received' : 'Completed'}</h2>
          <p>Your withdrawal request for ${amount} has been ${status === 'processing' ? 'received and is being processed' : 'completed'}.</p>
          ${status === 'processing' ? '<p>You will receive a confirmation email once the withdrawal has been processed.</p>' : ''}
          <br>
          <p>Best regards,</p>
          <p>The Norn Investments Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `https://norninvestments.com/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset your password - Norn Investments',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to reset your password:</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 24 hours.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <br>
          <p>Best regards,</p>
          <p>The Norn Investments Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendDepositConfirmation,
  sendWithdrawalNotification,
  sendPasswordResetEmail
};