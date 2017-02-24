/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const POST_EXPERIMENT_LOAD = 'beef/POST_EXPERIMENT_LOAD';
export const POST_EXPERIMENT_SUCCESS = 'beef/POST_EXPERIMENT_SUCCESS';
export const POST_EXPERIMENT_FAIL = 'beef/POST_EXPERIMENT_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function submitExperiment(experimentData) {
	return (dispatch) => {
		dispatch({ type: POST_EXPERIMENT_LOAD });

		return clientFetch('/api/beef', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...experimentData
			})
		})
		.then((result) => {
			dispatch({ type: POST_EXPERIMENT_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: POST_EXPERIMENT_FAIL, error });
		});
	};
}
