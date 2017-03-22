import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import Helmet from 'react-helmet';

require('../../../static/blueprint.scss');
require('../../../static/style.css');

export const App = React.createClass({
	propTypes: {
		location: PropTypes.object,
		params: PropTypes.object,
		children: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		const FocusStyleManager = require('@blueprintjs/core').FocusStyleManager;
		FocusStyleManager.onlyShowFocusOnTabs();

		const workerId = this.props.location.query.workerId;
		const assignmentId = this.props.location.query.assignmentId;
		const hitId = this.props.location.query.hitId;
		if (workerId || assignmentId || hitId) {
			Raven.setUserContext({ username: workerId, workerId: workerId, assignmentId: assignmentId, hitId: hitId });
		}
	},

	render() {
		return (
			<StyleRoot>
				<Helmet 
					title="News Explorer"
					meta={[
						{ name: 'ROBOTS', content: 'NOINDEX, NOFOLLOW' },
						{ name: 'description', content: 'News Explore' },
						{ property: 'og:title', content: 'News Explore' },
					]} 
				/>
				{this.props.children}
			</StyleRoot>
		);
	},

});

export default App;
