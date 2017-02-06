const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req, res) => {
	console.log(req.body);
	User.register(new User(req.body), req.body.password, (err, account) => {
		if (err) {
			console.log(err);
			return res.json({ error: err });
		}
		console.log(account);
		return res.json({ account });
	});
});

module.exports = router;
