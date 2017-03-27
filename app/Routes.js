import React from 'react';
import { Route } from 'react-router';

function getComponent(component) {
	return (location, cb)=> {
		System.import(`containers/${component}/${component}`)
		.then(function(module) {
			cb(null, module.default);
		})
		.catch(function(error) {
			throw new Error(`Dynamic page loading failed: ${error}`);
		});
	};
}

export default (
	<Route getComponent={getComponent('App')}>
		<Route path="/" getComponent={getComponent('Main')} />

		<Route path="*" getComponent={getComponent('NoMatch')} />
	</Route>
);
