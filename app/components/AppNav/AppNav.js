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
					<div style={{display:'table', width: '100%'}}>
						<Link to={'/'} style={styles.logo} onClick={this.props.onHomeClick}>
							<img src="/static/logo_small.png" />
						</Link>

						<div style={styles.linkWrapper}>
							<Link to={'/'} onClick={this.props.onHomeClick} style={styles.link}>Quick Tour</Link>

							{/*<span style={styles.link}>Sources Compare</span>*/}
							<Link to={'/about'} style={styles.link}>About</Link>

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
		//background: 'rgba(250, 250, 250 ,0.1)'
	},
	navContent: {
		padding: '1em 0',
	},
    linkWrapper: {
        display: 'table-cell',
        width: '30%',
		float: 'right',
		textAlign: 'right'
    },
    link: {
            textDecoration: 'none',
            //textAlign: 'center',
            padding: '1em',
            color: '#fff',
			cursor: 'pointer',
        	float: 'right',
		display: 'inline',
		fontWeight:'300',
    },
    logo: {
        textDecoration: 'none',
        color: 'white',
		display: 'table-cell',
		width: '50%',
    },
	
};
