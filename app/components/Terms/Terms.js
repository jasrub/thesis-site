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
				<h1>Experiment Overview</h1>
				
				<p style={styles.text}>PubPub is being built as a platform that not only provides open and free publishing tools, but one that allows us to experiment and learn about the scientific publishing process.</p>
				<p style={styles.text}>We invite you to participate in the experiments below. Your participation in these experiments is <b>not</b> linked to your PubPub profile in any way. The data collected in these experiments is self-contained and anonymized.</p>
				<p style={styles.text}>The results of these experiments will be published and available on PubPub.</p>


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
