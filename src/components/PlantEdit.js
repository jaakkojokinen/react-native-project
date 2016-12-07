import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlantForm from './PlantForm';
import { plantUpdate, plantSave, plantDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class PlantEdit extends Component {
	state = { showModal: false }

	componentDidMount() {
		_.each(this.props.plant, (value, prop) => {
			this.props.plantUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, water, fertilize, light, watDate, ferDate } = this.props;

		this.props.plantSave({ 
			name, water, fertilize, light, watDate, ferDate, uid: this.props.plant.uid 
		});
	}

	onAccept() {
		const { uid } = this.props.plant;

		this.props.plantDelete({ uid });
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<Card>
				<PlantForm />

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete plant
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Delete plant rly?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, water, fertilize, light, watDate, ferDate } = state.plantForm;

	return { name, water, fertilize, light, watDate, ferDate };
};

export default connect(mapStateToProps, {
	plantUpdate,
	plantSave,
	plantDelete
})(PlantEdit);
