// holds the state of the plant form

import {
	PLANT_UPDATE,
	PLANT_CREATION,
	PLANT_SAVE_SUCCESS,
	PLANT_DELETE,
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	water: '',
	fertilize: '',
	light: '',
	watDate: '',
	ferDate: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLANT_UPDATE:
			// ES6 key interpolation. 
			return { ...state, [action.payload.prop]: action.payload.value };
		case PLANT_CREATION:
			return INITIAL_STATE;
		case PLANT_SAVE_SUCCESS:
			return INITIAL_STATE;
		case PLANT_DELETE:
			return INITIAL_STATE;	
		default:
			return state;	
	}
};