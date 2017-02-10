const express = require('express');
const User = require('../models/User');
const lodash = require('lodash');
const signup = require('../../share/validate/signup');

const router = express.Router();

router.post('/', (req, res) => {
	const errors = signup(req.body);

	if (!lodash.isEmpty(errors)) {
		return res.status(500).json({ errors });
	}
	return User.register(new User(Object.assign({}, req.body, { username: req.body.email })), req.body.password, (err) => {
		if (err) {
			if (err.name === 'UserExistsError') {
				return res.status(500).json({ email: 'User with this email already exist!' });
			}
			return res.status(500).json({ error: 'Error!' });
		}
		return res.json({ success: true });
	});
});

router.get('/:email', (req, res) => User
	.findOne({ email: req.params.email })
	.then(user => res.json({ user }))
	.catch(err => res.json({ error: err }))
);
module.exports = router;
