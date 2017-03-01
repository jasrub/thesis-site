import React, { PropTypes } from 'react';
import Radium from 'radium';
import Textarea from 'react-textarea-autosize';
import { NonIdealState, Checkbox, Button, NumericInput, RadioGroup, Radio } from '@blueprintjs/core';

let styles;

export const Survey = React.createClass({
	propTypes: {
		onComplete: PropTypes.func,
		loading: PropTypes.bool,
	},

	getInitialState() {
		return {
			levelOfEducation: '',
			isScientist: undefined,
			hasReviewed: '',
			hasBeenReviewed: '',
			interestedInTopic: undefined,
			feedback: '',

			error: undefined,
		};
	},

	submitSurvey: function() {

		if (!this.state.levelOfEducation) { return this.setState({ error: 'Level of Education is required' }); }
		if (this.state.isScientist === undefined) { return this.setState({ error: 'Scientist status is required' }); }
		if (!this.state.hasReviewed) { return this.setState({ error: 'Review experience is required' }); }
		if (!this.state.hasBeenReviewed) { return this.setState({ error: 'Publishing experience is required' }); }
		if (this.state.interestedInTopic === undefined) { return this.setState({ error: 'Stated interest is required' }); }
		if (!this.state.feedback) { return this.setState({ error: 'Please provide a short sentence or more describing your experience with this experiment.' }); }

		this.setState({ error: undefined });
		return this.props.onComplete({
			levelOfEducation: this.state.levelOfEducation,
			isScientist: this.state.isScientist,
			hasReviewed: this.state.hasReviewed,
			hasBeenReviewed: this.state.hasBeenReviewed,
			interestedInTopic: this.state.interestedInTopic,
			feedback: this.state.feedback,
		});
	},

	render() {
		const hasReviewedOptions = ['never', '1 or 2 times', '2-5 times', 'more than 5 times'];
		const hasBeenReviewedOptions = hasReviewedOptions;
		const levelOfEducationOptions = ['None', 'High school student', 'Undergraduate student', 'Masters student', 'PhD student', 'Postdoc', 'Faculty'];

		return (
			<div style={styles.container}>
				<h1>Survey</h1>

				<p>Final step! Please complete the survey below. All fields are required.</p>

				<div className={'pt-button-group'} style={styles.inputBlock}>
					<div style={styles.label}>How many times have you been a peer reviewer for a scientific paper in the past?</div>
					{hasReviewedOptions.map((item, index)=> {
						return <Button key={`hasReviewed-${index}`} text={item} onClick={evt => this.setState({ hasReviewed: item })} className={this.state.hasReviewed === item ? 'pt-active' : ''} />;
					})}
				</div>

				<div className={'pt-button-group'} style={styles.inputBlock}>
					<div style={styles.label}>How many times have you submitted scientific work to be peer reviewed in the past?</div>
					{hasBeenReviewedOptions.map((item, index)=> {
						return <Button key={`hasBeenReviewed-${index}`} text={item} onClick={evt => this.setState({ hasBeenReviewed: item })} className={this.state.hasBeenReviewed === item ? 'pt-active' : ''} />;
					})}
				</div>

				<div className={'pt-button-group'} style={styles.inputBlock}>
					<div style={styles.label}>What is the highest academic role you've held?</div>
					{levelOfEducationOptions.map((item, index)=> {
						return <Button key={`levelOfEducation-${index}`} text={item} onClick={evt => this.setState({ levelOfEducation: item })} className={this.state.levelOfEducation === item ? 'pt-active' : ''} />;
					})}
				</div>

				<div className={'pt-button-group'} style={styles.inputBlock}>
					<div style={styles.label}>Do you consider yourself a scientist?</div>
						<Button key={'isScientist-0'} text={'Yes'} onClick={evt => this.setState({ isScientist: true })} className={this.state.isScientist === true ? 'pt-active' : ''} />
						<Button key={'isScientist-1'} text={'No'} onClick={evt => this.setState({ isScientist: false })} className={this.state.isScientist === false ? 'pt-active' : ''} />
				</div>

				<div className={'pt-button-group'} style={styles.inputBlock}>
					<div style={styles.label}>Were you interested in the topic?</div>
						<Button key={'interestedInTopic-0'} text={'Yes'} onClick={evt => this.setState({ interestedInTopic: true })} className={this.state.interestedInTopic === true ? 'pt-active' : ''} />
						<Button key={'interestedInTopic-1'} text={'No'} onClick={evt => this.setState({ interestedInTopic: false })} className={this.state.interestedInTopic === false ? 'pt-active' : ''} />
				</div>


				<label>
					Please provide feedback on your experience during this study.
					<Textarea value={this.state.feedback} onChange={evt => this.setState({ feedback: evt.target.value })} style={styles.input} />
				</label>

				<Button className={'pt-intent-primary'} onClick={this.submitSurvey} loading={this.props.loading}>Submit and Complete HIT</Button>
				{!!this.state.error &&
					<div className={'pt-callout pt-intent-danger'}>
						{this.state.error}
					</div>
				}
			</div>
		);
	}

});

export default Radium(Survey);

styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
	},
	text: {
		lineHeight: '1.6',
		fontSize: '1.2em',
		margin: '1em 0em',
	},
	inputBlock: {
		display: 'block',
		margin: '2em 0em',
	},
	input: {
		width: '100%',
		minHeight: '3em',
	},

};
