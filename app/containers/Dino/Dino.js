import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Dialog } from '@blueprintjs/core';
import Radium from 'radium';
import { submitExperiment } from './actions';

let styles;

export const Dino = React.createClass({
	propTypes: {
		dinoData: PropTypes.object,
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

	componentWillReceiveProps(nextProps) {
		const lastLoading = this.props.dinoData.loading;
		const nextLoading = nextProps.dinoData.loading;
		const nextError = nextProps.dinoData.error;
		if (lastLoading && !nextLoading && !nextError) {
			// this.setState({ showAuthenticationPanel: true });
		}
	},
	
	render() {
		
		return (
			<div style={styles.container}>
				<h1>Dino</h1>
				<p>This experiment blah blah</p>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		dinoData: state.dino.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Dino));

styles = {
	container: {
		maxWidth: '100vw',
	},
};
