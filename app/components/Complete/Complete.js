import React, { PropTypes } from 'react';
import Radium from 'radium';
import { NonIdealState } from '@blueprintjs/core';

let styles;

export const Complete = React.createClass({
	propTypes: {
		query: PropTypes.object,
	},

	render() {
		const query = this.props.query || {};
		return (
			<NonIdealState
				description={`Thank you! The study has been successfully completed. ${query.turkSubmitTo ? 'Submit the HIT with the button below.' : ''}`}
				title={'Completed!'}
				visual={'endorsed'} 
				action={
					<form name="mturk_form" method="post" id="mturk_form" action={query.turkSubmitTo + '/mturk/externalSubmit'}>
						<input type="hidden" value={query.assignmentId} name="assignmentId" id={query.assignmentId} />
						<input type="hidden" value={query.hitId} name="hitId" id={query.hitId} />
						<input type="hidden" value="bar" name="foo" />
						{query.turkSubmitTo &&
							<button type="submit" className={'pt-button pt-intent-primary'}>Submit HIT</button>
						}
					</form>
				} />
		);
	}

});

export default Radium(Complete);

styles = {
	
};
