import * as actions from '../constants/ActionTypes';

const initialState = {
	user: false,
	errors: {},
	request: false
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case actions.AUTH_REQUEST:
			return { ...state, request: true };
		case actions.AUTH_SUCCESS:
			return { ...state, user: action.payload, request: false };
		case actions.AUTH_FAILED:
			return { ...state, errors: action.payload, request: false };
		case actions.LOGOUT_REQUEST:
			return { ...state, request: true };
		case actions.LOGOUT_SUCCESS:
			return initialState;
		case actions.LOGOUT_FAILED:
			return { ...state, errors: action.payload, request: false };
		default:
			return initialState;
	}
}
