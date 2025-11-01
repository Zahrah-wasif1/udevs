const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(async()=>{
  console.log('Connected to MongoDB')
  const existing = await User.findOne({email:process.env.ADMIN_EMAIL})
  if(!existing){
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD,salt)
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: hashed,
      role: 'admin'
    })
    console.log('Admin user created')
  } else {
    console.log('Admin user already exists')
  }
  process.exit()
}).catch(err=>{
  console.error('Error:',err.message)
  process.exit(1)
})
