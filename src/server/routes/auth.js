const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', (req, res) => {
	passport.authenticate('local', (err, user) => {
		if (err) { return res.status(500).json({ message: err }); }
		if (!user) { return res.status(500).json({ message: 'Invalid data!' }); }
		return req.logIn(user, (err) => {
			if (err) { return res.status(500).json({ message: err }); }
			return res.json({ user: user._id });
		});
	})(req, res);
});

router.get('/', (req, res) => {
	if (req.user) {
		return res.json({ user: req.user._id });
	}
	return res.json({ user: false });
});

router.get('/logout', (req, res) => {
	req.logout();
	return res.json({ user: false });
});

module.exports = router;
