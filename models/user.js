const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    loginAttempts: Number,
    password: String
});

let User = mongoose.model('User', UserSchema);


module.exports = User;