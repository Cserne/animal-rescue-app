require("dotenv").config();
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const AuthEntity = require("../models/user");

const register = async (req, res) => {
    const { username, email, password } = req.body;
  if( !email || !password || !username ){
     return res.status(422).json("please add all the fields")
  }
  AuthEntity.findOne({email:email})
  .then(( savedUser ) => {
      if ( savedUser ) {
        return res.status(422).json("user already exists with that email")
      }
      bcrypt.hash(password,12)
      .then( hashedpassword => {
            const user = new AuthEntity({
                email,
                password:hashedpassword,
                username,
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch( err => {
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
};

module.exports = register;