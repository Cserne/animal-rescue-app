require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ) {
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email: email})
    .then( savedUser => {
        if (!savedUser) {
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if (doMatch) {
               const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
               res.status(200).json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
};

module.exports = login;