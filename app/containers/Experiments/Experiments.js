import React, { PropTypes } from 'react';
import Radium from 'radium';
import ExperimentsMain from './ExperimentsMain';
import ExperimentsDinosaur from './ExperimentsDinosaur';

export const Experiments = React.createClass({
	propTypes: {
		params: PropTypes.object,
	},

	getInitialState() {
		return {
			email: '',
			password: '',
		};
	},


	render: function() {
		const mode = this.props.params.experiment;

		switch (mode) {
		case 'dinosaur':
			return <ExperimentsDinosaur />;
		default:
			return <ExperimentsMain />;
		}
		
	}

});


export default Radium(Experiments);
