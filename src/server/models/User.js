const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = require('bluebird');

const userSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true
	},
	username: String
});

userSchema.virtual('fullName').get(function() {return `${this.first_name} ${this.last_name}`});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
