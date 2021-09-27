'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = Schema({
    email: String,
    pass: String,
    name: String,
    lastName: String
});

module.exports = mongoose.model('Users', UserSchema);
