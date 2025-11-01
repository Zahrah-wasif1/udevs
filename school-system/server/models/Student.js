const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, enum: ['applied','accepted','rejected'], default: 'applied' }
},{ timestamps: true })
module.exports = mongoose.model('Student', StudentSchema)
