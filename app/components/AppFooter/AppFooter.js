import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

let styles;

export const AppFooter = React.createClass({
	
	logout: function() {
		localStorage.removeItem('userData');
		window.location = '/';
	},
	
	render() {
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};

		return (
			<div style={styles.container}>
				<a href={'mailto:fiftynifty@media.mit.edu'} className={'link'} style={styles.item}>Contact us at fiftynifty@media.mit.edu</a>

				{!!localUser.id && 
					<button type="button" className={'pt-button pt-minimal pt-icon-log-out pt-intent-danger'} onClick={this.logout}>Logout</button>
				}
			</div>
		);
	}

});

export default Radium(AppFooter);

styles = {
	container: {
		borderTop: '1px solid #888',
		marginBottom: '1em',
		paddingTop: '1em',
		textAlign: 'center',
	},
	item: {
		display: 'inline-block',
		padding: '0em 1em',
		color: '#888',
		fontSize: '0.9em',
	},
};
