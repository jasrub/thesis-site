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
export const GET_STORIES_LOAD = 'main/GET_STORIES_LOAD';
export const GET_STORIES_SUCCESS = 'main/GET_STORIES_SUCCESS';
export const GET_STORIES_FAIL = 'main/GET_STORIES_FAIL';


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
        //     , {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(filters)
        // })
        //
        .then((result) => {
            dispatch({ type: GET_DESCRIPTORS_SUCCESS, result });
        })
        .catch((error) => {
            console.log(error);
            dispatch({ type: GET_DESCRIPTORS_FAIL, error });
        });
    };
}

export function getStories() {
    return (dispatch) => {
        dispatch({ type: GET_STORIES_LOAD });
        return clientFetch('/api/stories/all')
            .then((result) => {
                dispatch({ type: GET_STORIES_SUCCESS, result });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: GET_STORIES_FAIL, error });
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
                console.log(error);
                dispatch({type: GET_RELATED_FAIL, error});
            });
    };
}

