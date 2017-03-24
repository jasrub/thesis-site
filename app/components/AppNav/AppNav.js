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
							<div style={styles.appTitle}>News Explorer</div>
						</div>
						
						
						<div style={styles.linkWrapper}>
							<span style={styles.link} onClick={this.props.onHomeClick}> Hot Topics </span>

							<span style={styles.link}>Sources Compare</span>
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
	},
    linkWrapper: {
        display: 'table',
        width: '100%',
    },
    link: {
            display: 'table-cell',
            textDecoration: 'none',
            //textAlign: 'center',
            width: '25%',
            padding: '1em 0em',
            color: '#fff',
			cursor: 'pointer',
    },
	appTitle: {
		fontSize:'4em',
	}
	
};
