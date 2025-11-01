const mongoose = require('mongoose')
const TeacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String
},{ timestamps: true })
module.exports = mongoose.model('Teacher', TeacherSchema)

