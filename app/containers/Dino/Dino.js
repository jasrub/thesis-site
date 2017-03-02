import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { NonIdealState, Spinner } from '@blueprintjs/core';
import Terms from 'components/Terms/Terms';
import Survey from 'components/Survey/Survey';
import fetch from 'isomorphic-fetch';
import DinoPaper from './DinoPaper';
import { submitExperiment, checkUniqueWorker } from './actions';

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
			mode: undefined,

			reviewData: {},
			surveyData: {},

			completedTerms: false,
			completedReview: false,
			completedSurvey: false,
		};
	},
	
	componentWillMount() {
		const query = this.props.location.query || {};
		this.setState({
			workerId: query.workerId,
			assignmentId: query.assignmentId,
			hitId: query.hitId,
			mode: Math.round(Math.random()),
		});
		this.props.dispatch(checkUniqueWorker(query.workerId));
	},

	completeTerms: function() {
		this.setState({ completedTerms: true });
		document.body.scrollTop = 0;
	},
	completeReview: function(reviewData) {
		this.setState({ 
			completedReview: true,
			reviewData: reviewData 
		});
		document.body.scrollTop = 0;
	},
	completeSurvey: function(surveyData) {

		this.setState({ 
			completedSurvey: true,
			surveyData: surveyData,
		});

		return this.props.dispatch(submitExperiment({
			workerId: this.state.workerId,
			assignmentId: this.state.assignmentId,
			hitId: this.state.hitId,
			mode: this.state.mode,
			...this.state.reviewData,
			...surveyData,
		}));

		const url = window.location.hostname === 'experiments.pubpub.org'
			? `https://www.mturk.com/mturk/externalSubmit?assignmentId=${this.state.assignmentId}&hitId=${this.state.hitId}&foo=bar`
			: `https://workersandbox.mturk.com/mturk/externalSubmit?assignmentId=${this.state.assignmentId}&hitId=${this.state.hitId}&foo=bar`;

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
			return this.props.dispatch(submitExperiment({
				workerId: this.state.workerId,
				assignmentId: this.state.assignmentId,
				hitId: this.state.hitId,
				mode: this.state.mode,
				...this.state.reviewData,
				...surveyData,
			}));
		})
		.catch((err)=> {
			this.setState({ completedSurvey: false });
			Raven.captureException(JSON.stringify(err));
			console.error(JSON.stringify(err));
		});
	},

	render() {
		const query = this.props.location.query || {};
		if (this.props.dinoData.canBegin === undefined) {
			return (
				<div style={[styles.container, styles.complete]}>
					<Spinner />
				</div>
			);
		}

		if (this.props.dinoData.canBegin === false) {
			return (
				<div style={[styles.container, styles.complete]}>
					<NonIdealState
						description={'This Task is identical to one you have already completed. Unfortunately we only allow one worker per Task type.'}
						title={'HIT Already Completed'}
						visual={'delete'} />
				</div>
			);
		}

		return (
			<div style={styles.container}>

				{!this.state.completedTerms &&
					<Terms onComplete={this.completeTerms} assignmentId={this.state.assignmentId} />
				}

				{this.state.completedTerms && !this.state.completedReview &&
					<DinoPaper onComplete={this.completeReview} mode={this.state.mode} />
				}

				{this.state.completedTerms && this.state.completedReview && !this.props.dinoData.completed &&
					<Survey onComplete={this.completeSurvey} loading={this.state.completedSurvey} />
				}

				{this.props.dinoData.completed &&
					<div style={styles.complete}>
						<NonIdealState
							description={'Thank you! The HIT has been successfully Submitted and has been Approved.'}
							title={'HIT Submitted and Approved!'}
							visual={'endorsed'} />

						<form name="mturk_form" method="post" id="mturk_form" action={query.turkSubmitTo + '/mturk/externalSubmit'}>
							<input type="hidden" value={query.assignmentId} name="assignmentId" id={query.assignmentId} />
							<input type="hidden" value={query.hitId} name="hitId" id={query.hitId} />
							<input type="hidden" value="bar" name="foo" />
							<button type="submit" className={'pt-button pt-intent-primary'}>Submit HIT</button>
						</form>
					</div>
				}
				
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
	complete: {
		margin: '3em 0em',
		textAlign: 'center',
	},
};
