const Validator = require('validator');

module.exports = (data) => {
	const errors = {};
	if (!data.first_name || Validator.isEmpty(data.first_name)) {
		errors.first_name = 'This field is required!';
	} else if (!Validator.isLength(data.first_name, { min: 3, max: 15 })) {
		errors.first_name = 'Invalid length. From 3 to 15 characters!';
	}
	if (!data.last_name || Validator.isEmpty(data.last_name)) {
		errors.last_name = 'This field is required!';
	} else if (!Validator.isLength(data.last_name, { min: 3, max: 15 })) {
		errors.last_name = 'Invalid length. From 3 to 15 characters!';
	}
	if (!data.email || Validator.isEmpty(data.email)) {
		errors.email = 'This field is required!';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid email!';
	}
	if (!data.password || Validator.isEmpty(data.password)) {
		errors.password = 'This field is required!';
	} else if (!Validator.isLength(data.password, { min: 8, max: 15 })) {
		errors.password = 'Invalid length. From 8 to 15 characters!';
	}
	if (!data.passwordConfirmation || Validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'This field is required!';
	} else if (!Validator.equals(data.passwordConfirmation, data.password)) {
		errors.passwordConfirmation = 'Passwords not match!';
	}
	return errors;
};
