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

	componentWillReceiveProps(nextProps) {
		const lastLoading = this.props.beefData.loading;
		const nextLoading = nextProps.beefData.loading;
		const nextError = nextProps.beefData.error;
		if (lastLoading && !nextLoading && !nextError) {
			// this.setState({ showAuthenticationPanel: true });
		}
	},
	
	render() {
		
		return (
			<div style={styles.container}>
				<h1>Beef</h1>
				<p>This experiment blah blah</p>
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
