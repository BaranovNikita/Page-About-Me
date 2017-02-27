import { combineReducers } from 'redux';

import registerForm from './registerForm';
import auth from './auth';
import blogReducer from './blogReducer';

export default combineReducers({
	registerForm,
	auth,
	blog: blogReducer
});
