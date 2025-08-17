const mongoose = require('mongoose');
const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const authRouter  = express.Router();

authRouter.post('/api/signup',async(req,res)=>{
    try {
        const {fullName, email, password} = req.body;
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({msg:"user with same email already exist"});
        }else{
            //Generate a salt with cost factor of 10
            const salt = await bcrypt.genSalt(10);
            //hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);

           let user = new User({fullName, email, password:hashedPassword});
           await user.save();
           res.json({user});
        }
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = authRouter;