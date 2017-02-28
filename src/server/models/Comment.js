const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const comment = mongoose.Schema({
	author: String,
	body: String,
	date: { type: Date, default: Date.now },
	parent: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Comment', comment);
