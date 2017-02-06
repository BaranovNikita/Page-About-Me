import axios from 'axios';

export function userRegisterRequest(userData) {
	return () => axios.post('/api/users', userData);
}

export function isUserExists(identifier) {
	return () => axios.get(`/api/users/${identifier}`);
}
