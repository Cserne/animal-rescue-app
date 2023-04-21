const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user");

const requireLogin = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        res.status(401).json("Log in!")
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json("Log in first!")
        }
        const {_id} = payload;
        User.findById(_id).then( userdata => {
            req.user = userdata;
            next();
        })
    })
}

module.exports = requireLogin;