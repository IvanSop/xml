var mongoose = require('mongoose');

var User = require('../models/user');
var Act = require('../models/act');

var Amendment = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref:'Act'},
    text: String,
    author: String
});

module.exports = mongoose.model('Amendment', Amendment);