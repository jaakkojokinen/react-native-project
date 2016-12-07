import React from 'react';
import { View } from 'react-native';

const ImageSection = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		backgroundColor: '#fff',
		borderColor: '#ddd',
		position: 'relative'
	}
};

export { ImageSection };
