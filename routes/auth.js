const mongoose = require('mongoose');
const User = requre('../models/user');

const authRouter  = express.Router();

authRouter.post('/api/signup',async(req,res)=>{
    try {
        const {fullName, email, password} = res.body;
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({msg:"user with same email already exist"});
        }else{
           let user = new User({fullName, email, password});
           await user.save();
           res.json({user});
        }
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});