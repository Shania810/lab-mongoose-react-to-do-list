import Router from 'express'
import User from '../../models/User.model.js'
import bycrypt from 'bcrypt'
const router = Router()
router.post('/auth/signup',async(req,res,next)=>{
  const user = req.body 
  const {name,email,password} = user
  !name || !email || !password ? null : res.status(400).json({message: "Provide name,email,password"})
  const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  regexEmail.test(email) ? null : res.status(400).json({message:"provide valid email"})
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  regexPassword.test(password) ? null : res.status(400).json({message:"provide valid password"})
  const salt = bycrypt.genSaltSync(10)
  let passwordHash = bycrypt.hashSync(password,salt)
  try{
  const foundedUser = await User.findOne({email})
  if(foundedUser){
    res.status(400).json({message:"User already exists"})
  }else{
    const createdUser = await User.create({name,email,passwordHash})
    res.status(200).json({name,email,_id:createdUser._id})
  }}catch(error){
    console.log(error.message)
  }
  
})
export default router
