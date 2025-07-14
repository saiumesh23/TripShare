import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();
router.get("/",(req,res)=>{
     res.send("signup route");
});
router.post("/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email already registered'});
        }
        const existingName = await User.findOne({name});
        if(existingName){
            return res.status(400).json({message:'Username already taken'});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email, password:hashPassword});
        await newUser.save();
        res.status(200).json({message:'SignUp successful'});
    }catch(err){
        console.log(err);
        res.status(500).json({message:'server error during signup'});
    }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // 3. Success
    res.status(200).json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

export default router;