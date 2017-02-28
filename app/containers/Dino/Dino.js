import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { NonIdealState } from '@blueprintjs/core';
import Terms from 'components/Terms/Terms';
import Survey from 'components/Survey/Survey';
import DinoPaper from './DinoPaper';
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

			reviewData: {},
			surveyData: {},

			completedTerms: false,
			completedReview: false,
			completedSurvey: false,
		};
	},
	
	completeTerms: function() {
		this.setState({ completedTerms: true });
	},
	completeReview: function(reviewData) {
		this.setState({ 
			completedReview: true,
			reviewData: reviewData 
		});
	},
	completeSurvey: function(surveyData) {
		// this.props.dispatch(submitExperiment({
		// 	workerId: this.state.workerId,
		// 	assignmentId: this.state.assignmentId,
		// 	hitId: this.state.hitId,
		// 	...this.state.reviewData,
		// 	...surveyData,
		// }));
		console.log(surveyData);
		this.setState({ 
			completedSurvey: true,
			surveyData: surveyData,
		});
	},

	render() {
		return (
			<div style={styles.container}>

				{!this.state.completedTerms &&
					<Terms onComplete={this.completeTerms} />
				}

				{this.state.completedTerms && !this.state.completedReview &&
					<DinoPaper onComplete={this.completeReview} />
				}

				{this.state.completedTerms && this.state.completedReview && !this.props.dinoData.completed &&
					<Survey onComplete={this.completeSurvey} loading={this.props.dinoData.loading} />
				}

				{this.props.dinoData.completed &&
					<div style={styles.complete}>
						<NonIdealState
							description={'Thank you! The HIT has been successfully Submitted and has been Approved.'}
							title={'HIT Submitted and Approved!'}
							visual={'endorsed'} />
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
	},
};
