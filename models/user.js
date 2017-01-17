var mongoose = require('mongoose');

var User = new mongoose.Schema({
    username: String,
	password: String,
	type: Number, // 0 citizen, 1 alderman, 2 president
	
})

module.exports = mongoose.model('User', User);