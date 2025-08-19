const mongoose = require('mongoose');
const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter  = express.Router();
// sign up api end point
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
// Sign in api end point
authRouter.post('/api/signin', async(req, res)=>{
    try {
        const {email, password} = req.body;
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).json({msg:'User not found with this email'});
        }else{
            const isMatch = await bcrypt.compare(password, findUser.password);
            if(!isMatch){
                return res.status(400).json({msg:'Incorrect Password'});
            }else{
                const token = jwt.sign({id:findUser._id}, "passwordKey");
                //remove sensitive information
                const {password, ...userWithOutPassword} = findUser._doc;
                //send the response
                res.json({token, ...userWithOutPassword});
            }
        }
    } catch (e) {
        res.status(500).json({error:e.message})
    }
});

module.exports = authRouter;