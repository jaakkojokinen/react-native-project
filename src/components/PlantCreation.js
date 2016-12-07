import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { plantUpdate, plantCreation } from '../actions';
import { Card, CardSection, Button } from './common';
import PlantForm from './PlantForm';

class PlantCreation extends Component {

	onButtonPress() {
		const { name, water, fertilize, light, watDate, ferDate } = this.props;

		this.props.plantCreation({ name, water, fertilize, light, watDate, ferDate });
	}

	render() {
		return (
			<Card>
				<PlantForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create
					</Button>
				</CardSection>
			</Card>				
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.plantForm);
	const watDate = moment().calendar();
	const ferDate = moment().calendar();
	const { name, water, fertilize, light } = state.plantForm;
	return { name, water, fertilize, light, watDate, ferDate };
};

export default connect(mapStateToProps, {
	plantUpdate,
	plantCreation
})(PlantCreation);
