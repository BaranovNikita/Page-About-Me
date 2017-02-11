import axios from 'axios';
import Promise from 'bluebird';
import * as constants from '../constants/ActionTypes';

export function userRegisterRequest(userData) {
	return () => axios.post('/api/users', userData);
}

export function isUserExists(email) {
	return () => axios.get(`/api/users/${email}`);
}

export function auth(data) {
	return (dispatch) => {
		dispatch({
			type: constants.AUTH_REQUEST
		});
		return axios.post('/api/auth', { ...data, username: data.email })
			.then(response => dispatch({
				type: constants.AUTH_SUCCESS,
				payload: response.data.user
			}))
			.catch(err => dispatch({
				type: constants.AUTH_FAILED,
				payload: err.response.data
			}));
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({
			type: constants.LOGOUT_REQUEST
		});
		return axios.get('/api/auth/logout')
			.then(response => dispatch({
				type: constants.LOGOUT_SUCCESS,
				payload: response.data.user
			}))
			.catch(err => dispatch({
				type: constants.LOGOUT_FAILED,
				payload: err.response.data
			}));
	};
}

export function getActiveUser() {
	return dispatch => new Promise((resolve) => {
		dispatch({
			type: constants.AUTH_REQUEST
		});
		return axios.get('/api/auth')
			.then((response) => {
				if (response.data.user) {
					dispatch({
						type: constants.AUTH_SUCCESS,
						payload: response.data.user
					});
					resolve();
				} else {
					dispatch({
						type: constants.AUTH_FAILED,
						payload: {}
					});
					resolve();
				}
			});
	});
}
