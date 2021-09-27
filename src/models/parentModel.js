'use strict'
const mongoose = require('mongoose');
const userModel = require('./userModel');
const Schema = mongoose.Schema;
 
const ParentSchema = Schema({
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: userModel
    },
});

module.exports = mongoose.model('Parents', ParentSchema);
