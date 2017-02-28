import { SAVE_REGISTER_FORM_DATA, CLEAR_REGISTER_FORM_DATA } from '../constants/ActionTypes';

const initialState = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	passwordConfirmation: '',
	isLoading: false,
	errors: {}
};

export default function registerForm(state = initialState, action) {
	switch (action.type) {
		case SAVE_REGISTER_FORM_DATA:
			return { ...state, ...action.data };
		case CLEAR_REGISTER_FORM_DATA:
			return initialState;
		default:
			return state;
	}
}
