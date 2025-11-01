const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isVerified: { type: Boolean, default: false },
  verificationToken: String
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)
