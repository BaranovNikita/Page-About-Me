const express = require('express');
const BlogItem = require('../models/BlogItem');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
	const { startIndex, count } = req.query;
	try {
		const items = await BlogItem.find({}).select({ __v: 0 }).sort('-date');
		const pageCount = Math.max(1, Math.ceil(items.length / 5));
		res.json({ items: items.slice(startIndex, startIndex + count), pageCount });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post('/', async (req, res) => {
	const { title, body, hidden } = req.body;
	const user = await User.findById(req.user._id);
	try {
		await new BlogItem({
			title,
			body,
			hidden,
			author: user.fullName
		}).save();
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
});

module.exports = router;
