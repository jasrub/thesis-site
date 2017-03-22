/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_DESCRIPTORS_LOAD = 'main/GET_DESCRIPTORS_LOAD';
export const GET_DESCRIPTORS_SUCCESS = 'main/GET_DESCRIPTORS_SUCCESS';
export const GET_DESCRIPTORS_FAIL = 'main/GET_DESCRIPTORS_FAIL';
export const GET_RELATED_LOAD = 'main/GET_RELATED_LOAD';
export const GET_RELATED_SUCCESS = 'main/GET_RELATED_SUCCESS';
export const GET_RELATED_FAIL = 'main/GET_RELATED_FAIL';


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

export function getRelated(descriptorId) {
    return (dispatch) => {
        dispatch({type: GET_RELATED_LOAD});
        return clientFetch(`/api/descriptors/related?q=${descriptorId}`)
            .then((result) => {
                dispatch({type: GET_RELATED_SUCCESS, result:result, descriptorId:descriptorId});
            })
            .catch((error) => {
                dispatch({type: GET_RELATED_FAIL, error});
            });
    };
}

