import {isEmail} from "validator";

export default (data) => {
	const errors = {};
	if (data.email) {
		if (!isEmail(data.email)) {
			errors.email = 'Email is not valid';
		}
	} else {
		errors.email = 'This field is required';
	}
	return errors;
};
