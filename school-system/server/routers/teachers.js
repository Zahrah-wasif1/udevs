const express = require('express')
const auth = require('../middleware/auth')
const Teacher = require('../models/Teacher')
const router = express.Router()
router.get('/',async(req,res)=>{
  try{
    const list = await Teacher.find()
    res.json(list)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.post('/',auth,async(req,res)=>{
  try{
    const t = new Teacher(req.body)
    await t.save()
    res.json(t)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.put('/:id',auth,async(req,res)=>{
  try{
    const t = await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!t) return res.status(404).json({msg:'Teacher not found'})
    res.json(t)
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
router.delete('/:id',auth,async(req,res)=>{
  try{
    await Teacher.findByIdAndDelete(req.params.id)
    res.json({ok:true})
  }catch(err){
    res.status(500).json({msg:'Server error'})
  }
})
module.exports = router
