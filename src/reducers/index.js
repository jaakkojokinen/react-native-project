import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlantFormReducer from './PlantFormReducer';
import PlantReducer from './PlantReducer';

export default combineReducers({
	auth: AuthReducer,
	plantForm: PlantFormReducer,
	plants: PlantReducer
});