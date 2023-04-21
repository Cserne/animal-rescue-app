require("dotenv").config();
const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const User = require("../models/user");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if( !username || !email || !password ){
     return res.sendStatus(400);
  };
  User.findOne({email: email})
  .then(( savedUser ) => {
      if ( savedUser ) {
        return res.sendStatus(422);
      }
      bcrypt.hash(password, 12)
      .then( hashedpassword => {
            const user = new User({
                email,
                username,
                password: hashedpassword,
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
  });

  User.findOne({username: username})
  .then(( savedUser ) => {
      if ( savedUser ) {
        return res.sendStatus(422);
      }
      bcrypt.hash(password, 12)
      .then( hashedpassword => {
            const user = new User({
                email,
                username,
                password: hashedpassword,
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