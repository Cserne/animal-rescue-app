const User = require("../models/user");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const mongoose = require('mongoose');

const helpRequest = async(req, res) => {
    const species = req.body.species;
    const city = req.body.city;
    const date = req.body.date;
    const description = req.body.description;
    
    if ( !species || ! city || !date || !description ) {
        return res.status(422).json("Please fill in all fields!")
    };
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
        User.findByIdAndUpdate(_id, { $push: { helpRequests: { species, city, date, description
            // , helps: { description, userId: req.user._id }
         } } }, { new: true }).then( (help) => {
            if(help) {
            console.log({success: true, data: help});
            } else {
            console.log("No such user exists.");
            }
        }).catch((err) => {
            console.log(err);
        })

    })

    res.status(200);

}

const getHelpRequests = async (req, res) => {
    User.find().then( user => {
        let helpRequests = [];
        user.map((us) => {
            us.helpRequests.map((u) => {
                helpRequests.push(u);
            })
        })
        res.send(helpRequests);
    });
}

const getRequestsByCity = async(req, res) => {

    User.find().then( user => {
        let helpRequests = [];
        user.map((us) => {
            us.helpRequests.map((u) => {
                if (u.city.toLowerCase() === req.query.city) {

                    helpRequests.push(u);
                }
            })
        })
        res.send(helpRequests);

})
}

const giveHelp = async (req, res) => {
                    
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
        
        const description = req.body.description;
        const userId = _id;

    User.findOneAndUpdate(
        {"helpRequests._id": req.params._helprequestid},
        {
            $push: {
                "helpRequests.$.helps": {description, userId}
            }
        },
        { new: true }
        ).then( user => {
            console.log(req.user)
        }).catch( err => {
            console.log(err)
        })
        res.send('Ok');

    })

}

const updateHelp = async (req, res) => { // UPDATE MY OWN HELP DESCRIPTION!!!!
    const {authorization} = req.headers;
    if (!authorization) {
        res.status(401).json("Log in!")
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        // console.log(req.user._id);
        if (err) {
            res.status(401).json("Log in first!")
        }
        const {_id} = payload;

    User.findOneAndUpdate(
        {"_id": _id, "helpRequests._id": req.params._id},
        {
            $set: {
                "helpRequests.$.helps": {"_id": req.params._helpid, "description": req.body.description}
            }
        },
        ).then( user => {
            console.log("é")
        }).catch( err => {
            console.log(err)
        })
        res.send('b');
    })

}

const deleteHelpRequest = async (req, res) => { // UPDATE MY OWN HELP DESCRIPTION!!!!
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

    User.findOneAndUpdate(
        {"_id": _id},
        {
            $pull: {
                "helpRequests": {"_id": req.params._helprequestid}
            }
        }
        ).then( user => {
            console.log('ok')
        }).catch( err => {
            console.log(err)
        })
        res.send('deleted');
    })
}

const readUser = async (req, res) => {
    User.find({}, (error, result) => {
        if(error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })
}


module.exports = { helpRequest, getHelpRequests, getRequestsByCity, giveHelp, updateHelp, readUser, deleteHelpRequest };
 