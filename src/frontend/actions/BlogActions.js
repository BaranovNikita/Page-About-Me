import axios from 'axios';
import * as constants from '../constants/ActionTypes';

export function getBlogItems(startIndex, count) {
	return (dispatch) => {
		dispatch({
			type: constants.BLOG_GET_REQUEST
		});
		return axios.get(`/api/blog?startIndex=${startIndex}&count=${count}`)
			.then(response => dispatch({
				type: constants.BLOG_GET_SUCCESS,
				payload: { ...response.data, page: startIndex / 5 }
			}))
			.catch(err => dispatch({
				type: constants.BLOG_GET_FAILED,
				payload: err.response.data
			}));
	};
}

export function addBlogRecord(data) {
	return (dispatch) => {
		dispatch({
			type: constants.BLOG_ADD_REQUEST
		});
		return axios.post('/api/blog', data)
			.then(response => dispatch({
				type: constants.BLOG_ADD_SUCCESS,
				payload: response.data
			}))
			.catch(err => dispatch({
				type: constants.BLOG_ADD_FAILED,
				payload: err.respone.data
			}));
	};
}
