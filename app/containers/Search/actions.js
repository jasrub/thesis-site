/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_DESCRIPTORS_LOAD = 'search/GET_DESCRIPTORS_LOAD';
export const GET_DESCRIPTORS_SUCCESS = 'search/GET_DESCRIPTORS_SUCCESS';
export const GET_DESCRIPTORS_FAIL = 'search/GET_DESCRIPTORS_FAIL';


/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getDescriptors() {
    return (dispatch) => {
        dispatch({ type: GET_DESCRIPTORS_LOAD });
        return clientFetch('/api/descriptors/sorted')
            .then((result) => {
                dispatch({ type: GET_DESCRIPTORS_SUCCESS, result });
            })
            .catch((error) => {
                dispatch({ type: GET_DESCRIPTORS_FAIL, error });
            });
    };
}