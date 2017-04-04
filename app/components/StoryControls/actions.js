export const POST_LABEL_LOAD = 'storyControls/POST_LABEL_LOAD';
export const POST_LABEL_SUCCESS = 'storyControls/POST_LABEL_SUCCESS';
export const POST_LABEL_FAIL = 'storyControls/POST_LABEL_FAIL';


/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function postLabel(story, filters) {
    return (dispatch) => {
        dispatch({ type: POST_LABEL_LOAD });
        console.log(filters)
        return clientFetch('/api/label', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                story:story,
                filters:filters
            })
        })
            .then((result) => {
                dispatch({ type: POST_LABEL_SUCCESS, result });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: POST_LABEL_FAIL, error });
            });
    };
}
