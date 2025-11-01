const express = require('express')
const auth = require('../middleware/auth')
const Student = require('../models/Student')
const router = express.Router()
router.get('/',auth,async(req,res)=>{
  try{
    const list = await Student.find()
    res.json(list)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.post('/',async(req,res)=>{
  try{
    const s = new Student(req.body)
    await s.save()
    res.json(s)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.put('/:id',auth,async(req,res)=>{
  try{
    const s = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!s) return res.status(404).json({msg:'Student not found'})
    res.json(s)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.delete('/:id',auth,async(req,res)=>{
  try{
    await Student.findByIdAndDelete(req.params.id)
    res.json({ok:true})
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
module.exports = router
