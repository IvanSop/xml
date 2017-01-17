var mongoose = require('mongoose');

var User = require('../models/user');
var Act = require('../models/act');

var Amendment = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref:'Act'},
    text: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});