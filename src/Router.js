import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PlantList from './components/PlantList';
import PlantCreation from './components/PlantCreation';
import PlantEdit from './components/PlantEdit';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="auth">
				<Scene key="login" component={LoginForm} title="Jungle Room" />
			</Scene>

			<Scene key="main">
				<Scene 
					onRight={() => Actions.plantCreation()}
					rightTitle="Add"
					key="plantList"
					component={PlantList}
					title="Plants"
					initial
				/>
				<Scene key="plantCreation" component={PlantCreation} title="Plant Creation" />
				<Scene key="plantEdit" component={PlantEdit} title="Edit Plant" />
			</Scene>	
		</Router>
	);
};

export default RouterComponent;
