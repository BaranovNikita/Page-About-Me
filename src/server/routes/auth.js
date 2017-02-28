const express = require('express');
const passport = require('passport');
const logger = require('../utils/logger').getLogger();

const router = express.Router();

router.post('/', (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.status(500).json({ message: 'Please, enter yor username and password!' });
	}
	return passport.authenticate('local', (err, user) => {
		if (err) { return res.status(500).json({ message: err }); }
		if (!user) { return res.status(500).json({ message: 'Invalid data!' }); }
		return req.logIn(user, (err) => {
			if (err) { return res.status(500).json({ message: err }); }
			return res.json({ user: { id: user._id, email: user.email } });
		});
	})(req, res);
});

router.get('/', (req, res) => {
	if (req.user) {
		logger.info(`success auth: ${req.user.email}`);
		return res.json({ user: { id: req.user._id, email: req.user.email } });
	}
	return res.json({ user: {} });
});

router.get('/logout', (req, res) => {
	req.logout();
	return res.json({ user: false });
});

module.exports = router;
