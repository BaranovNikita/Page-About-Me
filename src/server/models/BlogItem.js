const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const blogItemSchema = mongoose.Schema({
	title: String,
	author: String,
	body: String,
	comments: {
		type: [],
		default: []
	},
	date: { type: Date, default: Date.now },
	hidden: Boolean,
});

module.exports = mongoose.model('BlogItem', blogItemSchema);
