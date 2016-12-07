import React from 'react';
import { View } from 'react-native';

const ItemCardSection = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'space-around',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	}
};

export { ItemCardSection };
