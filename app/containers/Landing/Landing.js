import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

let styles;

export const Landing = React.createClass({

	render() {
		
		return (
			<div style={styles.container}>
				<div style={styles.wrapper}>
					<Link to={'/dino'}>Dino</Link>
				</div>
				<div style={styles.wrapper}>
					<Link to={'/beef'}>Beef</Link>
				</div>
				<div style={styles.wrapper}>
					<Link to={'/govt'}>Government</Link>
				</div>


			</div>
		);
	}
});

export default Radium(Landing);

styles = {
	container: {
		maxWidth: '800px',
		margin: '0em auto',
	},
	wrapper: {
		fontSize: '1.25em',
		padding: '0.5em 0em',

	}
};
