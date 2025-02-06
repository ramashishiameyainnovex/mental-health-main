import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
// Generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// Send OTP to email
export const sendOtpToEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        
        const otp = generateOtp();
        user.otp = otp;
        await user.save();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };
        
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'OTP sent successfully' });
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || user.otp !== parseInt(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        user.otp = null;
        await user.save();
        
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update Password
export const updatePassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };