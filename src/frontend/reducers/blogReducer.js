import * as constants from '../constants/ActionTypes';

const initialState = {
	items: [],
	isLoading: false,
	errors: {},
	pageCount: 1
};

export default function blogReducer(state = initialState, action) {
	switch (action.type) {
		case constants.BLOG_GET_REQUEST:
			return { ...state, isLoading: true, items: [] };
		case constants.BLOG_GET_SUCCESS:
			return { ...state, ...action.payload, isLoading: false };
		case constants.BLOG_ADD_REQUEST:
			return { ...state, isLoading: true };
		case constants.BLOG_ADD_SUCCESS:
			return { ...state, isLoading: false };
		default:
			return { ...state, isLoading: false };
	}
}
