import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { 
	emailChanged, 
	passwordChanged,
	loginUser 
} from '../actions';
import {
	LoginCard,
	CardSection,
	Input,
	Button,
	Spinner
} from './common';

class LoginForm extends Component {
	// methods for input handling
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>	
		);
	}

	render() {
		return (
			<LoginCard>
				<CardSection>
					<Input
						label="Email"
						placeholder="email@email.com"
						keyboardType="email-address"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.value}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>	

				<CardSection>
					{this.renderButton()}
				</CardSection>

				<Image 
					source={require('../images/FullSizeRender.jpg')} 
					style={styles.imageStyle}
				/>
			</LoginCard>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	imageStyle: {
		height: 200,
		width: null,
		flex: 1
	}
};

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
}

// send user input values to redux actions
export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(LoginForm);

