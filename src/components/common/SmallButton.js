import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const SmallButton = ({ onPress, children }) => {
	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>	
	);
};

const styles = {
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignSelf: 'center',
		height: 50,
		width: 50,
		borderWidth: 1,
		borderColor: '#006400',
		borderRadius: 20,
		marginLeft: 35,
		marginRight: 35
	}
};

export { SmallButton };