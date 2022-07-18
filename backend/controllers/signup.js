require("dotenv").config();
const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const User = require("../models/user");

const register = async (req, res) => {
    const { username, email, password } = req.body;
  if( !email || !password || !username ){
     return res.status(422).json("please add all the fields")
  }
  User.findOne({email:email})
  .then(( savedUser ) => {
      if ( savedUser ) {
        return res.status(422).json("User already exists with that email.")
      }
      bcrypt.hash(password,12)
      .then( hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                username,
            })
            user.save()
            .then( user => {
                res.json({message:"saved successfully"})
            })
            .catch( err => {
                console.log(err)
            })
      })
     
  })
  .catch(err => {
    console.log(err)
  })
};

module.exports = register;