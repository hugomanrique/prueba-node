'use strict'
const mongoose = require('mongoose');
const parentModel = require('./parentModel');
const Schema = mongoose.Schema;
 
const ChildSchema = Schema({
    name: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: parentModel
    },
});

module.exports = mongoose.model('Childs', ChildSchema);
