import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL
} from '../actions/types';

// state resetter variable, 
// used whenever empty state is needed
const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	error: null,
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			// immutable state = take existing state object,  
			// read all its properties, 
			// overwrite key 'email' with value coming from 
			// action.payload, return new state object with 
			// modified email property
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			// ES6 spread syntax ...
			return { ...state, password: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state,
				error: 'Authentication failed.',
				password: '',
				loading: false
			};
		default:
			return state;		
	}
};
