import { combineReducers } from 'redux';

import registerForm from './registerForm';
import auth from './auth';

export default combineReducers({
	registerForm,
	auth
});
