import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

let styles;

export const AppNav = React.createClass({
	propTypes: {
		onHomeClick: PropTypes.func,
	},

	getInitialState() {
		return {
			search: '',
		};
	},

	render() {
		return (
			<nav style={styles.navStyle}>
				<div style={styles.navContent}>
					<div style={{ display: 'inline-block' }}>
						<div>
							<h1>News Explorer</h1>
						</div>
						
						
						<div style={styles.linkWrapper}>
							<button onClick={this.props.onHomeClick}> Home </button>
						</div>
					</div>
					
				</div>
				
				
			</nav>
		);
	}

});

export default Radium(AppNav);

styles = {
	navStyle: {
		width: '100%',
		maxWidth: '100vw',
		overflow: 'hidden',
	},
	navContent: {
		padding: '1em',
		maxWidth: '1024px',
		margin: '0 auto',
		textAlign: 'center',
	},
	
};
