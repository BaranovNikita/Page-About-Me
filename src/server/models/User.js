const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('bluebird');

const userSchema = mongoose.Schema({
	username: String,
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true
	}
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email'
});
module.exports = mongoose.model('User', userSchema);
