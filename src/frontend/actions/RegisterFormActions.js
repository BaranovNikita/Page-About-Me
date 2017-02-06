import { SAVE_REGISTER_FORM_DATA, CLEAR_REGISTER_FORM_DATA } from '../constants/ActionTypes';

export function saveFormData(data) {
	return {
		type: SAVE_REGISTER_FORM_DATA,
		data
	};
}
export function clearFormData() {
	return {
		type: CLEAR_REGISTER_FORM_DATA
	};
}
