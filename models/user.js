var mongoose = require('mongoose');

var User = new mongoose.Schema({
    username: String,
	password: String,
	type: Number, // 0 gradjanin, 1 odbornik, 2 predsefnik
	
})

module.exports = mongoose.model('User', User);