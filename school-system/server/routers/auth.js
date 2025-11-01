const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/User')
const router = express.Router()

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email and password required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' })
    }
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ msg: 'User already exists with this email' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: 'user'
    })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message })
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: 'Email and password required' })
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// Forgot Password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ msg: 'Email required' })
    const user = await User.findOne({ email })
    if (!user) {
      // For security, don't reveal if email exists
      return res.json({ msg: 'If email exists, reset link has been sent' })
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
    await user.save()
    // In production, send email with reset token
    // For now, return token in response (remove in production!)
    res.json({ 
      msg: 'Reset token generated',
      resetToken: resetToken, // Only for development - remove in production!
      resetUrl: `/reset-password?token=${resetToken}`
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// Reset Password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body
    if (!token || !password) {
      return res.status(400).json({ msg: 'Token and password required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' })
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()
    res.json({ msg: 'Password reset successful' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
