import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Dialog } from '@blueprintjs/core';
import Radium from 'radium';
import { submitExperiment } from './actions';

let styles;

export const Beef = React.createClass({
	propTypes: {
		beefData: PropTypes.object,
		location: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			workerId: '',
			assignmentId: '',
			hitId: '',
		};
	},

	componentWillMount() {
		this.setState({
			workerId: this.props.location.query.workerId,
			assignmentId: this.props.location.query.assignmentId,
			hitId: this.props.location.query.hitId,
		});
	},

	componentWillReceiveProps(nextProps) {
		const lastLoading = this.props.beefData.loading;
		const nextLoading = nextProps.beefData.loading;
		const nextError = nextProps.beefData.error;
		if (lastLoading && !nextLoading && !nextError) {
			// this.setState({ showAuthenticationPanel: true });
		}
	},
	
	submitExperiment() {
		const data = {
			workerId: this.state.workerId,
			assignmentId: this.state.assignmentId,
			hitId: this.state.hitId,
		};
		console.log('Submitting Experiment ', data);
		this.props.dispatch(submitExperiment(data));
	},

	render() {
		
		return (
			<div style={styles.container}>
				<h1>Beef</h1>
				<p>This experiment blah blah</p>
				<Button onClick={this.submitExperiment} text={'Submit Experiment'} loading={this.props.beefData.loading} />
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		beefData: state.beef.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Beef));

styles = {
	container: {
		maxWidth: '100vw',
	},
};
