const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

module.exports = {

    register: async (req, res) => {

        try {
            let isEmailExist = await User.findOne({ email: req.body.email });
            if (isEmailExist) {
                res.json({ emailExist: true });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
                const user = await new User({
                    name: req.body.fullname,
                    email: req.body.email,
                    password: hashedPassword,
                    mobile: req.body.mobile
                });
    
                await user.save();
                let userData = await User.findOne({email: req.body.email})
                res.status(200).json(userData);
            }
        } catch (err) {
            console.log(err);
            res.status(401).json(err);
        }
    },

    login: async(req, res) => {
    
        try{
            const isUser = await User.findOne({email:req.body.email});
            if(!isUser){
               return res.json({ notFound:true });
            }
      
            const validPassword = await bcrypt.compare(req.body.password, isUser.password)
            if(!validPassword){
               console.log('password not matching')
               return res.json({ passwordNotMatch:true });
            } 
            const { password, ...others } = isUser

            const accessToken = jwt.sign(
               {
                  "userInfo": {
                     others,
                  }
               },
               process.env.ACCESS_TOKEN_SECRET,
               { expiresIn: 300 }
   
            );
            res.status(200).json({isUser, accessToken});
        }catch(err) {
            console.log(err);
        }
    }
}