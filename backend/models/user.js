const mongoose = require('mongoose');

const HelpSchema = new mongoose.Schema({
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

const HelpRequestSchema = new mongoose.Schema({
    species: String,
    city: String,
    // time : { type : Date, default: Date.now },
    // date: Number,
    description: String,
    helps: [HelpSchema]
},
{
    timestamps: true
}
);

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    helpRequests: [HelpRequestSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;