const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/user')

const seeallhelpRequests = async(req, res) => {
    
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
        const result = User.findById(_id).populate("helpRequests");
        res.send(result);

    })

}

module.exports = seeallhelpRequests;