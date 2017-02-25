import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Dialog } from '@blueprintjs/core';
import fetch from 'isomorphic-fetch';
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
		// return this.props.dispatch(submitExperiment(data));
		
		const url = window.location.hostname === 'experiments.pubpub.org'
			? `https://www.mturk.com/mturk/externalSubmit?assignmentId=${this.state.assignmentId}&foo=bar`
			: `https://workersandbox.mturk.com/mturk/externalSubmit?assignmentId=${this.state.assignmentId}&foo=bar`;

		const form = new FormData();
		form.append('assignmentId', this.state.assignmentId);
		form.append('foo', 'bar');

		return fetch(url, {
			method: 'POST',
			body: form,
			mode: 'no-cors',
			credentials: 'include',
		})
		.then((response)=> {
			if (!response.ok) { return response.json().then(err => { throw err; }); }
			return this.props.dispatch(submitExperiment(data));
		})
		.catch((err)=> {
			this.setState({ submitLoading: false, error: JSON.stringify(err) });
			console.log(err);
		});

		
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
