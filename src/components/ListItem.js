import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Card, ImageSection, ItemCardSection } from './common';
import { plantSave } from './../actions';

class ListItem extends Component {

	onWaterPress() {
		const { name, water, fertilize, light, ferDate } = this.props.plant;
		const period = _.get({ water }, 'water');
		const nextDate = moment().add((period * 1), 'days').calendar();
		this.props.plantSave({ 
			name, water, fertilize, light, ferDate, watDate: nextDate, uid: this.props.plant.uid 
		});
	}

	onFertilizerPress() {
		const { name, water, fertilize, light, watDate } = this.props.plant;
		const period = _.get({ fertilize }, 'fertilize');
		const nextDate = moment().add((period * 1), 'days').calendar();
		this.props.plantSave({ 
			name, water, fertilize, light, watDate, ferDate: nextDate, uid: this.props.plant.uid 
		});
	}

	// navigate to plant form and pass it a plant props
	onRowPress() {
		Actions.plantEdit({ plant: this.props.plant });
	}

	imageName() {
		const fb = 'https://firebasestorage.googleapis.com/';
		const domain = 'jungle-49e02.appspot.com';
		const { currentUser } = firebase.auth();
		const filename = this.props.plant.name;
		return (
			// generate image download url 
		);
	}

	render() {
		const { name, watDate, ferDate, light } = this.props.plant;
		
		return (
			<View>
				<Card>
					<ImageSection>
						<Image
							style={styles.imageStyle}
							source={{ uri: this.imageName() }}
						/>
					</ImageSection>

					<Text style={styles.titleStyle}>
						{name}
					</Text>

					<ItemCardSection>
							<Icon.Button
								name="ios-water"
								size={30}
								color="#15376B"
								backgroundColor="#fff"
								style={styles.iconButtonStyle}
								onPress={this.onWaterPress.bind(this)}
							>water</Icon.Button>

							<Icon.Button
								name="ios-beaker"
								size={30}
								color="#286947"
								backgroundColor="#fff"
								style={styles.iconButtonStyle}
								onPress={this.onFertilizerPress.bind(this)} 
							>fertilize</Icon.Button>

							<Icon.Button
								name="ios-flower"
								size={30}
								color="#2C989C"
								backgroundColor="#fff"
								style={styles.iconButtonStyle}
								onPress={this.onRowPress.bind(this)}
							>edit</Icon.Button>
					</ItemCardSection>

					<Text style={styles.textStyle}>
						Next watering day{'\u00a0'}
						<Text>
							{watDate}
						</Text>	
					</Text>	

					<Text style={styles.textStyle}>
						Next fertilizing day{'\u00a0'}
						<Text>
							{ferDate}
						</Text>	
					</Text>

					<Text style={styles.textStyle}>
						{light} lighting conditions
					</Text>
				</Card>	
			</View>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 28,
		fontFamily: 'HelveticaNeue-Bold',
		padding: 15,
	},
	textStyle: {
		fontFamily: 'HelveticaNeue',
		fontSize: 18,
		flexDirection: 'column',
		paddingLeft: 15,
		paddingTop: 15,
		paddingBottom: 5,
		lineHeight: 15,
	},
	iconButtonStyle: {
		marginLeft: 10,
		marginRight: 10,
		flex: 1
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null,
	}
};

const mapStateToProps = (state) => {
	const { watDate, ferDate } = state.plantForm;
	return { watDate, ferDate };
};

export default connect(mapStateToProps, { plantSave })(ListItem);
