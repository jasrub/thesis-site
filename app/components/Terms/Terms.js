import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Button } from '@blueprintjs/core';

let styles;

export const Terms = React.createClass({
	propTypes: {
		onComplete: PropTypes.func,
		assignmentId: PropTypes.string,
	},

	render() {

		return (
			<div style={styles.container}>
				<h1>Activity Overview</h1>
				
				<p style={styles.text}>Welcome! We are asking you to review a short scientific article. The article should take about 5 minutes to read and has one figure. We ask that you review the article for quality of the logic and conclusions.</p>
				<p style={styles.text}>After the review, we ask a short series of questions about you and your experience with scientific review.</p>
				<p style={styles.text}>The submitted survey data will be used as experimental data in a study we are conducted. Your answers are completely anonymous and your individual answers will always remain private.</p>
				<p style={styles.text}>If you accept this task (review and survey) and the privacy terms, please click below to begin!</p>


				<Button 
					className={'pt-button pt-intent-primary'} 
					onClick={this.props.onComplete} 
					disabled={this.props.assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE'}
					text={this.props.assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE' ? 'Please accept HIT on Amazon first' : 'Accept Terms and Begin HIT'} />
			</div>
		);
	}

});

export default Radium(Terms);

styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
	},
	text: {
		lineHeight: '1.6',
		fontSize: '1.2em',
		margin: '1em 0em',
	}

};
