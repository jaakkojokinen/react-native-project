import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	PLANT_UPDATE,
	PLANT_CREATION,
	PLANTS_FETCH_SUCCESS,
	PLANT_SAVE_SUCCESS,
	PLANT_DELETE
} from './types';

export const plantUpdate = ({ prop, value }) => {
	return {
		type: PLANT_UPDATE,
		payload: { prop, value }
	};
};

export const plantCreation = ({ name, water, fertilize, light, watDate, ferDate }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/plants`)
			.push({ name, water, fertilize, light, watDate, ferDate })
			.then(() => {
				dispatch({ type: PLANT_CREATION });
				Actions.plantList({ type: 'reset' });
			});
	};
};

export const plantsFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/plants`)
			.on('value', snapshot => {
				dispatch({ type: PLANTS_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const plantSave = ({ name, water, fertilize, light, watDate, ferDate, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`users/${currentUser.uid}/plants/${uid}`)
			.set({ name, water, fertilize, light, watDate, ferDate })
			.then(() => {
				dispatch({ type: PLANT_SAVE_SUCCESS });
				// type reset = resets the nav stack
				Actions.plantList({ type: 'reset' });
			});
	};
};

export const plantDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`users/${currentUser.uid}/plants/${uid}`)
			.remove()
			.then(() => {
				dispatch({ type: PLANT_DELETE });
				Actions.plantList({ type: 'reset' });
			});
	};
};
