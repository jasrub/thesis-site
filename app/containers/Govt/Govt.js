import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Dialog } from '@blueprintjs/core';
import Radium from 'radium';
import { submitExperiment } from './actions';

let styles;

export const Govt = React.createClass({
	propTypes: {
		govtData: PropTypes.object,
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
		const lastLoading = this.props.govtData.loading;
		const nextLoading = nextProps.govtData.loading;
		const nextError = nextProps.govtData.error;
		if (lastLoading && !nextLoading && !nextError) {
			// this.setState({ showAuthenticationPanel: true });
		}
	},
	
	render() {
		
		return (
			<div style={styles.container}>
				<h1>Govt</h1>
				<p>This experiment blah blah</p>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		govtData: state.govt.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Govt));

styles = {
	container: {
		maxWidth: '100vw',
	},
};
