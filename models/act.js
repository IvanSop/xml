var mongoose = require('mongoose');

var User = require('../models/user');
var Amendment = require('../models/amendment');

var Act = new mongoose.Schema({
    heading: String,
    nodes: [{
        heading: String,
        clauses: [{
            text: String
        }]
    }],
    date: String,
    status: String,
    amendments: [{type: mongoose.Schema.Types.ObjectId, ref:'Amendment'}],
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});