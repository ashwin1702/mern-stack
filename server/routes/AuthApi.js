import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();

router.post("/register",async (req,res)=>{
    // const {email}=req.body;
    const {email,password,firstName,lastName}=req.body;

    const userExists= await User.findOne({email});
    if(userExists){
        res.status(406).json({message:"User already Exists"});
        return;
    } 
    const saltRounds=10;
    const salt =await bcrypt.genSaltSync(saltRounds);
    const hashedPassword =await bcrypt.hashSync(password, salt);
    const user=await User({email,password: hashedPassword,firstName,lastName});
    await user.save();
    res.status(201).json({message:"user is created"});
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const userExists= await User.findOne({email});
    if(!userExists){
        res.status(406).json({message:"Credntials Not Found"});
        return;
    } 
    const matched= await bcrypt.compare(password,userExists.password);
    if(!matched){
        res.status(406).json({message:"Credentials not found"});
        return;
    }
    const payload={
        username:email,id:userExists._id,
    }
    const token =jwt.sign(payload,'some secret');
    // console.log(token);
    res.json({message:"succesfully logged in",token});
})
export default router;