import React from 'react';
import { Route } from 'react-router';

function getComponent(component) {
	return (location, cb)=> {
		System.import(`containers/${component}/${component}`)
		.then(function(module) {
			cb(null, module.default);
		})
		.catch(function(error) {
			Raven.captureException(JSON.stringify(error));
			throw new Error(`Dynamic page loading failed: ${error}`);
		});
	};
}

export default (
	<Route getComponent={getComponent('App')}>
		<Route path="/" getComponent={getComponent('Landing')} />
		<Route path="/dino" getComponent={getComponent('Dino')} />
		<Route path="/beef" getComponent={getComponent('Beef')} />
		<Route path="/govt" getComponent={getComponent('Govt')} />

		<Route path="*" getComponent={getComponent('NoMatch')} />
	</Route>
);
