require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ) {
       return res.status(422).json({error:"please add email or password"})
    };

    const isEmail = (str) => {
      if (str.includes('@') && str.includes('.')) return true;
      else return false;
    };

    if (isEmail(email)) {
        User.findOne({email: email})
        .then( savedUser => {
            if (!savedUser) {
               return res.status(422).json({error:"Invalid email or password"})
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                   const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                   res.status(200).json({token})
                }
                else{
                    return res.status(422).json({error:"Invalid email or password"})
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
    } else {
        User.findOne({username: email})
        .then( savedUser => {
            if (!savedUser) {
               return res.status(422).json({error:"Invalid email or password"})
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                   const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                   res.status(200).json({token})
                }
                else{
                    return res.status(422).json({error:"Invalid email or password"})
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
    };

};

module.exports = login;