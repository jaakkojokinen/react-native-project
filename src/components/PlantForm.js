import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { plantUpdate } from '../actions';
import { CardSection, Input } from './common';
import SelectImage from './SelectImage';

class PlantForm extends Component {
	render() {
		return (
			<ScrollView>
				<CardSection>
					<Input
						label="Name"
						placeholder="plant name"
						value={this.props.name}
						onChangeText={value => this.props.plantUpdate({ prop: 'name', value })}
					/>
				</CardSection>
 
				<CardSection>
					<Input
						label="Days"
						placeholder="days between watering"
						keyboardType="numeric"
						maxLength={2}
						value={this.props.water}
						onChangeText={value => this.props.plantUpdate({ prop: 'water', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Days"
						placeholder="days between fertilizing"
						keyboardType="numeric"
						maxLength={2}
						value={this.props.fertilize}
						onChangeText={value => this.props.plantUpdate({ prop: 'fertilize', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Light"
						placeholder="place in the room"
						value={this.props.light}
						onChangeText={value => this.props.plantUpdate({ prop: 'light', value })}
					/>
				</CardSection>

				<CardSection>
					<SelectImage />
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, water, fertilize, light } = state.plantForm;

	return { name, water, fertilize, light };
};

export default connect(mapStateToProps, { plantUpdate })(PlantForm);
