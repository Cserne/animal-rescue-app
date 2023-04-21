require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;
    // if( !email || !password ) {              form "input required" takes care of this
    //    return res.sendStatus(400);
    // };

    const isEmail = (str) => {
      if (str.includes('@') && str.includes('.')) return true;
      else return false;
    };

    if (isEmail(email)) {
        User.findOne({email: email})
        .then( savedUser => {
            if (!savedUser) {
               return res.sendStatus(422);
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                   const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                   res.status(200).json({token})
                }
                else{
                    return res.sendStatus(422);
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
               return res.sendStatus(422);
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                   const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                   res.status(200).json({token})
                }
                else{
                    return res.sendStatus(422);
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
    };

};

module.exports = login;